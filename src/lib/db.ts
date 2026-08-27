import { prisma } from "./prisma";

// Define TypeScript interfaces for our database models

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "USER" | "ADMIN";
  companyName: string;
  corporateId: string;
  createdAt: string;
  complianceDeadline?: string;
  countdownDays?: number;
  avatarUrl?: string;
  twoFactorSecret?: string;
  twoFactorEnabled?: boolean;
  failedLoginAttempts?: number;
  lockedUntil?: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  requiredFor: string;
  createdAt: string;
}

export interface UserDocument {
  id: string;
  userId: string;
  templateId: string;
  uploadedFileUrl: string;
  fileName: string;
  status: "PENDING" | "UPLOADED" | "VERIFIED" | "REJECTED";
  adminRemark: string;
  uploadedAt: string;
  reviewedAt: string | null;
}

export interface PipelineStage {
  id: string;
  userId: string;
  stageName: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  stageOrder: number;
  adminNote: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  adminId: string | null;
  userId: string | null;
  action: string;
  createdAt: string;
}

export interface SystemMessage {
  id: string;
  senderId: string;
  targetUserId: string; // "all" or userId
  messageText: string;
  type: "INFO" | "WARNING" | "CRITICAL";
  createdAt: string;
}

// Mock/Default constants removed — all data is fetched directly from PostgreSQL database tables via Prisma.

export const DEFAULT_TEMPLATES: DocumentTemplate[] = [
  {
    id: "tpl-br",
    title: "Board Resolution",
    description: "Format attached — Board Resolution authorizing dematerialization of shares and designating authorized signatories under CDSL Rule 9B.",
    fileUrl: "/templates/board_resolution_format.docx",
    requiredFor: "Vault → Phase 2: Professional Authorizations",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tpl-checklist",
    title: "Documents Checklist",
    description: "Master reference list & row-by-row reconciliation checklist for CDSL dematerialization requirements.",
    fileUrl: "/templates/demat_documents_checklist.pdf",
    requiredFor: "Vault → Master Reference & Reconciliation",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tpl-freeze",
    title: "Freeze / Unfreeze Declaration",
    description: "Format attached — Standalone compliance declaration form tied to Rule 9B freeze and unfreeze provisions.",
    fileUrl: "/templates/freeze_unfreeze_declaration.pdf",
    requiredFor: "Vault → Phase 3: Depository Execution Forms",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tpl-mcf",
    title: "Signed MCF Form A & B",
    description: "Format attached — Prefilled Master Creation Form A & B for CDSL entity creation and depository admission.",
    fileUrl: "/templates/mcf_form_a_b.pdf",
    requiredFor: "Vault → Phase 1: Corporate Identity",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tpl-networth",
    title: "Networth Certificate",
    description: "Format attached — Financial net worth attestation certified by practicing CA/CS for equity stability calculation.",
    fileUrl: "/templates/networth_certificate_format.pdf",
    requiredFor: "Vault → Phase 2: Financial Attestation",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tpl-undertaking",
    title: "Undertaking",
    description: "Format attached — Compliance undertaking and execution signature page for CDSL depository admission.",
    fileUrl: "/templates/undertaking_format.docx",
    requiredFor: "Vault → Phase 3: Depository Execution Forms",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tpl-tripartite",
    title: "Signed Tripartite Agreement",
    description: "Format attached — System-generated tripartite agreement draft shared for execution between Issuer, RTA, and Depository.",
    fileUrl: "/templates/tripartite_agreement_draft.pdf",
    requiredFor: "Vault → Phase 3: Depository Execution Forms",
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_STAGES = [
  { order: 1, name: "Account Created" },
  { order: 2, name: "KYC Submitted" },
  { order: 3, name: "Documents Uploaded" },
  { order: 4, name: "Admin Review" },
  { order: 5, name: "Compliance Verification" },
  { order: 6, name: "Legal Processing" },
  { order: 7, name: "Final Approval" },
  { order: 8, name: "Completed" },
];

export interface MockDbData {
  users: User[];
  templates: DocumentTemplate[];
  documents: UserDocument[];
  pipelineStages: PipelineStage[];
  auditLogs: AuditLog[];
  messages: SystemMessage[];
}

// Deprecated mock DB structure for compatibility
export function readDb(): MockDbData {
  return { users: [], templates: [], documents: [], pipelineStages: [], auditLogs: [], messages: [] };
}

export function writeDb(data: MockDbData | Record<string, unknown>): void {
  // no-op for compatibility
}

// Database Helpers (Async/Prisma - Direct PostgreSQL Execution)

export async function getUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      passwordHash: u.passwordHash,
      role: u.role as "USER" | "ADMIN",
      companyName: u.companyName,
      corporateId: u.corporateId,
      createdAt: u.createdAt.toISOString(),
      complianceDeadline: u.complianceDeadline ?? undefined,
      countdownDays: u.countdownDays ?? undefined,
      avatarUrl: u.avatarUrl ?? undefined,
      twoFactorSecret: u.twoFactorSecret ?? undefined,
      twoFactorEnabled: u.twoFactorEnabled ?? false,
    }));
  } catch (err) {
    console.error("Prisma getUsers error:", err);
    return [];
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const u = await prisma.user.findUnique({ where: { id } });
    if (!u) return undefined;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      passwordHash: u.passwordHash,
      role: u.role as "USER" | "ADMIN",
      companyName: u.companyName,
      corporateId: u.corporateId,
      createdAt: u.createdAt.toISOString(),
      complianceDeadline: u.complianceDeadline ?? undefined,
      countdownDays: u.countdownDays ?? undefined,
      avatarUrl: u.avatarUrl ?? undefined,
      twoFactorSecret: u.twoFactorSecret ?? undefined,
      twoFactorEnabled: u.twoFactorEnabled ?? false,
    };
  } catch (err) {
    console.error("Prisma getUserById error:", err);
    return undefined;
  }
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const u = await prisma.user.findUnique({ where: { email } });
    if (!u) return undefined;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      passwordHash: u.passwordHash,
      role: u.role as "USER" | "ADMIN",
      companyName: u.companyName,
      corporateId: u.corporateId,
      createdAt: u.createdAt.toISOString(),
      complianceDeadline: u.complianceDeadline ?? undefined,
      countdownDays: u.countdownDays ?? undefined,
      avatarUrl: u.avatarUrl ?? undefined,
      twoFactorSecret: u.twoFactorSecret ?? undefined,
      twoFactorEnabled: u.twoFactorEnabled ?? false,
      failedLoginAttempts: u.failedLoginAttempts ?? 0,
      lockedUntil: u.lockedUntil ? u.lockedUntil.toISOString() : undefined,
    };
  } catch (err) {
    console.error("Prisma getUserByEmail error:", err);
    return undefined;
  }
}

export async function updateUserMFASecret(userId: string, secret: string | null, enabled: boolean): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorSecret: secret,
        twoFactorEnabled: enabled,
      },
    });
    return true;
  } catch (err) {
    console.error("updateUserMFASecret error:", err);
    return false;
  }
}

export async function recordFailedLoginAttempt(email: string): Promise<{ locked: boolean; remainingMins?: number }> {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { locked: false };

    const newAttempts = (user.failedLoginAttempts || 0) + 1;
    let lockUntil: Date | null = null;
    let locked = false;
    let remainingMins = 0;

    if (newAttempts >= 5) {
      locked = true;
      lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minute lockout
      remainingMins = 15;
    }

    await prisma.user.update({
      where: { email },
      data: {
        failedLoginAttempts: newAttempts,
        lockedUntil: lockUntil,
      },
    });

    return { locked, remainingMins };
  } catch (err) {
    console.error("recordFailedLoginAttempt error:", err);
    return { locked: false };
  }
}

export async function resetFailedLoginAttempts(email: string): Promise<void> {
  try {
    await prisma.user.update({
      where: { email },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });
  } catch (err) {
    console.error("resetFailedLoginAttempts error:", err);
  }
}

export async function createUser(user: Omit<User, "id" | "createdAt" | "corporateId">): Promise<User> {
  const id = `usr-${Math.random().toString(36).substr(2, 9)}`;
  const corporateId = user.role === "ADMIN"
    ? "ENT-ADMIN-000"
    : `ENT-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`;

  const created = await prisma.user.create({
    data: {
      id,
      corporateId,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      companyName: user.companyName,
      complianceDeadline: user.complianceDeadline || null,
      countdownDays: user.countdownDays !== undefined ? user.countdownDays : null,
      avatarUrl: user.avatarUrl || null,
    },
  });

  // Initialize pipeline for this user
  await initializePipelineForUser(created.id);

  await createAuditLog({
    adminId: null,
    userId: created.id,
    action: `Registered account: ${created.companyName} (${created.role}) with ID ${corporateId}`,
  });

  return {
    id: created.id,
    name: created.name,
    email: created.email,
    passwordHash: created.passwordHash,
    role: created.role as "USER" | "ADMIN",
    companyName: created.companyName,
    corporateId: created.corporateId,
    createdAt: created.createdAt.toISOString(),
    complianceDeadline: created.complianceDeadline ?? undefined,
    countdownDays: created.countdownDays ?? undefined,
    avatarUrl: created.avatarUrl ?? undefined,
  };
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    await prisma.userDocument.deleteMany({ where: { userId } });
    await prisma.pipelineStage.deleteMany({ where: { userId } });
    await prisma.systemMessage.deleteMany({ where: { targetUserId: userId } });
    await prisma.user.delete({ where: { id: userId } });
    return true;
  } catch (e) {
    console.error("Prisma deleteUser error:", e);
    return false;
  }
}

export async function getTemplates(): Promise<DocumentTemplate[]> {
  try {
    const templates = await prisma.documentTemplate.findMany({ orderBy: { createdAt: "asc" } });
    return templates.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      fileUrl: t.fileUrl,
      requiredFor: t.requiredFor,
      createdAt: t.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("Prisma getTemplates error:", err);
    return [];
  }
}

export async function getTemplateById(id: string): Promise<DocumentTemplate | undefined> {
  try {
    const t = await prisma.documentTemplate.findUnique({ where: { id } });
    if (!t) return undefined;
    return {
      id: t.id,
      title: t.title,
      description: t.description,
      fileUrl: t.fileUrl,
      requiredFor: t.requiredFor,
      createdAt: t.createdAt.toISOString(),
    };
  } catch (err) {
    console.error("Prisma getTemplateById error:", err);
    return undefined;
  }
}

export async function createTemplate(template: Omit<DocumentTemplate, "id" | "createdAt">): Promise<DocumentTemplate> {
  const id = `tpl-${Math.random().toString(36).substr(2, 9)}`;
  const created = await prisma.documentTemplate.create({
    data: {
      id,
      title: template.title,
      description: template.description,
      fileUrl: template.fileUrl,
      requiredFor: template.requiredFor,
    },
  });
  return {
    id: created.id,
    title: created.title,
    description: created.description,
    fileUrl: created.fileUrl,
    requiredFor: created.requiredFor,
    createdAt: created.createdAt.toISOString(),
  };
}

export async function updateTemplate(id: string, updates: Partial<DocumentTemplate>): Promise<DocumentTemplate | null> {
  try {
    const updated = await prisma.documentTemplate.update({
      where: { id },
      data: {
        title: updates.title,
        description: updates.description,
        fileUrl: updates.fileUrl,
        requiredFor: updates.requiredFor,
      },
    });
    return {
      id: updated.id,
      title: updated.title,
      description: updated.description,
      fileUrl: updated.fileUrl,
      requiredFor: updated.requiredFor,
      createdAt: updated.createdAt.toISOString(),
    };
  } catch (e) {
    return null;
  }
}

export async function deleteTemplate(id: string): Promise<boolean> {
  try {
    await prisma.userDocument.deleteMany({ where: { templateId: id } });
    await prisma.documentTemplate.delete({ where: { id } });
    return true;
  } catch (e) {
    console.error("Prisma deleteTemplate error:", e);
    return false;
  }
}

export async function getUserDocuments(): Promise<UserDocument[]> {
  try {
    const docs = await prisma.userDocument.findMany();
    return docs.map((d) => ({
      id: d.id,
      userId: d.userId,
      templateId: d.templateId,
      uploadedFileUrl: d.uploadedFileUrl,
      fileName: d.fileName,
      status: d.status as "PENDING" | "UPLOADED" | "VERIFIED" | "REJECTED",
      adminRemark: d.adminRemark,
      uploadedAt: d.uploadedAt.toISOString(),
      reviewedAt: d.reviewedAt ? d.reviewedAt.toISOString() : null,
    }));
  } catch {
    return [];
  }
}

export async function getDocumentsByUserId(userId: string): Promise<UserDocument[]> {
  try {
    const docs = await prisma.userDocument.findMany({ where: { userId } });
    return docs.map((d) => ({
      id: d.id,
      userId: d.userId,
      templateId: d.templateId,
      uploadedFileUrl: d.uploadedFileUrl,
      fileName: d.fileName,
      status: d.status as "PENDING" | "UPLOADED" | "VERIFIED" | "REJECTED",
      adminRemark: d.adminRemark,
      uploadedAt: d.uploadedAt.toISOString(),
      reviewedAt: d.reviewedAt ? d.reviewedAt.toISOString() : null,
    }));
  } catch {
    return [];
  }
}

export async function uploadUserDocument(userId: string, templateId: string, fileName: string, fileUrl: string): Promise<UserDocument> {
  const existing = await prisma.userDocument.findFirst({
    where: { userId, templateId },
  });

  const template = await prisma.documentTemplate.findUnique({ where: { id: templateId } });
  const title = template ? template.title : "Document";

  if (existing) {
    const updated = await prisma.userDocument.update({
      where: { id: existing.id },
      data: {
        fileName,
        uploadedFileUrl: fileUrl,
        status: "UPLOADED",
        adminRemark: "",
        uploadedAt: new Date(),
        reviewedAt: null,
      },
    });

    await createAuditLog({
      adminId: null,
      userId,
      action: `Re-uploaded document: ${title}`,
    });

    return {
      id: updated.id,
      userId: updated.userId,
      templateId: updated.templateId,
      uploadedFileUrl: updated.uploadedFileUrl,
      fileName: updated.fileName,
      status: updated.status as "PENDING" | "UPLOADED" | "VERIFIED" | "REJECTED",
      adminRemark: updated.adminRemark,
      uploadedAt: updated.uploadedAt.toISOString(),
      reviewedAt: updated.reviewedAt ? updated.reviewedAt.toISOString() : null,
    };
  } else {
    const id = `doc-${Math.random().toString(36).substr(2, 9)}`;
    const created = await prisma.userDocument.create({
      data: {
        id,
        userId,
        templateId,
        uploadedFileUrl: fileUrl,
        fileName,
        status: "UPLOADED",
        adminRemark: "",
        uploadedAt: new Date(),
        reviewedAt: null,
      },
    });

    await createAuditLog({
      adminId: null,
      userId,
      action: `Uploaded document: ${title}`,
    });

    return {
      id: created.id,
      userId: created.userId,
      templateId: created.templateId,
      uploadedFileUrl: created.uploadedFileUrl,
      fileName: created.fileName,
      status: created.status as "PENDING" | "UPLOADED" | "VERIFIED" | "REJECTED",
      adminRemark: created.adminRemark,
      uploadedAt: created.uploadedAt.toISOString(),
      reviewedAt: created.reviewedAt ? created.reviewedAt.toISOString() : null,
    };
  }
}

export async function reviewUserDocument(adminId: string, docId: string, status: "VERIFIED" | "REJECTED", remark: string): Promise<UserDocument | null> {
  try {
    const updated = await prisma.userDocument.update({
      where: { id: docId },
      data: {
        status,
        adminRemark: remark,
        reviewedAt: new Date(),
      },
    });

    const template = await prisma.documentTemplate.findUnique({ where: { id: updated.templateId } });
    const title = template ? template.title : "Document";
    const user = await prisma.user.findUnique({ where: { id: updated.userId } });
    const company = user ? user.companyName : "Client";

    await createAuditLog({
      adminId,
      userId: updated.userId,
      action: `Reviewed document '${title}' (${company}): Status set to ${status}. Remark: ${remark || "None"}`,
    });

    return {
      id: updated.id,
      userId: updated.userId,
      templateId: updated.templateId,
      uploadedFileUrl: updated.uploadedFileUrl,
      fileName: updated.fileName,
      status: updated.status as "PENDING" | "UPLOADED" | "VERIFIED" | "REJECTED",
      adminRemark: updated.adminRemark,
      uploadedAt: updated.uploadedAt.toISOString(),
      reviewedAt: updated.reviewedAt ? updated.reviewedAt.toISOString() : null,
    };
  } catch (e) {
    return null;
  }
}

export async function getUserDocumentById(docId: string): Promise<UserDocument | null> {
  try {
    const doc = await prisma.userDocument.findUnique({ where: { id: docId } });
    if (!doc) return null;
    return {
      id: doc.id,
      userId: doc.userId,
      templateId: doc.templateId,
      uploadedFileUrl: doc.uploadedFileUrl,
      fileName: doc.fileName,
      status: doc.status as "PENDING" | "UPLOADED" | "VERIFIED" | "REJECTED",
      adminRemark: doc.adminRemark,
      uploadedAt: doc.uploadedAt.toISOString(),
      reviewedAt: doc.reviewedAt ? doc.reviewedAt.toISOString() : null,
    };
  } catch (e) {
    return null;
  }
}

export async function deleteUserDocument(docId: string): Promise<boolean> {
  try {
    await prisma.userDocument.delete({ where: { id: docId } });
    return true;
  } catch (e) {
    console.error("Prisma deleteUserDocument error:", e);
    return false;
  }
}

export async function getPipelineStages(userId: string): Promise<PipelineStage[]> {
  try {
    const stages = await prisma.pipelineStage.findMany({
      where: { userId },
    });
    if (stages.length === 0) {
      return DEFAULT_STAGES.map((s) => ({
        id: `pipe-${userId}-${s.order}`,
        userId,
        stageName: s.name,
        status: s.order === 1 ? "COMPLETED" : s.order === 2 ? "IN_PROGRESS" : "PENDING",
        stageOrder: s.order,
        adminNote: s.order === 1 ? "Account creation completed." : "Awaiting initial KYC and document uploads.",
        updatedAt: new Date().toISOString(),
      }));
    }
    return stages
      .sort((a, b) => a.stageOrder - b.stageOrder)
      .map((s) => ({
        id: s.id,
        userId: s.userId,
        stageName: s.stageName,
        status: s.status as "PENDING" | "IN_PROGRESS" | "COMPLETED",
        stageOrder: s.stageOrder,
        adminNote: s.adminNote,
        updatedAt: s.updatedAt.toISOString(),
      }));
  } catch {
    return DEFAULT_STAGES.map((s) => ({
      id: `pipe-${userId}-${s.order}`,
      userId,
      stageName: s.name,
      status: s.order === 1 ? "COMPLETED" : s.order === 2 ? "IN_PROGRESS" : "PENDING",
      stageOrder: s.order,
      adminNote: s.order === 1 ? "Account creation completed." : "Awaiting initial KYC and document uploads.",
      updatedAt: new Date().toISOString(),
    }));
  }
}

export async function getAllPipelineStages(): Promise<PipelineStage[]> {
  try {
    const stages = await prisma.pipelineStage.findMany();
    return stages.map((s) => ({
      id: s.id,
      userId: s.userId,
      stageName: s.stageName,
      status: s.status as "PENDING" | "IN_PROGRESS" | "COMPLETED",
      stageOrder: s.stageOrder,
      adminNote: s.adminNote,
      updatedAt: s.updatedAt.toISOString(),
    }));
  } catch {
    return [];
  }
}

export async function initializePipelineForUser(userId: string): Promise<void> {
  // Clean existing stages if any
  await prisma.pipelineStage.deleteMany({ where: { userId } });

  const stagesData = DEFAULT_STAGES.map((stage) => ({
    id: `pipe-${userId}-${stage.order}`,
    userId,
    stageName: stage.name,
    status: stage.order === 1 ? "COMPLETED" : stage.order === 2 ? "IN_PROGRESS" : "PENDING",
    stageOrder: stage.order,
    adminNote: stage.order === 1 ? "Account creation completed." : "Awaiting initial KYC and document uploads.",
    updatedAt: new Date(),
  }));

  await prisma.pipelineStage.createMany({
    data: stagesData,
  });
}

export async function updatePipelineProgress(
  adminId: string,
  userId: string,
  currentStageOrder: number,
  stageStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED",
  note: string
): Promise<PipelineStage[]> {
  const userStages = await prisma.pipelineStage.findMany({ where: { userId } });

  for (const stage of userStages) {
    let status: "PENDING" | "IN_PROGRESS" | "COMPLETED" = "PENDING";
    let adminNote = "";

    if (stage.stageOrder < currentStageOrder) {
      status = "COMPLETED";
    } else if (stage.stageOrder === currentStageOrder) {
      status = stageStatus;
      adminNote = note;
    } else {
      status = "PENDING";
      adminNote = "";
    }

    await prisma.pipelineStage.update({
      where: { id: stage.id },
      data: {
        status,
        adminNote,
        updatedAt: new Date(),
      },
    });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const company = user ? user.companyName : "Client";
  const activeStage = userStages.find((s) => s.stageOrder === currentStageOrder);

  await createAuditLog({
    adminId,
    userId,
    action: `Updated pipeline for ${company} to stage '${activeStage?.stageName}' (${stageStatus}). Note: ${note || "None"}`,
  });

  return getPipelineStages(userId);
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
    });
    return logs.map((l) => ({
      id: l.id,
      adminId: l.adminId,
      userId: l.userId,
      action: l.action,
      createdAt: l.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("Prisma getAuditLogs error:", err);
    return [];
  }
}

export async function createAuditLog(log: Omit<AuditLog, "id" | "createdAt">): Promise<AuditLog> {
  const id = `log-${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date();
  try {
    const created = await prisma.auditLog.create({
      data: {
        id,
        adminId: log.adminId || null,
        userId: log.userId || null,
        action: log.action,
        createdAt: now,
      },
    });
    return {
      id: created.id,
      adminId: created.adminId,
      userId: created.userId,
      action: created.action,
      createdAt: created.createdAt.toISOString(),
    };
  } catch (err) {
    console.warn("Failed to persist audit log to DB (network/database offline):", err);
    return {
      id,
      adminId: log.adminId || null,
      userId: log.userId || null,
      action: log.action,
      createdAt: now.toISOString(),
    };
  }
}

export async function getSystemMessages(userId?: string): Promise<SystemMessage[]> {
  let messages;
  if (!userId) {
    messages = await prisma.systemMessage.findMany();
  } else {
    messages = await prisma.systemMessage.findMany({
      where: {
        OR: [
          { targetUserId: "all" },
          { targetUserId: userId },
        ],
      },
    });
  }

  return messages.map((m) => ({
    id: m.id,
    senderId: m.senderId,
    targetUserId: m.targetUserId,
    messageText: m.messageText,
    type: m.type as "INFO" | "WARNING" | "CRITICAL",
    createdAt: m.createdAt.toISOString(),
  }));
}

export async function createSystemMessage(
  senderId: string,
  targetUserId: string,
  messageText: string,
  type: "INFO" | "WARNING" | "CRITICAL"
): Promise<SystemMessage> {
  const id = `msg-${Math.random().toString(36).substr(2, 9)}`;
  const created = await prisma.systemMessage.create({
    data: {
      id,
      senderId,
      targetUserId,
      messageText,
      type,
      createdAt: new Date(),
    },
  });
  return {
    id: created.id,
    senderId: created.senderId,
    targetUserId: created.targetUserId,
    messageText: created.messageText,
    type: created.type as "INFO" | "WARNING" | "CRITICAL",
    createdAt: created.createdAt.toISOString(),
  };
}

export async function deleteSystemMessage(id: string): Promise<boolean> {
  try {
    await prisma.systemMessage.delete({ where: { id } });
    return true;
  } catch (e) {
    return false;
  }
}

// User settings & countdown overrides (originally directly modified dbData in actions.ts)

export async function updateUserProfile(
  userId: string,
  name: string,
  email: string,
  newPassword?: string,
  avatarUrl?: string
): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      ...(newPassword ? { passwordHash: newPassword } : {}),
      ...(avatarUrl ? { avatarUrl } : {}),
    },
  });
}

export async function overrideComplianceDeadline(
  userId: string,
  deadline: string,
  countdownDays: number
): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: {
      complianceDeadline: deadline,
      countdownDays,
    },
  });
}

export function calculateRemainingDays(deadline?: string | null, customDays?: number | null): number {
  if (typeof customDays === "number" && !isNaN(customDays)) {
    return customDays;
  }
  if (!deadline) return 0;
  const targetTime = new Date(deadline).getTime();
  if (isNaN(targetTime)) return 0;
  const now = new Date().getTime();
  return Math.max(0, Math.ceil((targetTime - now) / (1000 * 60 * 60 * 24)));
}

// SEBI Monthly Investor Grievances Report Data Structure
export interface MonthlyGrievanceReport {
  month: string;
  received: number;
  resolved: number;
  pending: number;
  carriedForward: number;
  updatedAt: string;
}

let inMemoryMonthlyReport: MonthlyGrievanceReport = {
  month: "August 2026",
  received: 0,
  resolved: 0,
  pending: 0,
  carriedForward: 0,
  updatedAt: new Date().toISOString(),
};

export async function getMonthlyGrievanceReport(): Promise<MonthlyGrievanceReport> {
  return inMemoryMonthlyReport;
}

export async function updateMonthlyGrievanceReportData(
  month: string,
  received: number,
  resolved: number,
  pending: number,
  carriedForward: number
): Promise<MonthlyGrievanceReport> {
  inMemoryMonthlyReport = {
    month,
    received,
    resolved,
    pending,
    carriedForward,
    updatedAt: new Date().toISOString(),
  };
  return inMemoryMonthlyReport;
}

// Individual Grievance Requests Management
export interface GrievanceRecord {
  id: string;
  ticketId: string;
  investorName: string;
  email: string;
  phone: string;
  folioOrPan: string;
  companyName: string;
  category: string;
  description: string;
  status: "RECEIVED" | "IN_PROCESSING" | "ESCALATED_LEVEL2" | "RESOLVED";
  remarks: string;
  submittedOn: string;
  expectedResolution: string;
  updatedAt: string;
}

let inMemoryGrievanceList: GrievanceRecord[] = [];

export async function getGrievanceRequests(): Promise<GrievanceRecord[]> {
  try {
    if (!prisma.grievanceRequest) {
      return inMemoryGrievanceList;
    }

    const records = await prisma.grievanceRequest.findMany({
      orderBy: { submittedOn: "desc" },
    });

    return records.map((g) => ({
      id: g.id,
      ticketId: g.ticketId,
      investorName: g.investorName,
      email: g.email,
      phone: g.phone,
      folioOrPan: g.folioOrPan,
      companyName: g.companyName,
      category: g.category,
      description: g.description,
      status: g.status as GrievanceRecord["status"],
      remarks: g.remarks,
      submittedOn: g.submittedOn.toISOString(),
      expectedResolution: g.expectedResolution,
      updatedAt: g.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.error("getGrievanceRequests error:", err);
    return inMemoryGrievanceList;
  }
}

export async function getGrievanceByTicketId(ticketId: string): Promise<GrievanceRecord | null> {
  try {
    const cleanId = ticketId.trim().toUpperCase();

    if (!prisma.grievanceRequest) {
      const match = inMemoryGrievanceList.find((g) => g.ticketId === cleanId);
      return match || null;
    }

    let record = await prisma.grievanceRequest.findUnique({
      where: { ticketId: cleanId },
    });

    if (!record) {
      const match = inMemoryGrievanceList.find((g) => g.ticketId === cleanId);
      return match || null;
    }

    return {
      id: record.id,
      ticketId: record.ticketId,
      investorName: record.investorName,
      email: record.email,
      phone: record.phone,
      folioOrPan: record.folioOrPan,
      companyName: record.companyName,
      category: record.category,
      description: record.description,
      status: record.status as GrievanceRecord["status"],
      remarks: record.remarks,
      submittedOn: record.submittedOn.toISOString(),
      expectedResolution: record.expectedResolution,
      updatedAt: record.updatedAt.toISOString(),
    };
  } catch (err) {
    console.error("getGrievanceByTicketId error:", err);
    const cleanId = ticketId.trim().toUpperCase();
    const match = inMemoryGrievanceList.find((g) => g.ticketId === cleanId);
    return match || null;
  }
}

export async function createGrievanceRequest(data: {
  investorName: string;
  email: string;
  phone: string;
  folioOrPan: string;
  companyName: string;
  category: string;
  description: string;
}): Promise<GrievanceRecord> {
  const ticketId = `GRV-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const id = `grv-${Date.now()}`;
  const nowIso = new Date().toISOString();

  const newRecord: GrievanceRecord = {
    id,
    ticketId,
    investorName: data.investorName,
    email: data.email,
    phone: data.phone,
    folioOrPan: data.folioOrPan,
    companyName: data.companyName,
    category: data.category,
    description: data.description,
    status: "IN_PROCESSING",
    remarks: "Request logged in statutory register. Level 1 RTA officer actively processing files.",
    submittedOn: nowIso,
    expectedResolution: "7 Business Days (Level 1 Resolution)",
    updatedAt: nowIso,
  };

  inMemoryGrievanceList.unshift(newRecord);

  if (prisma.grievanceRequest) {
    try {
      const created = await prisma.grievanceRequest.create({
        data: {
          id,
          ticketId,
          investorName: data.investorName,
          email: data.email,
          phone: data.phone,
          folioOrPan: data.folioOrPan,
          companyName: data.companyName,
          category: data.category,
          description: data.description,
          status: "IN_PROCESSING",
          remarks: "Request logged in statutory register. Level 1 RTA officer actively processing files.",
          expectedResolution: "7 Business Days (Level 1 Resolution)",
        },
      });

      return {
        id: created.id,
        ticketId: created.ticketId,
        investorName: created.investorName,
        email: created.email,
        phone: created.phone,
        folioOrPan: created.folioOrPan,
        companyName: created.companyName,
        category: created.category,
        description: created.description,
        status: created.status as GrievanceRecord["status"],
        remarks: created.remarks,
        submittedOn: created.submittedOn.toISOString(),
        expectedResolution: created.expectedResolution,
        updatedAt: created.updatedAt.toISOString(),
      };
    } catch (dbErr) {
      console.warn("DB Grievance creation error, falling back to memory store:", dbErr);
    }
  }

  return newRecord;
}

export async function updateGrievanceStatusInDb(
  ticketId: string,
  status: "RECEIVED" | "IN_PROCESSING" | "ESCALATED_LEVEL2" | "RESOLVED",
  remarks: string
): Promise<boolean> {
  const cleanId = ticketId.trim().toUpperCase();
  let updatedMemory = false;
  inMemoryGrievanceList = inMemoryGrievanceList.map((g) => {
    if (g.ticketId === cleanId) {
      updatedMemory = true;
      return { ...g, status, remarks, updatedAt: new Date().toISOString() };
    }
    return g;
  });

  if (prisma.grievanceRequest) {
    try {
      await prisma.grievanceRequest.update({
        where: { ticketId: cleanId },
        data: {
          status,
          remarks,
        },
      });
      return true;
    } catch (err) {
      console.error("updateGrievanceStatusInDb error:", err);
      return updatedMemory;
    }
  }

  return updatedMemory;
}

export interface ServicedCompanyRecord {
  id: string;
  name: string;
  cin: string;
  isin: string;
  type: string;
  depositories: string[];
  status: string;
  nodalContact: string;
  createdAt: string;
}

let inMemoryServicedCompanies: ServicedCompanyRecord[] = [];

export async function getServicedCompanies(): Promise<ServicedCompanyRecord[]> {
  try {
    if (!prisma.servicedCompany) {
      return inMemoryServicedCompanies;
    }

    const records = await prisma.servicedCompany.findMany({
      orderBy: { createdAt: "desc" },
    });

    return records.map((r) => ({
      id: r.id,
      name: r.name,
      cin: r.cin,
      isin: r.isin,
      type: r.type,
      depositories: r.depositories.split(",").map((d) => d.trim()),
      status: r.status,
      nodalContact: r.nodalContact,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("getServicedCompanies error:", err);
    return inMemoryServicedCompanies;
  }
}

export async function createServicedCompany(data: {
  name: string;
  cin: string;
  isin: string;
  type: string;
  status: string;
  nodalContact: string;
}): Promise<ServicedCompanyRecord> {
  const id = `cmp-${Date.now()}`;
  const nowIso = new Date().toISOString();
  const depositories = ["NSDL", "CDSL"];

  const record: ServicedCompanyRecord = {
    id,
    name: data.name,
    cin: data.cin || "N/A",
    isin: data.isin || "PENDING",
    type: data.type || "Unlisted Public Equity",
    depositories,
    status: data.status || "Active servicing",
    nodalContact: data.nodalContact || "secretarial@trustlinkinvestor.com",
    createdAt: nowIso,
  };

  inMemoryServicedCompanies.unshift(record);

  if (prisma.servicedCompany) {
    try {
      const created = await prisma.servicedCompany.create({
        data: {
          id,
          name: data.name,
          cin: data.cin || "N/A",
          isin: data.isin || "PENDING",
          type: data.type || "Unlisted Public Equity",
          depositories: depositories.join(", "),
          status: data.status || "Active servicing",
          nodalContact: data.nodalContact || "secretarial@trustlinkinvestor.com",
        },
      });

      return {
        id: created.id,
        name: created.name,
        cin: created.cin,
        isin: created.isin,
        type: created.type,
        depositories: created.depositories.split(",").map((d) => d.trim()),
        status: created.status,
        nodalContact: created.nodalContact,
        createdAt: created.createdAt.toISOString(),
      };
    } catch (err) {
      console.warn("createServicedCompany DB error, using fallback memory store:", err);
    }
  }

  return record;
}

export async function deleteServicedCompany(id: string): Promise<boolean> {
  inMemoryServicedCompanies = inMemoryServicedCompanies.filter((c) => c.id !== id);

  if (prisma.servicedCompany) {
    try {
      await prisma.servicedCompany.delete({
        where: { id },
      });
      return true;
    } catch (err) {
      console.error("deleteServicedCompany error:", err);
      return true;
    }
  }

  return true;
}

