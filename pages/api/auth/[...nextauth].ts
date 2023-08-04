import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "database";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    Credentials({
      name: "Custom login",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "email@google.com",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
  session: {
    maxAge: 2592000, // 30d
    strategy: "jwt",
    updateAge: 86400, // every day
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("token", token);
      console.log("account", account);
      console.log("user", user);
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            token.user = await dbUsers.oAuthToDbUser(
              user?.email || "",
              user?.name || ""
            );
            break;
          case "credentials":
            token.user = user;
            break;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session;
    },
  },
});
