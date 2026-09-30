import { prisma } from "@/src/shared/prisma/client";
import type { CreateDishDto } from "@/src/features/menu/backend/dto/dish.dto";
import { toDishDto } from "@/src/features/menu/backend/services/shared";

export async function createDishService(input: CreateDishDto) {
	const dish = await prisma.dish.create({
		data: {
			name: input.name,
			description: input.description,
			price: input.price,
			category: input.category,
			imageUrl: input.imageUrl || null,
			preparationTime: input.preparationTime,
			available: input.available,
			isVegetarian: input.isVegetarian,
		},
	});

	return toDishDto(dish);
}
