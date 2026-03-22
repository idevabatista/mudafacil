"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function saveSimulation(truckId: string, volume: number, origem?: string, destino?: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Você precisa estar logado para salvar uma simulação.")
  }

  const mudanca = await db.mudanca.create({
    data: {
      user_id: session.user.id,
      endereco_origem: origem || "A definir",
      endereco_destino: destino || "A definir",
      data_desejada: new Date(),
      status: "PENDENTE",
      caminhao_id: truckId,
    }
  })

  revalidatePath("/dashboard")
  return mudanca
}

export async function deleteMudanca(mudancaId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Não autenticado.")

  // Garante que o usuário só pode deletar suas próprias mudanças
  await db.mudanca.deleteMany({
    where: { id: mudancaId, user_id: session.user.id }
  })

  revalidatePath("/dashboard")
}

export async function updateMudancaEnderecos(mudancaId: string, origem: string, destino: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Não autenticado.")

  await db.mudanca.updateMany({
    where: { id: mudancaId, user_id: session.user.id },
    data: {
      endereco_origem: origem,
      endereco_destino: destino,
    }
  })

  revalidatePath("/dashboard")
}
