import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(60),

  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(6)
    .max(64),
});

export type RegisterDTO =
  z.infer<typeof registerSchema>;