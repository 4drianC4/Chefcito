import { Client } from "minio";

const globalForMinio = globalThis as unknown as { minio?: Client };

export const MINIO_BUCKET = process.env.MINIO_BUCKET ?? "chefcito";
const MINIO_PUBLIC_URL =
	process.env.MINIO_PUBLIC_URL ?? "http://localhost:9000";

function createClient() {
	return new Client({
		endPoint: process.env.MINIO_ENDPOINT ?? "localhost",
		port: Number(process.env.MINIO_PORT ?? 9000),
		useSSL: false,
		accessKey: process.env.MINIO_ACCESS_KEY ?? "minioadmin",
		secretKey: process.env.MINIO_SECRET_KEY ?? "minioadmin",
	});
}

export const minio = globalForMinio.minio ?? createClient();

if (process.env.NODE_ENV !== "production") globalForMinio.minio = minio;

export async function ensureBucket() {
	const exists = await minio.bucketExists(MINIO_BUCKET);
	if (!exists) {
		await minio.makeBucket(MINIO_BUCKET);
	}

	// Política de lectura pública para que el navegador pueda mostrar las fotos
	const policy = JSON.stringify({
		Version: "2012-10-17",
		Statement: [
			{
				Effect: "Allow",
				Principal: { AWS: ["*"] },
				Action: ["s3:GetObject"],
				Resource: [`arn:aws:s3:::${MINIO_BUCKET}/*`],
			},
		],
	});
	await minio.setBucketPolicy(MINIO_BUCKET, policy);
}

export function buildPublicUrl(objectName: string) {
	return `${MINIO_PUBLIC_URL}/${MINIO_BUCKET}/${objectName}`;
}
