"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getUserByEmail,
  createUser,
  getUserById,
  uploadUserDocument,
  reviewUserDocument,
  updatePipelineProgress,
  createTemplate,
  deleteTemplate,
  createAuditLog,
  readDb,
  writeDb,
  createSystemMessage,
  deleteSystemMessage,
  User,
} from "@/lib/db";

// Helper to get current authenticated user
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user_id")?.value;
  if (!userId) return null;
  return getUserById(userId) || null;
}

// Authentication Actions
export async function login(formData: FormData) {
  const corporateId = formData.get("corporateId") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!corporateId || !email || !password) {
    return { success: false, error: "Please enter all fields." };
  }

  const user = getUserByEmail(email);
  if (!user || user.corporateId.toLowerCase() !== corporateId.toLowerCase() || user.passwordHash !== password) {
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

  createAuditLog({
    adminId: user.role === "ADMIN" ? user.id : null,
    userId: user.role === "USER" ? user.id : null,
    action: `User logged in: ${user.name} (${user.role}) under ID ${user.corporateId}`,
  });

  // Revalidate both views to update layout headers, statistics, etc.
  revalidatePath("/dashboard");
  revalidatePath("/admin");
  revalidatePath("/");

  if (user.role === "ADMIN") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}


export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const companyName = formData.get("companyName") as string;
  const roleType = formData.get("role") as string; // USER or ADMIN (just for mock ease)

  if (!name || !email || !password || !companyName) {
    return { success: false, error: "All fields are required." };
  }

  const existing = getUserByEmail(email);
  if (existing) {
    return { success: false, error: "Email is already registered." };
  }

  const role = roleType === "ADMIN" ? "ADMIN" : "USER";

  const newUser = createUser({
    name,
    email,
    passwordHash: password,
    role,
    companyName,
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

  if (newUser.role === "ADMIN") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user_id")?.value;
  
  if (userId) {
    createAuditLog({
      adminId: null,
      userId,
      action: "User logged out",
    });
  }

  cookieStore.delete("session_user_id");
  
  revalidatePath("/dashboard");
  revalidatePath("/admin");
  revalidatePath("/");
  
  redirect("/login");
}

// Client-Specific Actions
export async function uploadDocument(templateId: string, fileName: string, targetUserId?: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized access." };
  }

  const activeUserId = targetUserId || user.id;

  // Simulate file upload path
  const simulatedUrl = `/uploads/${activeUserId}/${Date.now()}_${fileName}`;
  
  uploadUserDocument(activeUserId, templateId, fileName, simulatedUrl);

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  
  return { success: true };
}

// Admin-Specific Actions
export async function reviewDocument(docId: string, status: "VERIFIED" | "REJECTED", remark: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const result = reviewUserDocument(admin.id, docId, status, remark);
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

  updatePipelineProgress(admin.id, userId, stageOrder, status, note);

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
  const fileUrl = formData.get("fileUrl") as string || "/templates/default_placeholder.pdf";

  if (!title || !description || !requiredFor) {
    return { success: false, error: "All fields are required." };
  }

  createTemplate({
    title,
    description,
    fileUrl,
    requiredFor,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}

export async function removeTemplate(templateId: string) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN") {
    return { success: false, error: "Unauthorized access." };
  }

  const success = deleteTemplate(templateId);
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

  const dbData = readDb();
  const userIdx = dbData.users.findIndex((u) => u.id === userId);
  if (userIdx === -1) {
    return { success: false, error: "Client not found." };
  }

  dbData.users[userIdx] = {
    ...dbData.users[userIdx],
    complianceDeadline: deadline,
    countdownDays: Number(countdownDays),
  };

  writeDb(dbData);

  createAuditLog({
    adminId: admin.id,
    userId,
    action: `Overrode compliance countdown to ${countdownDays} days (Deadline: ${deadline}) for ${dbData.users[userIdx].companyName}`,
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

  const newMsg = createSystemMessage(admin.id, targetUserId, messageText.trim(), type);

  createAuditLog({
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

  const success = deleteSystemMessage(messageId);
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

  const dbData = readDb();
  const userIdx = dbData.users.findIndex((u) => u.id === userId);
  if (userIdx === -1) {
    return { success: false, error: "Client profile not found." };
  }

  dbData.users[userIdx].name = name;
  dbData.users[userIdx].email = email;
  if (avatarUrl) {
    dbData.users[userIdx].avatarUrl = avatarUrl;
  }
  if (newPassword && newPassword.trim() !== "") {
    dbData.users[userIdx].passwordHash = newPassword;
  }

  writeDb(dbData);

  createAuditLog({
    adminId: null,
    userId,
    action: `Updated client user profile parameters (Name: ${name}, Email: ${email})`,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin");

  return { success: true };
}
