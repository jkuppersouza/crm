import { useState } from 'react'
import {
  Mail, Phone, MapPin, Building2, Briefcase, Target, Calendar,
  Users as UsersIcon, ClipboardList, Send, Pencil, Trash2, StickyNote,
} from 'lucide-react'
import { Drawer } from '../ui/Modal'
import Button from '../ui/Button'
import Badge, { Tag } from '../ui/Badge'
import Avatar from '../ui/Avatar'
import { Select, Textarea, EmptyState } from '../ui/Fields'
import { CONTACT_STATUS_META, STAGE_META } from '../../config/theme'
import { useCrm } from '../../store/CrmContext'
import { cx, formatCurrency, formatDateLong, formatDateShort } from '../../utils/format'

const INTERACTION_TYPES = {
  ligacao: { icon: Phone, label: 'Ligação', className: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' },
  email: { icon: Mail, label: 'E-mail', className: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400' },
  reuniao: { icon: UsersIcon, label: 'Reunião', className: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400' },
  nota: { icon: StickyNote, label: 'Nota', className: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' },
}

/** Ficha completa do contato com histórico de interações */
export default function ContactDrawer({ contact, open, onClose, onEdit, onDelete, onOpenDeal }) {
  const { userById, deals, addInteraction, currentUser, notify } = useCrm()
  const [tab, setTab] = useState('info')
  const [newType, setNewType] = useState('ligacao')
  const [newNote, setNewNote] = useState('')

  if (!contact) return null

  const owner = userById(contact.ownerId)
  const status = CONTACT_STATUS_META[contact.status]
  const relatedDeals = deals.filter((d) => d.contactId === contact.id)
  const totalValue = relatedDeals.reduce((s, d) => s + d.value, 0)

  const handleAddInteraction = () => {
    if (!newNote.trim()) {
      notify('Escreva uma descrição para registrar a interação.', 'warning')
      return
    }
    addInteraction(contact.id, {
      type: newType,
      title: INTERACTION_TYPES[newType].label + ' registrada',
      description: newNote.trim(),
      date: new Date().toISOString().slice(0, 10),
      user: currentUser.id,
    })
    setNewNote('')
    notify('Interação registrada no histórico!')
  }

  const TABS = [
    { id: 'info', label: 'Informações' },
    { id: 'history', label: `Histórico (${contact.interactions?.length || 0})` },
    { id: 'deals', label: `Negócios (${relatedDeals.length})` },
  ]

  return (
    <Drawer
      open={open}
      onClose={onClose}
      header={
        <div className="flex items-center gap-4">
          <Avatar name={contact.name} size="xl" color="bg-gradient-to-br from-brand-500 to-brand-700" textColor="text-brand-fg" />
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-slate-900 dark:text-white">{contact.name}</h2>
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
              {contact.role} · {contact.company}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Badge size="sm" className={status.soft}>{status.label}</Badge>
              {owner && (
                <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Avatar name={owner.name} initials={owner.initials} color={owner.color} size="xs" />
                  {owner.name.split(' ')[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      }
      footer={
        <>
          <Button variant="dangerGhost" icon={Trash2} onClick={() => onDelete?.(contact)}>Excluir</Button>
          <div className="flex-1" />
          <Button variant="secondary" as="a" href={`mailto:${contact.email}`} icon={Mail}>E-mail</Button>
          <Button icon={Pencil} onClick={() => onEdit?.(contact)}>Editar</Button>
        </>
      }
    >
      {/* Ações rápidas */}
      <div className="grid grid-cols-3 gap-2 border-b border-slate-200/80 px-6 py-4 dark:border-slate-800">
        {[
          { icon: Phone, label: 'Ligar', href: `tel:${contact.mobile}` },
          { icon: Mail, label: 'E-mail', href: `mailto:${contact.email}` },
          { icon: Calendar, label: 'Agendar', action: () => notify('Agenda integrada — ambiente de demonstração.', 'info') },
        ].map((a) => (
          <a
            key={a.label}
            href={a.href}
            onClick={a.action ? (e) => { e.preventDefault(); a.action() } : undefined}
            className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-3 text-[12px] font-semibold text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
          >
            <a.icon className="h-4 w-4" strokeWidth={2.2} />
            {a.label}
          </a>
        ))}
      </div>

      {/* Abas */}
      <div className="flex gap-1 border-b border-slate-200/80 px-6 dark:border-slate-800">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cx(
              'relative px-3 py-3 text-[13px] font-semibold transition-colors',
              tab === t.id
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
            )}
          >
            {t.label}
            {tab === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-600 dark:bg-brand-400" />}
          </button>
        ))}
      </div>

      <div className="px-6 py-5">
        {/* ── Aba: informações ─────────────────────────────────── */}
        {tab === 'info' && (
          <div className="space-y-1">
            {[
              { icon: Building2, label: 'Empresa', value: contact.company },
              { icon: Briefcase, label: 'Cargo', value: contact.role },
              { icon: Mail, label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
              { icon: Phone, label: 'Telefone', value: contact.phone },
              { icon: Phone, label: 'Celular', value: contact.mobile },
              { icon: MapPin, label: 'Cidade', value: contact.city },
              { icon: Target, label: 'Origem do lead', value: contact.source },
              { icon: Calendar, label: 'Cliente desde', value: formatDateLong(contact.createdAt) },
            ].map((row) => (
              <div key={row.label} className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-0 dark:border-slate-800">
                <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" strokeWidth={2.1} />
                <span className="w-28 shrink-0 text-[13px] text-slate-500 dark:text-slate-400">{row.label}</span>
                {row.href ? (
                  <a href={row.href} className="min-w-0 flex-1 truncate text-[13px] font-medium text-brand-600 hover:underline dark:text-brand-400">
                    {row.value}
                  </a>
                ) : (
                  <span className="min-w-0 flex-1 text-[13px] font-medium text-slate-800 dark:text-slate-100">{row.value}</span>
                )}
              </div>
            ))}

            {contact.tags?.length > 0 && (
              <div className="pt-4">
                <p className="field-label">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {contact.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            )}

            {contact.notes && (
              <div className="pt-4">
                <p className="field-label">Observações</p>
                <p className="rounded-xl bg-slate-50 p-4 text-[13px] leading-relaxed text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
                  {contact.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Aba: histórico ───────────────────────────────────── */}
        {tab === 'history' && (
          <div>
            {/* Registrar nova interação */}
            <div className="mb-6 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <p className="field-label">Registrar interação</p>
              <div className="flex flex-col gap-2.5">
                <Select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  options={Object.entries(INTERACTION_TYPES).map(([v, m]) => ({ value: v, label: m.label }))}
                />
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={2}
                  placeholder="O que aconteceu nesta interação?"
                />
                <Button icon={Send} size="sm" className="self-end" onClick={handleAddInteraction}>
                  Registrar
                </Button>
              </div>
            </div>

            {contact.interactions?.length ? (
              <ol className="relative space-y-4">
                <span className="absolute bottom-2 left-[17px] top-2 w-px bg-slate-200 dark:bg-slate-800" />
                {contact.interactions.map((it) => {
                  const meta = INTERACTION_TYPES[it.type] || INTERACTION_TYPES.nota
                  const user = userById(it.user)
                  return (
                    <li key={it.id} className="relative flex gap-3">
                      <span className={cx('relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-4 ring-white dark:ring-slate-900', meta.className)}>
                        <meta.icon className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                      <div className="min-w-0 flex-1 pb-1">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <p className="text-[13px] font-semibold text-slate-900 dark:text-white">{it.title}</p>
                          <span className="text-[11px] text-slate-400">{formatDateShort(it.date)}</span>
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{it.description}</p>
                        {user && (
                          <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Avatar name={user.name} initials={user.initials} color={user.color} size="xs" />
                            {user.name}
                          </p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ol>
            ) : (
              <EmptyState icon={ClipboardList} title="Sem interações" description="Registre a primeira interação com este contato." />
            )}
          </div>
        )}

        {/* ── Aba: negócios ────────────────────────────────────── */}
        {tab === 'deals' && (
          <div>
            {relatedDeals.length ? (
              <>
                <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                  <span className="text-[13px] text-slate-500 dark:text-slate-400">Valor total</span>
                  <span className="tnum text-base font-bold text-slate-900 dark:text-white">{formatCurrency(totalValue)}</span>
                </div>
                <ul className="space-y-2.5">
                  {relatedDeals.map((d) => {
                    const meta = STAGE_META[d.stage]
                    return (
                      <li key={d.id}>
                        <button
                          onClick={() => onOpenDeal?.(d)}
                          className="w-full rounded-xl border border-slate-200 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover dark:border-slate-700"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-[13px] font-semibold text-slate-900 dark:text-white">{d.title}</p>
                            <span className="tnum shrink-0 text-[13px] font-bold text-slate-900 dark:text-white">
                              {formatCurrency(d.value)}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge size="sm" className={meta.soft} dot={meta.dot}>{meta.label}</Badge>
                            <span className="text-[11px] text-slate-400">{formatDateShort(d.closeDate)}</span>
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </>
            ) : (
              <EmptyState icon={Briefcase} title="Nenhum negócio" description="Este contato ainda não tem oportunidades cadastradas." />
            )}
          </div>
        )}
      </div>
    </Drawer>
  )
}
