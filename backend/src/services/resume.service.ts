import prisma from "../config/prisma";

interface ResumeInput {
  rawText: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  userId: string;
}

export async function saveResume(data: ResumeInput) {
  return prisma.resume.upsert({
    where: {
      userId: data.userId,
    },

    update: {
      rawText: data.rawText,
      name: data.name,
      email: data.email,
      phone: data.phone,
      skills: data.skills,
    },

    create: {
      rawText: data.rawText,
      name: data.name,
      email: data.email,
      phone: data.phone,
      skills: data.skills,
      userId: data.userId,
    },
  });
}

export async function getResume(userId: string) {
  return prisma.resume.findUnique({
    where: {
      userId,
    },
  });
}