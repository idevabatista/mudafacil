"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Truck, Package, Sparkles, Home, 
  LogOut, HelpCircle, ChevronRight, Plus, ClipboardList
} from "lucide-react"
import { signOut } from "next-auth/react"
import { NewChangeModal } from "@/components/simulator/NewChangeModal"


const NAV_ITEMS = [
  { id: "mudancas", label: "Minhas Mudanças", icon: <Truck size={18} /> },
  { id: "records", label: "Registros", icon: <ClipboardList size={18} /> },
  { id: "catalogo", label: "Catálogo de Itens", icon: <Package size={18} /> },
  { id: "planos", label: "Planos e Pagamentos", icon: <Sparkles size={18} /> },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
  user: { name?: string | null; email?: string | null; image?: string | null }
  mudancasCount: number
}

export function DashboardLayout({ children, activeTab, onTabChange, user, mudancasCount }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 flex flex-col bg-zinc-900 border-r border-white/5 h-screen sticky top-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Truck size={18} className="text-white" />
            </div>
            <span className="font-black tracking-tight text-lg text-white">MudaFácil</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-left group
                ${activeTab === item.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span className={`${activeTab === item.id ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                {item.icon}
              </span>
              {item.label}
              {item.id === "mudancas" && mudancasCount > 0 && (
                <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${activeTab === item.id ? "bg-white/20 text-white" : "bg-white/10 text-zinc-400"}`}>
                  {mudancasCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="px-4 pb-4 space-y-1 border-t border-white/5 pt-4">
          <a href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-zinc-500 hover:bg-white/5 hover:text-white transition-all">
            <Home size={18} /> Home
          </a>
          <a href="/support" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-zinc-500 hover:bg-white/5 hover:text-white transition-all">
            <HelpCircle size={18} /> Suporte
          </a>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group">
            {user.image ? (
              <img src={user.image} alt={user.name || ""} className="w-9 h-9 rounded-full ring-2 ring-white/10" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">
                {user.name?.[0] || "U"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-zinc-600 hover:text-red-400 transition-colors"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>MudaFácil</span>
            <ChevronRight size={14} />
            <span className="text-white font-semibold capitalize">
              {NAV_ITEMS.find(n => n.id === activeTab)?.label}
            </span>
          </div>
          <NewChangeModal />
        </header>

        {/* Page content rendered here */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
