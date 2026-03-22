"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, Sofa, Tv, Refrigerator, Bed, Lamp, Package, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const DEFAULT_ITEMS = [
  { id: "i1", nome: "Sofá 3 Lugares", categoria: "Sala", icone: <Sofa />, volume: 1.5, dim: "210x90x90cm" },
  { id: "i2", nome: "Geladeira Duplex", categoria: "Cozinha", icone: <Refrigerator />, volume: 1.2, dim: "70x180x75cm" },
  { id: "i3", nome: "Televisão 55\"", categoria: "Sala", icone: <Tv />, volume: 0.3, dim: "125x75x10cm" },
  { id: "i4", nome: "Cama Casal (Box)", categoria: "Quarto", icone: <Bed />, volume: 1.8, dim: "138x188x60cm" },
  { id: "i5", nome: "Abajur Moderno", categoria: "Quarto", icone: <Lamp />, volume: 0.1, dim: "40x40x60cm" },
  { id: "i6", nome: "Caixa Padrão G", categoria: "Diversos", icone: <Package />, volume: 0.2, dim: "60x60x60cm" },
]

export function ItemCatalog() {
  const [search, setSearch] = useState("")

  const filteredItems = DEFAULT_ITEMS.filter(i => 
    i.nome.toLowerCase().includes(search.toLowerCase()) || 
    i.categoria.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">Catálogo de Itens</h2>
          <p className="text-muted-foreground text-sm">Gerencie seu inventário padrão e consulte volumes logísticos.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Buscar item ou categoria..." 
            className="pl-10 bg-white/5 border-white/10 h-12 rounded-2xl focus:border-primary/50 transition-all text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="group bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] p-6 hover:border-primary/40 transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(item.icone as React.ReactElement, { size: 28 })}
              </div>
              <Badge variant="outline" className="bg-white/5 border-white/10 text-[9px] uppercase font-black tracking-widest px-3 py-1">
                {item.categoria}
              </Badge>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{item.nome}</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Dimensões: {item.dim}</p>
              </div>

              <div className="flex items-center justify-between py-3 border-y border-white/5">
                <div className="flex items-center gap-2">
                   <Package size={14} className="text-zinc-500" />
                   <span className="text-xs font-bold text-zinc-400">Volume</span>
                </div>
                <span className="text-sm font-black text-white">{item.volume} m³</span>
              </div>

              <Button variant="ghost" className="w-full justify-between h-10 hover:bg-white/5 hover:text-white group/btn">
                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Info size={14} className="text-primary/60" /> Ver Detalhes
                </span>
                <Plus size={16} className="group-hover/btn:rotate-90 transition-transform" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
            <Package size={48} className="mx-auto text-white/5 mb-4" />
            <h3 className="text-white font-bold">Nenhum item encontrado</h3>
            <p className="text-zinc-500 text-sm mt-2">Tente buscar por termos mais genéricos.</p>
        </div>
      )}
    </div>
  )
}
