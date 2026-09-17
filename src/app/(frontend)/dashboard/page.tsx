import { redirect } from "next/navigation";
import { auth } from "@/src/features/auth";
import { LogoutButton } from "@/src/features/auth/frontend/LogoutButton";
import { UserPhotoForm } from "@/src/features/user/frontend/UserPhotoForm";
import { prisma } from "@/src/shared/prisma/client";

export default async function DashboardPage() {
	const session = await auth();

	if (!session?.user?.id) {
		redirect("/login");
	}
	const userId = session.user.id;

	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { photoUrl: true },
	});

	return (
		<div className="min-h-screen bg-slate-950 p-6 sm:p-8">
			<div className="mx-auto max-w-2xl rounded-xl bg-slate-900 p-8 shadow-xl">
				<h1 className="mb-2 text-2xl font-bold text-slate-100">Dashboard</h1>
				<p className="mb-6 text-slate-400">
					Bienvenido, {session.user.name ?? session.user.email}.
				</p>
				<div className="mb-6">
					<UserPhotoForm
						userId={userId}
						photoUrl={user?.photoUrl ?? null}
					/>
				</div>
				<LogoutButton />
			</div>
		</div>
	);
}
