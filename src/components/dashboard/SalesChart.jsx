import { useState } from 'react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { TrendingUp } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import ChartTooltip from './ChartTooltip'
import { SegmentedControl } from '../ui/Fields'
import { MONTHLY_SALES } from '../../data/mockData'
import { useCrm } from '../../store/CrmContext'
import { formatCompact, formatCurrency } from '../../utils/format'

/** Gráfico de vendas por mês — alterna entre linha (área) e barras */
export default function SalesChart() {
  const { brandPreset } = useCrm()
  const [type, setType] = useState('area')
  const color = brandPreset.hex

  const total = MONTHLY_SALES.reduce((s, m) => s + m.receita, 0)

  const axisProps = {
    tick: { fontSize: 12, fill: 'currentColor' },
    tickLine: false,
    axisLine: false,
    className: 'text-slate-400',
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader
        icon={TrendingUp}
        title="Receita por mês"
        subtitle={`Últimos 12 meses · ${formatCurrency(total)} acumulados`}
        action={
          <SegmentedControl
            value={type}
            onChange={setType}
            options={[
              { value: 'area', label: 'Linha' },
              { value: 'bar', label: 'Barras' },
            ]}
          />
        }
      />
      <CardBody>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'area' ? (
              <AreaChart data={MONTHLY_SALES} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.28} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={formatCompact} width={78} />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area
                  type="monotone" dataKey="receita" name="Receita" stroke={color} strokeWidth={2.5}
                  fill="url(#salesGradient)" activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
                />
                <Line
                  type="monotone" dataKey="meta" name="Meta" stroke="#6b7280" strokeWidth={1.5}
                  strokeDasharray="5 5" dot={false}
                />
              </AreaChart>
            ) : (
              <BarChart data={MONTHLY_SALES} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={formatCompact} width={78} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'currentColor', className: 'text-slate-100 dark:text-slate-800' }} />
                <Bar dataKey="receita" name="Receita" fill={color} radius={[6, 6, 0, 0]} maxBarSize={38} />
                <Bar dataKey="meta" name="Meta" fill="#4b5563" radius={[6, 6, 0, 0]} maxBarSize={38} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex items-center justify-center gap-5 text-xs">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} /> Receita realizada
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400 dark:bg-slate-600" /> Meta do mês
          </span>
        </div>
      </CardBody>
    </Card>
  )
}
