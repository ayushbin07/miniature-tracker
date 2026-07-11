import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters."),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must be at most 20 characters."),

  email: z.email(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
});