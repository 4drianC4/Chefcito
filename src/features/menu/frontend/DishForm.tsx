"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Textarea } from "@/src/shared/ui/textarea";
import { Checkbox } from "@/src/shared/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/src/shared/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/src/shared/ui/form";
import {
	createDishSchema,
	DISH_CATEGORIES,
	type DishValues,
} from "@/src/features/menu/shared/schemas/dish.schema";

const categoryLabels: Record<(typeof DISH_CATEGORIES)[number], string> = {
	entradas: "Entradas",
	platos_fuertes: "Platos fuertes",
	postres: "Postres",
	bebidas: "Bebidas",
	ensaladas: "Ensaladas",
};

export function DishForm() {
	const queryClient = useQueryClient();
	const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
	const form = useForm<DishValues>({
		resolver: zodResolver(createDishSchema),
		defaultValues: {
			name: "",
			description: "",
			category: undefined,
			imageUrl: "",
			price: undefined,
			preparationTime: undefined,
			available: true,
			isVegetarian: false,
		},
	});

	const { isSubmitting } = form.formState;

	async function onSubmit(values: DishValues) {
		setMessage(null);

		const response = await fetch("/api/dishes", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});

		if (!response.ok) {
			const errorBody = await response.json().catch(() => null);
			setMessage({ text: errorBody?.error ?? "No se pudo crear el platillo", isError: true });
			return;
		}

		// Invalida la caché: cualquier vista con queryKey ["dishes"] se recarga sola
		await queryClient.invalidateQueries({ queryKey: ["dishes"] });
		setMessage({ text: `Platillo "${values.name}" registrado correctamente`, isError: false });
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre del platillo</FormLabel>
							<FormControl>
								<Input placeholder="Lomo saltado" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descripción</FormLabel>
							<FormControl>
								<Textarea
									rows={3}
									placeholder="Jugoso lomo fino salteado con cebolla, tomate y papas fritas..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Precio (S/)</FormLabel>
								<FormControl>
									<Input
										type="number"
										step="0.01"
										placeholder="35.00"
										value={field.value ?? ""}
										onChange={(e) => field.onChange(e.target.valueAsNumber)}
										onBlur={field.onBlur}
										name={field.name}
										ref={field.ref}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="preparationTime"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Preparación (min)</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="20"
										value={field.value ?? ""}
										onChange={(e) => field.onChange(e.target.valueAsNumber)}
										onBlur={field.onBlur}
										name={field.name}
										ref={field.ref}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Categoría</FormLabel>
							<Select value={field.value ?? ""} onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Selecciona una categoría" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{DISH_CATEGORIES.map((category) => (
										<SelectItem key={category} value={category}>
											{categoryLabels[category]}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="imageUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL de la foto (opcional)</FormLabel>
							<FormControl>
								<Input placeholder="https://ejemplo.com/foto.jpg" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-6">
					<FormField
						control={form.control}
						name="available"
						render={({ field }) => (
							<FormItem className="flex items-center gap-2">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={(checked) => field.onChange(checked === true)}
									/>
								</FormControl>
								<FormLabel className="!mt-0">Disponible</FormLabel>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="isVegetarian"
						render={({ field }) => (
							<FormItem className="flex items-center gap-2">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={(checked) => field.onChange(checked === true)}
									/>
								</FormControl>
								<FormLabel className="!mt-0">Vegetariano</FormLabel>
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Guardando..." : "Agregar platillo"}
				</Button>
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
		</Form>
	);
}
