"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const mounted = useSyncExternalStore(
		() => () => undefined,
		() => true,
		() => false,
	);

	if (!mounted) return null;

	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={isDark ? "Usar tema claro" : "Usar tema oscuro"}
			className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 transition hover:border-emerald-600 hover:text-emerald-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
		>
			{isDark ? <Sun size={17} /> : <Moon size={17} />}
		</button>
	);
}