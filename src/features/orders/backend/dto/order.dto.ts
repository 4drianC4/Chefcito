import type { z } from "zod";
import type { OrderStatus } from "@prisma/client";
import type {
	createOrderSchema,
	patchOrderStatusSchema,
} from "@/src/features/orders/shared/schemas/order.schema";

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
export type PatchOrderStatusDto = z.infer<typeof patchOrderStatusSchema>;

export type OrderItemResponseDto = {
	id: string;
	dishId: string;
	dishName: string;
	quantity: number;
	unitPrice: number;
	notes: string | null;
};

export type OrderResponseDto = {
	id: string;
	tableNumber: number;
	waiterNotes: string | null;
	status: OrderStatus;
	createdAt: Date;
	updatedAt: Date;
	items: OrderItemResponseDto[];
};
