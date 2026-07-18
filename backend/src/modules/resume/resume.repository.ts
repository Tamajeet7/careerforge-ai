import prisma from "../../config/prisma";

import type {
  ResumeUpload,
  ResumeAnalytics,
} from "./resume.types";

export async function upsertResume(
  data: ResumeUpload
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

        title: "My Resume",

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

export async function findResumeByUserId(
  userId: string
) {
  return prisma.resume.findUnique({
    where: {
      userId,
    },
  });
}

export async function updateResumeAnalytics(
  userId: string,
  analytics: ResumeAnalytics
) {
  return prisma.resume.update({
    where: {
      userId,
    },
    data: analytics,
  });
}

export async function removeResume(
  userId: string
) {
  return prisma.resume.delete({
    where: {
      userId,
    },
  });
}