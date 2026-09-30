import type { Dish } from "@prisma/client";
import type { DishResponseDto } from "@/src/features/menu/backend/dto/dish.dto";

export function toDishDto(dish: Dish): DishResponseDto {
	return {
		...dish,
		imageUrl: dish.imageUrl ?? "",
	};
}
