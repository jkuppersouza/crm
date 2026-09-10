import { useMemo, useState } from 'react'
import { Plus, Download, Users, SlidersHorizontal } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import ContactsTable from '../components/contacts/ContactsTable'
import ContactDrawer from '../components/contacts/ContactDrawer'
import ContactFormModal from '../components/contacts/ContactFormModal'
import DealModal from '../components/pipeline/DealModal'
import Button from '../components/ui/Button'
import { ConfirmDialog } from '../components/ui/Modal'
import { SearchInput, Select, EmptyState } from '../components/ui/Fields'
import { APP_TEXT, CONTACT_STATUS_META } from '../config/theme'
import { useCrm } from '../store/CrmContext'
import { LEAD_SOURCES } from '../data/mockData'

export default function Contacts() {
  const { contacts, team, deleteContact, notify } = useCrm()

  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('')
  const [sourceFilter, setSourceFilter] = useState('')
  const [sort, setSort] = useState({ key: 'name', dir: 'asc' })

  const [selected, setSelected] = useState(null)
  const [editing, setEditing] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [dealPreview, setDealPreview] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = contacts.filter((c) => {
      const matchQ = !q || `${c.name} ${c.company} ${c.email} ${c.role} ${(c.tags || []).join(' ')}`.toLowerCase().includes(q)
      return (
        matchQ &&
        (!statusFilter || c.status === statusFilter) &&
        (!ownerFilter || c.ownerId === ownerFilter) &&
        (!sourceFilter || c.source === sourceFilter)
      )
    })

    return [...list].sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1
      const va = a[sort.key] ?? ''
      const vb = b[sort.key] ?? ''
      return String(va).localeCompare(String(vb), 'pt-BR') * dir
    })
  }, [contacts, query, statusFilter, ownerFilter, sourceFilter, sort])

  const handleSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }))

  const clearFilters = () => {
    setQuery(''); setStatusFilter(''); setOwnerFilter(''); setSourceFilter('')
  }

  const hasFilters = query || statusFilter || ownerFilter || sourceFilter

  return (
    <>
      <PageHeader
        title={APP_TEXT.pages.contacts.title}
        subtitle={APP_TEXT.pages.contacts.subtitle}
        actions={
          <>
            <Button variant="secondary" icon={Download} onClick={() => notify('Base exportada em CSV!')}>
              Exportar
            </Button>
            <Button icon={Plus} onClick={() => { setEditing(null); setFormOpen(true) }}>
              Novo contato
            </Button>
          </>
        }
      />

      {/* ── Filtros ───────────────────────────────────────────────── */}
      <div className="surface mb-5 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Buscar por nome, empresa, e-mail ou tag..."
            className="lg:max-w-sm lg:flex-1"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:items-center">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              placeholder="Todos os status"
              options={Object.entries(CONTACT_STATUS_META).map(([v, m]) => ({ value: v, label: m.label }))}
              className="lg:w-40"
            />
            <Select
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              placeholder="Todos os responsáveis"
              options={team.map((u) => ({ value: u.id, label: u.name }))}
              className="lg:w-48"
            />
            <Select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              placeholder="Todas as origens"
              options={LEAD_SOURCES}
              className="lg:w-44"
            />
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-semibold text-brand-600 transition-colors hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-500/10"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Limpar filtros
            </button>
          )}
        </div>

        <p className="tnum mt-3 text-[13px] text-slate-400">
          Exibindo <span className="font-semibold text-slate-600 dark:text-slate-300">{filtered.length}</span> de {contacts.length} contatos
        </p>
      </div>

      {/* ── Tabela ────────────────────────────────────────────────── */}
      {filtered.length ? (
        <ContactsTable
          contacts={filtered}
          sort={sort}
          onSort={handleSort}
          onOpen={setSelected}
          onEdit={(c) => { setEditing(c); setFormOpen(true) }}
          onDelete={setToDelete}
        />
      ) : (
        <div className="surface">
          <EmptyState
            icon={Users}
            title="Nenhum contato encontrado"
            description="Ajuste os filtros ou cadastre um novo contato na base."
            action={<Button icon={Plus} onClick={() => { setEditing(null); setFormOpen(true) }}>Novo contato</Button>}
          />
        </div>
      )}

      {/* ── Painéis e modais ──────────────────────────────────────── */}
      <ContactDrawer
        contact={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onEdit={(c) => { setSelected(null); setEditing(c); setFormOpen(true) }}
        onDelete={(c) => { setSelected(null); setToDelete(c) }}
        onOpenDeal={(d) => setDealPreview(d)}
      />

      <ContactFormModal
        open={formOpen}
        contact={editing}
        onClose={() => { setFormOpen(false); setEditing(null) }}
      />

      <DealModal deal={dealPreview} open={!!dealPreview} onClose={() => setDealPreview(null)} />

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          deleteContact(toDelete.id)
          notify('Contato excluído.', 'warning')
        }}
        title="Excluir contato"
        message={`Tem certeza que deseja excluir ${toDelete?.name}? Todo o histórico de interações será removido.`}
      />
    </>
  )
}
