import { prisma } from "@/src/shared/prisma/client";
import type {
	AuthUserResponseDto,
	LoginDto,
} from "@/src/features/auth/backend/dto/auth.dto";
import { verifyPassword } from "@/src/features/user/backend/services/helpers/password";

export async function authenticateUserService(
	input: LoginDto,
): Promise<AuthUserResponseDto | null> {
	const user = await prisma.user.findUnique({
		where: { email: input.email },
		include: { role: true },
	});

	if (!user || !user.active || user.deletedAt) {
		return null;
	}

	const passwordsMatch = await verifyPassword(input.password, user.password);

	if (!passwordsMatch) {
		return null;
	}

	return {
		id: user.id,
		name: user.name,
		lastName: user.lastName,
		email: user.email,
		active: user.active,
		role: user.role?.name ?? null,
	};
}
