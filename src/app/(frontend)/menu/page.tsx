import { getAllDishesService } from "@/src/features/menu/backend/services/dish/crud/getAll";
import type { DishResponseDto } from "@/src/features/menu/backend/dto/dish.dto";
import { DISH_CATEGORIES } from "@/src/features/menu/shared/schemas/dish.schema";

// La carta cambia cuando el admin crea/edita platillos: siempre datos frescos
export const dynamic = "force-dynamic";


async function getDishes(): Promise<DishResponseDto[]> {
	return getAllDishesService();
}

const categoryLabels: Record<(typeof DISH_CATEGORIES)[number], string> = {
	entradas: "Entradas",
	platos_fuertes: "Platos fuertes",
	postres: "Postres",
	bebidas: "Bebidas",
	ensaladas: "Ensaladas",
};

export default async function MenuPage() {
	const dishes = await getDishes();

	return (
		<div className="min-h-screen bg-stone-50 p-5 dark:bg-stone-950 sm:p-8">
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-1 text-2xl font-bold text-stone-900 dark:text-stone-100">
					Carta del restaurante
				</h1>
				<p className="mb-8 text-sm text-stone-600 dark:text-stone-400">
					Día 14: datos leídos en el servidor (Server Component)
				</p>

				{DISH_CATEGORIES.map((category) => {
					const categoryDishes = dishes.filter((d) => d.category === category);
					if (categoryDishes.length === 0) return null;
					return (
						<section key={category} className="mb-8">
							<h2 className="mb-4 text-lg font-semibold text-stone-800 dark:text-stone-200">
								{categoryLabels[category]}
							</h2>
							<div className="grid gap-4 sm:grid-cols-2">
								{categoryDishes.map((dish) => (
									<article
										key={dish.id}
										className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900"
									>
										<div className="flex items-start justify-between gap-2">
											<h3 className="font-semibold text-stone-900 dark:text-stone-100">
												{dish.name}
											</h3>
											<span className="shrink-0 font-bold text-emerald-700 dark:text-emerald-400">
												S/ {dish.price.toFixed(2)}
											</span>
										</div>
										<p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
											{dish.description}
										</p>
										<div className="mt-3 flex flex-wrap gap-2 text-xs">
											<span className="rounded-full bg-stone-100 px-2 py-0.5 text-stone-600 dark:bg-stone-800 dark:text-stone-300">
												{dish.preparationTime} min
											</span>
											{dish.isVegetarian && (
												<span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
													Vegetariano
												</span>
											)}
											{!dish.available && (
												<span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
													No disponible
												</span>
											)}
										</div>
									</article>
								))}
							</div>
						</section>
					);
				})}
			</div>
		</div>
	);
}
