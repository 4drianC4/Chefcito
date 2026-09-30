import { prisma } from "@/src/shared/prisma/client";
import type { PatchOrderStatusDto } from "@/src/features/orders/backend/dto/order.dto";
import { toOrderDto } from "@/src/features/orders/backend/services/shared";

export async function patchOrderStatusService(
	id: string,
	input: PatchOrderStatusDto,
) {
	const order = await prisma.order.update({
		where: { id },
		data: { status: input.status },
		include: { items: { include: { dish: true } } },
	});

	return toOrderDto(order);
}
