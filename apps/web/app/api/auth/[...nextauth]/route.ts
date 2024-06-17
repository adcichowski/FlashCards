import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetcher } from "src/utils/fetcher";
import { jwtDecode } from "jwt-decode";

const handler = NextAuth({
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

        const res = await fetcher<{ userId: string; token: string; role: string }>("auth", {
          body: { email: credentials.email, password: credentials.password },
          method: "POST",
        });
        if (res.userId) {
          return { email: credentials.email, id: res.userId, token: res.token, role: res.role };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        const { role, userId } = jwtDecode<{ role: string; userId: string }>(user.token);

        return {
          ...token,
          ...user,
          token: user.token,
          role,
          userId,
        };
      }
      return token;
    },
    async session({ token, session }) {
      return { ...session, user: token };
    },
  },

  pages: { signIn: "/login", error: "/login" },
});

export { handler as GET, handler as POST };
