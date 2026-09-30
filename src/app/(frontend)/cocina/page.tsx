import { KitchenQueue } from "@/src/features/orders/frontend/KitchenQueue";

export default function CocinaPage() {
	return (
		<div className="min-h-screen bg-stone-50 p-5 dark:bg-stone-950 sm:p-8">
			<div className="mx-auto max-w-5xl">
				<h1 className="mb-1 text-2xl font-bold text-stone-900 dark:text-stone-100">
					Cola de cocina
				</h1>
				<p className="mb-8 text-sm text-stone-600 dark:text-stone-400">
					Día 14: datos en el cliente con TanStack Query (Módulo 4)
				</p>
				<KitchenQueue />
			</div>
		</div>
	);
}
