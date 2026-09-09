import { prisma } from "@/src/shared/prisma/client";
import type { BulkAssignRoleDto } from "@/src/features/user/backend/dto/user.dto";

export async function bulkAssignRoleService(input: BulkAssignRoleDto) {
	return prisma.$transaction(async (tx) => {
		const role = await tx.role.findUnique({
			where: { id: input.roleId },
		});

		if (!role) {
			throw new Error(`Role with id ${input.roleId} not found`);
		}

		const updated = await tx.user.updateMany({
			where: {
				id: { in: input.userIds },
				deletedAt: null,
			},
			data: { roleId: input.roleId },
		});

		if (updated.count === 0) {
			throw new Error(
				"Aborting transaction: no matching active users were found",
			);
		}

		return {
			role,
			updated: updated.count,
			userIds: input.userIds,
		};
	});
}