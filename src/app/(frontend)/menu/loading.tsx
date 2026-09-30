import { Skeleton } from "@/src/shared/ui/skeleton";

function DishCardSkeleton() {
	return (
		<div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
			<div className="flex items-start justify-between gap-2">
				<Skeleton className="h-5 w-40" />
				<Skeleton className="h-5 w-16" />
			</div>
			<Skeleton className="mt-2 h-4 w-full" />
			<Skeleton className="mt-1 h-4 w-3/4" />
			<div className="mt-3 flex gap-2">
				<Skeleton className="h-5 w-16 rounded-full" />
				<Skeleton className="h-5 w-24 rounded-full" />
			</div>
		</div>
	);
}

export default function MenuLoading() {
	return (
		<div className="min-h-screen bg-stone-50 p-5 dark:bg-stone-950 sm:p-8">
			<div className="mx-auto max-w-4xl">
				<Skeleton className="mb-1 h-8 w-64" />
				<Skeleton className="mb-8 h-4 w-80" />
				{[1, 2].map((section) => (
					<section key={section} className="mb-8">
						<Skeleton className="mb-4 h-6 w-32" />
						<div className="grid gap-4 sm:grid-cols-2">
							{[1, 2, 3, 4].map((card) => (
								<DishCardSkeleton key={card} />
							))}
						</div>
					</section>
				))}
			</div>
		</div>
	);
}
