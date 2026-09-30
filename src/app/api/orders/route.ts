import { createOrderController, getAllOrdersController } from "@/src/features/orders";

export async function GET() {
	return getAllOrdersController();
}

export async function POST(request: Request) {
	return createOrderController(request);
}
