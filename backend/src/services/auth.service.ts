import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateAccessToken } from "../utils/jwt";
import { RegisterBody, LoginBody } from "../types/auth.types";

export async function registerUser(data: RegisterBody) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  // Automatically log the user in
  return loginUser({
    email: data.email,
    password: data.password,
  });
}

export async function loginUser(data: LoginBody) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await comparePassword(
    data.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}