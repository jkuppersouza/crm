import { useMemo, useState } from 'react'
import { Plus, CheckSquare, AlertCircle, CalendarCheck, ListChecks, X } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import TaskItem from '../components/tasks/TaskItem'
import TaskFormModal from '../components/tasks/TaskFormModal'
import MiniCalendar from '../components/tasks/MiniCalendar'
import Card, { CardBody, CardHeader } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { ConfirmDialog } from '../components/ui/Modal'
import { SearchInput, Select, SegmentedControl, EmptyState } from '../components/ui/Fields'
import { APP_TEXT, PRIORITY_META } from '../config/theme'
import { useCrm } from '../store/CrmContext'
import { cx, daysUntil, formatDateLong } from '../utils/format'

export default function Tasks() {
  const { tasks, team, deleteTask, notify } = useCrm()

  const [query, setQuery] = useState('')
  const [view, setView] = useState('pending') // pending | today | late | all
  const [ownerFilter, setOwnerFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toDelete, setToDelete] = useState(null)

  const counts = useMemo(() => ({
    pending: tasks.filter((t) => !t.done).length,
    today: tasks.filter((t) => !t.done && daysUntil(t.dueDate) === 0).length,
    late: tasks.filter((t) => !t.done && daysUntil(t.dueDate) < 0).length,
    done: tasks.filter((t) => t.done).length,
  }), [tasks])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tasks
      .filter((t) => {
        if (q && !`${t.title} ${t.notes || ''}`.toLowerCase().includes(q)) return false
        if (ownerFilter && t.ownerId !== ownerFilter) return false
        if (priorityFilter && t.priority !== priorityFilter) return false
        if (selectedDate && t.dueDate !== selectedDate) return false
        const d = daysUntil(t.dueDate)
        if (view === 'pending') return !t.done
        if (view === 'today') return !t.done && d === 0
        if (view === 'late') return !t.done && d < 0
        return true
      })
      .sort((a, b) => {
        if (a.done !== b.done) return a.done ? 1 : -1
        return daysUntil(a.dueDate) - daysUntil(b.dueDate)
      })
  }, [tasks, query, view, ownerFilter, priorityFilter, selectedDate])

  // Agrupa por data para exibir com cabeçalhos
  const grouped = useMemo(() => {
    const map = new Map()
    filtered.forEach((t) => {
      if (!map.has(t.dueDate)) map.set(t.dueDate, [])
      map.get(t.dueDate).push(t)
    })
    return [...map.entries()]
  }, [filtered])

  return (
    <>
      <PageHeader
        title={APP_TEXT.pages.tasks.title}
        subtitle={APP_TEXT.pages.tasks.subtitle}
        actions={
          <Button icon={Plus} onClick={() => { setEditing(null); setFormOpen(true) }}>
            Nova tarefa
          </Button>
        }
      />

      {/* ── Resumo ────────────────────────────────────────────────── */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: 'Pendentes', value: counts.pending, icon: ListChecks, accent: 'text-brand-600 dark:text-brand-400' },
          { label: 'Para hoje', value: counts.today, icon: CalendarCheck, accent: 'text-violet-600 dark:text-violet-400' },
          { label: 'Atrasadas', value: counts.late, icon: AlertCircle, accent: 'text-rose-600 dark:text-rose-400' },
          { label: 'Concluídas', value: counts.done, icon: CheckSquare, accent: 'text-emerald-600 dark:text-emerald-400' },
        ].map((s) => (
          <div key={s.label} className="surface flex items-center gap-3 px-4 py-3.5">
            <s.icon className={`h-5 w-5 shrink-0 ${s.accent}`} strokeWidth={2.2} />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">{s.label}</p>
              <p className="tnum text-lg font-bold leading-tight text-slate-900 dark:text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* ── Lista de tarefas ────────────────────────────────────── */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader
              icon={ListChecks}
              title="Lista de tarefas"
              subtitle={`${filtered.length} ${filtered.length === 1 ? 'atividade' : 'atividades'}`}
              action={
                <SegmentedControl
                  value={view}
                  onChange={setView}
                  options={[
                    { value: 'pending', label: 'Abertas' },
                    { value: 'today', label: 'Hoje' },
                    { value: 'late', label: 'Atrasadas' },
                    { value: 'all', label: 'Todas' },
                  ]}
                />
              }
            />

            <div className="flex flex-col gap-3 border-y border-slate-100 px-5 py-3.5 sm:flex-row sm:items-center sm:px-6 dark:border-slate-800">
              <SearchInput value={query} onChange={setQuery} placeholder="Buscar tarefa..." className="sm:max-w-[16rem] sm:flex-1" />
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                placeholder="Todas as prioridades"
                options={Object.entries(PRIORITY_META).map(([v, m]) => ({ value: v, label: m.label }))}
                className="sm:w-44"
              />
              <Select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                placeholder="Toda a equipe"
                options={team.map((u) => ({ value: u.id, label: u.name }))}
                className="sm:w-48"
              />
            </div>

            {selectedDate && (
              <div className="flex items-center justify-between gap-3 bg-brand-50/70 px-5 py-2.5 sm:px-6 dark:bg-brand-500/5">
                <p className="text-[13px] font-medium text-brand-700 dark:text-brand-300">
                  Filtrando por {formatDateLong(selectedDate)}
                </p>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-semibold text-brand-700 transition-colors hover:bg-brand-100 dark:text-brand-300 dark:hover:bg-brand-500/10"
                >
                  <X className="h-3.5 w-3.5" /> Limpar
                </button>
              </div>
            )}

            <CardBody className="px-2 pb-3 pt-2 sm:px-3">
              {grouped.length ? (
                <div className="space-y-4">
                  {grouped.map(([date, items]) => {
                    const diff = daysUntil(date)
                    const late = diff < 0 && items.some((t) => !t.done)
                    return (
                      <section key={date}>
                        <h4
                          className={cx(
                            'sticky top-16 z-10 mb-1 bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide backdrop-blur-md dark:bg-black/80',
                            late ? 'text-rose-500' : 'text-slate-400',
                          )}
                        >
                          {formatDateLong(date)}
                          {diff === 0 && <span className="ml-2 text-brand-600 dark:text-brand-400">· Hoje</span>}
                        </h4>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                          {items.map((t) => (
                            <TaskItem
                              key={t.id}
                              task={t}
                              onEdit={(task) => { setEditing(task); setFormOpen(true) }}
                              onDelete={setToDelete}
                            />
                          ))}
                        </div>
                      </section>
                    )
                  })}
                </div>
              ) : (
                <EmptyState
                  icon={CheckSquare}
                  title="Nenhuma tarefa aqui"
                  description="Ajuste os filtros ou crie uma nova atividade para a equipe."
                  action={<Button icon={Plus} onClick={() => { setEditing(null); setFormOpen(true) }}>Nova tarefa</Button>}
                />
              )}
            </CardBody>
          </Card>
        </div>

        {/* ── Calendário + agenda do dia ──────────────────────────── */}
        <div className="space-y-5">
          <MiniCalendar tasks={tasks} selectedDate={selectedDate} onSelectDate={setSelectedDate} />

          <Card>
            <CardHeader icon={CalendarCheck} title="Agenda de hoje" subtitle="Compromissos e ligações do dia" />
            <CardBody className="pt-0">
              {(() => {
                const todayTasks = tasks
                  .filter((t) => daysUntil(t.dueDate) === 0)
                  .sort((a, b) => (a.time || '').localeCompare(b.time || ''))
                if (!todayTasks.length) {
                  return <EmptyState icon={CalendarCheck} title="Dia livre" description="Nenhum compromisso agendado para hoje." />
                }
                return (
                  <ul className="space-y-1">
                    {todayTasks.map((t) => (
                      <li key={t.id} className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <span className="tnum w-12 shrink-0 text-[13px] font-bold text-slate-400">{t.time}</span>
                        <span className={cx('h-8 w-1 shrink-0 rounded-full', PRIORITY_META[t.priority].dot)} />
                        <span className={cx('min-w-0 flex-1 truncate text-[13px] font-medium text-slate-700 dark:text-slate-200', t.done && 'line-through opacity-50')}>
                          {t.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                )
              })()}
            </CardBody>
          </Card>
        </div>
      </div>

      <TaskFormModal
        open={formOpen}
        task={editing}
        defaultDate={selectedDate}
        onClose={() => { setFormOpen(false); setEditing(null) }}
      />

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          deleteTask(toDelete.id)
          notify('Tarefa excluída.', 'warning')
        }}
        title="Excluir tarefa"
        message={`Tem certeza que deseja excluir “${toDelete?.title}”?`}
      />
    </>
  )
}
