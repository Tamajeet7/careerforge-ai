import jwt, { Secret, SignOptions } from "jsonwebtoken";

const ACCESS_SECRET: Secret =
  process.env.JWT_ACCESS_SECRET || "default_access_secret_careerforge_2026";

const REFRESH_SECRET: Secret =
  process.env.JWT_REFRESH_SECRET || "default_refresh_secret_careerforge_2026";

const accessOptions: SignOptions = {
  expiresIn: "7d",
};

const refreshOptions: SignOptions = {
  expiresIn: "7d",
};

export function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, ACCESS_SECRET, accessOptions);
}

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, REFRESH_SECRET, refreshOptions);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}