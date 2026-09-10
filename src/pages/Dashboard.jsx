import { Users, Briefcase, TrendingUp, Target, Download, Calendar as CalendarIcon, Trophy } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import MetricCard from '../components/dashboard/MetricCard'
import SalesChart from '../components/dashboard/SalesChart'
import PipelineChart from '../components/dashboard/PipelineChart'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import UpcomingTasks from '../components/dashboard/UpcomingTasks'
import Button from '../components/ui/Button'
import Card, { CardBody, CardHeader } from '../components/ui/Card'
import Avatar from '../components/ui/Avatar'
import { ProgressBar } from '../components/ui/Fields'
import { APP_TEXT } from '../config/theme'
import { KPI_TRENDS, MONTHLY_SALES } from '../data/mockData'
import { useCrm } from '../store/CrmContext'
import { pipelineMetrics, performanceByUser } from '../utils/metrics'
import { formatCompact, formatCurrency, formatNumber, formatPercent } from '../utils/format'

export default function Dashboard({ onNavigate }) {
  const { deals, contacts, team, currentUser, company, notify } = useCrm()
  const m = pipelineMetrics(deals)
  const ranking = performanceByUser(deals, team).slice(0, 4)

  const currentMonth = MONTHLY_SALES[MONTHLY_SALES.length - 1]
  const monthProgress = (currentMonth.receita / currentMonth.meta) * 100

  return (
    <>
      <PageHeader
        /* 📝 TEXTO: saudação do dashboard (APP_TEXT.dashboardGreeting) */
        title={`${APP_TEXT.dashboardGreeting}, ${currentUser.name.split(' ')[0]} 👋`}
        subtitle={APP_TEXT.dashboardSubtitle}
        actions={
          <>
            <Button variant="secondary" icon={CalendarIcon}>
              Últimos 12 meses
            </Button>
            <Button icon={Download} onClick={() => notify('Relatório exportado com sucesso!')}>
              Exportar
            </Button>
          </>
        }
      />

      {/* ── Cards de métricas ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total de leads"
          value={formatNumber(contacts.length)}
          icon={Users}
          accent="sky"
          delta={KPI_TRENDS.leads.delta}
          direction={KPI_TRENDS.leads.direction}
          hint="vs. mês anterior"
        />
        <MetricCard
          label="Oportunidades abertas"
          value={formatNumber(m.openCount)}
          icon={Briefcase}
          accent="violet"
          delta={KPI_TRENDS.opportunities.delta}
          direction={KPI_TRENDS.opportunities.direction}
          hint={`${formatCompact(m.openValue)} em pipeline`}
        />
        <MetricCard
          label="Receita prevista"
          value={formatCompact(m.forecast)}
          icon={TrendingUp}
          accent="emerald"
          delta={KPI_TRENDS.forecast.delta}
          direction={KPI_TRENDS.forecast.direction}
          hint="ponderada por probabilidade"
        />
        <MetricCard
          label="Taxa de conversão"
          value={formatPercent(m.conversionRate)}
          icon={Target}
          accent="amber"
          delta={KPI_TRENDS.conversion.delta}
          direction={KPI_TRENDS.conversion.direction}
          hint={`${m.wonCount} ganhos · ${m.lostCount} perdidos`}
        />
      </div>

      {/* ── Gráficos ──────────────────────────────────────────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <PipelineChart />
      </div>

      {/* ── Meta do mês + ranking ─────────────────────────────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <CardHeader icon={Target} title="Meta do mês" subtitle={`Objetivo anual: ${formatCompact(company.fiscalYearGoal)}`} />
          <CardBody>
            <div className="flex items-end justify-between">
              <div>
                <p className="tnum text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {formatCompact(currentMonth.receita)}
                </p>
                <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400">
                  de {formatCompact(currentMonth.meta)} previstos
                </p>
              </div>
              <span className="tnum rounded-lg bg-emerald-50 px-2 py-1 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                {formatPercent(monthProgress, 0)}
              </span>
            </div>
            <ProgressBar value={monthProgress} className="mt-4 h-2.5" barClassName="bg-gradient-to-r from-brand-500 to-brand-600" />
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Ticket médio</p>
                <p className="tnum mt-1 text-lg font-bold text-slate-900 dark:text-white">{formatCompact(m.avgTicket)}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Negócios no mês</p>
                <p className="tnum mt-1 text-lg font-bold text-slate-900 dark:text-white">{currentMonth.negocios}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader icon={Trophy} title="Ranking da equipe" subtitle="Receita fechada no período" />
          <CardBody className="pt-0">
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {ranking.map((u, i) => (
                <li key={u.id} className="flex items-center gap-3 py-3">
                  <span className="tnum w-5 text-center text-sm font-bold text-slate-300 dark:text-slate-600">
                    {i + 1}
                  </span>
                  <Avatar name={u.name} initials={u.initials} color={u.color} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{u.name}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <ProgressBar value={Math.min(100, u.goalProgress)} className="max-w-[10rem] flex-1" />
                      <span className="tnum text-[11px] font-medium text-slate-400">
                        {formatPercent(u.goalProgress, 0)} da meta
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="tnum text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(u.wonValue)}</p>
                    <p className="text-[11px] text-slate-400">{u.wonCount} negócios</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* ── Atividades + tarefas ──────────────────────────────────── */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ActivityFeed />
        <UpcomingTasks onSeeAll={() => onNavigate('tasks')} />
      </div>
    </>
  )
}
