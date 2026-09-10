import { useState } from 'react'
import {
  Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { CalendarRange } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import ChartTooltip from '../dashboard/ChartTooltip'
import { SegmentedControl } from '../ui/Fields'
import { MONTHLY_SALES } from '../../data/mockData'
import { useCrm } from '../../store/CrmContext'
import { formatCompact, formatCurrency, formatPercent } from '../../utils/format'

const PERIODS = [
  { value: '3', label: '3 meses' },
  { value: '6', label: '6 meses' },
  { value: '12', label: '12 meses' },
]

/** Receita por período com comparação contra a meta */
export default function RevenueByPeriod() {
  const { brandPreset } = useCrm()
  const [period, setPeriod] = useState('12')

  const data = MONTHLY_SALES.slice(-Number(period))
  const receita = data.reduce((s, m) => s + m.receita, 0)
  const meta = data.reduce((s, m) => s + m.meta, 0)
  const attainment = (receita / meta) * 100

  return (
    <Card>
      <CardHeader
        icon={CalendarRange}
        title="Receita por período"
        subtitle="Realizado vs. meta acumulada"
        action={<SegmentedControl value={period} onChange={setPeriod} options={PERIODS} />}
      />
      <CardBody>
        <div className="mb-5 grid grid-cols-3 gap-3">
          {[
            { label: 'Realizado', value: formatCurrency(receita), accent: 'text-slate-900 dark:text-white' },
            { label: 'Meta', value: formatCurrency(meta), accent: 'text-slate-500 dark:text-slate-400' },
            {
              label: 'Atingimento',
              value: formatPercent(attainment, 1),
              accent: attainment >= 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400',
            },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-slate-50 px-3.5 py-3 dark:bg-slate-800/60">
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{s.label}</p>
              <p className={`tnum mt-1 text-[15px] font-bold ${s.accent}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="periodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={brandPreset.hex} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={brandPreset.hex} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-slate-800" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'currentColor' }} tickLine={false} axisLine={false} className="text-slate-400" />
              <YAxis tick={{ fontSize: 12, fill: 'currentColor' }} tickLine={false} axisLine={false} tickFormatter={formatCompact} width={78} className="text-slate-400" />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="receita" name="Receita" stroke={brandPreset.hex} strokeWidth={2.5} fill="url(#periodGradient)" />
              <Line type="monotone" dataKey="meta" name="Meta" stroke="#6b7280" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}
