import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: string;
    } & DefaultSession["user"];
    token: string;
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    token: string;
  }
}
