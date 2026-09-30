import { createDishController, getAllDishesController } from "@/src/features/menu";

export async function GET() {
	return getAllDishesController();
}

export async function POST(request: Request) {
	return createDishController(request);
}
