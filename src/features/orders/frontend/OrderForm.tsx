"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { Textarea } from "@/src/shared/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/shared/ui/select";
import { createOrderSchema } from "@/src/features/orders/shared/schemas/order.schema";
import { useOrderStore } from "@/src/shared/stores/useOrderStore";
import type { DishResponseDto } from "@/src/features/menu/backend/dto/dish.dto";

// Día 14: el menú se obtiene del servidor con TanStack Query (caché incluida)
const fetchDishes = async (): Promise<DishResponseDto[]> => {
	const response = await fetch("/api/dishes");
	if (!response.ok) throw new Error("Error al obtener el menú");
	return response.json();
};

function FieldError({ message }: { message?: string }) {
	if (!message) return null;
	return <p className="text-destructive text-sm">{message}</p>;
}

export function OrderForm() {
	const queryClient = useQueryClient();
	const tableNumber = useOrderStore((state) => state.tableNumber);
	const waiterNotes = useOrderStore((state) => state.waiterNotes);
	const items = useOrderStore((state) => state.items);
	const setTableNumber = useOrderStore((state) => state.setTableNumber);
	const setWaiterNotes = useOrderStore((state) => state.setWaiterNotes);
	const addItem = useOrderStore((state) => state.addItem);
	const removeItem = useOrderStore((state) => state.removeItem);
	const updateQuantity = useOrderStore((state) => state.updateQuantity);
	const clearOrder = useOrderStore((state) => state.clearOrder);

	const { data: dishes = [], isLoading: isLoadingDishes } = useQuery({
		queryKey: ["dishes"],
		queryFn: fetchDishes,
	});
	const availableDishes = dishes.filter((dish) => dish.available);

	const [selectedDishId, setSelectedDishId] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const total = items.reduce(
		(sum, item) => sum + item.unitPrice * item.quantity,
		0,
	);

	function handleAddItem() {
		const dish = dishes.find((d) => d.id === selectedDishId);
		if (!dish) return;
		addItem({
			dishId: dish.id,
			dishName: dish.name,
			unitPrice: dish.price,
			quantity: 1,
		});
		setSelectedDishId("");
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		setMessage(null);

		const result = createOrderSchema.safeParse({
			tableNumber,
			waiterNotes: waiterNotes || undefined,
			items,
		});

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0]?.toString() ?? "general";
				if (!fieldErrors[field]) fieldErrors[field] = issue.message;
			}
			setErrors(fieldErrors);
			return;
		}

		setErrors({});
		setIsSubmitting(true);

		const response = await fetch("/api/orders", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(result.data),
		});

		if (!response.ok) {
			const errorBody = await response.json().catch(() => null);
			setMessage({ text: errorBody?.error ?? "No se pudo enviar el pedido", isError: true });
			setIsSubmitting(false);
			return;
		}

		// Invalida la caché: la cola de cocina (/cocina) se actualiza al instante
		await queryClient.invalidateQueries({ queryKey: ["orders"] });
		setMessage({
			text: `Pedido de la mesa ${result.data.tableNumber} enviado a cocina`,
			isError: false,
		});
		clearOrder();
		setIsSubmitting(false);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-2">
				<Label htmlFor="table-number">Número de mesa</Label>
				<Input
					id="table-number"
					type="number"
					placeholder="5"
					aria-invalid={!!errors.tableNumber}
					value={tableNumber ?? ""}
					onChange={(e) =>
						setTableNumber(e.target.value ? Number(e.target.value) : null)
					}
				/>
				<FieldError message={errors.tableNumber} />
			</div>

			<div className="grid gap-2">
				<Label htmlFor="dish-select">Agregar platillo</Label>
				<div className="flex gap-2">
					<Select
						value={selectedDishId}
						onValueChange={(value) => setSelectedDishId(value ?? "")}
					>
						<SelectTrigger id="dish-select" className="w-full">
							<SelectValue
								placeholder={
									isLoadingDishes
										? "Cargando menú..."
										: "Selecciona un platillo"
								}
							/>
						</SelectTrigger>
						<SelectContent>
							{availableDishes.map((dish) => (
								<SelectItem key={dish.id} value={dish.id}>
									{dish.name} — S/ {dish.price.toFixed(2)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button
						type="button"
						variant="secondary"
						onClick={handleAddItem}
						disabled={!selectedDishId}
					>
						Agregar
					</Button>
				</div>
				<FieldError message={errors.items} />
			</div>

			{items.length > 0 && (
				<ul className="divide-y divide-stone-200 rounded-md border border-stone-200 dark:divide-stone-700 dark:border-stone-700">
					{items.map((item) => (
						<li
							key={item.dishId}
							className="flex items-center gap-3 px-3 py-2 text-sm"
						>
							<span className="flex-1 text-stone-800 dark:text-stone-200">
								{item.dishName}
							</span>
							<span className="text-stone-500">
								S/ {item.unitPrice.toFixed(2)}
							</span>
							<Input
								type="number"
								min={1}
								max={50}
								value={item.quantity}
								onChange={(e) =>
									updateQuantity(item.dishId, Number(e.target.value))
								}
								className="w-16 px-2 py-1 text-center"
							/>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={() => removeItem(item.dishId)}
								className="text-destructive"
							>
								Quitar
							</Button>
						</li>
					))}
					<li className="flex justify-end gap-2 px-3 py-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
						Total: S/ {total.toFixed(2)}
					</li>
				</ul>
			)}

			<div className="grid gap-2">
				<Label htmlFor="waiter-notes">Notas para cocina (opcional)</Label>
				<Textarea
					id="waiter-notes"
					rows={2}
					placeholder="Sin cebolla en el lomo saltado..."
					aria-invalid={!!errors.waiterNotes}
					value={waiterNotes}
					onChange={(e) => setWaiterNotes(e.target.value)}
				/>
				<FieldError message={errors.waiterNotes} />
			</div>

			<div className="flex gap-2">
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Enviando..." : "Enviar pedido a cocina"}
				</Button>
				{items.length > 0 && (
					<Button type="button" variant="outline" onClick={clearOrder}>
						Cancelar pedido
					</Button>
				)}
			</div>
			{message && (
				<p
					className={`text-sm ${
						message.isError
							? "text-rose-600 dark:text-rose-300"
							: "text-emerald-700 dark:text-emerald-300"
					}`}
				>
					{message.text}
				</p>
			)}
		</form>
	);
}
