"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"

export async function createCheckoutSession(priceId: string) {
  const session = await auth()
  
  if (!session?.user || !session.user.email) {
    redirect("/login")
  }

  // Se o priceId for um placeholder (de testes), disparamos erro amigável
  if (!priceId || priceId === "price_placeholder") {
    throw new Error("Stripe Price ID não configurado no painel.")
  }

  const dbUser = await db.user.findUnique({
    where: { email: session.user.email }
  })

  if (!dbUser) {
    throw new Error("Usuário não encontrado.")
  }

  let stripeCustomerId = dbUser.stripeCustomerId

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      name: session.user.name || undefined,
    })
    stripeCustomerId = customer.id
    await db.user.update({
      where: { id: dbUser.id },
      data: { stripeCustomerId },
    })
  }

  const stripeSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout_success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
  })

  if (!stripeSession.url) {
    throw new Error("Erro ao criar sessão de checkout.")
  }

  return stripeSession.url
}
