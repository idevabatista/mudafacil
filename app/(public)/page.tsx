"use client"

import React from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { TruckSelector } from "@/components/canvas/TruckSelector"
import { QuoteFilters } from "@/components/quote/QuoteFilters"
import { Badge } from "@/components/ui/badge"
import { SubscribeButton } from "@/components/stripe/SubscribeButton"

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MudaFácil",
    "url": "https://mudafacil.com.br",
    "logo": "https://mudafacil.com.br/logo.png",
    "description": "Plataforma de simulação 3D e cotação instantânea para mudanças residenciais.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mudafacil.com.br/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <span className="text-xl font-bold">M</span>
            </div>
            <span className="font-bold text-2xl tracking-tighter text-foreground">MudaFácil</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Preços</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Entrar
            </Link>
            <Link href="/login" className={buttonVariants({ variant: "default", className: "hidden sm:inline-flex rounded-full px-6 font-bold shadow-lg shadow-primary/25" })}>
              Começar Agora
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-48 min-h-[80vh] flex items-center">
          {/* Hero Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
            <img 
              src="/hero_logistic_truck_neon_1774141689233.png" 
              alt="MudaFácil Logistics Hub"
              className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
            />
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />
          
          <div className="container relative mx-auto px-4 flex flex-col items-center text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border/50">
               <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse"></span>
               Revolucionando as mudanças no Brasil
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter max-w-5xl leading-[1.1] text-foreground">
              Mude com inteligência.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Sem surpresas.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-light">
              Arraste seus móveis na tela, descubra o caminhão exato que você precisa e garanta as melhores transportadoras em segundos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
              <Link href="/login" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto text-lg h-14 px-8 rounded-full font-bold shadow-xl shadow-primary/20" })}>
                Fazer Cotação Grátis
              </Link>
              <a href="#features" className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto text-lg h-14 px-8 rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:bg-secondary" })}>
                Ver Funcionalidades
              </a>
            </div>
          </div>
        </section>

        {/* FEATURES INTERATIVAS */}
        <section id="features" className="py-24 bg-card border-y border-border/40">
          <div className="container mx-auto px-4 space-y-20">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Tudo sob controle</h2>
              <p className="text-xl text-muted-foreground font-light">
                Esqueça as planilhas complexas. O MudaFácil calcula sua volumetria em tempo real para você pagar apenas pelo espaço que realmente usar.
              </p>
            </div>
            
            {/* Painel Lado-a-Lado: Caminhão & Cotações */}
            <div className="grid lg:grid-cols-2 gap-8 items-stretch pt-8">
              
              {/* Coluna 1: Seletor */}
              <div className="flex flex-col h-full bg-background rounded-3xl border border-border/50 overflow-hidden shadow-2xl">
                <div className="p-10 space-y-4 bg-secondary/20 border-b border-border/50">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">Frota em Tempo Real</h3>
                    <p className="text-muted-foreground">Compare tamanhos e veja a ocupação do baú subir conforme você adiciona móveis na plataforma.</p>
                  </div>
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center bg-background/50">
                  <TruckSelector />
                </div>
              </div>

              {/* Coluna 2: Cotações */}
              <div className="flex flex-col h-full bg-background rounded-3xl border border-border/50 overflow-hidden shadow-2xl">
                <div className="p-10 space-y-4 bg-secondary/20 border-b border-border/50">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">Cotações Instantâneas</h3>
                    <p className="text-muted-foreground">Filtre parceiros logísticos por preço, seguro e avaliações. Encontre o match perfeito para o seu frete.</p>
                  </div>
                </div>
                <div className="flex-1 flex justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background items-center">
                  <QuoteFilters />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center space-y-6 mb-20 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Planos transparentes</h2>
              <p className="text-xl text-muted-foreground font-light">
                Modelos de assinatura pensados para embarcadores eventuais ou transportadoras em larga escala.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="flex flex-col rounded-3xl border border-border/50 bg-secondary/10 p-10 backdrop-blur-sm transition-transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-foreground mb-4">Essencial</h3>
                <div className="mb-6 flex items-baseline text-6xl font-black tracking-tighter">
                  <span>R$ 0</span><span className="text-xl text-muted-foreground font-medium ml-1">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground mb-8">Perfeito para mudanças pontuais e residenciais.</p>
                <ul className="mb-10 space-y-5 flex-1 text-muted-foreground text-sm font-medium">
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> 1 mudança ativa</li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> Simulador 3D (até 15 itens)</li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> 3 cotações de parceiros</li>
                </ul>
                <Link href="/login" className={buttonVariants({ variant: "outline", className: "w-full h-12 rounded-full border-border/50 hover:bg-secondary font-bold" })}>
                  Criar Conta
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col rounded-3xl border border-primary bg-card p-10 shadow-2xl shadow-primary/10 relative lg:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                    Mais Escolhido
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Pro</h3>
                <div className="mb-6 flex items-baseline text-6xl font-black tracking-tighter">
                  <span>29</span><span className="text-3xl text-primary font-bold">,90</span><span className="text-xl text-muted-foreground font-medium ml-1">/mês</span>
                </div>
                <p className="text-sm text-foreground/80 mb-8 border-b border-border/50 pb-8">Tudo do Essencial + recursos logísticos avançados.</p>
                <ul className="mb-10 space-y-5 flex-1 text-foreground text-sm font-medium">
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> Mudanças ilimitadas</li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> Simulador Livre (capacidade máxima)</li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> Dashboard Analítico</li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> Contato Direto (Drivers)</li>
                </ul>
                <SubscribeButton 
                  priceId={process.env.STRIPE_PRICE_ID_PRO || "price_placeholder"}
                  className="w-full h-12 rounded-full font-bold shadow-xl shadow-primary/25"
                  text="Começar Trial Grátis"
                />
              </div>
              
              {/* Enterprise / CTA */}
              <div className="flex flex-col rounded-3xl border border-border/50 bg-secondary/10 p-10 backdrop-blur-sm md:col-span-2 lg:col-span-1 transition-transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-foreground mb-4">Enterprise</h3>
                <div className="mb-6 text-2xl font-black tracking-tight mt-4">
                  Transportadoras & Frota
                </div>
                <p className="text-sm text-muted-foreground mb-8">Aumente o volume de fretes fechados operando na nossa plataforma com taxa zero de comissão na assinatura.</p>
                <div className="flex-1"></div>
                <Link href="/login" className={buttonVariants({ variant: "outline", className: "w-full h-12 rounded-full border-border/50 hover:bg-secondary font-bold mt-auto" })}>
                  Falar com Vendas
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 bg-background py-12 text-center text-muted-foreground text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} MudaFácil. Simplificando sua mudança sem estresse.</p>
        </div>
      </footer>
    </div>
  )
}
