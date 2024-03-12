import { JWT } from "next-auth/jwt";
import "next-auth";
declare module "next-auth" {
  interface User {
    readonly id: string;
    readonly email: string;
    readonly token: string;
  }
  interface Session {
    readonly role: string;
    readonly userId: string;
    readonly user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    userId: string;
  }
}
