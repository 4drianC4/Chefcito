import { prisma } from "@/src/shared/prisma/client";
import { toDishDto } from "@/src/features/menu/backend/services/shared";

export async function getAllDishesService() {
	const dishes = await prisma.dish.findMany({
		orderBy: [{ category: "asc" }, { name: "asc" }],
	});

	return dishes.map(toDishDto);
}
