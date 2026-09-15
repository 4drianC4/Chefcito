import {
	putUserSchema,
	userIdSchema,
} from "@/src/features/user/shared/schemas/user.schema";
import { putUserService } from "@/src/features/user/backend/services/user/crud/put";
import { handleUserControllerError } from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function putUserController(id: string, request: Request) {
	try {
		const params = userIdSchema.parse({ id });
		const body = await request.json();
		const payload = putUserSchema.parse(body);
		const user = await putUserService(params, payload);

		return ok(user);
	} catch (error) {
		return handleUserControllerError(error);
	}
}
