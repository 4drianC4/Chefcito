import {
	patchUserSchema,
	userIdSchema,
} from "@/src/features/user/shared/schemas/user.schema";
import { patchUserService } from "@/src/features/user/backend/services/crud/patch";
import { handleUserControllerError } from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function patchUserController(id: string, request: Request) {
	try {
		const params = userIdSchema.parse({ id });
		const body = await request.json();
		const payload = patchUserSchema.parse(body);
		const user = await patchUserService(params, payload);

		return ok(user);
	} catch (error) {
		return handleUserControllerError(error);
	}
}
