import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    userId: string;
    username: string;
    token: string;
  }
}
