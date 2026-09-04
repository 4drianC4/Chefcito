import {
	deleteUserController,
	getUserByIdController,
	patchUserController,
	putUserController,
} from "@/src/features/user";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
	const { id } = await params;
	return getUserByIdController(id);
}

export async function PUT(request: Request, { params }: RouteContext) {
	const { id } = await params;
	return putUserController(id, request);
}

export async function PATCH(request: Request, { params }: RouteContext) {
	const { id } = await params;
	return patchUserController(id, request);
}

export async function DELETE(_request: Request, { params }: RouteContext) {
	const { id } = await params;
	return deleteUserController(id);
}
