"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Shield, Zap, CreditCard, Sparkles } from "lucide-react"

export function PlansOverview() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">Planos e Pagamentos</h2>
          <p className="text-muted-foreground text-sm">Gerencie sua assinatura e acesse recursos exclusivos.</p>
        </div>
        <div className="flex items-center gap-3">
           <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 font-black uppercase text-[10px] tracking-[0.2em]">
              Seu Plano: Trial Ativo
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Current Plan Card */}
        <Card className="bg-white/[0.03] backdrop-blur-3xl border-primary/40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Shield size={120} className="text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-primary uppercase tracking-[0.3em]">Status Atual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-4xl font-black text-white">Trial Logístico</h3>
              <p className="text-muted-foreground text-sm font-medium">Acesso total às ferramentas de simulação e inventário.</p>
            </div>

            <div className="space-y-4">
              {[
                "Simuladores de Caminhão Ilimitados",
                "Inventário de Itens Completo",
                "Cotações com 5 Transportadoras",
                "Layout de Carga Inteligente"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Check size={12} className="text-primary" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Próxima Cobrança</p>
                  <p className="text-sm font-black text-white">21 de Abril, 2026</p>
               </div>
               <Button variant="outline" className="border-white/10 text-white font-bold h-12 px-8 rounded-2xl hover:bg-white/5">
                 Ver Histórico
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Card */}
        <Card className="bg-primary border-none relative overflow-hidden group shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity">
            <Zap size={120} className="text-white" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-white/60 uppercase tracking-[0.3em]">Recomendado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-1">
              <h3 className="text-4xl font-black text-white">Mudafácil PRO</h3>
              <p className="text-white/80 text-sm font-medium">Contratação direta, seguros e gestão multi-mudança.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white font-bold">
                 <Sparkles size={18} />
                 Todas as features do Trial +
              </div>
              {[
                "Até 50 mudanças simultâneas",
                "Seguro de Carga Incluso (R$ 50k)",
                "Suporte 24h via WhatsApp",
                "Dashboards de BI Logístico"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/90">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <Check size={12} className="text-white" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <Button className="w-full h-14 bg-white text-primary font-black uppercase tracking-widest text-sm rounded-2xl shadow-2xl hover:scale-[1.02] transition-transform">
              Upgrade para PRO <CreditCard size={18} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
