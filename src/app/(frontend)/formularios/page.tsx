import { DishForm } from "@/src/features/menu/frontend/DishForm";
import { OrderForm } from "@/src/features/orders/frontend/OrderForm";

export default function FormulariosPage() {
	return (
		<div className="min-h-screen bg-stone-50 p-5 dark:bg-stone-950 sm:p-8">
			<div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
				<section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 sm:p-8">
					<h1 className="mb-1 text-xl font-bold text-stone-900 dark:text-stone-100">
						Nuevo platillo
					</h1>
					<p className="mb-6 text-sm text-stone-600 dark:text-stone-400">
						React Hook Form + Zod (Módulo 2: Menú)
					</p>
					<DishForm />
				</section>

				<section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 sm:p-8">
					<h1 className="mb-1 text-xl font-bold text-stone-900 dark:text-stone-100">
						Nuevo pedido
					</h1>
					<p className="mb-6 text-sm text-stone-600 dark:text-stone-400">
						Zustand + Zod (Módulo 4: Comandas)
					</p>
					<OrderForm />
				</section>
			</div>
		</div>
	);
}
