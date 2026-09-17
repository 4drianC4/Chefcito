import bcrypt from "bcrypt";
import { prisma } from "@/src/shared/prisma/client";

const SALT_ROUNDS = 10;
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

export async function registerUserSessionService(userId: string) {
	const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
	const sessionToken = crypto.randomUUID();
	const sessionTokenHash = await bcrypt.hash(sessionToken, SALT_ROUNDS);

	return prisma.session.create({
		data: {
			sessionToken: sessionTokenHash,
			userId,
			expires: expiresAt,
		},
	});
}
