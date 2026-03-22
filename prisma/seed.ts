import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const trucks = [
    { id: "c1", nome: "Fiorino", tipo: "LEVE", capacidade_m3: 3.0, capacidade_kg: 650, comprimento_cm: 180, largura_cm: 120, altura_cm: 130, imagem_url: "" },
    { id: "c2", nome: "HR", tipo: "MEDIO", capacidade_m3: 8.0, capacidade_kg: 1800, comprimento_cm: 300, largura_cm: 180, altura_cm: 180, imagem_url: "" },
    { id: "c3", nome: "3/4", tipo: "PESADO", capacidade_m3: 15.0, capacidade_kg: 4000, comprimento_cm: 450, largura_cm: 220, altura_cm: 220, imagem_url: "" },
    { id: "c4", nome: "Baú", tipo: "EXTRA", capacidade_m3: 25.0, capacidade_kg: 6000, comprimento_cm: 600, largura_cm: 240, altura_cm: 240, imagem_url: "" },
  ]

  console.log('Seeding trucks...')
  for (const truck of trucks) {
    await prisma.caminhao.upsert({
      where: { id: truck.id },
      update: truck,
      create: truck,
    })
  }

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
