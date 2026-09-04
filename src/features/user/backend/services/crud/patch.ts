import { prisma } from "@/src/shared/prisma/client";
import type {
	PatchUserDto,
	UserIdDto,
} from "@/src/features/user/backend/dto/user.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";

export async function patchUserService(id: UserIdDto, input: PatchUserDto) {
	const user = await prisma.user.update({
		where: { id: id.id },
		data: {
			...(input.name !== undefined && { name: input.name }),
			...(input.lastName !== undefined && { lastName: input.lastName }),
			...(input.email !== undefined && { email: input.email }),
			...(input.password !== undefined && { password: input.password }),
			...(input.active !== undefined && { active: input.active }),
			...(input.roleId !== undefined && { roleId: input.roleId }),
		},
	});

	return toUserDto(user);
}
