"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button, buttonVariants } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

const MOCK_RESULTS = [
  { 
    id: 1,
    name: "TransPorto Logística", 
    rating: 4.8, 
    price: 850, 
    desc: "Melhor custo-benefício",
    badge: "Mais Rápido",
    icon: "🚚"
  },
  { 
    id: 2,
    name: "A Jato Mudanças", 
    rating: 4.9, 
    price: 1200, 
    desc: "Especialista em móveis frágeis",
    badge: "Premium",
    icon: "💎"
  },
  { 
    id: 3, 
    name: "Silva & Filhos", 
    rating: 4.5, 
    price: 720, 
    desc: "Opção econômica regional",
    badge: "Econômico",
    icon: "📦"
  },
]

export function QuoteFilters() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full space-y-10">
      <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Classificar Transportes</Label>
            <Select defaultValue="preco_asc">
              <SelectTrigger className="h-12 bg-background border-border/50 focus:ring-primary">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="preco_asc">🔥 Melhor Preço</SelectItem>
                <SelectItem value="preco_desc">Diamante (Maior Preço)</SelectItem>
                <SelectItem value="avaliacao">⭐ Avaliação (Apoio Segurado)</SelectItem>
                <SelectItem value="data">⏰ Data mais próxima</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-background/50 hover:bg-secondary/20 transition-colors">
              <Label htmlFor="seguro" className="flex flex-col space-y-1.5 cursor-pointer">
                <span className="font-bold text-foreground text-sm">Seguro Incluso</span>
                <span className="font-normal text-xs text-muted-foreground">Indispensável p/ eletrônicos</span>
              </Label>
              <Switch id="seguro" className="data-[state=checked]:bg-primary scale-110" />
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-background/50 hover:bg-secondary/20 transition-colors">
              <Label htmlFor="ajudantes" className="flex flex-col space-y-1.5 cursor-pointer">
                <span className="font-bold text-foreground text-sm">Com Ajudantes</span>
                <span className="font-normal text-xs text-muted-foreground">Para subir/descer escadas</span>
              </Label>
              <Switch id="ajudantes" defaultChecked className="data-[state=checked]:bg-primary scale-110" />
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-border/40">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Orçamento Máximo</Label>
              <Badge variant="secondary" className="px-3 py-1 font-mono text-sm bg-primary/10 text-primary border-primary/20">
                Até R$ 1.500
              </Badge>
            </div>
            <Slider defaultValue={[1500]} max={5000} step={100} className="w-full py-4 scale-y-110" />
          </div>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger 
              render={
                <Button className="w-full h-14 text-lg rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                  Ver Transportadoras
                </Button>
              }
            />
            <DialogContent className="sm:max-w-[500px] border-border/40 bg-card p-0 overflow-hidden rounded-3xl">
              <div className="p-8 bg-secondary/20 border-b border-border/40">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-black tracking-tighter">Resultados da Simulação</DialogTitle>
                  <DialogDescription className="text-base">
                    Encontramos <span className="text-foreground font-bold">3 parceiros</span> ideais para a volumetria da sua mudança.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {MOCK_RESULTS.map((res) => (
                  <div key={res.id} className="group relative flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-background/50 hover:border-primary/50 transition-all hover:bg-background">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl shadow-inner">
                        {res.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-foreground">{res.name}</h4>
                          <Badge variant="outline" className="text-[10px] uppercase font-black tracking-tight border-primary/30 text-primary py-0 px-1.5 h-4">
                            {res.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{res.desc}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-500 text-xs">★</span>
                          <span className="text-xs font-bold">{res.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground line-through opacity-50">R$ {Math.round(res.price * 1.2)}</div>
                      <div className="text-xl font-black text-primary leading-none">R$ {res.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              <DialogFooter className="p-8 pt-4 bg-secondary/10">
                <div className="w-full space-y-4">
                  <Link href="/login" className={buttonVariants({ className: "w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-primary/25" })}>
                    Fazer Cotação Real Grátis
                  </Link>
                  <Button variant="outline" className="w-full h-12 rounded-2xl border-border/50 gap-2 font-bold" onClick={() => {
                    const text = "Olha que massa essa simulação de mudança que fiz no MudaFácil!";
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                  }}>
                    <Share2 className="w-4 h-4" />
                    Enviar para um amigo
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground uppercase font-medium tracking-widest">
                    Valores aproximados baseados na média local.
                  </p>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
    </div>
  )
}
