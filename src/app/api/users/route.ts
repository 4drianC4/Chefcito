import {
	createUserController,
	getAllUsersController,
} from "@/src/features/user";

export async function GET() {
	return getAllUsersController();
}

export async function POST(request: Request) {
	return createUserController(request);
}
