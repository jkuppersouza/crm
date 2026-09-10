import {
  Briefcase, Building2, CalendarDays, Mail, Phone, Target, User, Pencil, Trash2,
  Package, Flag, TrendingUp, Sparkles,
} from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import { STAGE_META, STAGE_ORDER } from '../../config/theme'
import { useCrm } from '../../store/CrmContext'
import { cx, formatCurrency, formatDateLong, dueLabel } from '../../utils/format'

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={2.1} />
      <span className="w-32 shrink-0 text-[13px] text-slate-500 dark:text-slate-400">{label}</span>
      <span className="min-w-0 flex-1 text-[13px] font-medium text-slate-800 dark:text-slate-100">{children}</span>
    </div>
  )
}

/** Modal de detalhes completos da oportunidade */
export default function DealModal({ deal, open, onClose, onEdit, onDelete }) {
  const { contactById, userById, moveDeal, notify } = useCrm()
  if (!deal) return null

  const contact = contactById(deal.contactId)
  const owner = userById(deal.ownerId)
  const meta = STAGE_META[deal.stage]
  const weighted = deal.value * (deal.probability / 100)

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={Briefcase}
      title={deal.title}
      subtitle={deal.company}
      size="lg"
      footer={
        <>
          <Button variant="dangerGhost" icon={Trash2} onClick={() => onDelete?.(deal)}>
            Excluir
          </Button>
          <div className="flex-1" />
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
          <Button icon={Pencil} onClick={() => onEdit?.(deal)}>Editar negócio</Button>
        </>
      }
    >
      {/* Resumo em destaque */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Valor', value: formatCurrency(deal.value), accent: true },
          { label: 'Probabilidade', value: `${deal.probability}%` },
          { label: 'Valor ponderado', value: formatCurrency(weighted) },
          { label: 'Fechamento', value: dueLabel(deal.closeDate) },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-slate-50 px-3.5 py-3 dark:bg-slate-800/60">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{s.label}</p>
            <p className={cx('tnum mt-1 text-[15px] font-bold', s.accent ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white')}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Mudança rápida de estágio */}
      <div className="mt-6">
        <p className="field-label">Estágio no pipeline</p>
        <div className="flex flex-wrap gap-1.5">
          {STAGE_ORDER.map((stage) => {
            const sm = STAGE_META[stage]
            const active = deal.stage === stage
            return (
              <button
                key={stage}
                onClick={() => {
                  moveDeal(deal.id, stage)
                  notify(`Negócio movido para “${sm.label}”.`)
                }}
                className={cx(
                  'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-150',
                  active
                    ? `${sm.soft} scale-105 shadow-sm ring-1 ring-inset ring-slate-900/5 dark:ring-white/10`
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
                )}
              >
                <span className={cx('h-1.5 w-1.5 rounded-full', sm.dot)} />
                {sm.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Detalhes */}
      <div className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
        <Row icon={Building2} label="Empresa">{deal.company}</Row>
        {contact && (
          <Row icon={User} label="Contato">
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-semibold">{contact.name}</span>
              <span className="text-slate-400">· {contact.role}</span>
            </span>
          </Row>
        )}
        {contact && (
          <Row icon={Mail} label="E-mail">
            <a href={`mailto:${contact.email}`} className="text-brand-600 hover:underline dark:text-brand-400">
              {contact.email}
            </a>
          </Row>
        )}
        {contact && <Row icon={Phone} label="Telefone">{contact.mobile || contact.phone}</Row>}
        <Row icon={User} label="Responsável">
          {owner && (
            <span className="flex items-center gap-2">
              <Avatar name={owner.name} initials={owner.initials} color={owner.color} size="xs" />
              {owner.name}
            </span>
          )}
        </Row>
        <Row icon={CalendarDays} label="Previsão">{formatDateLong(deal.closeDate)}</Row>
        <Row icon={Target} label="Origem"><Badge size="sm">{deal.source}</Badge></Row>
        <Row icon={TrendingUp} label="Status atual">
          <Badge size="sm" className={meta.soft} dot={meta.dot}>{meta.label}</Badge>
        </Row>
        {deal.products?.length > 0 && (
          <Row icon={Package} label="Produtos">
            <span className="flex flex-wrap gap-1.5">
              {deal.products.map((p) => (
                <Badge key={p} size="sm">{p}</Badge>
              ))}
            </span>
          </Row>
        )}
        {deal.lostReason && (
          <Row icon={Flag} label="Motivo da perda">
            <span className="text-rose-600 dark:text-rose-400">{deal.lostReason}</span>
          </Row>
        )}
      </div>

      {/* Descrição e próximo passo */}
      {deal.description && (
        <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
          <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">Descrição</p>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{deal.description}</p>
        </div>
      )}

      {deal.nextStep && (
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-brand-200/70 bg-brand-50/60 p-4 dark:border-brand-500/20 dark:bg-brand-500/5">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">Próximo passo</p>
            <p className="mt-1 text-[13px] font-medium leading-relaxed text-slate-700 dark:text-slate-200">{deal.nextStep}</p>
          </div>
        </div>
      )}
    </Modal>
  )
}
