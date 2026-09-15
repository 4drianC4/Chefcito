import { getAllUsersService } from "@/src/features/user/backend/services/user/crud/getAll";
import { handleUserControllerError } from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function getAllUsersController() {
	try {
		const users = await getAllUsersService();
		return ok(users);
	} catch (error) {
		return handleUserControllerError(error);
	}
}
