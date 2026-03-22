import Stripe from "stripe"

export const createStripeClient = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY não foi definida.")
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-02-25.clover", // Updated to latest or allowed version
    typescript: true,
  })
}

// Proxied stripe client that initializes lazily
export const stripe = new Proxy({} as Stripe, {
  get: (target, prop) => {
    return Reflect.get(createStripeClient(), prop)
  }
})
