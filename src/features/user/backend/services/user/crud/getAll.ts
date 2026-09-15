import { prisma } from "@/src/shared/prisma/client";
import { toUserDto } from "@/src/features/user/backend/services/shared";

export async function getAllUsersService() {
	const users = await prisma.user.findMany({
		where: { deletedAt: null },
		orderBy: { createdAt: "desc" },
	});

	return users.map(toUserDto);
}
