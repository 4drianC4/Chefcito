import { createOrderSchema } from "@/src/features/orders/shared/schemas/order.schema";
import { createOrderService } from "@/src/features/orders/backend/services/order/crud/create";
import { handleOrderControllerError } from "@/src/features/orders/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function createOrderController(request: Request) {
	try {
		const body = await request.json();
		const payload = createOrderSchema.parse(body);
		const order = await createOrderService(payload);

		return ok(order, 201);
	} catch (error) {
		return handleOrderControllerError(error);
	}
}
