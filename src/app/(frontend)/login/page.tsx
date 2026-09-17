import { LoginForm } from "@/src/features/auth/frontend/LoginForm";

export default function LoginPage() {
	return (
		<div className="min-h-screen bg-slate-950 p-6 sm:p-8">
			<div className="mx-auto max-w-md rounded-xl bg-slate-900 p-8 shadow-xl">
				<h2 className="mb-6 text-center text-2xl font-bold text-slate-100">
					Iniciar sesión
				</h2>

				<LoginForm />

				<p className="mt-6 text-center text-sm text-slate-400">
					¿No tienes cuenta?{" "}
					<a href="/register" className="text-amber-300 hover:underline">
						Regístrate
					</a>
				</p>
			</div>
		</div>
	);
}
