import { Building2, CalendarDays, GripVertical, AlertCircle } from 'lucide-react'
import Avatar from '../ui/Avatar'
import { Tag } from '../ui/Badge'
import { useCrm } from '../../store/CrmContext'
import { cx, daysUntil, formatCurrency, formatDateShort } from '../../utils/format'

/** Card arrastável do Kanban (HTML5 drag and drop nativo — sem dependências) */
export default function DealCard({ deal, onOpen, onDragStart, onDragEnd, isDragging }) {
  const { userById } = useCrm()
  const owner = userById(deal.ownerId)
  const days = daysUntil(deal.closeDate)
  const closed = ['ganho', 'perdido'].includes(deal.stage)
  const late = !closed && days < 0

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', deal.id)
        onDragStart?.(deal.id)
      }}
      onDragEnd={onDragEnd}
      onClick={() => onOpen?.(deal)}
      className={cx(
        'group relative cursor-pointer rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-sm',
        'transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover',
        // 🎨 No escuro: vidro fosco com borda que acende no hover
        'active:cursor-grabbing dark:border-slate-800 dark:bg-slate-900/70 dark:backdrop-blur-sm dark:hover:border-white/20',
        isDragging && 'deal-dragging',
      )}
    >
      {/* Alça de arraste */}
      <GripVertical className="absolute right-1.5 top-3.5 h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-600" />

      <h4 className="pr-5 text-[13.5px] font-semibold leading-snug text-slate-900 dark:text-white">
        {deal.title}
      </h4>

      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Building2 className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{deal.company}</span>
      </p>

      <p className="tnum mt-3 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
        {formatCurrency(deal.value)}
      </p>

      {/* Barra de probabilidade */}
      {!closed && (
        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-500"
              style={{ width: `${deal.probability}%` }}
            />
          </div>
          <span className="tnum text-[10px] font-bold text-slate-400">{deal.probability}%</span>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-700">
        <span
          className={cx(
            'inline-flex items-center gap-1 text-[11px] font-medium',
            late ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400',
          )}
        >
          {late ? <AlertCircle className="h-3.5 w-3.5" /> : <CalendarDays className="h-3.5 w-3.5" />}
          {formatDateShort(deal.closeDate)}
        </span>

        {owner && (
          <Avatar name={owner.name} initials={owner.initials} color={owner.color} size="xs" title={owner.name} />
        )}
      </div>

      {deal.stage === 'perdido' && deal.lostReason && (
        <div className="mt-2">
          <Tag>{deal.lostReason}</Tag>
        </div>
      )}
    </article>
  )
}
