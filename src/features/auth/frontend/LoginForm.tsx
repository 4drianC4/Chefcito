"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { loginSchema } from "@/src/features/auth/shared/schemas/auth.schema";
import type { LoginDto } from "@/src/features/auth/backend/dto/auth.dto";

export function LoginForm() {
	const router = useRouter();
	const [authError, setAuthError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginDto>({
		resolver: zodResolver(loginSchema),
	});

	async function onSubmit(values: LoginDto) {
		setAuthError(null);

		const result = await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: false,
		});

		if (result?.error) {
			setAuthError("Credenciales incorrectas");
			return;
		}

		router.push("/dashboard");
		router.refresh();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{authError && (
				<p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-700 dark:text-red-300">
					{authError}
				</p>
			)}

			<div>
				<label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
					Correo electrónico
				</label>
				<Input
					type="email"
					placeholder="email@example.com"
					{...register("email")}
				/>
				{errors.email && (
					<p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>
				)}
			</div>

			<div>
				<label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
					Contraseña
				</label>
				<Input
					type="password"
					placeholder="••••••••"
					{...register("password")}
				/>
				{errors.password && (
					<p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.password.message}</p>
				)}
			</div>

			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
			</Button>
		</form>
	);
}
