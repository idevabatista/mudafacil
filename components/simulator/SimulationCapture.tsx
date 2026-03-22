"use client"

import React from "react"
import { getCookie, deleteCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { saveSimulation } from "@/app/actions/simulation"
import { toast } from "sonner"

export function SimulationCapture() {
  const router = useRouter()
  const hasCaptured = React.useRef(false)

  React.useEffect(() => {
    if (hasCaptured.current) return
    
    const pending = getCookie("pending_simulation")
    if (pending) {
      hasCaptured.current = true
      try {
        const data = JSON.parse(pending as string)
        
        const processCapture = async () => {
          await saveSimulation(data.truckId, data.volume)
          deleteCookie("pending_simulation")
          toast.success("Simulação recuperada com sucesso!", {
            description: "Seus dados da home foram salvos no seu perfil.",
          })
          router.refresh()
        }

        processCapture()
      } catch (error) {
        console.error("Erro ao capturar simulação pendente:", error)
        deleteCookie("pending_simulation")
      }
    }
  }, [router])

  return null
}
