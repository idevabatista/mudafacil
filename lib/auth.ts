import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db"
import { Plan } from "@prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Resend({
      from: "no-reply@seu-projeto.vercel.app",
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // The user object from database could be passed if needed,
        // but NextAuth default doesn't pass all custom fields automatically.
        // We will fetch User independently when needed for subscription info.
      }
      return session;
    }
  },
  events: {
    async createUser({ user }) {
      // Primeiro login -> TRIAL 14 dias
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 14);

      await db.user.update({
        where: { id: user.id },
        data: {
          plan: "TRIAL",
          trialEndsAt,
        }
      });
    }
  },
  pages: {
    signIn: "/login",
  }
})
