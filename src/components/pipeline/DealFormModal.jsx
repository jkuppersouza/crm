import { useEffect, useState } from 'react'
import { Briefcase } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { Input, Select, Textarea } from '../ui/Fields'
import { STAGE_META, STAGE_ORDER } from '../../config/theme'
import { LEAD_SOURCES } from '../../data/mockData'
import { useCrm } from '../../store/CrmContext'

const EMPTY = {
  title: '', company: '', contactId: '', value: '', stage: 'novo',
  ownerId: '', closeDate: '', probability: 20, source: LEAD_SOURCES[0],
  nextStep: '', description: '',
}

/** Formulário de criação/edição de oportunidade */
export default function DealFormModal({ open, onClose, deal, defaultStage }) {
  const { team, contacts, upsertDeal, notify, currentUser } = useCrm()
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    if (!open) return
    setForm(
      deal
        ? { ...EMPTY, ...deal }
        : { ...EMPTY, stage: defaultStage || 'novo', ownerId: currentUser.id, closeDate: new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10) },
    )
  }, [open, deal, defaultStage, currentUser.id])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSave = () => {
    if (!form.title.trim() || !form.company.trim()) {
      notify('Preencha o título e a empresa.', 'warning')
      return
    }
    upsertDeal({
      ...form,
      value: Number(form.value) || 0,
      probability: Number(form.probability) || 0,
      products: form.products || [],
    })
    notify(deal ? 'Negócio atualizado com sucesso!' : 'Negócio criado com sucesso!')
    onClose()
  }

  // Ao escolher um contato, preenche a empresa automaticamente
  const handleContact = (e) => {
    const c = contacts.find((x) => x.id === e.target.value)
    setForm((f) => ({ ...f, contactId: e.target.value, company: c?.company || f.company }))
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={Briefcase}
      title={deal ? 'Editar negócio' : 'Novo negócio'}
      subtitle={deal ? deal.company : 'Cadastre uma nova oportunidade no pipeline'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>{deal ? 'Salvar alterações' : 'Criar negócio'}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input label="Título da oportunidade *" value={form.title} onChange={set('title')} placeholder="Ex.: Implantação da plataforma — 50 licenças" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Contato"
            value={form.contactId}
            onChange={handleContact}
            placeholder="Selecione um contato"
            options={contacts.map((c) => ({ value: c.id, label: `${c.name} — ${c.company}` }))}
          />
          <Input label="Empresa *" value={form.company} onChange={set('company')} placeholder="Nome da empresa" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="Valor (R$)" type="number" min="0" step="1000" value={form.value} onChange={set('value')} placeholder="0" />
          <Select
            label="Estágio"
            value={form.stage}
            onChange={set('stage')}
            options={STAGE_ORDER.map((s) => ({ value: s, label: STAGE_META[s].label }))}
          />
          <Input label="Previsão de fechamento" type="date" value={form.closeDate} onChange={set('closeDate')} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Responsável"
            value={form.ownerId}
            onChange={set('ownerId')}
            options={team.map((u) => ({ value: u.id, label: u.name }))}
          />
          <Select label="Origem do lead" value={form.source} onChange={set('source')} options={LEAD_SOURCES} />
        </div>

        {/* Probabilidade com slider */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="field-label mb-0">Probabilidade de fechamento</span>
            <span className="tnum text-sm font-bold text-brand-600 dark:text-brand-400">{form.probability}%</span>
          </div>
          <input
            type="range" min="0" max="100" step="5"
            value={form.probability}
            onChange={set('probability')}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600 dark:bg-slate-700"
          />
        </div>

        <Input label="Próximo passo" value={form.nextStep} onChange={set('nextStep')} placeholder="Ex.: Enviar proposta revisada até sexta" />
        <Textarea label="Descrição" value={form.description} onChange={set('description')} rows={3} placeholder="Contexto, escopo e observações do negócio..." />
      </div>
    </Modal>
  )
}
