import { z } from "zod";

export const DISH_CATEGORIES = [
	"entradas",
	"platos_fuertes",
	"postres",
	"bebidas",
	"ensaladas",
] as const;

export const createDishSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, "El nombre debe tener al menos 3 caracteres")
		.max(100, "El nombre debe tener máximo 100 caracteres"),
	description: z
		.string()
		.trim()
		.min(10, "La descripción debe tener al menos 10 caracteres")
		.max(300, "La descripción debe tener máximo 300 caracteres"),
	price: z
		.number("El precio es obligatorio")
		.positive("El precio debe ser mayor a 0")
		.max(10000, "El precio no puede superar 10,000"),
	category: z.enum(
		DISH_CATEGORIES,
		"Selecciona una categoría válida",
	),
	imageUrl: z.url("Introduce una URL de imagen válida").or(z.literal("")),
	preparationTime: z
		.number("El tiempo de preparación es obligatorio")
		.int("Debe ser un número entero de minutos")
		.min(1, "Mínimo 1 minuto")
		.max(180, "Máximo 180 minutos"),
	available: z.boolean(),
	isVegetarian: z.boolean(),
});

export type DishValues = z.infer<typeof createDishSchema>;
