import { userIdSchema } from "@/src/features/user/shared/schemas/user.schema";
import { photoFileSchema } from "@/src/features/user/shared/schemas/photo.schema";
import { uploadUserPhotoService } from "@/src/features/user/backend/services/user/uploadPhoto";
import { handleUserControllerError } from "@/src/features/user/backend/controllers/shared";
import { fail, ok } from "@/src/shared/lib/api-response";
import { ZodError } from "zod";

export async function uploadUserPhotoController(id: string, request: Request) {
	try {
		const params = userIdSchema.parse({ id });

		const formData = await request.formData();
		const file = formData.get("photo");

		const payload = photoFileSchema.parse(file);

		const user = await uploadUserPhotoService(params, payload);
		return ok(user);
	} catch (error) {
		if (error instanceof ZodError) {
			return fail(
				error.issues[0]?.message ?? "Archivo inválido",
				400,
				error.issues,
			);
		}
		return handleUserControllerError(error);
	}
}
