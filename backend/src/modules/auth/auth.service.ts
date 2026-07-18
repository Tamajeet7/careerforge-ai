import {
  findUserByEmail,
  findUserById,
  createUser,
} from "./auth.repository";

import {
  hashPassword,
  comparePassword,
} from "../../shared/utils/hash";

import { generateAccessToken } from "../../shared/utils/jwt";

import type {
  RegisterDTO,
  LoginDTO,
  AuthResponse,
} from "./auth.types";

import {
  ConflictError,
  UnauthorizedError,
} from "../../shared/errors";

export async function registerUser(
  data: RegisterDTO
): Promise<AuthResponse> {
  const existingUser =
    await findUserByEmail(
      data.email
    );

  if (existingUser) {
    throw new ConflictError(
      "User already exists"
    );
  }

  const hashedPassword =
    await hashPassword(
      data.password
    );

  await createUser(
    data.name,
    data.email,
    hashedPassword
  );

  return loginUser({
    email: data.email,
    password: data.password,
  });
}

export async function loginUser(
  data: LoginDTO
): Promise<AuthResponse> {
  const user =
    await findUserByEmail(
      data.email
    );

  if (!user) {
    throw new UnauthorizedError(
      "Invalid email or password"
    );
  }

  const valid =
    await comparePassword(
      data.password,
      user.password
    );

  if (!valid) {
    throw new UnauthorizedError(
      "Invalid email or password"
    );
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },

    accessToken:
      generateAccessToken(
        user.id
      ),
  };
}

export async function getCurrentUser(
  userId: string
) {
  return findUserById(userId);
}