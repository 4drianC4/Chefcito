import { fail } from "@/src/shared/lib/api-response";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export class NotFoundError extends Error {
	constructor(message = "User not found") {
		super(message);
		this.name = "NotFoundError";
	}
}

export function handleUserControllerError(error: unknown) {
	if (error instanceof ZodError) {
		return fail("Invalid data", 400, error.issues);
	}

	if (error instanceof NotFoundError) {
		return fail(error.message, 404);
	}

	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		// P2002: violación de unique constraint (ej. email duplicado)
		if (error.code === "P2002") {
			return fail("Email is already in use", 409);
		}
		// P2025: registro no encontrado
		if (error.code === "P2025") {
			return fail("User not found", 404);
		}
	}

	return fail("Internal server error", 500);
}
