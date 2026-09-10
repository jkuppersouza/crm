import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cx } from '../../utils/format'

/**
 * Card de métrica do topo do dashboard.
 * `accent` controla a cor do ícone — troque livremente.
 */
export default function MetricCard({ label, value, hint, icon: Icon, delta, direction = 'up', accent = 'brand' }) {
  const ACCENTS = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    sky: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
  }

  const up = direction === 'up'

  return (
    <div className="surface group relative overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover dark:hover:border-white/15">
      {/* 🎨 brilho decorativo no hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-brand-500/[0.06] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-brand-400/20" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="tnum mt-2 text-[26px] font-bold leading-none tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <span className={cx('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', ACCENTS[accent])}>
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </span>
      </div>

      <div className="relative mt-4 flex items-center gap-2">
        {delta !== undefined && (
          <span
            className={cx(
              'tnum inline-flex items-center gap-0.5 rounded-lg px-1.5 py-0.5 text-xs font-bold',
              up
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
            )}
          >
            {up ? <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.6} /> : <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={2.6} />}
            {Math.abs(delta).toFixed(1).replace('.', ',')}%
          </span>
        )}
        {hint && <span className="truncate text-xs text-slate-400">{hint}</span>}
      </div>
    </div>
  )
}
