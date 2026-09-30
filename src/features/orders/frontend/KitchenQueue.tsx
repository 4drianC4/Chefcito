"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/src/shared/ui/skeleton";
import { Button } from "@/src/shared/ui/button";
import type { OrderResponseDto } from "@/src/features/orders/backend/dto/order.dto";

// 1. Función que hace el fetch puro
const fetchOrders = async (): Promise<OrderResponseDto[]> => {
	const response = await fetch("/api/orders");
	if (!response.ok) throw new Error("Error al obtener los pedidos");
	return response.json();
};

const statusLabels: Record<OrderResponseDto["status"], string> = {
	enviado: "Enviado a cocina",
	en_preparacion: "En preparación",
	servido: "Servido",
	pagado: "Pagado",
};

const statusStyles: Record<OrderResponseDto["status"], string> = {
	enviado: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
	en_preparacion: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
	servido: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
	pagado: "bg-stone-200 text-stone-600 dark:bg-stone-700 dark:text-stone-300",
};

// Siguiente paso del flujo de la comanda según su estado actual
const nextActions: Partial<
	Record<OrderResponseDto["status"], { label: string; next: OrderResponseDto["status"] }>
> = {
	enviado: { label: "Empezar preparación", next: "en_preparacion" },
	en_preparacion: { label: "Marcar servido", next: "servido" },
	servido: { label: "Marcar pagado", next: "pagado" },
};

const updateOrderStatus = async ({
	id,
	status,
}: {
	id: string;
	status: OrderResponseDto["status"];
}): Promise<OrderResponseDto> => {
	const response = await fetch(`/api/orders/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ status }),
	});
	if (!response.ok) throw new Error("No se pudo actualizar el pedido");
	return response.json();
};

function OrderCardSkeleton() {
	return (
		<div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
			<div className="flex items-center justify-between">
				<Skeleton className="h-5 w-20" />
				<Skeleton className="h-5 w-28 rounded-full" />
			</div>
			<Skeleton className="mt-3 h-4 w-48" />
			<Skeleton className="mt-2 h-4 w-36" />
		</div>
	);
}

export function KitchenQueue() {
	const queryClient = useQueryClient();

	// 2. Hook de TanStack Query: caché + sincronización automática
	const { data, isLoading, isError, error, dataUpdatedAt } = useQuery({
		queryKey: ["orders"],
		queryFn: fetchOrders,
		staleTime: 1000 * 10, // 10 segundos de datos frescos
		refetchInterval: 1000 * 15, // Cocina se actualiza sola cada 15 segundos
	});

	// Mutación: al cambiar el estado se invalida la caché y la vista se refresca
	const statusMutation = useMutation({
		mutationFn: updateOrderStatus,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
	});

	if (isLoading) {
		return (
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{[1, 2, 3].map((i) => (
					<OrderCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (isError) {
		return (
			<p className="rounded-md bg-rose-50 p-4 text-sm text-rose-600 dark:bg-rose-900/20 dark:text-rose-300">
				{error.message}
			</p>
		);
	}

	return (
		<>
			<p className="mb-4 text-xs text-stone-500 dark:text-stone-400">
				Última actualización:{" "}
				{new Date(dataUpdatedAt).toLocaleTimeString("es-PE")} (se refresca cada
				15 s)
			</p>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{data?.map((order) => (
					<article
						key={order.id}
						className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900"
					>
						<div className="flex items-center justify-between">
							<h2 className="font-semibold text-stone-900 dark:text-stone-100">
								Mesa {order.tableNumber}
							</h2>
							<span
								className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[order.status]}`}
							>
								{statusLabels[order.status]}
							</span>
						</div>
						<ul className="mt-3 space-y-1 text-sm text-stone-600 dark:text-stone-400">
							{order.items.map((item) => (
								<li key={item.dishName}>
									{item.quantity} × {item.dishName}
								</li>
							))}
						</ul>
						<p className="mt-3 text-xs text-stone-400 dark:text-stone-500">
							Pedido a las{" "}
							{new Date(order.createdAt).toLocaleTimeString("es-PE", {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</p>
						{nextActions[order.status] && (
							<Button
								size="sm"
								className="mt-3 w-full"
								disabled={
									statusMutation.isPending &&
									statusMutation.variables?.id === order.id
								}
								onClick={() =>
									statusMutation.mutate({
										id: order.id,
										status: nextActions[order.status]!.next,
									})
								}
							>
								{nextActions[order.status]!.label}
							</Button>
						)}
					</article>
				))}
			</div>
		</>
	);
}
