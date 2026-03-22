import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"

export default {
  providers: [
    Google,
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "onboarding@resend.dev",
    }),
  ],
} satisfies NextAuthConfig
