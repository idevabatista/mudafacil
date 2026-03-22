import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || "7b5398d5705342a7b63f7362f689037e5ec4682570073286f9ee5b19b673ab74",
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.plan = (user as any).plan
      }
      return token
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string
        (session.user as any).plan = token.plan
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      const trialEndsAt = new Date()
      trialEndsAt.setDate(trialEndsAt.getDate() + 14)

      await db.user.update({
        where: { id: user.id },
        data: {
          plan: "TRIAL",
          trialEndsAt,
        }
      })
    }
  },
  pages: {
    signIn: "/login",
  }
})
