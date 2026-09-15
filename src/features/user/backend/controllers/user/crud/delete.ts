import { userIdSchema } from "@/src/features/user/shared/schemas/user.schema";
import { deleteUserService } from "@/src/features/user/backend/services/user/crud/delete";
import { handleUserControllerError } from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function deleteUserController(id: string) {
	try {
		const payload = userIdSchema.parse({ id });
		const user = await deleteUserService(payload);

		return ok(user);
	} catch (error) {
		return handleUserControllerError(error);
	}
}
