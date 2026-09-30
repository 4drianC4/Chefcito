import { prisma } from "@/src/shared/prisma/client";
import { toOrderDto } from "@/src/features/orders/backend/services/shared";

export async function getAllOrdersService() {
	const orders = await prisma.order.findMany({
		include: { items: { include: { dish: true } } },
		orderBy: { createdAt: "desc" },
	});

	return orders.map(toOrderDto);
}
