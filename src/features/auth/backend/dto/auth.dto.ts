import type { z } from "zod";
import type { loginSchema } from "@/src/features/auth/shared/schemas/auth.schema";

export type LoginDto = z.infer<typeof loginSchema>;

export type AuthUserResponseDto = {
	id: string;
	name: string;
	lastName: string;
	email: string;
	active: boolean;
	role: string | null;
};
