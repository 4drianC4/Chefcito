import { ZodError } from "zod";

export class InvalidCredentialsError extends Error {
	constructor(message = "Invalid credentials") {
		super(message);
		this.name = "InvalidCredentialsError";
	}
}

export function handleAuthControllerError(error: unknown): never {
	if (error instanceof ZodError) {
		throw new InvalidCredentialsError("Email or password format is invalid");
	}
	throw error;
}
