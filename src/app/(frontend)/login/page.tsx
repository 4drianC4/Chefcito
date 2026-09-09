"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [pending, setPending] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setErrors({});
    setPending(true);

    try {
      await signIn("credentials", { email, password, redirect: false });
      setPending(false);
      redirect("/dashboard");
    } catch (error: unknown) {
      setPending(false);
      const err = error as { type?: string };
      if (err.type === "CredentialsSignin") {
        setErrors({ password: "Credenciales incorrectas" });
      } else {
        setErrors({ email: "Error durante el inicio de sesión" });
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-8">
      <div className="max-w-md mx-auto bg-slate-900 rounded-xl p-8 shadow-xl">
        <h2 className="text-center text-2xl font-bold text-slate-100 mb-6">Iniciar sesión</h2>

        {errors.email && <p className="text-red-400 text-sm mb-2">{errors.email}</p>}
        {errors.password && <p className="text-red-400 text-sm mb-6">{errors.password}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              className="w-full border border-slate-600 rounded px-3 py-2 bg-slate-800 text-slate-100 focus:outline-none focus:border-slate-400"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="w-full border border-slate-600 rounded px-3 py-2 bg-slate-800 text-slate-100 focus:outline-none focus:border-slate-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-slate-950 font-medium py-2 rounded hover:bg-amber-500 transition-colors disabled:opacity-50"
            disabled={pending}
          >
            {pending ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          ¿No tienes cuenta? <a href="/register" className="text-amber-300 hoverunderline">Regístrate</a>
        </p>
      </div>
    </div>
  );
}