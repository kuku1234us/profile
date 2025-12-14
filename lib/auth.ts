import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Clash19191";
const isProd = process.env.NODE_ENV === "production";
// In dev, fall back to a stable secret to avoid noisy JWT decryption errors after reloads.
// In production, you should always set NEXTAUTH_SECRET.
const NEXTAUTH_SECRET =
  process.env.NEXTAUTH_SECRET ??
  (isProd ? undefined : "dev-only-nextauth-secret");

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const password = credentials?.password;
        if (!password) return null;

        if (password !== ADMIN_PASSWORD) return null;

        return {
          id: "admin",
          name: "Admin",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  secret: NEXTAUTH_SECRET,
};
