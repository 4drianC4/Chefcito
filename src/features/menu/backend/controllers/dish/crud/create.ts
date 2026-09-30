import { createDishSchema } from "@/src/features/menu/shared/schemas/dish.schema";
import { createDishService } from "@/src/features/menu/backend/services/dish/crud/create";
import { handleMenuControllerError } from "@/src/features/menu/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function createDishController(request: Request) {
	try {
		const body = await request.json();
		const payload = createDishSchema.parse(body);
		const dish = await createDishService(payload);

		return ok(dish, 201);
	} catch (error) {
		return handleMenuControllerError(error);
	}
}
