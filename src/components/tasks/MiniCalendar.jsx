import { useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import { cx } from '../../utils/format'

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

const isoOf = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

/** Calendário simples de visualização — destaca dias com tarefas */
export default function MiniCalendar({ tasks, selectedDate, onSelectDate }) {
  const today = new Date()
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const firstDay = new Date(cursor.year, cursor.month, 1).getDay()
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate()
  const todayIso = isoOf(today.getFullYear(), today.getMonth(), today.getDate())

  // Mapa: data ISO → { total, pendentes, temAlta }
  const byDate = tasks.reduce((acc, t) => {
    const e = acc[t.dueDate] || { total: 0, pending: 0, high: false }
    e.total += 1
    if (!t.done) e.pending += 1
    if (t.priority === 'alta' && !t.done) e.high = true
    acc[t.dueDate] = e
    return acc
  }, {})

  const shift = (delta) =>
    setCursor(({ year, month }) => {
      const m = month + delta
      if (m < 0) return { year: year - 1, month: 11 }
      if (m > 11) return { year: year + 1, month: 0 }
      return { year, month: m }
    })

  const cells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <Card>
      <CardHeader
        icon={CalendarDays}
        title={`${MONTHS[cursor.month]} ${cursor.year}`}
        subtitle="Clique em um dia para filtrar"
        action={
          <div className="flex items-center gap-1">
            <button
              onClick={() => shift(-1)}
              aria-label="Mês anterior"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => shift(1)}
              aria-label="Próximo mês"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        }
      />
      <CardBody>
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((d, i) => (
            <div key={i} className="pb-2 text-center text-[11px] font-bold uppercase text-slate-400">
              {d}
            </div>
          ))}

          {cells.map((day, i) => {
            if (!day) return <div key={`e${i}`} />
            const iso = isoOf(cursor.year, cursor.month, day)
            const info = byDate[iso]
            const isToday = iso === todayIso
            const isSelected = iso === selectedDate

            return (
              <button
                key={iso}
                onClick={() => onSelectDate(isSelected ? null : iso)}
                className={cx(
                  'relative flex aspect-square flex-col items-center justify-center rounded-lg text-[13px] font-semibold transition-all duration-150',
                  isSelected
                    ? 'bg-brand-600 text-brand-fg shadow-sm'
                    : isToday
                      ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-300 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/30'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                )}
              >
                {day}
                {info?.pending > 0 && (
                  <span
                    className={cx(
                      'absolute bottom-1 h-1 w-1 rounded-full',
                      isSelected ? 'bg-brand-fg' : info.high ? 'bg-rose-500' : 'bg-brand-500',
                    )}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-[11px] text-slate-400 dark:border-slate-800">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> Tarefas pendentes
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Prioridade alta
          </span>
        </div>
      </CardBody>
    </Card>
  )
}
