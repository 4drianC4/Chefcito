"use client";

import { useState } from "react";
import { Button } from "@/src/shared/ui/button";
import { photoFileSchema } from "@/src/features/user/shared/schemas/photo.schema";
import type { UserResponseDto } from "@/src/features/user/backend/dto/user.dto";

type UserPhotoFormProps = {
	userId: string;
	photoUrl: string | null;
};

export function UserPhotoForm({ userId, photoUrl }: UserPhotoFormProps) {
	const [currentPhotoUrl, setCurrentPhotoUrl] = useState(photoUrl);
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);

	async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		setError(null);
		if (!file) return;

		// Validación en cliente con el mismo schema del servidor
		const validation = photoFileSchema.safeParse(file);
		if (!validation.success) {
			setError(validation.error.issues[0]?.message ?? "Archivo inválido");
			e.target.value = "";
			return;
		}

		setPending(true);
		const formData = new FormData();
		formData.append("photo", file);

		const response = await fetch(`/api/users/${userId}/photo`, {
			method: "POST",
			body: formData,
		});
		setPending(false);

		if (!response.ok) {
			const body = await response.json().catch(() => null);
			setError(body?.error ?? "No se pudo subir la foto");
			return;
		}

		const user: UserResponseDto = await response.json();
		setCurrentPhotoUrl(user.photoUrl);
	}

	return (
		<div className="space-y-3">
			{currentPhotoUrl && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={currentPhotoUrl}
					alt="Foto de usuario"
					className="h-24 w-24 rounded-full border border-slate-700 object-cover"
				/>
			)}

			<label className="block text-sm font-medium text-slate-300">
				Foto de usuario
				<input
					type="file"
					accept="image/png,image/jpeg,image/webp,image/gif"
					onChange={handleChange}
					disabled={pending}
					className="mt-2 block w-full text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-slate-100 hover:file:bg-slate-700"
				/>
			</label>

			{pending && <Button disabled className="w-full">Subiendo...</Button>}
			{error && <p className="text-xs text-red-400">{error}</p>}
		</div>
	);
}
