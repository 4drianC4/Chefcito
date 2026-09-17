import { loginSchema } from "@/src/features/auth/shared/schemas/auth.schema";
import { authenticateUserService } from "@/src/features/auth/backend/services/auth/authenticateUser";
import {
	handleAuthControllerError,
	InvalidCredentialsError,
} from "@/src/features/auth/backend/controllers/shared";

export async function authorizeCredentialsController(credentials: unknown) {
	try {
		const payload = loginSchema.parse(credentials);
		const user = await authenticateUserService(payload);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		return user;
	} catch (error) {
		return handleAuthControllerError(error);
	}
}
