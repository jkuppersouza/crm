import { formatCurrency, formatNumber } from '../../utils/format'

/** Tooltip compartilhado por todos os gráficos (Recharts) */
export default function ChartTooltip({ active, payload, label, currency = true, suffix }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3.5 py-2.5 shadow-float backdrop-blur dark:border-slate-700 dark:bg-slate-800/95">
      {label && (
        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      )}
      <div className="space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color || p.fill }} />
            <span className="text-slate-500 dark:text-slate-400">{p.name}</span>
            <span className="tnum ml-auto font-bold text-slate-900 dark:text-white">
              {currency ? formatCurrency(p.value) : `${formatNumber(p.value)}${suffix || ''}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
