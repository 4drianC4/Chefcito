import { prisma } from "@/src/shared/prisma/client";
import type { CreateUserWithProfileDto } from "@/src/features/user/backend/dto/user.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";
import { hashPassword } from "@/src/features/user/backend/services/helpers/password";

export async function createUserService(input: CreateUserWithProfileDto) {
	const passwordHash = await hashPassword(input.password);

	const user = await prisma.user.create({
		data: {
			name: input.name,
			lastName: input.lastName,
			email: input.email,
			password: passwordHash,
			roleId: input.roleId ?? null,
			profile: input.profile
				? {
						create: input.profile,
					}
				: undefined,
		},
	});

	return toUserDto(user);
}
