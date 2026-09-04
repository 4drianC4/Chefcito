import { z } from "zod";

const nameSchema = z
	.string()
	.trim()
	.min(1, "Name must contain at least 1 character")
	.max(100, "Name must contain at most 100 characters");

const emailSchema = z
	.email("Email must be valid")
	.transform((value) => value.toLowerCase());

const passwordSchema = z
	.string()
	.min(8, "Password must contain at least 8 characters")
	.max(32, "Password must contain at most 32 characters");

export const userIdSchema = z.object({
	id: z.cuid("User id must be a valid cuid"),
});

export const createUserSchema = z.object({
	name: nameSchema,
	lastName: nameSchema,
	email: emailSchema,
	password: passwordSchema,
	roleId: z.cuid("Role id must be a valid cuid").nullable().optional(),
});

export const putUserSchema = z.object({
	name: nameSchema,
	lastName: nameSchema,
	email: emailSchema,
	password: passwordSchema,
	active: z.boolean().default(true),
	roleId: z.cuid("Role id must be a valid cuid").nullable().optional(),
});

export const patchUserSchema = z
	.object({
		name: nameSchema.optional(),
		lastName: nameSchema.optional(),
		email: emailSchema.optional(),
		password: passwordSchema.optional(),
		active: z.boolean().optional(),
		roleId: z.cuid("Role id must be a valid cuid").nullable().optional(),
	})
	.refine(
		(value) => Object.values(value).some((field) => field !== undefined),
		{ message: "At least one field must be provided" },
	);
