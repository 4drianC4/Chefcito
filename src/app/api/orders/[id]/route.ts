import { patchOrderStatusController } from "@/src/features/orders";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteContext) {
	const { id } = await params;
	return patchOrderStatusController(id, request);
}
