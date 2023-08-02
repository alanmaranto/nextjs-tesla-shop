import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    Credentials({
      name: 'Custom login',
      credentials: {
        email: { label: 'Email:', type: 'email', placeholder: "email@google.com" },
        password: { label: 'Password:', type: 'password', placeholder: "password" },
      },
      async authorize(credentials) {
        return null
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    
  }
});
