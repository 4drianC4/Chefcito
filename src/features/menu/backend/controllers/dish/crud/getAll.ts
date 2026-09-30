import { getAllDishesService } from "@/src/features/menu/backend/services/dish/crud/getAll";
import { handleMenuControllerError } from "@/src/features/menu/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function getAllDishesController() {
	try {
		const dishes = await getAllDishesService();
		return ok(dishes);
	} catch (error) {
		return handleMenuControllerError(error);
	}
}
