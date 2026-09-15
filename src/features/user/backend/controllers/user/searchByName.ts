import { searchUsersSchema } from "@/src/features/user/shared/schemas/user.schema";
import { searchUsersByNameService } from "@/src/features/user/backend/services/user/searchByName";
import { handleUserControllerError } from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function searchUsersByNameController(search: {
	q?: string;
	page?: string;
	pageSize?: string;
}) {
	try {
		const payload = searchUsersSchema.parse(search);
		const result = await searchUsersByNameService(payload);
		return ok(result);
	} catch (error) {
		return handleUserControllerError(error);
	}
}