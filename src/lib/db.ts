import fs from "fs";
import path from "path";

// Define TypeScript interfaces for our database models

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Plain password in mock for simplicity of testing
  role: "USER" | "ADMIN";
  companyName: string;
  corporateId: string;
  createdAt: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  fileUrl: string; // Path or simulated URL for download
  requiredFor: string; // e.g. "All", "KYC", "Legal"
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

interface DatabaseSchema {
  users: User[];
  templates: DocumentTemplate[];
  documents: UserDocument[];
  pipelineStages: PipelineStage[];
  auditLogs: AuditLog[];
}

const DB_PATH = path.join(process.cwd(), "src/lib/db.json");

// Ensure the directory exists
function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

// Initial mockup data
const DEFAULT_TEMPLATES: DocumentTemplate[] = [
  {
    id: "tpl-1",
    title: "Certificate of Incorporation Template",
    description: "Standard incorporation form for proof of company registration and legal formation.",
    fileUrl: "/templates/certificate_of_incorporation.docx",
    requiredFor: "Account Setup",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tpl-2",
    title: "KYC Director Identification Form",
    description: "Official form to identify directors, verify address, and submit passport/ID details.",
    fileUrl: "/templates/kyc_director_verification.pdf",
    requiredFor: "Identity Verification",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tpl-3",
    title: "Tax Status Declaration Form (W8/W9)",
    description: "Self-certification form declaring tax residency and taxpayer identification status.",
    fileUrl: "/templates/tax_status_declaration.pdf",
    requiredFor: "Compliance",
    createdAt: new Date().toISOString(),
  },
  {
    id: "tpl-4",
    title: "Standard Master Service Agreement",
    description: "Agreement outlining standard engagement terms, confidentiality, and service levels.",
    fileUrl: "/templates/master_service_agreement.docx",
    requiredFor: "Legal Processing",
    createdAt: new Date().toISOString(),
  },
];

const DEFAULT_STAGES = [
  { order: 1, name: "Account Created" },
  { order: 2, name: "KYC Submitted" },
  { order: 3, name: "Documents Uploaded" },
  { order: 4, name: "Admin Review" },
  { order: 5, name: "Compliance Verification" },
  { order: 6, name: "Legal Processing" },
  { order: 7, name: "Final Approval" },
  { order: 8, name: "Completed" },
];

function seedDatabase(): DatabaseSchema {
  const users: User[] = [
    {
      id: "usr-admin",
      name: "Alex Mercer",
      email: "admin@trustlink.com",
      passwordHash: "admin123", // Simple plain password for mock testing
      role: "ADMIN",
      companyName: "TrustLink Compliance Ltd",
      corporateId: "ENT-ADMIN-000",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "usr-client1",
      name: "Jane Doe",
      email: "jane@acme.com",
      passwordHash: "jane123",
      role: "USER",
      companyName: "Acme Corporation",
      corporateId: "ENT-8921-102",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "usr-client2",
      name: "Bruce Wayne",
      email: "bruce@stark.com",
      passwordHash: "bruce123",
      role: "USER",
      companyName: "Stark Industries",
      corporateId: "ENT-7492-384",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "usr-client3",
      name: "Lex Luthor",
      email: "lex@lexcorp.com",
      passwordHash: "lex123",
      role: "USER",
      companyName: "LexCorp",
      corporateId: "ENT-1049-583",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];


  // Generate pipelines for each user
  const pipelineStages: PipelineStage[] = [];
  
  // Client 1 (Acme Corp) - is in "Documents Uploaded" phase
  DEFAULT_STAGES.forEach((stage) => {
    let status: "PENDING" | "IN_PROGRESS" | "COMPLETED" = "PENDING";
    let adminNote = "";
    
    if (stage.order < 3) {
      status = "COMPLETED";
    } else if (stage.order === 3) {
      status = "IN_PROGRESS";
      adminNote = "Pending client upload of the Master Service Agreement.";
    }
    
    pipelineStages.push({
      id: `pipe-client1-${stage.order}`,
      userId: "usr-client1",
      stageName: stage.name,
      status,
      stageOrder: stage.order,
      adminNote,
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  // Client 2 (Stark Industries) - is in "Admin Review" phase (almost completed)
  DEFAULT_STAGES.forEach((stage) => {
    let status: "PENDING" | "IN_PROGRESS" | "COMPLETED" = "PENDING";
    let adminNote = "";
    
    if (stage.order < 4) {
      status = "COMPLETED";
    } else if (stage.order === 4) {
      status = "IN_PROGRESS";
      adminNote = "Reviewing Certificate of Incorporation and KYC documents.";
    }
    
    pipelineStages.push({
      id: `pipe-client2-${stage.order}`,
      userId: "usr-client2",
      stageName: stage.name,
      status,
      stageOrder: stage.order,
      adminNote,
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  // Client 3 (LexCorp) - newly registered, in "KYC Submitted" phase
  DEFAULT_STAGES.forEach((stage) => {
    let status: "PENDING" | "IN_PROGRESS" | "COMPLETED" = "PENDING";
    let adminNote = "";
    
    if (stage.order < 2) {
      status = "COMPLETED";
    } else if (stage.order === 2) {
      status = "IN_PROGRESS";
      adminNote = "KYC Form submitted by client. Under administrative queue.";
    }
    
    pipelineStages.push({
      id: `pipe-client3-${stage.order}`,
      userId: "usr-client3",
      stageName: stage.name,
      status,
      stageOrder: stage.order,
      adminNote,
      updatedAt: new Date().toISOString(),
    });
  });

  // Pre-seed some documents
  const documents: UserDocument[] = [
    // Client 1 (Acme Corp)
    {
      id: "doc-1",
      userId: "usr-client1",
      templateId: "tpl-1",
      uploadedFileUrl: "/uploads/acme_incorporation.pdf",
      fileName: "acme_incorporation_final.pdf",
      status: "VERIFIED",
      adminRemark: "Certificate verified. Corporate registry match confirmed.",
      uploadedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "doc-2",
      userId: "usr-client1",
      templateId: "tpl-2",
      uploadedFileUrl: "/uploads/acme_kyc_jane.pdf",
      fileName: "acme_kyc_jane.pdf",
      status: "REJECTED",
      adminRemark: "Passport photo is blurry. Please upload a clear high-resolution copy of the biographical page.",
      uploadedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    
    // Client 2 (Stark Industries)
    {
      id: "doc-3",
      userId: "usr-client2",
      templateId: "tpl-1",
      uploadedFileUrl: "/uploads/stark_incorporation.pdf",
      fileName: "stark_incorporation_official.pdf",
      status: "VERIFIED",
      adminRemark: "All registration details validated successfully.",
      uploadedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "doc-4",
      userId: "usr-client2",
      templateId: "tpl-2",
      uploadedFileUrl: "/uploads/stark_kyc_bruce.pdf",
      fileName: "stark_kyc_bruce.pdf",
      status: "PENDING",
      adminRemark: "",
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedAt: null,
    },
  ];

  // Pre-seed some logs
  const auditLogs: AuditLog[] = [
    {
      id: "log-1",
      adminId: null,
      userId: "usr-client1",
      action: "Registered user account for Acme Corporation",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "log-2",
      adminId: "usr-admin",
      userId: "usr-client1",
      action: "Approved document 'Certificate of Incorporation'",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "log-3",
      adminId: "usr-admin",
      userId: "usr-client1",
      action: "Rejected document 'KYC Director Identification Form' (Blurry photo)",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return {
    users,
    templates: DEFAULT_TEMPLATES,
    documents,
    pipelineStages,
    auditLogs,
  };
}

export function readDb(): DatabaseSchema {
  try {
    ensureDirectoryExistence(DB_PATH);
    if (!fs.existsSync(DB_PATH)) {
      const initialData = seedDatabase();
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    const parsed = JSON.parse(data) as DatabaseSchema;

    // Backfill missing corporateId
    let updated = false;
    parsed.users.forEach((u) => {
      if (!u.corporateId) {
        if (u.role === "ADMIN") {
          u.corporateId = "ENT-ADMIN-000";
        } else {
          u.corporateId = `ENT-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`;
        }
        updated = true;
      }
    });

    if (updated) {
      fs.writeFileSync(DB_PATH, JSON.stringify(parsed, null, 2), "utf-8");
    }

    return parsed;
  } catch (error) {
    console.error("Database read error, returning default seeded database", error);
    return seedDatabase();
  }
}

export function writeDb(data: DatabaseSchema) {
  try {
    ensureDirectoryExistence(DB_PATH);
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Database write error", error);
  }
}

// DB helper functions

export function getUsers(): User[] {
  return readDb().users;
}

export function getUserById(id: string): User | undefined {
  return readDb().users.find((u) => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return readDb().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(user: Omit<User, "id" | "createdAt" | "corporateId">): User {
  const dbData = readDb();
  const corporateId = user.role === "ADMIN"
    ? "ENT-ADMIN-000"
    : `ENT-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`;

  const newUser: User = {
    ...user,
    id: `usr-${Math.random().toString(36).substr(2, 9)}`,
    corporateId,
    createdAt: new Date().toISOString(),
  };
  dbData.users.push(newUser);
  writeDb(dbData);
  
  // Initialize pipeline for this user
  initializePipelineForUser(newUser.id);
  
  createAuditLog({
    adminId: null,
    userId: newUser.id,
    action: `Registered account: ${newUser.companyName} (${newUser.role}) with ID ${corporateId}`,
  });
  
  return newUser;
}


export function getTemplates(): DocumentTemplate[] {
  return readDb().templates;
}

export function getTemplateById(id: string): DocumentTemplate | undefined {
  return readDb().templates.find((t) => t.id === id);
}

export function createTemplate(template: Omit<DocumentTemplate, "id" | "createdAt">): DocumentTemplate {
  const dbData = readDb();
  const newTemplate: DocumentTemplate = {
    ...template,
    id: `tpl-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  dbData.templates.push(newTemplate);
  writeDb(dbData);
  return newTemplate;
}

export function updateTemplate(id: string, updates: Partial<DocumentTemplate>): DocumentTemplate | null {
  const dbData = readDb();
  const idx = dbData.templates.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  
  dbData.templates[idx] = {
    ...dbData.templates[idx],
    ...updates,
  };
  writeDb(dbData);
  return dbData.templates[idx];
}

export function deleteTemplate(id: string): boolean {
  const dbData = readDb();
  const lenBefore = dbData.templates.length;
  dbData.templates = dbData.templates.filter((t) => t.id !== id);
  if (dbData.templates.length === lenBefore) return false;
  writeDb(dbData);
  return true;
}

export function getUserDocuments(): UserDocument[] {
  return readDb().documents;
}

export function getDocumentsByUserId(userId: string): UserDocument[] {
  return readDb().documents.filter((doc) => doc.userId === userId);
}

export function uploadUserDocument(userId: string, templateId: string, fileName: string, fileUrl: string): UserDocument {
  const dbData = readDb();
  
  // Check if document already exists for this template/user
  const existingIdx = dbData.documents.findIndex((doc) => doc.userId === userId && doc.templateId === templateId);
  
  const template = dbData.templates.find((t) => t.id === templateId);
  const title = template ? template.title : "Document";

  if (existingIdx !== -1) {
    const updatedDoc: UserDocument = {
      ...dbData.documents[existingIdx],
      fileName,
      uploadedFileUrl: fileUrl,
      status: "UPLOADED",
      adminRemark: "",
      uploadedAt: new Date().toISOString(),
      reviewedAt: null,
    };
    dbData.documents[existingIdx] = updatedDoc;
    writeDb(dbData);
    
    createAuditLog({
      adminId: null,
      userId,
      action: `Re-uploaded document: ${title}`,
    });
    
    return updatedDoc;
  } else {
    const newDoc: UserDocument = {
      id: `doc-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      templateId,
      uploadedFileUrl: fileUrl,
      fileName,
      status: "UPLOADED",
      adminRemark: "",
      uploadedAt: new Date().toISOString(),
      reviewedAt: null,
    };
    dbData.documents.push(newDoc);
    writeDb(dbData);
    
    createAuditLog({
      adminId: null,
      userId,
      action: `Uploaded document: ${title}`,
    });
    
    return newDoc;
  }
}

export function reviewUserDocument(adminId: string, docId: string, status: "VERIFIED" | "REJECTED", remark: string): UserDocument | null {
  const dbData = readDb();
  const idx = dbData.documents.findIndex((doc) => doc.id === docId);
  if (idx === -1) return null;
  
  const oldDoc = dbData.documents[idx];
  const template = dbData.templates.find((t) => t.id === oldDoc.templateId);
  const title = template ? template.title : "Document";
  const user = dbData.users.find((u) => u.id === oldDoc.userId);
  const company = user ? user.companyName : "Client";
  
  dbData.documents[idx] = {
    ...oldDoc,
    status,
    adminRemark: remark,
    reviewedAt: new Date().toISOString(),
  };
  
  writeDb(dbData);
  
  createAuditLog({
    adminId,
    userId: oldDoc.userId,
    action: `${status === "VERIFIED" ? "Approved" : "Rejected"} document '${title}' for ${company}. Remark: ${remark || "None"}`,
  });
  
  return dbData.documents[idx];
}

export function getPipelineStages(userId: string): PipelineStage[] {
  const stages = readDb().pipelineStages.filter((s) => s.userId === userId);
  return stages.sort((a, b) => a.stageOrder - b.stageOrder);
}

export function initializePipelineForUser(userId: string) {
  const dbData = readDb();
  
  // Clean existing stages if any
  dbData.pipelineStages = dbData.pipelineStages.filter((s) => s.userId !== userId);
  
  DEFAULT_STAGES.forEach((stage) => {
    dbData.pipelineStages.push({
      id: `pipe-${userId}-${stage.order}`,
      userId,
      stageName: stage.name,
      status: stage.order === 1 ? "COMPLETED" : stage.order === 2 ? "IN_PROGRESS" : "PENDING",
      stageOrder: stage.order,
      adminNote: stage.order === 1 ? "Account creation completed." : "Awaiting initial KYC and document uploads.",
      updatedAt: new Date().toISOString(),
    });
  });
  
  writeDb(dbData);
}

export function updatePipelineProgress(adminId: string, userId: string, currentStageOrder: number, stageStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED", note: string): PipelineStage[] {
  const dbData = readDb();
  const userStages = dbData.pipelineStages.filter((s) => s.userId === userId);
  
  userStages.forEach((stage) => {
    if (stage.stageOrder < currentStageOrder) {
      stage.status = "COMPLETED";
      stage.updatedAt = new Date().toISOString();
    } else if (stage.stageOrder === currentStageOrder) {
      stage.status = stageStatus;
      stage.adminNote = note;
      stage.updatedAt = new Date().toISOString();
    } else {
      stage.status = "PENDING";
      stage.adminNote = "";
      stage.updatedAt = new Date().toISOString();
    }
  });
  
  // Find matches in global list and update them
  dbData.pipelineStages = dbData.pipelineStages.map((s) => {
    if (s.userId === userId) {
      const match = userStages.find((us) => us.stageOrder === s.stageOrder);
      return match || s;
    }
    return s;
  });
  
  writeDb(dbData);
  
  const user = dbData.users.find((u) => u.id === userId);
  const company = user ? user.companyName : "Client";
  const activeStage = userStages.find((s) => s.stageOrder === currentStageOrder);
  
  createAuditLog({
    adminId,
    userId,
    action: `Updated pipeline for ${company} to stage '${activeStage?.stageName}' (${stageStatus}). Note: ${note || "None"}`,
  });
  
  return getPipelineStages(userId);
}

export function getAuditLogs(): AuditLog[] {
  const logs = readDb().auditLogs;
  return [...logs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createAuditLog(log: Omit<AuditLog, "id" | "createdAt">): AuditLog {
  const dbData = readDb();
  const newLog: AuditLog = {
    ...log,
    id: `log-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  dbData.auditLogs.push(newLog);
  writeDb(dbData);
  return newLog;
}
