import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

const ACCESS_SECRET: Secret = process.env.JWT_ACCESS_SECRET || "access_secret";
const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET || "refresh_secret";

if (!env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET is missing");
}

const accessOptions: SignOptions = {
  expiresIn: "15m",
};

const refreshOptions: SignOptions = {
  expiresIn: "7d",
};

export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, REFRESH_SECRET, refreshOptions);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}



export function generateAccessToken(userId: string) {
  return jwt.sign(
    { userId },
    env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
}

console.log("ACCESS_SECRET:", process.env.JWT_ACCESS_SECRET);