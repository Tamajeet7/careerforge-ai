import { Request, Response } from "express";
import { registerSchema } from "../utils/validation";
import { registerUser } from "../services/auth.service";

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