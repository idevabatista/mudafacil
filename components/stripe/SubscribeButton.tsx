"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createCheckoutSession } from "@/app/actions/stripe"

interface SubscribeButtonProps {
  priceId: string
  className?: string
  text?: string
}

export function SubscribeButton({ priceId, className, text = "Assinar" }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      const url = await createCheckoutSession(priceId)
      if (url) {
        window.location.href = url
      }
    } catch (error: any) {
      console.error(error)
      if (error.message === "NEXT_REDIRECT") {
        // Ignora erros de redirecionamento interno do Next
        return;
      }
      alert(error.message || "Ocorreu um erro ao processar o pagamento.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      className={className} 
      onClick={handleSubscribe} 
      disabled={loading}
    >
      {loading ? "Aguarde..." : text}
    </Button>
  )
}
