import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Users } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import ChartTooltip from '../dashboard/ChartTooltip'
import Avatar from '../ui/Avatar'
import { ProgressBar } from '../ui/Fields'
import { useCrm } from '../../store/CrmContext'
import { performanceByUser } from '../../utils/metrics'
import { formatCompact, formatCurrency, formatPercent } from '../../utils/format'

/** Desempenho por vendedor — gráfico de barras + tabela detalhada */
export default function SellerPerformance() {
  const { deals, team, brandPreset } = useCrm()
  const data = performanceByUser(deals, team)
  const chartData = data.map((u) => ({
    name: u.name.split(' ')[0],
    Ganho: u.wonValue,
    'Em aberto': u.openValue,
  }))

  return (
    <Card>
      <CardHeader icon={Users} title="Desempenho por vendedor" subtitle="Receita fechada e pipeline em aberto" />
      <CardBody>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-slate-800" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'currentColor' }} tickLine={false} axisLine={false} className="text-slate-400" />
              <YAxis tick={{ fontSize: 12, fill: 'currentColor' }} tickLine={false} axisLine={false} tickFormatter={formatCompact} width={78} className="text-slate-400" />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'currentColor', className: 'text-slate-100 dark:text-slate-800' }} />
              <Bar dataKey="Ganho" stackId="a" fill={brandPreset.hex} radius={[0, 0, 0, 0]} maxBarSize={44} />
              <Bar dataKey="Em aberto" stackId="a" fill="#4b5563" radius={[6, 6, 0, 0]} maxBarSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabela detalhada */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                {['Vendedor', 'Negócios', 'Ganhos', 'Conversão', 'Receita', 'Meta'].map((h) => (
                  <th key={h} className="pb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={u.name} initials={u.initials} color={u.color} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-800 dark:text-slate-100">{u.name}</p>
                        <p className="truncate text-[11px] text-slate-400">{u.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="tnum py-2.5 text-slate-600 dark:text-slate-300">{u.deals}</td>
                  <td className="tnum py-2.5 text-slate-600 dark:text-slate-300">{u.wonCount}</td>
                  <td className="tnum py-2.5">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {formatPercent(u.conversionRate, 0)}
                    </span>
                  </td>
                  <td className="tnum py-2.5 font-bold text-slate-900 dark:text-white">{formatCurrency(u.wonValue)}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={Math.min(100, u.goalProgress)} className="w-16" />
                      <span className="tnum text-[11px] text-slate-400">{formatPercent(u.goalProgress, 0)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  )
}
