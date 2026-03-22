import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db as prisma } from "@/lib/db"
import { SimulationCapture } from "@/components/simulator/SimulationCapture"
import { DashboardClient } from "@/components/dashboard/DashboardClient"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const mudancas = await prisma.mudanca.findMany({
    where: { user_id: session.user.id },
    include: {
      caminhao: true,
      itens: {
        include: { item: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  const mudancasFormatadas = mudancas.map(m => {
    const volumeItens = m.itens.reduce((acc, mi) => acc + (mi.item.volume_m3 * mi.quantidade), 0)
    return {
      ...m,
      volume_total: volumeItens > 0 ? volumeItens : (m.caminhao?.capacidade_m3 ? Number((m.caminhao.capacidade_m3 * 0.7).toFixed(1)) : 5)
    }
  })

  return (
    <>
      <SimulationCapture />
      <DashboardClient
        mudancas={mudancasFormatadas}
        user={{
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        }}
      />
    </>
  )
}
