import { Filter } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import { FUNNEL_STAGES } from '../../data/mockData'
import { formatNumber, formatPercent } from '../../utils/format'

/** Funil de conversão desenhado em CSS puro (sem biblioteca) */
export default function ConversionFunnel() {
  const top = FUNNEL_STAGES[0].value

  return (
    <Card>
      <CardHeader
        icon={Filter}
        title="Funil de conversão"
        subtitle={`Conversão total: ${formatPercent((FUNNEL_STAGES.at(-1).value / top) * 100, 2)}`}
      />
      <CardBody>
        <ul className="space-y-2.5">
          {FUNNEL_STAGES.map((s, i) => {
            const widthPct = (s.value / top) * 100
            const prev = i > 0 ? FUNNEL_STAGES[i - 1].value : null
            const stepRate = prev ? (s.value / prev) * 100 : 100
            // 🎨 Cada etapa do funil vai esmaecendo a cor da marca.
            //    Funciona em qualquer paleta, inclusive na Mono (branca).
            const opacity = 1 - i * 0.13

            return (
              <li key={s.stage}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="truncate text-[13px] font-medium text-slate-600 dark:text-slate-300">
                    {s.stage}
                  </span>
                  <span className="flex shrink-0 items-baseline gap-2">
                    <span className="tnum text-[13px] font-bold text-slate-900 dark:text-white">
                      {formatNumber(s.value)}
                    </span>
                    {prev && (
                      <span className="tnum text-[11px] font-semibold text-slate-400">
                        {formatPercent(stepRate, 1)}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="h-8 flex-1 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800/60">
                    <div
                      className="h-full rounded-lg transition-all duration-700"
                      style={{
                        width: `${Math.max(widthPct, 4)}%`,
                        background: `rgb(var(--brand-500) / ${opacity})`,
                      }}
                    />
                  </div>
                  {/* Percentual fora da barra — sempre legível em qualquer tema */}
                  <span className="tnum w-12 shrink-0 text-right text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {formatPercent(widthPct, 1)}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </CardBody>
    </Card>
  )
}
