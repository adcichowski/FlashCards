import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { fetcher } from "src/utils/fetcher";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;
        const res = await fetcher<{ userId: string; token: string }>({
          body: credentials,
          endpoint: "/auth",
          method: "POST",
        });
        if (res.userId) {
          return { email: credentials.email, id: res.userId };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/account" },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
