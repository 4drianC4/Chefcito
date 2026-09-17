import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authorizeCredentialsController } from "@/src/features/auth/backend/controllers/auth/authorize";
import { registerUserSessionService } from "@/src/features/auth/backend/services/auth/registerUserSession";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email", placeholder: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					return await authorizeCredentialsController(credentials);
				} catch {
					// Credenciales inválidas: NextAuth responde con CredentialsSignin
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = (user as { role: string | null }).role;
				token.id = user.id;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.id) {
				session.user.id = token.id as string;
			}
			return session;
		},
		async signIn({ user }) {
			const userId = user.id;
			if (userId) {
				await registerUserSessionService(userId);
			}
			return true;
		},
	},
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.AUTH_SECRET,
});
