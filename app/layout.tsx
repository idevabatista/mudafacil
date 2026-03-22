import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MudaFácil | Simulação de Mudança Inteligente e Cotação Instantânea",
  description: "A plataforma nº 1 para planejar sua mudança. Simule a carga em 3D, escolha o caminhão ideal e receba cotações de transportadoras verificadas em segundos.",
  keywords: ["mudança residencial", "carreto", "simulador de mudança", "cotação de frete", "transporte de móveis"],
  openGraph: {
    title: "MudaFácil | Mude com Inteligência",
    description: "Simule sua mudança em 3D e economize até 30% com transportadoras verificadas.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
