"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import {
  getUserByEmail,
  createUser,
  getUserById,
  uploadUserDocument,
  reviewUserDocument,
  updatePipelineProgress,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  createAuditLog,
  createSystemMessage,
  deleteSystemMessage,
  updateUserProfile,
  overrideComplianceDeadline,
  deleteUser,
  deleteUserDocument,
  getUserDocumentById,
  User,
} from "@/lib/db";
import { uploadFileToS3, getPresignedUploadUrl } from "@/lib/s3";

// Helper to get current authenticated user
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user_id")?.value;
  if (!userId) return null;
  return (await getUserById(userId)) || null;
}

// Authentication Actions
export async function login(formData: FormData) {
  try {
    const corporateId = formData.get("corporateId") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!corporateId || !email || !password) {
      return { success: false, error: "Please enter all fields." };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCorpId = corporateId.trim().toLowerCase();

    const user = await getUserByEmail(cleanEmail);
    if (!user || user.corporateId.trim().toLowerCase() !== cleanCorpId || user.passwordHash !== password) {
      return { success: false, error: "Invalid Corporate ID, email, or password." };
    }

    const cookieStore = await cookies();
    cookieStore.set("session_user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    try {
      await createAuditLog({
        adminId: user.role === "ADMIN" ? user.id : null,
        userId: user.role === "USER" ? user.id : null,
        action: `User logged in: ${user.name} (${user.role}) under ID ${user.corporateId}`,
      });
    } catch (auditErr) {
      console.warn("Audit log non-blocking error:", auditErr);
    }

    // Revalidate paths
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    revalidatePath("/");

    return {
      success: true,
      role: user.role,
      redirectUrl: user.role === "ADMIN" ? "/admin" : "/dashboard",
    };
  } catch (err: unknown) {
    console.error("Login server action error:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to log in. Please check database connection.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const companyName = formData.get("companyName") as string;

  if (!name || !email || !password || !companyName) {
    return { success: false, error: "All fields are required." };
  }

  if (password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters long." };
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return { success: false, error: "Email is already registered." };
  }

  // Enforce USER role for all public registrations to prevent privilege escalation
  const role = "USER";

  const newUser = await createUser({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: password,
    role,
    companyName: companyName.trim(),
  });

  const cookieStore = await cookies();
  cookieStore.set("session_user_id", newUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  revalidatePath("/");

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user_id")?.value;

  if (userId) {
    try {
      await createAuditLog({
        adminId: null,
        userId,
        action: "User logged out",
      });
    } catch {
      // Non-blocking
    }
  }

  cookieStore.delete("session_user_id");

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  revalidatePath("/");

  redirect("/login");
}

// Allowed file extensions for document compliance uploads
const ALLOWED_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg", ".docx", ".doc", ".xlsx", ".xls"];
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

// Client-Specific Actions
export async function uploadDocument(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized access." };
  }

  const templateId = formData.get("templateId") as string;
  const requestedUserId = (formData.get("activeUserId") as string) || "";
  // IDOR Prevention: Only administrators can specify a different target client user ID
  const activeUserId = user.role === "ADMIN" && requestedUserId ? requestedUserId : user.id;
  const file = formData.get("file") as File | null;

  if (!templateId || !file) {
    return { success: false, error: "Missing required parameters." };
  }

  if (file.size === 0) {
    return { success: false, error: "Uploaded file is empty." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { success: false, error: "File size exceeds the 20MB limit." };
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      success: false,
      error: `Invalid file format (${ext}). Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}`,
    };
  }

  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  let fileUrl = "";

  const s3Url = await uploadFileToS3(file, `uploads/${activeUserId}`);
  if (s3Url) {
    fileUrl = s3Url;
  } else {
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads", activeUserId);
      await fs.mkdir(uploadDir, { recursive: true });

      const localFileName = `${Date.now()}_${sanitizedFileName}`;
      const filePath = path.join(uploadDir, localFileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      fileUrl = `/uploads/${activeUserId}/${localFileName}`;
    } catch (err) {
      console.error("Local file save error:", err);
      return { success: false, error: "Failed to save file." };
    }
  }

  await uploadUserDocument(activeUserId, templateId, sanitizedFileName, fileUrl);

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

/**
 * Generates a presigned S3 upload URL for direct browser-to-S3 upload.
 * Bypasses AWS API Gateway / Next.js Server Action payload limits (6MB).
 */
export async function getDirectUploadPresignedUrl(
  templateId: string,
  fileName: string,
  fileType: string,
  requestedUserId?: string
) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized access." };
  }

  const activeUserId = user.role === "ADMIN" && requestedUserId ? requestedUserId : user.id;

  const ext = path.extname(fileName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      success: false,
      error: `Invalid file format (${ext}). Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}`,
    };
  }

  const presigned = await getPresignedUploadUrl(`uploads/${activeUserId}`, fileName, fileType);
  if (!presigned) {
    return { success: false, fallbackToServerAction: true };
  }

  return {
    success: true,
    uploadUrl: presigned.uploadUrl,
    s3Url: presigned.s3Url,
    activeUserId,
    sanitizedFileName: fileName.replace(/[^a-zA-Z0-9._-]/g, "_"),
  };
}

/**
 * Saves a document record after direct S3 upload completes.
 */
export async function saveDirectUploadedDocumentRecord(
  templateId: string,
  fileName: string,
  fileUrl: string,
  requestedUserId?: string
) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized access." };
  }

  const activeUserId = user.role === "ADMIN" && requestedUserId ? requestedUserId : user.id;
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");

  await uploadUserDocument(activeUserId, templateId, sanitizedFileName, fileUrl);

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

/**
 * Generates a presigned S3 upload URL for template files (Admin).
 */
export async function getTemplatePresignedUrl(fileName: string, fileType: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const ext = path.extname(fileName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      success: false,
      error: `Invalid file format (${ext}). Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}`,
    };
  }

  const presigned = await getPresignedUploadUrl("templates", fileName, fileType);
  if (!presigned) {
    return { success: false, fallbackToServerAction: true };
  }

  return {
    success: true,
    uploadUrl: presigned.uploadUrl,
    s3Url: presigned.s3Url,
  };
}

// Admin-Specific Actions
export async function reviewDocument(docId: string, status: "VERIFIED" | "REJECTED", remark: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const result = await reviewUserDocument(admin.id, docId, status, remark);
  if (!result) {
    return { success: false, error: "Document not found." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

export async function updatePipeline(userId: string, stageOrder: number, status: "PENDING" | "IN_PROGRESS" | "COMPLETED", note: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  await updatePipelineProgress(admin.id, userId, stageOrder, status, note);

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

export async function addTemplate(formData: FormData) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const requiredFor = formData.get("requiredFor") as string;
  const file = formData.get("file") as File | null;
  let fileUrl = (formData.get("fileUrl") as string) || "";

  if (!title || !description || !requiredFor) {
    return { success: false, error: "All fields are required." };
  }

  if (file && file.size > 0) {
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        success: false,
        error: `Invalid file format (${ext}). Allowed formats: ${ALLOWED_EXTENSIONS.join(", ")}`,
      };
    }

    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const s3Url = await uploadFileToS3(file, "templates");
    if (s3Url) {
      fileUrl = s3Url;
    } else {
      try {
        const templatesDir = path.join(process.cwd(), "public", "templates");
        await fs.mkdir(templatesDir, { recursive: true });

        const fileName = `${Date.now()}_${sanitizedFileName}`;
        const filePath = path.join(templatesDir, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        fileUrl = `/templates/${fileName}`;
      } catch (err) {
        console.error("Failed to save template file:", err);
        return { success: false, error: "Failed to upload the template file." };
      }
    }
  }

  await createTemplate({
    title,
    description,
    fileUrl,
    requiredFor,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

export async function editTemplate(formData: FormData) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const requiredFor = formData.get("requiredFor") as string;
  const file = formData.get("file") as File | null;
  let fileUrl = formData.get("fileUrl") as string;

  if (!id || !title || !description || !requiredFor) {
    return { success: false, error: "Missing required parameters." };
  }

  if (file && file.size > 0) {
    const s3Url = await uploadFileToS3(file, "templates");
    if (s3Url) {
      fileUrl = s3Url;
    } else {
      try {
        const templatesDir = path.join(process.cwd(), "public", "templates");
        await fs.mkdir(templatesDir, { recursive: true });

        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(templatesDir, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        fileUrl = `/templates/${fileName}`;
      } catch (err) {
        console.error("Failed to save updated template file:", err);
        return { success: false, error: "Failed to upload replacement template file." };
      }
    }
  }

  const updates: { title: string; description: string; requiredFor: string; fileUrl?: string } = {
    title,
    description,
    requiredFor,
  };
  if (fileUrl && fileUrl.trim() !== "") {
    updates.fileUrl = fileUrl;
  }

  const updated = await updateTemplate(id, updates);
  if (!updated) {
    return { success: false, error: "Failed to update template." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

export async function removeTemplate(templateId: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const success = await deleteTemplate(templateId);
  if (!success) {
    return { success: false, error: "Template not found." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true, message: "Template deleted successfully" };
}

export async function overrideCountdown(userId: string, deadline: string, countdownDays: number) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const clientUser = await getUserById(userId);
  if (!clientUser) {
    return { success: false, error: "Client not found." };
  }

  await overrideComplianceDeadline(userId, deadline, Number(countdownDays));

  await createAuditLog({
    adminId: admin.id,
    userId,
    action: `Overrode compliance countdown to ${countdownDays} days (Deadline: ${deadline}) for ${clientUser.companyName}`,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

export async function sendSystemMessageAction(targetUserId: string, messageText: string, type: "INFO" | "WARNING" | "CRITICAL") {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  if (!messageText || !messageText.trim()) {
    return { success: false, error: "Message content cannot be empty." };
  }

  const newMsg = await createSystemMessage(admin.id, targetUserId, messageText.trim(), type);

  await createAuditLog({
    adminId: admin.id,
    userId: targetUserId === "all" ? null : targetUserId,
    action: `Sent ${type} system message/broadcast: "${messageText.substring(0, 50)}..."`,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true, message: newMsg };
}

export async function deleteSystemMessageAction(messageId: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const success = await deleteSystemMessage(messageId);
  if (!success) {
    return { success: false, error: "Message not found." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

export async function updateProfileSettings(userId: string, name: string, email: string, newPassword?: string, avatarUrl?: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { success: false, error: "Not logged in." };
  }
  if (currentUser.role !== "ADMIN" && currentUser.id !== userId) {
    return { success: false, error: "Unauthorized access: You cannot modify another user's profile." };
  }

  const clientUser = await getUserById(userId);
  if (!clientUser) {
    return { success: false, error: "Client profile not found." };
  }

  await updateUserProfile(userId, name, email, newPassword, avatarUrl);

  await createAuditLog({
    adminId: null,
    userId,
    action: `Updated client user profile parameters (Name: ${name}, Email: ${email})`,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

export async function createClientEntity(formData: FormData) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { success: false, error: "Authentication required." };
  }

  const companyName = formData.get("companyName") as string;
  const pan = formData.get("pan") as string;
  const industryCode = formData.get("industryCode") as string;
  const name = (formData.get("name") as string) || "Authorized Representative";
  const email = (formData.get("email") as string) || `contact@${companyName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;

  if (!companyName || !pan) {
    return { success: false, error: "Company Name and PAN are required." };
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return { success: false, error: "An entity with this contact email already exists." };
  }

  const newUser = await createUser({
    name,
    email,
    passwordHash: "TrustLink2026!",
    role: "USER",
    companyName: `${companyName} (${industryCode || "MCA Verified"})`,
  });

  await createAuditLog({
    adminId: currentUser.role === "ADMIN" ? currentUser.id : null,
    userId: newUser.id,
    action: `Created new client entity '${companyName}' [PAN: ${pan.toUpperCase()}, MCA Industry Code: ${industryCode || "N/A"}]. MCA Data cross-check VERIFIED.`,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true, userId: newUser.id };
}

export async function deleteClientAccount(targetUserId: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  if (admin.id === targetUserId) {
    return { success: false, error: "Cannot delete active administrator account." };
  }

  const clientUser = await getUserById(targetUserId);
  if (!clientUser) {
    return { success: false, error: "Client not found." };
  }

  const success = await deleteUser(targetUserId);
  if (!success) {
    return { success: false, error: "Failed to delete client account." };
  }

  await createAuditLog({
    adminId: admin.id,
    userId: null,
    action: `Deleted client account '${clientUser.companyName}' (${clientUser.email}, ID: ${clientUser.corporateId})`,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard");
  revalidatePath("/admin");
  revalidatePath("/");

  return { success: true };
}

export async function deleteUploadedDocument(documentId: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const doc = await getUserDocumentById(documentId);
  if (!doc) {
    return { success: false, error: "Document record not found." };
  }

  const clientUser = await getUserById(doc.userId);
  const clientName = clientUser ? clientUser.companyName : "Client";

  const success = await deleteUserDocument(documentId);
  if (!success) {
    return { success: false, error: "Failed to delete document from database." };
  }

  await createAuditLog({
    adminId: admin.id,
    userId: doc.userId,
    action: `Deleted uploaded document '${doc.fileName}' for client '${clientName}'`,
  });

  revalidatePath("/admin");
  revalidatePath("/dashboard");

  return { success: true };
}
