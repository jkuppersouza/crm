import { Calendar, Check, Clock, Mail, Phone, Users, ClipboardList, Link2, Pencil, Trash2 } from 'lucide-react'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import { PRIORITY_META } from '../../config/theme'
import { useCrm } from '../../store/CrmContext'
import { cx, dueLabel, daysUntil, formatDateShort } from '../../utils/format'

// 🎨 Ícone de cada tipo de atividade
export const TASK_TYPE_META = {
  ligacao: { icon: Phone, label: 'Ligação', className: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' },
  email: { icon: Mail, label: 'E-mail', className: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400' },
  reuniao: { icon: Users, label: 'Reunião', className: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400' },
  tarefa: { icon: ClipboardList, label: 'Tarefa', className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' },
}

export default function TaskItem({ task, compact = false, onEdit, onDelete }) {
  const { toggleTask, userById, contactById, dealById } = useCrm()
  const meta = TASK_TYPE_META[task.type] || TASK_TYPE_META.tarefa
  const priority = PRIORITY_META[task.priority]
  const owner = userById(task.ownerId)
  const contact = contactById(task.contactId)
  const deal = dealById(task.dealId)
  const overdue = !task.done && daysUntil(task.dueDate) < 0

  return (
    <div
      className={cx(
        'group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors',
        'hover:bg-slate-50 dark:hover:bg-slate-800/50',
        task.done && 'opacity-55',
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task.id)}
        aria-label={task.done ? 'Reabrir tarefa' : 'Concluir tarefa'}
        className={cx(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-150',
          task.done
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 hover:border-brand-500 hover:bg-brand-50 dark:border-slate-600 dark:hover:bg-brand-500/10',
        )}
      >
        {task.done && <Check className="h-3 w-3" strokeWidth={3.5} />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className={cx('text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100', task.done && 'line-through')}>
            {task.title}
          </p>
          {!compact && (
            <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => onEdit?.(task)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700"
                aria-label="Editar"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDelete?.(task)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                aria-label="Excluir"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className={cx('inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold', meta.className)}>
            <meta.icon className="h-3 w-3" strokeWidth={2.4} />
            {meta.label}
          </span>

          <Badge size="sm" className={priority.soft} dot={priority.dot}>
            {priority.label}
          </Badge>

          <span
            className={cx(
              'inline-flex items-center gap-1 text-[11px] font-medium',
              overdue ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400',
            )}
          >
            <Calendar className="h-3 w-3" />
            {formatDateShort(task.dueDate)}
            {task.time && (
              <>
                <Clock className="ml-1 h-3 w-3" />
                {task.time}
              </>
            )}
            <span className={cx('ml-1', overdue && 'font-bold')}>· {dueLabel(task.dueDate)}</span>
          </span>

          {(contact || deal) && (
            <span className="inline-flex max-w-[15rem] items-center gap-1 truncate text-[11px] text-slate-400">
              <Link2 className="h-3 w-3 shrink-0" />
              <span className="truncate">{deal ? deal.company : contact?.company}</span>
            </span>
          )}

          {owner && (
            <span className="ml-auto">
              <Avatar name={owner.name} initials={owner.initials} color={owner.color} size="xs" title={owner.name} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
