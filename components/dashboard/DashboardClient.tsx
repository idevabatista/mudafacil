"use client"

import React, { useState } from "react"
import { DashboardLayout } from "./DashboardLayout"
import { MudancasList } from "./MudancasList"
import { ItemCatalog } from "./ItemCatalog"
import { PlansOverview } from "./PlansOverview"
import { RecordsView } from "./RecordsView"

interface DashboardClientProps {
  mudancas: any[]
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function DashboardClient({ mudancas, user }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState("mudancas")

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      user={user}
      mudancasCount={mudancas.length}
    >
      {activeTab === "mudancas" && <MudancasList mudancas={mudancas} />}
      {activeTab === "records" && <RecordsView mudancas={mudancas} />}
      {activeTab === "catalogo" && <ItemCatalog />}
      {activeTab === "planos" && <PlansOverview />}
    </DashboardLayout>
  )
}
