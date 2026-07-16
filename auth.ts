import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Resend from "next-auth/providers/resend";

import { db } from "@/db";
import { accounts, users, verificationTokens } from "@/db/schema";

async function ensureUser(email: string) {
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing) return existing;

  const [created] = await db
    .insert(users)
    .values({
      email,
      name: "Dev Admin",
      emailVerified: new Date(),
    })
    .returning();

  return created;
}

function devAdminConfigured() {
  return Boolean(
    process.env.DEV_ADMIN_EMAIL?.trim() &&
      process.env.DEV_ADMIN_PASSWORD?.trim(),
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Resend({
      from: process.env.AUTH_RESEND_FROM ?? "Aramzor <onboarding@resend.dev>",
    }),
    Credentials({
      id: "dev-admin",
      name: "Dev Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!devAdminConfigured()) return null;

        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";

        const adminEmail = process.env.DEV_ADMIN_EMAIL!.trim().toLowerCase();
        const adminPassword = process.env.DEV_ADMIN_PASSWORD!;

        if (email !== adminEmail || password !== adminPassword) {
          return null;
        }

        const user = await ensureUser(adminEmail);
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? "Dev Admin",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    verifyRequest: "/login/verify",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) session.user.id = token.sub;
        if (typeof token.email === "string") session.user.email = token.email;
        if (typeof token.name === "string") session.user.name = token.name;
      }
      return session;
    },
  },
});
