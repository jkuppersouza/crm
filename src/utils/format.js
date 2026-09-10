// Utilitários de formatação (pt-BR)

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const brlCents = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatCurrency = (value) => brl.format(value || 0)
export const formatCurrencyCents = (value) => brlCents.format(value || 0)

/** Formato compacto para eixos de gráficos e cards: R$ 1,2 mi */
export function formatCompact(value) {
  const v = Number(value) || 0
  if (Math.abs(v) >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1).replace('.', ',')} mi`
  if (Math.abs(v) >= 1_000) return `R$ ${Math.round(v / 1000)} mil`
  return brl.format(v)
}

export const formatNumber = (value) => new Intl.NumberFormat('pt-BR').format(value || 0)

export const formatPercent = (value, digits = 1) =>
  `${(Number(value) || 0).toFixed(digits).replace('.', ',')}%`

/** '2026-09-10' → '10 set' */
export function formatDateShort(isoDate) {
  if (!isoDate) return '—'
  const d = new Date(`${isoDate}T12:00:00`)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '')
}

/** '2026-09-10' → '10 de setembro de 2026' */
export function formatDateLong(isoDate) {
  if (!isoDate) return '—'
  const d = new Date(`${isoDate}T12:00:00`)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

/** Diferença em dias entre hoje e a data (negativo = atrasado) */
export function daysUntil(isoDate) {
  if (!isoDate) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(`${isoDate}T00:00:00`)
  return Math.round((target - today) / 86400000)
}

/** Rótulo humano de prazo: "Hoje", "Amanhã", "3 dias", "Atrasado 2d" */
export function dueLabel(isoDate) {
  const diff = daysUntil(isoDate)
  if (diff === null) return '—'
  if (diff === 0) return 'Hoje'
  if (diff === 1) return 'Amanhã'
  if (diff === -1) return 'Ontem'
  if (diff < 0) return `${Math.abs(diff)} dias atrás`
  return `em ${diff} dias`
}

/** Timestamp ISO → "há 3 h" */
export function timeAgo(isoTimestamp) {
  const diffMs = Date.now() - new Date(isoTimestamp).getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 60) return `há ${Math.max(1, mins)} min`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `há ${hours} h`
  const days = Math.round(hours / 24)
  if (days < 30) return `há ${days} d`
  return `há ${Math.round(days / 30)} mes${Math.round(days / 30) > 1 ? 'es' : ''}`
}

/** Converte **negrito** do feed de atividades em <strong> */
export function renderInlineMarkup(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
}

export const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter((p) => p.length > 2)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

export const cx = (...classes) => classes.filter(Boolean).join(' ')
