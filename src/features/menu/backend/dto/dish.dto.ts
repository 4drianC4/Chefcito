import type { z } from "zod";
import type { DishCategory } from "@prisma/client";
import type { createDishSchema } from "@/src/features/menu/shared/schemas/dish.schema";

export type CreateDishDto = z.infer<typeof createDishSchema>;

export type DishResponseDto = {
	id: string;
	name: string;
	description: string;
	price: number;
	category: DishCategory;
	imageUrl: string;
	preparationTime: number;
	available: boolean;
	isVegetarian: boolean;
	createdAt: Date;
	updatedAt: Date;
};
