import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Radar } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import ChartTooltip from '../dashboard/ChartTooltip'
import { REVENUE_BY_SOURCE } from '../../data/mockData'
import { CHART_COLORS } from '../../config/theme'
import { useCrm } from '../../store/CrmContext'
import { formatCompact, formatCurrency } from '../../utils/format'

/** Receita por origem de lead — barras horizontais */
export default function RevenueBySource() {
  const { brandPreset } = useCrm()
  // 🎨 A primeira cor sempre segue a marca ativa
  const colors = [brandPreset.hex, ...CHART_COLORS.slice(1)]
  const total = REVENUE_BY_SOURCE.reduce((s, r) => s + r.value, 0)

  return (
    <Card>
      <CardHeader
        icon={Radar}
        title="Receita por origem"
        subtitle={`${formatCurrency(total)} atribuídos no período`}
      />
      <CardBody>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={REVENUE_BY_SOURCE}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
            >
              <XAxis type="number" tickFormatter={formatCompact} tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} axisLine={false} className="text-slate-400" />
              <YAxis
                type="category" dataKey="source" width={116}
                tick={{ fontSize: 12, fill: 'currentColor' }} tickLine={false} axisLine={false}
                className="text-slate-500"
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'currentColor', className: 'text-slate-100 dark:text-slate-800' }} />
              <Bar dataKey="value" name="Receita" radius={[0, 6, 6, 0]} maxBarSize={26}>
                {REVENUE_BY_SOURCE.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}
