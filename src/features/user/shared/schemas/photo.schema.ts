import { z } from "zod";

export const ALLOWED_IMAGE_MIME_TYPES = [
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/gif",
] as const;

const MAX_FILE_SIZE_MB = 5;

export const photoFileSchema = z
	.file()
	.max(
		MAX_FILE_SIZE_MB * 1024 * 1024,
		`La imagen debe pesar menos de ${MAX_FILE_SIZE_MB}MB`,
	)
	.mime([...ALLOWED_IMAGE_MIME_TYPES], "Solo se permiten imágenes (png, jpg, webp, gif)");
