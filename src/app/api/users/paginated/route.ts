import { getAllUsersPaginatedController } from "@/src/features/user";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	return getAllUsersPaginatedController({
		page: searchParams.get("page") ?? undefined,
		pageSize: searchParams.get("pageSize") ?? undefined,
	});
}
