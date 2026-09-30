import { z } from "zod";

export const orderItemSchema = z.object({
	dishId: z.string().min(1, "El platillo es obligatorio"),
	dishName: z.string().min(1),
	unitPrice: z.number().positive(),
	quantity: z
		.number()
		.int("La cantidad debe ser un número entero")
		.min(1, "La cantidad mínima es 1")
		.max(50, "La cantidad máxima es 50"),
	notes: z.string().trim().max(200).optional(),
});

export const createOrderSchema = z.object({
	tableNumber: z
		.number("El número de mesa es obligatorio")
		.int("Debe ser un número entero")
		.min(1, "La mesa debe ser al menos la 1")
		.max(100, "No existe esa mesa"),
	waiterNotes: z.string().trim().max(300).optional(),
	items: z
		.array(orderItemSchema)
		.min(1, "El pedido debe tener al menos un platillo"),
});

export const orderStatusSchema = z.enum([
	"enviado",
	"en_preparacion",
	"servido",
	"pagado",
]);

export const patchOrderStatusSchema = z.object({
	status: orderStatusSchema,
});

export type OrderItemValues = z.infer<typeof orderItemSchema>;
export type CreateOrderValues = z.infer<typeof createOrderSchema>;
