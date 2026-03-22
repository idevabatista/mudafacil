import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const fontSans = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const fontMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
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
      lang="pt-BR"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className={`${fontSans.variable} ${fontMono.variable} ${fontSans.className} font-sans min-h-full flex flex-col`}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
