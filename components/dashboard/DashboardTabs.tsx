"use client"

import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Truck, Sparkles } from "lucide-react"
import { MudancaCard } from "./MudancaCard"
import { ItemCatalog } from "./ItemCatalog"
import { PlansOverview } from "./PlansOverview"

interface DashboardTabsProps {
  mudancas: any[]
}

export function DashboardTabs({ mudancas }: DashboardTabsProps) {
  return (
    <Tabs defaultValue="mudancas" className="w-full space-y-12">
      <div className="flex justify-center md:justify-start">
        <TabsList className="bg-white/5 border border-white/10 h-14 p-1 rounded-2xl">
          <TabsTrigger 
            value="mudancas" 
            className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-3"
          >
            <Truck size={16} /> 
            <span className="hidden md:inline">Minhas Mudanças</span>
            <span className="md:hidden">Mudanças</span>
          </TabsTrigger>
          <TabsTrigger 
            value="catalogo" 
            className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-3"
          >
            <Package size={16} /> 
            <span className="hidden md:inline">Catálogo de Itens</span>
            <span className="md:hidden">Catálogo</span>
          </TabsTrigger>
          <TabsTrigger 
            value="planos" 
            className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-bold text-xs uppercase tracking-widest flex items-center gap-3"
          >
            <Sparkles size={16} /> 
            <span className="hidden md:inline">Planos e Pagamentos</span>
            <span className="md:hidden">Planos</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="mudancas" className="mt-0 focus-visible:outline-none outline-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {mudancas.length > 0 ? (
            mudancas.map((mudanca) => (
              <MudancaCard key={mudanca.id} mudanca={mudanca} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
              <Truck size={64} className="mx-auto text-white/5 mb-6" />
              <h3 className="text-xl font-bold text-white">Nenhuma mudança ativa</h3>
              <p className="text-zinc-500 mt-2 max-w-md mx-auto">Sua lista está vazia. Comece uma nova simulação agora mesmo.</p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="catalogo" className="mt-0 focus-visible:outline-none outline-none">
        <ItemCatalog />
      </TabsContent>

      <TabsContent value="planos" className="mt-0 focus-visible:outline-none outline-none">
        <PlansOverview />
      </TabsContent>
    </Tabs>
  )
}
