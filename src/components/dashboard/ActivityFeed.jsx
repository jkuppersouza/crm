import { Activity, CheckCircle2, FileText, Mail, Phone, UserPlus, ArrowRightLeft } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import { ACTIVITY_FEED } from '../../data/mockData'
import { useCrm } from '../../store/CrmContext'
import { formatCurrency, renderInlineMarkup, timeAgo } from '../../utils/format'

// 🎨 Ícone + cor de cada tipo de atividade
const TYPE_META = {
  ganho: { icon: CheckCircle2, className: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' },
  reuniao: { icon: Activity, className: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400' },
  proposta: { icon: FileText, className: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
  lead: { icon: UserPlus, className: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400' },
  ligacao: { icon: Phone, className: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' },
  email: { icon: Mail, className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' },
  estagio: { icon: ArrowRightLeft, className: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400' },
}

export default function ActivityFeed() {
  const { userById } = useCrm()

  return (
    <Card>
      <CardHeader icon={Activity} title="Atividades recentes" subtitle="O que a equipe fez nas últimas 72 h" />
      <CardBody className="pt-0">
        <ol className="relative space-y-1">
          {/* Linha vertical da timeline */}
          <span className="absolute bottom-4 left-[19px] top-3 w-px bg-slate-200 dark:bg-slate-800" />

          {ACTIVITY_FEED.map((a) => {
            const meta = TYPE_META[a.type] || TYPE_META.email
            const user = userById(a.userId)
            return (
              <li key={a.id} className="relative flex gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <span className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-4 ring-white dark:ring-slate-900 ${meta.className}`}>
                  <meta.icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[13px] leading-snug text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {user?.name.split(' ')[0]}
                    </span>{' '}
                    <span dangerouslySetInnerHTML={{ __html: renderInlineMarkup(a.text) }} />
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{timeAgo(a.at)}</span>
                    {a.value && (
                      <span className="tnum rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                        {formatCurrency(a.value)}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </CardBody>
    </Card>
  )
}
