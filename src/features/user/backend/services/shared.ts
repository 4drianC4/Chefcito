import type { User } from "@prisma/client";
import type { UserResponseDto } from "@/src/features/user/backend/dto/user.dto";

export function toUserDto(user: User): UserResponseDto {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _password, deletedAt: _deletedAt, ...safeUser } = user;
	return {
		...safeUser,
		roleId: (user as User & { roleId: string }).roleId,
	};
}
