import { uploadUserPhotoController } from "@/src/features/user";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: RouteContext) {
	const { id } = await params;
	return uploadUserPhotoController(id, request);
}
