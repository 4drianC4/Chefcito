import { prisma } from "@/src/shared/prisma/client";
import type { PaginationDto } from "@/src/features/user/backend/dto/user.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";

export async function getAllUsersPaginatedService(input: PaginationDto) {
	const skip = (input.page - 1) * input.pageSize;

	const [users, total] = await prisma.$transaction([
		prisma.user.findMany({
			where: { deletedAt: null },
			orderBy: { createdAt: "desc" },
			skip,
			take: input.pageSize,
		}),
		prisma.user.count({ where: { deletedAt: null } }),
	]);

	return {
		data: users.map(toUserDto),
		meta: {
			page: input.page,
			pageSize: input.pageSize,
			total,
			totalPages: Math.ceil(total / input.pageSize),
		},
	};
}
