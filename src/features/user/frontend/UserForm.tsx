"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useUserStore } from "@/src/shared/stores/useUserStore";

const userSchema = z.object({
  name: z.string().min(2, "Escribe al menos 2 caracteres"),
  email: z.string().email("Introduce un email válido"),
});

type UserFormValues = z.infer<typeof userSchema>;

export function UserForm() {
  const [message, setMessage] = useState<string | null>(null);
  const setLastCreatedEmail = useUserStore((state) => state.setLastCreatedEmail);
  const lastCreatedEmail = useUserStore((state) => state.lastCreatedEmail);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: UserFormValues) {
    setMessage(null);
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, lastName: "", password: "temporary" }),
    });

    if (!response.ok) {
      setMessage("No se pudo crear el usuario");
      return;
    }

    setLastCreatedEmail(values.email);
    setMessage("Usuario creado correctamente");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
        Nombre
        <Input {...register("name")} className="mt-2" />
        {errors.name && <span className="mt-1 block text-xs text-rose-600 dark:text-rose-300">{errors.name.message}</span>}
      </label>
      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
        Email
        <Input type="email" {...register("email")} className="mt-2" />
        {errors.email && <span className="mt-1 block text-xs text-rose-600 dark:text-rose-300">{errors.email.message}</span>}
      </label>
      <Button type="submit" disabled={isSubmitting}>Crear usuario</Button>
      {message && <p className="text-sm text-emerald-700 dark:text-emerald-300">{message}</p>}
      {lastCreatedEmail && <p className="text-xs text-stone-500">Último registro: {lastCreatedEmail}</p>}
    </form>
  );
}