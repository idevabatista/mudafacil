"use client"

import React from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { JsonLd } from "@/components/seo/JsonLd"
import { LineWaves } from "@/components/ui/LineWaves"
import { UnifiedSimulator } from "@/components/simulator/UnifiedSimulator"
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
      <JsonLd data={jsonLd} />
      
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
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40 z-10" />
            <div className="absolute inset-0 z-5 opacity-30">
              <LineWaves
                speed={0.15}
                color1="#FF5C00"
                color2="#FF8A00"
                color3="#FFAE00"
                brightness={0.15}
                innerLineCount={40}
                outerLineCount={20}
                enableMouseInteraction={false}
              />
            </div>
            <img
              src="/moving_truck_highway_night_bg.png"
              alt="MudaFácil Logistics Truck on Road"
              className="w-full h-full object-cover opacity-70 scale-105 animate-slow-zoom"
            />
          </div>

          <div className="absolute top-1/2 left-0 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0 -translate-x-1/2" />

          <div className="container relative mx-auto px-4 flex flex-col items-start text-left space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border/50">
              <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Mudança rápida, simples e sem dor de cabeça
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter max-w-5xl leading-[1.1] text-foreground">
              Sua mudança,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">do jeito certo.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-light">
              Liste seus itens, escolha o caminhão ideal e receba cotações de transportadoras verificadas em minutos. Sem ligar para ninguém.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto items-start">
              <a href="#simulator" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto text-lg h-14 px-8 rounded-full font-bold shadow-xl shadow-primary/20 cursor-pointer" })}>
                Cotar Agora — É Grátis
              </a>
              <a href="#features" className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto text-lg h-14 px-8 rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:bg-secondary" })}>
                Como funciona →
              </a>
            </div>
          </div>
        </section>

        {/* SIMULATOR SECTION */}
        <section id="simulator" className="py-24 bg-secondary/30 relative overflow-hidden border-y border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,92,0,0.05),transparent_50%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
                Monte sua mudança <span className="text-primary italic">agora</span>
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                Adicione seus itens, veja o volume em tempo real e descubra qual caminhão cabe tudo — sem suposições.
              </p>
            </div>

            <UnifiedSimulator />
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Só transportadoras que você pode confiar</h2>
                  <p className="text-xl text-muted-foreground font-light leading-relaxed">
                    Verificamos cada parceiro antes de ele aparecer pra você. Segurança não é opcional.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl font-bold border border-border/50">🛡️</div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold italic underline decoration-primary decoration-2 underline-offset-4">Carga sempre segurada</h4>
                      <p className="text-muted-foreground text-sm">Todo parceiro tem apólice de carga ativa. Se algo acontecer, você está coberto.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl font-bold border border-border/50">⭐</div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold italic underline decoration-primary decoration-2 underline-offset-4">Avaliações de quem usou de verdade</h4>
                      <p className="text-muted-foreground text-sm">Só quem fez a mudança com aquela transportadora pode avaliar. Zero estrelas falsas.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl font-bold border border-border/50">✅</div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold italic underline decoration-primary decoration-2 underline-offset-4">Parceiros verificados na entrada</h4>
                      <p className="text-muted-foreground text-sm">Documentos, CNPJ e antecedentes revisados antes de qualquer cadastro aprovado.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-square bg-secondary/20 rounded-[4rem] border border-border/50 overflow-hidden">
                <img
                  src="/family_trust.png"
                  alt="Família feliz no dia da mudança"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10 space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight text-white">Sua tranquilidade é nossa métrica principal.</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Junte-se a mais de 1.200 famílias que mudaram sem uma única surpresa no preço final.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-left space-y-6 mb-20 max-w-2xl mr-auto">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Planos transparentes</h2>
              <p className="text-xl text-muted-foreground font-light">
                Modelos de assinatura pensados para embarcadores eventuais ou transportadoras em larga escala.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col rounded-3xl border border-border/50 bg-secondary/10 p-10 backdrop-blur-sm transition-transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-foreground mb-4">Essencial</h3>
                <div className="mb-6 flex items-baseline text-6xl font-black tracking-tighter">
                  <span>R$ 0</span><span className="text-xl text-muted-foreground font-medium ml-1">/mês</span>
                </div>
                <p className="text-sm text-muted-foreground mb-8">Perfeito para mudanças pontuais e residenciais.</p>
                <ul className="mb-10 space-y-5 flex-1 text-muted-foreground text-sm font-medium">
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> 1 mudança ativa</li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> Simulador 3D Ilimitado</li>
                  <li className="flex items-start gap-3"><span className="text-primary font-bold">✓</span> 3 orçamentos automáticos</li>
                </ul>
                <Link href="/login" className={buttonVariants({ variant: "outline", className: "w-full h-14 rounded-2xl font-bold border-border shadow-sm" })}>
                  Começar Agora
                </Link>
              </div>

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
