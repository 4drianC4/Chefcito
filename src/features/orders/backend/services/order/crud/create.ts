import { prisma } from "@/src/shared/prisma/client";
import type { CreateOrderDto } from "@/src/features/orders/backend/dto/order.dto";
import { toOrderDto } from "@/src/features/orders/backend/services/shared";
import { NotFoundError } from "@/src/features/orders/backend/controllers/shared";

export async function createOrderService(input: CreateOrderDto) {
	const dishIds = [...new Set(input.items.map((item) => item.dishId))];

	// El precio se toma de la BD (nunca del cliente) para evitar manipulación
	const dishes = await prisma.dish.findMany({
		where: { id: { in: dishIds }, available: true },
	});

	if (dishes.length !== dishIds.length) {
		throw new NotFoundError("Uno o más platillos no existen o no están disponibles");
	}

	const priceByDish = new Map(dishes.map((dish) => [dish.id, dish.price]));

	const order = await prisma.order.create({
		data: {
			tableNumber: input.tableNumber,
			waiterNotes: input.waiterNotes ?? null,
			items: {
				create: input.items.map((item) => ({
					dishId: item.dishId,
					quantity: item.quantity,
					unitPrice: priceByDish.get(item.dishId) ?? 0,
					notes: item.notes ?? null,
				})),
			},
		},
		include: { items: { include: { dish: true } } },
	});

	return toOrderDto(order);
}
