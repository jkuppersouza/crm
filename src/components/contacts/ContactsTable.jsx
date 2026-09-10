import { ArrowUpDown, Mail, Phone, Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Badge, { Tag } from '../ui/Badge'
import { CONTACT_STATUS_META } from '../../config/theme'
import { useCrm } from '../../store/CrmContext'
import { cx, formatDateShort } from '../../utils/format'

const COLUMNS = [
  { key: 'name', label: 'Contato', sortable: true },
  { key: 'company', label: 'Empresa', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'source', label: 'Origem', sortable: false },
  { key: 'ownerId', label: 'Responsável', sortable: true },
  { key: 'lastContact', label: 'Último contato', sortable: true },
]

export default function ContactsTable({ contacts, sort, onSort, onOpen, onEdit, onDelete }) {
  const { userById } = useCrm()

  return (
    <div className="surface overflow-hidden">
      {/* ── Tabela (desktop) ───────────────────────────────────── */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[52rem] text-left">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/40">
              {COLUMNS.map((col) => (
                <th key={col.key} className="px-5 py-3">
                  <button
                    disabled={!col.sortable}
                    onClick={() => onSort(col.key)}
                    className={cx(
                      'inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors',
                      col.sortable ? 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200' : 'cursor-default text-slate-500',
                      sort.key === col.key && 'text-brand-600 dark:text-brand-400',
                    )}
                  >
                    {col.label}
                    {col.sortable && <ArrowUpDown className="h-3 w-3" />}
                  </button>
                </th>
              ))}
              <th className="w-24 px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {contacts.map((c) => {
              const owner = userById(c.ownerId)
              const status = CONTACT_STATUS_META[c.status]
              return (
                <tr
                  key={c.id}
                  onClick={() => onOpen(c)}
                  className="group cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} size="md" color="bg-gradient-to-br from-brand-500 to-brand-700" textColor="text-brand-fg" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{c.name}</p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">{c.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">{c.company}</p>
                    <p className="truncate text-xs text-slate-400">{c.city}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge size="sm" className={status.soft}>{status.label}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[13px] text-slate-600 dark:text-slate-300">{c.source}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    {owner && (
                      <div className="flex items-center gap-2">
                        <Avatar name={owner.name} initials={owner.initials} color={owner.color} size="xs" />
                        <span className="truncate text-[13px] text-slate-600 dark:text-slate-300">
                          {owner.name.split(' ')[0]}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="tnum text-[13px] text-slate-500 dark:text-slate-400">
                      {formatDateShort(c.lastContact)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <a
                        href={`mailto:${c.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700"
                        aria-label="Enviar e-mail"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <button
                        onClick={(e) => { e.stopPropagation(); onEdit(c) }}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700"
                        aria-label="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDelete(c) }}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
                        aria-label="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── Cards (mobile) ─────────────────────────────────────── */}
      <ul className="divide-y divide-slate-100 md:hidden dark:divide-slate-800">
        {contacts.map((c) => {
          const status = CONTACT_STATUS_META[c.status]
          return (
            <li key={c.id}>
              <button onClick={() => onOpen(c)} className="flex w-full items-start gap-3 px-4 py-4 text-left">
                <Avatar name={c.name} size="lg" color="bg-gradient-to-br from-brand-500 to-brand-700" textColor="text-brand-fg" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{c.name}</p>
                    <Badge size="sm" className={status.soft}>{status.label}</Badge>
                  </div>
                  <p className="truncate text-xs text-slate-500">{c.role} · {c.company}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{c.mobile}</span>
                    <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{c.email}</span>
                  </div>
                  {c.tags?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {c.tags.slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                  )}
                </div>
                <MoreHorizontal className="mt-1 h-4 w-4 shrink-0 text-slate-300" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
