// Cálculos derivados dos dados mockados — usados no Dashboard e nos Relatórios.

export const OPEN_STAGES = ['novo', 'qualificacao', 'proposta', 'negociacao']

export const isOpen = (deal) => OPEN_STAGES.includes(deal.stage)
export const isWon = (deal) => deal.stage === 'ganho'
export const isLost = (deal) => deal.stage === 'perdido'

export function pipelineMetrics(deals) {
  const open = deals.filter(isOpen)
  const won = deals.filter(isWon)
  const lost = deals.filter(isLost)

  const openValue = open.reduce((s, d) => s + d.value, 0)
  const wonValue = won.reduce((s, d) => s + d.value, 0)
  const lostValue = lost.reduce((s, d) => s + d.value, 0)

  // Receita prevista = valor em aberto ponderado pela probabilidade
  const forecast = open.reduce((s, d) => s + d.value * (d.probability / 100), 0)

  const closed = won.length + lost.length
  const conversionRate = closed ? (won.length / closed) * 100 : 0
  const avgTicket = won.length ? wonValue / won.length : 0

  return {
    open, won, lost,
    openCount: open.length,
    wonCount: won.length,
    lostCount: lost.length,
    openValue, wonValue, lostValue,
    forecast,
    conversionRate,
    avgTicket,
    totalValue: openValue + wonValue,
  }
}

/** Desempenho consolidado por vendedor */
export function performanceByUser(deals, team) {
  return team
    .map((u) => {
      const mine = deals.filter((d) => d.ownerId === u.id)
      const won = mine.filter(isWon)
      const lost = mine.filter(isLost)
      const open = mine.filter(isOpen)
      const wonValue = won.reduce((s, d) => s + d.value, 0)
      const closed = won.length + lost.length
      return {
        ...u,
        deals: mine.length,
        openCount: open.length,
        openValue: open.reduce((s, d) => s + d.value, 0),
        wonCount: won.length,
        wonValue,
        lostCount: lost.length,
        conversionRate: closed ? (won.length / closed) * 100 : 0,
        goalProgress: u.goal ? (wonValue / u.goal) * 100 : 0,
      }
    })
    .sort((a, b) => b.wonValue - a.wonValue)
}

/** Agrupa negócios por estágio, preservando a ordem informada */
export function groupByStage(deals, stageOrder) {
  return stageOrder.map((stage) => {
    const items = deals.filter((d) => d.stage === stage)
    return {
      stage,
      items,
      count: items.length,
      value: items.reduce((s, d) => s + d.value, 0),
    }
  })
}
