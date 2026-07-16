import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .max(72)
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number"),
});

export const verifyCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});