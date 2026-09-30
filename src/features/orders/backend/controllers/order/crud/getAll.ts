import { getAllOrdersService } from "@/src/features/orders/backend/services/order/crud/getAll";
import { handleOrderControllerError } from "@/src/features/orders/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function getAllOrdersController() {
	try {
		const orders = await getAllOrdersService();
		return ok(orders);
	} catch (error) {
		return handleOrderControllerError(error);
	}
}
