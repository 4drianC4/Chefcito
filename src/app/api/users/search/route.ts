import { searchUsersByNameController } from "@/src/features/user";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	return searchUsersByNameController({
		q: searchParams.get("q") ?? undefined,
		page: searchParams.get("page") ?? undefined,
		pageSize: searchParams.get("pageSize") ?? undefined,
	});
}