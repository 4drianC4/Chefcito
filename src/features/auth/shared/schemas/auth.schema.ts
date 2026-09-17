import { z } from "zod";

const emailSchema = z
	.email("Email must be valid")
	.transform((value) => value.toLowerCase());

const passwordSchema = z
	.string()
	.min(8, "Password must contain at least 8 characters")
	.max(32, "Password must contain at most 32 characters");

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});
