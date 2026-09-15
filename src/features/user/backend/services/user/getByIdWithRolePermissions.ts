import { prisma } from "@/src/shared/prisma/client";
import type { UserIdDto } from "@/src/features/user/backend/dto/user.dto";

export async function getUserByIdWithRolePermissionsService(input: UserIdDto) {
	return prisma.user.findFirst({
		where: { id: input.id, deletedAt: null },
		select: {
			id: true,
			name: true,
			lastName: true,
			email: true,
			active: true,
			role: {
				select: {
					id: true,
					name: true,
					description: true,
					permissions: {
						select: {
							id: true,
							name: true,
							description: true,
						},
					},
				},
			},
		},
	});
}
