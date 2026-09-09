import { createUserWithProfileSchema } from "@/src/features/user/shared/schemas/user.schema";
import { createUserService } from "@/src/features/user/backend/services/crud/create";
import { handleUserControllerError } from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function createUserController(request: Request) {
	try {
		const body = await request.json();
		const payload = createUserWithProfileSchema.parse(body);
		const user = await createUserService(payload);

		return ok(user, 201);
	} catch (error) {
		return handleUserControllerError(error);
	}
}
