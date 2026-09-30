import { patchOrderStatusSchema } from "@/src/features/orders/shared/schemas/order.schema";
import { patchOrderStatusService } from "@/src/features/orders/backend/services/order/crud/patchStatus";
import { handleOrderControllerError } from "@/src/features/orders/backend/controllers/shared";
import { ok } from "@/src/shared/lib/api-response";

export async function patchOrderStatusController(id: string, request: Request) {
	try {
		const body = await request.json();
		const payload = patchOrderStatusSchema.parse(body);
		const order = await patchOrderStatusService(id, payload);

		return ok(order);
	} catch (error) {
		return handleOrderControllerError(error);
	}
}
