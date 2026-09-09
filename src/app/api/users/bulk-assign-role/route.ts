import { bulkAssignRoleController } from "@/src/features/user";

export async function POST(request: Request) {
	return bulkAssignRoleController(request);
}