import { LoginForm } from "@/src/features/auth/frontend/LoginForm";
import { ThemeToggle } from "@/src/shared/ui/theme-toggle";

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-stone-50 p-5 dark:bg-stone-950 sm:p-8">
			<div className="mx-auto flex max-w-md justify-end"><ThemeToggle /></div>
			<div className="mx-auto mt-12 max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 sm:p-8">
				<p className="mb-3 text-center text-sm font-bold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-400">Chefcito</p>
				<h2 className="mb-6 text-center text-2xl font-bold text-stone-900 dark:text-stone-100">
					Iniciar sesión
				</h2>

				<LoginForm />

				<p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
					¿No tienes cuenta?{" "}
					<a href="/register" className="text-emerald-700 hover:underline dark:text-emerald-400">
						Regístrate
					</a>
				</p>
			</div>
		</div>
	);
}
