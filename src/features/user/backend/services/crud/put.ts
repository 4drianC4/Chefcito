import { prisma } from "@/src/shared/prisma/client";
import type {
	PutUserDto,
	UserIdDto,
} from "@/src/features/user/backend/dto/user.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";

export async function putUserService(id: UserIdDto, input: PutUserDto) {
	const user = await prisma.user.update({
		where: { id: id.id },
		data: {
			name: input.name,
			lastName: input.lastName,
			email: input.email,
			password: input.password,
			active: input.active,
			roleId: input.roleId ?? null,
		},
	});

	return toUserDto(user);
}
