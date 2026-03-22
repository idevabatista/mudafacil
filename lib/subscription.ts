import { User, Plan } from "@prisma/client"

export function isTrialActive(user: User): boolean {
  if (!user.trialEndsAt) return false;
  return user.plan === "TRIAL" && user.trialEndsAt.getTime() > Date.now();
}

export function isSubscribed(user: User): boolean {
  if (!user.stripeCurrentPeriodEnd) return false;
  return user.plan === "PRO" && user.stripeCurrentPeriodEnd.getTime() > Date.now();
}

export function hasAccess(user: User): boolean {
  return isTrialActive(user) || isSubscribed(user) || user.plan === "FREE";
}

export function daysLeftInTrial(user: User): number {
  if (!user.trialEndsAt) return 0;
  const diff = user.trialEndsAt.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export const PLAN_LIMITS = {
  FREE: {
    maxMudancas: 1,
    maxItens: 15,
    maxCotacoes: 3,
    advancedFilters: false,
  },
  TRIAL: {
    maxMudancas: Infinity,
    maxItens: Infinity,
    maxCotacoes: Infinity,
    advancedFilters: true,
  },
  PRO: {
    maxMudancas: Infinity,
    maxItens: Infinity,
    maxCotacoes: Infinity,
    advancedFilters: true,
  }
}

export function checkUsageLimit(user: User, resource: 'mudancas' | 'itens' | 'cotacoes' | 'filtros'): boolean {
  if (isSubscribed(user) || isTrialActive(user)) return true;
  
  // Se for FREE, tem que validar no banco os counts, 
  // Na pratica, essa funcao vai servir como um boolean de permissionamento rápido
  // Os limites reais de "quantos ja tem" seriam checados nos services/routers
  
  if (resource === 'filtros') {
    return PLAN_LIMITS[user.plan]?.advancedFilters ?? false;
  }

  // Para quantitativos, retorna true assumindo que a validacao de contagem acontece na mutation
  return true;
}
