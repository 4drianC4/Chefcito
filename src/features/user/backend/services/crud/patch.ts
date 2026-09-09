import { prisma } from "@/src/shared/prisma/client";
import type { Prisma } from "@prisma/client";
import type {
	PatchUserDto,
	UserIdDto,
} from "@/src/features/user/backend/dto/user.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";
import { hashPassword } from "@/src/features/user/backend/services/helpers/password";

export async function patchUserService(id: UserIdDto, input: PatchUserDto) {
	const data: Prisma.UserUpdateInput = {
		...(input.name !== undefined && { name: input.name }),
		...(input.lastName !== undefined && { lastName: input.lastName }),
		...(input.email !== undefined && { email: input.email }),
		...(input.active !== undefined && { active: input.active }),
		...(input.roleId !== undefined && { roleId: input.roleId }),
	};

	if (input.password !== undefined) {
		data.password = await hashPassword(input.password);
	}

	const user = await prisma.user.update({
		where: { id: id.id },
		data,
	});

	return toUserDto(user);
}
