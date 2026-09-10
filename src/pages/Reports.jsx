import { Download, TrendingUp, Trophy, XCircle, Timer, Percent } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import SellerPerformance from '../components/reports/SellerPerformance'
import ConversionFunnel from '../components/reports/ConversionFunnel'
import RevenueBySource from '../components/reports/RevenueBySource'
import RevenueByPeriod from '../components/reports/RevenueByPeriod'
import PipelineChart from '../components/dashboard/PipelineChart'
import Button from '../components/ui/Button'
import { APP_TEXT } from '../config/theme'
import { useCrm } from '../store/CrmContext'
import { pipelineMetrics } from '../utils/metrics'
import { formatCompact, formatCurrency, formatPercent } from '../utils/format'

export default function Reports() {
  const { deals, notify } = useCrm()
  const m = pipelineMetrics(deals)

  // Ciclo médio de vendas (dias entre criação e fechamento dos ganhos)
  const avgCycle = m.won.length
    ? Math.round(
        m.won.reduce((s, d) => {
          const start = new Date(d.createdAt)
          const end = new Date(d.closeDate)
          return s + Math.max(0, (end - start) / 86400000)
        }, 0) / m.won.length,
      )
    : 0

  const highlights = [
    { label: 'Receita fechada', value: formatCurrency(m.wonValue), icon: Trophy, accent: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Receita prevista', value: formatCompact(m.forecast), icon: TrendingUp, accent: 'text-brand-600 dark:text-brand-400', bg: 'bg-brand-50 dark:bg-brand-500/10' },
    { label: 'Ticket médio', value: formatCompact(m.avgTicket), icon: Percent, accent: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10' },
    { label: 'Ciclo médio de venda', value: `${avgCycle} dias`, icon: Timer, accent: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { label: 'Valor perdido', value: formatCompact(m.lostValue), icon: XCircle, accent: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10' },
    { label: 'Taxa de conversão', value: formatPercent(m.conversionRate), icon: Percent, accent: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/10' },
  ]

  return (
    <>
      <PageHeader
        title={APP_TEXT.pages.reports.title}
        subtitle={APP_TEXT.pages.reports.subtitle}
        actions={
          <Button icon={Download} onClick={() => notify('Relatório em PDF gerado com sucesso!')}>
            Exportar PDF
          </Button>
        }
      />

      {/* ── Indicadores-chave ─────────────────────────────────────── */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {highlights.map((h) => (
          <div key={h.label} className="surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
            <span className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${h.bg} ${h.accent}`}>
              <h.icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
            </span>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{h.label}</p>
            <p className="tnum mt-1 text-lg font-bold tracking-tight text-slate-900 dark:text-white">{h.value}</p>
          </div>
        ))}
      </div>

      {/* ── Receita e funil ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <RevenueByPeriod />
        <ConversionFunnel />
      </div>

      {/* ── Desempenho da equipe ──────────────────────────────────── */}
      <div className="mt-5">
        <SellerPerformance />
      </div>

      {/* ── Origem e pipeline ─────────────────────────────────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <RevenueBySource />
        <PipelineChart />
      </div>
    </>
  )
}
