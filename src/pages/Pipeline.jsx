import { useMemo, useState } from 'react'
import { Plus, Filter, Layers, TrendingUp, Trophy, Percent } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import KanbanColumn from '../components/pipeline/KanbanColumn'
import DealModal from '../components/pipeline/DealModal'
import DealFormModal from '../components/pipeline/DealFormModal'
import Button from '../components/ui/Button'
import { ConfirmDialog } from '../components/ui/Modal'
import { SearchInput, Select } from '../components/ui/Fields'
import { APP_TEXT, STAGE_ORDER } from '../config/theme'
import { useCrm } from '../store/CrmContext'
import { groupByStage, pipelineMetrics } from '../utils/metrics'
import { formatCompact, formatPercent } from '../utils/format'

export default function Pipeline() {
  const { deals, team, moveDeal, deleteDeal, notify } = useCrm()

  const [query, setQuery] = useState('')
  const [ownerFilter, setOwnerFilter] = useState('')
  const [draggingId, setDraggingId] = useState(null)
  const [selected, setSelected] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [newStage, setNewStage] = useState(null)
  const [toDelete, setToDelete] = useState(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return deals.filter((d) => {
      const matchQ = !q || `${d.title} ${d.company}`.toLowerCase().includes(q)
      const matchOwner = !ownerFilter || d.ownerId === ownerFilter
      return matchQ && matchOwner
    })
  }, [deals, query, ownerFilter])

  const columns = groupByStage(filtered, STAGE_ORDER)
  const m = pipelineMetrics(filtered)

  const handleDrop = (dealId, stage) => {
    const deal = deals.find((d) => d.id === dealId)
    if (deal && deal.stage !== stage) {
      moveDeal(dealId, stage)
      notify('Negócio movido no pipeline.')
    }
    setDraggingId(null)
  }

  const openNew = (stage) => {
    setEditing(null)
    setNewStage(stage || 'novo')
    setFormOpen(true)
  }

  return (
    <>
      <PageHeader
        title={APP_TEXT.pages.pipeline.title}
        subtitle={APP_TEXT.pages.pipeline.subtitle}
        actions={
          <Button icon={Plus} onClick={() => openNew('novo')}>
            Novo negócio
          </Button>
        }
      />

      {/* ── Resumo do pipeline ────────────────────────────────────── */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: 'Valor em aberto', value: formatCompact(m.openValue), icon: Layers, accent: 'text-brand-600 dark:text-brand-400' },
          { label: 'Receita prevista', value: formatCompact(m.forecast), icon: TrendingUp, accent: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Negócios ganhos', value: formatCompact(m.wonValue), icon: Trophy, accent: 'text-amber-600 dark:text-amber-400' },
          { label: 'Taxa de conversão', value: formatPercent(m.conversionRate), icon: Percent, accent: 'text-violet-600 dark:text-violet-400' },
        ].map((s) => (
          <div key={s.label} className="surface flex items-center gap-3 px-4 py-3.5">
            <s.icon className={`h-5 w-5 shrink-0 ${s.accent}`} strokeWidth={2.2} />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium uppercase tracking-wide text-slate-400">{s.label}</p>
              <p className="tnum truncate text-[15px] font-bold text-slate-900 dark:text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filtros ───────────────────────────────────────────────── */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar negócio ou empresa..." className="sm:max-w-xs" />
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 shrink-0 text-slate-400" />
          <Select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            placeholder="Todos os responsáveis"
            options={team.map((u) => ({ value: u.id, label: u.name }))}
            className="min-w-[13rem]"
          />
        </div>
        <span className="tnum ml-auto text-[13px] text-slate-400">
          {filtered.length} de {deals.length} negócios
        </span>
      </div>

      {/* ── Quadro Kanban ─────────────────────────────────────────── */}
      <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6">
        <div className="flex min-h-[60vh] gap-4">
          {columns.map((col) => (
            <KanbanColumn
              key={col.stage}
              stage={col.stage}
              deals={col.items}
              draggingId={draggingId}
              onDragStart={setDraggingId}
              onDragEnd={() => setDraggingId(null)}
              onDrop={handleDrop}
              onOpenDeal={setSelected}
              onAddDeal={openNew}
            />
          ))}
        </div>
      </div>

      {/* ── Modais ────────────────────────────────────────────────── */}
      <DealModal
        deal={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onEdit={(d) => {
          setSelected(null)
          setEditing(d)
          setFormOpen(true)
        }}
        onDelete={(d) => {
          setSelected(null)
          setToDelete(d)
        }}
      />

      <DealFormModal
        open={formOpen}
        deal={editing}
        defaultStage={newStage}
        onClose={() => {
          setFormOpen(false)
          setEditing(null)
        }}
      />

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          deleteDeal(toDelete.id)
          notify('Negócio excluído.', 'warning')
        }}
        title="Excluir negócio"
        message={`Tem certeza que deseja excluir “${toDelete?.title}”? Esta ação não pode ser desfeita.`}
      />
    </>
  )
}
