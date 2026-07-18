import prisma from "../../config/prisma";

export async function findUserByEmail(
  email: string
) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserById(
  id: string
) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}