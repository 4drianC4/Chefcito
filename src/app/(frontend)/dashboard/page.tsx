import { redirect } from "next/navigation";
import { auth } from "@/src/features/auth";
import { LogoutButton } from "@/src/features/auth/frontend/LogoutButton";
import { UserPhotoForm } from "@/src/features/user/frontend/UserPhotoForm";
import { prisma } from "@/src/shared/prisma/client";
import { ThemeToggle } from "@/src/shared/ui/theme-toggle";

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
		<div className="min-h-screen bg-stone-50 p-5 dark:bg-stone-950 sm:p-8">
			<div className="mx-auto flex max-w-2xl justify-end"><ThemeToggle /></div>
			<div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 sm:p-8">
				<h1 className="mb-2 text-2xl font-bold text-stone-900 dark:text-stone-100">Dashboard</h1>
				<p className="mb-6 text-stone-600 dark:text-stone-400">
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
