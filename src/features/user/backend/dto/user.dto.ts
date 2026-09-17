import type { z } from "zod";
import type {
	bulkAssignRoleSchema,
	createUserSchema,
	createUserWithProfileSchema,
	paginationSchema,
	patchUserSchema,
	putUserSchema,
	searchUsersSchema,
	userIdSchema,
} from "@/src/features/user/shared/schemas/user.schema";

export type UserIdDto = z.infer<typeof userIdSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type PutUserDto = z.infer<typeof putUserSchema>;
export type PatchUserDto = z.infer<typeof patchUserSchema>;
export type PaginationDto = z.infer<typeof paginationSchema>;
export type CreateUserWithProfileDto = z.infer<typeof createUserWithProfileSchema>;
export type SearchUsersDto = z.infer<typeof searchUsersSchema>;
export type BulkAssignRoleDto = z.infer<typeof bulkAssignRoleSchema>;

export type UserResponseDto = {
	id: string;
	name: string;
	lastName: string;
	email: string;
	active: boolean;
	photoUrl: string | null;
	roleId: string | null;
	createdAt: Date;
	updatedAt: Date;
};
