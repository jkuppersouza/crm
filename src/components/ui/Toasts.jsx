import { createPortal } from 'react-dom'
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react'
import { useCrm } from '../../store/CrmContext'

const ICONS = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
}

const STYLES = {
  success: 'text-emerald-600 dark:text-emerald-400',
  info: 'text-brand-600 dark:text-brand-400',
  warning: 'text-amber-600 dark:text-amber-400',
}

/** Notificações flutuantes disparadas por `notify()` do CrmContext */
export default function Toasts() {
  const { toasts } = useCrm()
  if (!toasts.length) return null

  return createPortal(
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-[min(22rem,calc(100vw-2.5rem))] flex-col gap-2.5">
      {toasts.map((t) => {
        const Icon = ICONS[t.variant] || Info
        return (
          <div
            key={t.id}
            className="pointer-events-auto flex animate-slide-in-right items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3.5 shadow-float backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95"
          >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${STYLES[t.variant] || STYLES.info}`} strokeWidth={2.2} />
            <p className="text-sm font-medium leading-snug text-slate-700 dark:text-slate-200">{t.message}</p>
          </div>
        )
      })}
    </div>,
    document.body,
  )
}
