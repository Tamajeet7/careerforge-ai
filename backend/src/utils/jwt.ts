import jwt, { Secret, SignOptions } from "jsonwebtoken";

const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET || "refresh_secret";

const accessOptions: SignOptions = {
  expiresIn: "15m",
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

console.log("ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET);