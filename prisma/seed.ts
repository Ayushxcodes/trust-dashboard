import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL || "";
  if (databaseUrl.startsWith("prisma://") || databaseUrl.startsWith("prisma+postgres://")) {
    return new PrismaClient({
      accelerateUrl: databaseUrl,
    });
  }

  const pool = new Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
  });
}

const prisma = createPrismaClient();

async function main() {
  console.log("DATABASE_URL in seed:", process.env.DATABASE_URL);
  const dbPath = path.join(__dirname, "../src/lib/db.json");
  if (!fs.existsSync(dbPath)) {
    console.log("No db.json found to seed from.");
    return;
  }

  const dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));

  console.log("Seeding Users...");
  for (const user of dbData.users || []) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
        companyName: user.companyName,
        corporateId: user.corporateId,
        createdAt: new Date(user.createdAt),
        complianceDeadline: user.complianceDeadline || null,
        countdownDays: user.countdownDays !== undefined ? user.countdownDays : null,
        avatarUrl: user.avatarUrl || null,
      },
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
        companyName: user.companyName,
        corporateId: user.corporateId,
        createdAt: new Date(user.createdAt),
        complianceDeadline: user.complianceDeadline || null,
        countdownDays: user.countdownDays !== undefined ? user.countdownDays : null,
        avatarUrl: user.avatarUrl || null,
      },
    });
  }

  console.log("Seeding Document Templates...");
  for (const tpl of dbData.templates || []) {
    await prisma.documentTemplate.upsert({
      where: { id: tpl.id },
      update: {
        title: tpl.title,
        description: tpl.description,
        fileUrl: tpl.fileUrl,
        requiredFor: tpl.requiredFor,
        createdAt: new Date(tpl.createdAt),
      },
      create: {
        id: tpl.id,
        title: tpl.title,
        description: tpl.description,
        fileUrl: tpl.fileUrl,
        requiredFor: tpl.requiredFor,
        createdAt: new Date(tpl.createdAt),
      },
    });
  }

  console.log("Seeding User Documents...");
  for (const doc of dbData.documents || []) {
    await prisma.userDocument.upsert({
      where: { id: doc.id },
      update: {
        userId: doc.userId,
        templateId: doc.templateId,
        uploadedFileUrl: doc.uploadedFileUrl,
        fileName: doc.fileName,
        status: doc.status,
        adminRemark: doc.adminRemark || "",
        uploadedAt: new Date(doc.uploadedAt),
        reviewedAt: doc.reviewedAt ? new Date(doc.reviewedAt) : null,
      },
      create: {
        id: doc.id,
        userId: doc.userId,
        templateId: doc.templateId,
        uploadedFileUrl: doc.uploadedFileUrl,
        fileName: doc.fileName,
        status: doc.status,
        adminRemark: doc.adminRemark || "",
        uploadedAt: new Date(doc.uploadedAt),
        reviewedAt: doc.reviewedAt ? new Date(doc.reviewedAt) : null,
      },
    });
  }

  console.log("Seeding Pipeline Stages...");
  for (const stage of dbData.pipelineStages || []) {
    await prisma.pipelineStage.upsert({
      where: { id: stage.id },
      update: {
        userId: stage.userId,
        stageName: stage.stageName,
        status: stage.status,
        stageOrder: stage.stageOrder,
        adminNote: stage.adminNote || "",
        updatedAt: new Date(stage.updatedAt),
      },
      create: {
        id: stage.id,
        userId: stage.userId,
        stageName: stage.stageName,
        status: stage.status,
        stageOrder: stage.stageOrder,
        adminNote: stage.adminNote || "",
        updatedAt: new Date(stage.updatedAt),
      },
    });
  }

  console.log("Seeding Audit Logs...");
  for (const log of dbData.auditLogs || []) {
    await prisma.auditLog.upsert({
      where: { id: log.id },
      update: {
        adminId: log.adminId || null,
        userId: log.userId || null,
        action: log.action,
        createdAt: new Date(log.createdAt),
      },
      create: {
        id: log.id,
        adminId: log.adminId || null,
        userId: log.userId || null,
        action: log.action,
        createdAt: new Date(log.createdAt),
      },
    });
  }

  console.log("Seeding System Messages...");
  for (const msg of dbData.messages || []) {
    await prisma.systemMessage.upsert({
      where: { id: msg.id },
      update: {
        senderId: msg.senderId,
        targetUserId: msg.targetUserId,
        messageText: msg.messageText,
        type: msg.type,
        createdAt: new Date(msg.createdAt),
      },
      create: {
        id: msg.id,
        senderId: msg.senderId,
        targetUserId: msg.targetUserId,
        messageText: msg.messageText,
        type: msg.type,
        createdAt: new Date(msg.createdAt),
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
