import { userIdSchema } from "@/src/features/user/shared/schemas/user.schema";
import { getUserByIdService } from "@/src/features/user/backend/services/user/crud/getById";
import {
	handleUserControllerError,
	NotFoundError,
} from "@/src/features/user/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function getUserByIdController(id: string) {
	try {
		const payload = userIdSchema.parse({ id });
		const user = await getUserByIdService(payload);

		if (!user) throw new NotFoundError();

		return ok(user);
	} catch (error) {
		return handleUserControllerError(error);
	}
}
