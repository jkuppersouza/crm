import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { KanbanSquare } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import ChartTooltip from './ChartTooltip'
import { STAGE_META } from '../../config/theme'
import { useCrm } from '../../store/CrmContext'
import { formatCurrency, formatPercent } from '../../utils/format'

/** Distribuição do valor do pipeline por estágio (rosca + lista) */
export default function PipelineChart() {
  const { deals } = useCrm()

  const openStages = ['novo', 'qualificacao', 'proposta', 'negociacao']
  const data = openStages.map((stage) => {
    const items = deals.filter((d) => d.stage === stage)
    return {
      stage,
      name: STAGE_META[stage].label,
      value: items.reduce((s, d) => s + d.value, 0),
      count: items.length,
      color: STAGE_META[stage].hex,
    }
  })

  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <Card>
      <CardHeader icon={KanbanSquare} title="Pipeline por estágio" subtitle="Valor em aberto por etapa do funil" />
      <CardBody>
        <div className="relative mx-auto h-[190px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={90}
                paddingAngle={3}
                stroke="none"
              >
                {data.map((d) => (
                  <Cell key={d.stage} fill={d.color} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Total no centro da rosca */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Total aberto</span>
            <span className="tnum text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(total)}</span>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {data.map((d) => (
            <li key={d.stage} className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-600 dark:text-slate-300">
                {d.name}
                <span className="ml-1.5 text-slate-400">({d.count})</span>
              </span>
              <span className="tnum shrink-0 text-[13px] font-bold text-slate-900 dark:text-white">
                {formatCurrency(d.value)}
              </span>
              <span className="tnum w-12 shrink-0 text-right text-[11px] text-slate-400">
                {total ? formatPercent((d.value / total) * 100, 0) : '0%'}
              </span>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}
