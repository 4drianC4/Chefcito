import { prisma } from "@/src/shared/prisma/client";
import type { CreateUserDto } from "@/src/features/user/backend/dto/user.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";

export async function createUserService(input: CreateUserDto) {
	const user = await prisma.user.create({
		data: {
			name: input.name,
			lastName: input.lastName,
			email: input.email,
			password: input.password, // encriptar en el futuro
			roleId: input.roleId ?? null,
		},
	});

	return toUserDto(user);
}
