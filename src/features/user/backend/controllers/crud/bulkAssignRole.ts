import { bulkAssignRoleSchema } from "@/src/features/user/shared/schemas/user.schema";
import { bulkAssignRoleService } from "@/src/features/user/backend/services/crud/bulkAssignRole";
import {
	handleUserControllerError,
	NotFoundError,
} from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function bulkAssignRoleController(request: Request) {
	try {
		const body = await request.json();
		const payload = bulkAssignRoleSchema.parse(body);
		const result = await bulkAssignRoleService(payload);
		return ok(result);
	} catch (error) {
		if (error instanceof Error && error.message.startsWith("Role with id")) {
			throw new NotFoundError(error.message);
		}
		return handleUserControllerError(error);
	}
}