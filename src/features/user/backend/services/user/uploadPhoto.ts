import { randomUUID } from "node:crypto";
import { prisma } from "@/src/shared/prisma/client";
import {
	buildPublicUrl,
	ensureBucket,
	minio,
	MINIO_BUCKET,
} from "@/src/shared/minio/client";
import type { UserIdDto } from "@/src/features/user/backend/dto/user.dto";
import type { PhotoFileDto } from "@/src/features/user/backend/dto/photo.dto";
import { toUserDto } from "@/src/features/user/backend/services/shared";
import { NotFoundError } from "@/src/features/user/backend/controllers/shared";

export async function uploadUserPhotoService(
	id: UserIdDto,
	file: PhotoFileDto,
) {
	const existing = await prisma.user.findFirst({
		where: { id: id.id, deletedAt: null },
	});
	if (!existing) {
		throw new NotFoundError();
	}

	const extension = file.name.split(".").pop() ?? "png";
	const objectName = `users/${id.id}/${randomUUID()}.${extension}`;
	const buffer = Buffer.from(await file.arrayBuffer());

	await ensureBucket();
	await minio.putObject(MINIO_BUCKET, objectName, buffer, buffer.length, {
		"Content-Type": file.type,
	});

	const photoUrl = buildPublicUrl(objectName);

	const user = await prisma.user.update({
		where: { id: id.id },
		data: { photoUrl },
	});

	return toUserDto(user);
}
