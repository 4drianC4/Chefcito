"use client";

// Los archivos error.tsx DEBEN ser Client Components (Error Boundary)
import { Button } from "@/src/shared/ui/button";

export default function MenuError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-stone-50 p-5 dark:bg-stone-950">
			<div className="max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-xl dark:border-stone-800 dark:bg-stone-900">
				<h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
					No pudimos cargar la carta
				</h2>
				<p className="mt-2 text-sm text-rose-600 dark:text-rose-300">
					{error.message}
				</p>
				<Button onClick={() => reset()} className="mt-6">
					Reintentar
				</Button>
			</div>
		</div>
	);
}
