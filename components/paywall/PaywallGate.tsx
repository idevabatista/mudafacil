import React from "react"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaywallGateProps {
  hasAccess: boolean;
  featureName: string;
  description: string;
  children: React.ReactNode;
}

export function PaywallGate({ hasAccess, featureName, description, children }: PaywallGateProps) {
  if (hasAccess) return <>{children}</>

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 text-card-foreground text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Lock className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold tracking-tight">Desbloqueie {featureName}</h3>
      <p className="mb-6 text-muted-foreground">{description}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button size="lg" className="w-full sm:w-auto">
          Fazer Upgrade
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          Iniciar Trial de 14 dias
        </Button>
      </div>
    </div>
  )
}
