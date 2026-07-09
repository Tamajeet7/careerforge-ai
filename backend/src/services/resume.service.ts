import prisma from "../config/prisma";

interface ResumeInput {
  userId: string;

  // Parsed Data
  name: string;
  email: string;
  phone: string;
  skills: string[];

  // File Metadata
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  pages?: number;
}

export async function saveResume(
  data: ResumeInput
) {
  return prisma.resume.upsert({
    where: {
      userId: data.userId,
    },

    update: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      skills: data.skills,

      fileName: data.fileName,
      filePath: data.filePath,
      fileSize: data.fileSize,
      mimeType: data.mimeType,
      pages: data.pages,
    },

    create: {
      userId: data.userId,

      name: data.name,
      email: data.email,
      phone: data.phone,
      skills: data.skills,

      fileName: data.fileName,
      filePath: data.filePath,
      fileSize: data.fileSize,
      mimeType: data.mimeType,
      pages: data.pages,
    },
  });
}

export async function getResume(
  userId: string
) {
  return prisma.resume.findUnique({
    where: {
      userId,
    },
  });
}