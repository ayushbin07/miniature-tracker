import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // TODO:
        // 1. Validate input
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        // 2. Find user
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user) {
          return null;
        }
        // 3. Compare password
        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword,
        );

        if (!isValidPassword) {
          return null;
        }

        // 4. Return user
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
    }

    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
    }

    return session;
  },
},
});
