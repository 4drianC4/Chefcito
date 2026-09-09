import { paginationSchema } from "@/src/features/user/shared/schemas/user.schema";
import { getAllUsersPaginatedService } from "@/src/features/user/backend/services/crud/getAllPaginated";
import { handleUserControllerError } from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function getAllUsersPaginatedController(search: {
	page?: string;
	pageSize?: string;
}) {
	try {
		const payload = paginationSchema.parse(search);
		const result = await getAllUsersPaginatedService(payload);
		return ok(result);
	} catch (error) {
		return handleUserControllerError(error);
	}
}
