import { useState } from 'react'
import { Plus } from 'lucide-react'
import DealCard from './DealCard'
import { STAGE_META } from '../../config/theme'
import { cx, formatCompact } from '../../utils/format'

export default function KanbanColumn({ stage, deals, draggingId, onDragStart, onDragEnd, onDrop, onOpenDeal, onAddDeal }) {
  const [over, setOver] = useState(false)
  const meta = STAGE_META[stage]
  const total = deals.reduce((s, d) => s + d.value, 0)

  return (
    <div className="flex w-[300px] shrink-0 flex-col sm:w-[318px]">
      {/* Cabeçalho da coluna */}
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className={cx('h-2.5 w-2.5 rounded-full', meta.dot)} />
        <h3 className="text-[13px] font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          {meta.label}
        </h3>
        <span className="tnum rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {deals.length}
        </span>
        <button
          onClick={() => onAddDeal?.(stage)}
          aria-label="Adicionar negócio"
          className="ml-auto rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" strokeWidth={2.4} />
        </button>
      </div>

      {/* Valor total da coluna */}
      <div className="mb-3 px-1">
        <div className={cx('h-1 w-full rounded-full bg-gradient-to-r', meta.bar)} />
        <p className="tnum mt-2 text-[13px] font-bold text-slate-700 dark:text-slate-200">
          {formatCompact(total)}
        </p>
      </div>

      {/* Área de drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
          if (!over) setOver(true)
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setOver(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setOver(false)
          const id = e.dataTransfer.getData('text/plain')
          if (id) onDrop?.(id, stage)
        }}
        className={cx(
          'flex min-h-[220px] flex-1 flex-col gap-2.5 rounded-2xl border border-dashed border-slate-200 p-2.5 transition-colors duration-150',
          'dark:border-slate-800',
          over ? 'column-drop-target' : 'bg-slate-50/60 dark:bg-slate-900/40',
        )}
      >
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            isDragging={draggingId === deal.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onOpen={onOpenDeal}
          />
        ))}

        {!deals.length && (
          <div className="flex flex-1 items-center justify-center px-4 py-8 text-center">
            <p className="text-[13px] text-slate-400 dark:text-slate-600">
              Arraste um card para cá
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
