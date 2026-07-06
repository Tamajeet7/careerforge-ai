import { Request, Response } from "express";
import { registerSchema } from "../utils/validation";
import { registerUser } from "../services/auth.service";
import { loginSchema } from "../utils/validation";
import { loginUser } from "../services/auth.service";
import { getCurrentUser } from "../services/auth.service";

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);

  const user = await registerUser(data);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);

  const result = await loginUser(data);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
}

export async function me(req: Request, res: Response) {
  const user = await getCurrentUser(req.user!.userId);

  res.status(200).json({
    success: true,
    data: user,
  });
}