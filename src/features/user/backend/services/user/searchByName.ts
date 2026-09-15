import { prisma } from "@/src/shared/prisma/client";
import type { SearchUsersDto } from "@/src/features/user/backend/dto/user.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";

export async function searchUsersByNameService(input: SearchUsersDto) {
	const skip = (input.page - 1) * input.pageSize;

	const where = {
		deletedAt: null,
		OR: [
			{ name: { contains: input.q, mode: "insensitive" as const } },
			{ lastName: { contains: input.q, mode: "insensitive" as const } },
		],
	};

	const [users, total] = await prisma.$transaction([
		prisma.user.findMany({
			where,
			orderBy: { createdAt: "desc" },
			skip,
			take: input.pageSize,
		}),
		prisma.user.count({ where }),
	]);

	return {
		data: users.map(toUserDto),
		meta: {
			page: input.page,
			pageSize: input.pageSize,
			total,
			totalPages: Math.ceil(total / input.pageSize),
			query: input.q,
		},
	};
}