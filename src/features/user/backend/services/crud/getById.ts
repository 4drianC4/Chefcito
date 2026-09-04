import { prisma } from "@/src/shared/prisma/client";
import type { UserIdDto } from "@/src/features/user/backend/dto/user.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";

export async function getUserByIdService(input: UserIdDto) {
	const user = await prisma.user.findFirst({
		where: { id: input.id, deletedAt: null },
	});

	return user ? toUserDto(user) : null;
}
