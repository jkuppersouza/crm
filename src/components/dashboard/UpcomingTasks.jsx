import { CheckSquare, ArrowRight } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import TaskItem from '../tasks/TaskItem'
import { EmptyState } from '../ui/Fields'
import { useCrm } from '../../store/CrmContext'
import { daysUntil } from '../../utils/format'

/** Próximas tarefas do dashboard (as 6 mais urgentes ainda abertas) */
export default function UpcomingTasks({ onSeeAll }) {
  const { tasks } = useCrm()

  const upcoming = tasks
    .filter((t) => !t.done)
    .sort((a, b) => daysUntil(a.dueDate) - daysUntil(b.dueDate))
    .slice(0, 6)

  return (
    <Card>
      <CardHeader
        icon={CheckSquare}
        title="Próximas tarefas"
        subtitle={`${tasks.filter((t) => !t.done).length} atividades em aberto`}
        action={
          <button
            onClick={onSeeAll}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[13px] font-semibold text-brand-600 transition-colors hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-500/10"
          >
            Ver todas
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        }
      />
      <CardBody className="pt-0">
        {upcoming.length ? (
          <div className="-mx-1 divide-y divide-slate-100 dark:divide-slate-800">
            {upcoming.map((t) => (
              <TaskItem key={t.id} task={t} compact />
            ))}
          </div>
        ) : (
          <EmptyState icon={CheckSquare} title="Tudo em dia!" description="Nenhuma tarefa pendente no momento." />
        )}
      </CardBody>
    </Card>
  )
}
