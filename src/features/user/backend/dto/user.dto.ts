import type { z } from "zod";
import type {
	createUserSchema,
	patchUserSchema,
	putUserSchema,
	userIdSchema,
} from "@/src/features/user/shared/schemas/user.schema";

export type UserIdDto = z.infer<typeof userIdSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type PutUserDto = z.infer<typeof putUserSchema>;
export type PatchUserDto = z.infer<typeof patchUserSchema>;

export type UserResponseDto = {
	id: string;
	name: string;
	lastName: string;
	email: string;
	active: boolean;
	roleId: string | null;
	createdAt: Date;
	updatedAt: Date;
};
