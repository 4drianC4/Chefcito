import { userIdSchema } from "@/src/features/user/shared/schemas/user.schema";
import { getUserByIdWithRolePermissionsService } from "@/src/features/user/backend/services/crud/getByIdWithRolePermissions";
import {
	handleUserControllerError,
	NotFoundError,
} from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function getUserByIdWithRolePermissionsController(id: string) {
	try {
		const payload = userIdSchema.parse({ id });
		const user = await getUserByIdWithRolePermissionsService(payload);

		if (!user) throw new NotFoundError();

		return ok(user);
	} catch (error) {
		return handleUserControllerError(error);
	}
}
