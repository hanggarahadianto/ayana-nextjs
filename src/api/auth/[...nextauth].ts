import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Extend the Session type to include accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
import { APIAxiosInstance } from "@/src/api";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Attempting login with", credentials);
          const response = await APIAxiosInstance.post("/auth/login", {
            username: credentials?.username,
            password: credentials?.password,
          });

          console.log("Login response", response.data);
          if (response.data) {
            return response.data;
          }
        } catch (error) {
          console.error("Login error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      console.log("JWT callback", { token, user });
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback", { session, token });
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable NextAuth debugging
};

export default NextAuth(authOptions);
