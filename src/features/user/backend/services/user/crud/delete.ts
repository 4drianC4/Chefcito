import { prisma } from "@/src/shared/prisma/client";
import type { UserIdDto } from "@/src/features/user/backend/dto/user.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";

export async function deleteUserService(input: UserIdDto) {
	// Soft delete: marcamos deletedAt y desactivamos el usuario
	const user = await prisma.user.update({
		where: { id: input.id },
		data: { active: false, deletedAt: new Date() },
	});

	return toUserDto(user);
}
