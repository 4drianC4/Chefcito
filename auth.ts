import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "./src/shared/prisma/client";
import { verifyPassword } from "./src/features/user/backend/services/helpers/password";

const SALT_ROUNDS = 10;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { role: true },
        });

        if (!user || !user.active) {
          return null;
        }

        const passwordsMatch = await verifyPassword(
          credentials.password as string,
          user.password
        );

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          role: user.role?.name ?? null,
          active: user.active,
        };
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
    async signIn({ user }) {
      const userId = user.id;
      if (userId) {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const sessionToken = crypto.randomUUID();
        const sessionTokenHash = await bcrypt.hash(sessionToken, SALT_ROUNDS);

        await prisma.session.create({
          data: {
            sessionToken: sessionTokenHash,
            userId: userId as string,
            expires: expiresAt,
          },
        });
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