import type { Dish, Order, OrderItem } from "@prisma/client";
import type { OrderResponseDto } from "@/src/features/orders/backend/dto/order.dto";

export function toOrderDto(
	order: Order & { items: (OrderItem & { dish: Dish })[] },
): OrderResponseDto {
	return {
		...order,
		items: order.items.map((item) => ({
			id: item.id,
			dishId: item.dishId,
			dishName: item.dish.name,
			quantity: item.quantity,
			unitPrice: item.unitPrice,
			notes: item.notes,
		})),
	};
}
