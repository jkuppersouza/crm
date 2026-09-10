import { useEffect, useState } from 'react'
import { UserPlus, X } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { Input, Select, Textarea } from '../ui/Fields'
import { CONTACT_STATUS_META } from '../../config/theme'
import { LEAD_SOURCES } from '../../data/mockData'
import { useCrm } from '../../store/CrmContext'

const EMPTY = {
  name: '', company: '', role: '', email: '', phone: '', mobile: '',
  city: '', status: 'lead', source: LEAD_SOURCES[0], ownerId: '', tags: [], notes: '',
}

/** Formulário de criação/edição de contato */
export default function ContactFormModal({ open, onClose, contact }) {
  const { team, upsertContact, notify, currentUser } = useCrm()
  const [form, setForm] = useState(EMPTY)
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (!open) return
    setForm(contact ? { ...EMPTY, ...contact } : { ...EMPTY, ownerId: currentUser.id })
    setTagInput('')
  }, [open, contact, currentUser.id])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const addTag = () => {
    const t = tagInput.trim()
    if (!t || form.tags.includes(t)) return
    setForm((f) => ({ ...f, tags: [...f.tags, t] }))
    setTagInput('')
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.company.trim()) {
      notify('Preencha ao menos o nome e a empresa.', 'warning')
      return
    }
    upsertContact(form)
    notify(contact ? 'Contato atualizado com sucesso!' : 'Contato cadastrado com sucesso!')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={UserPlus}
      title={contact ? 'Editar contato' : 'Novo contato'}
      subtitle={contact ? contact.company : 'Cadastre um novo lead ou cliente na base'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>{contact ? 'Salvar alterações' : 'Cadastrar contato'}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Nome completo *" value={form.name} onChange={set('name')} placeholder="Ex.: Marcos Vinícius Prado" />
          <Input label="Empresa *" value={form.company} onChange={set('company')} placeholder="Ex.: Vertex Logística" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Cargo" value={form.role} onChange={set('role')} placeholder="Ex.: Diretor de Operações" />
          <Input label="Cidade / UF" value={form.city} onChange={set('city')} placeholder="Ex.: São Paulo/SP" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="E-mail" type="email" value={form.email} onChange={set('email')} placeholder="nome@empresa.com.br" />
          <Input label="Telefone" value={form.phone} onChange={set('phone')} placeholder="(11) 3000-0000" />
          <Input label="Celular" value={form.mobile} onChange={set('mobile')} placeholder="(11) 90000-0000" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Select
            label="Status"
            value={form.status}
            onChange={set('status')}
            options={Object.entries(CONTACT_STATUS_META).map(([v, m]) => ({ value: v, label: m.label }))}
          />
          <Select label="Origem do lead" value={form.source} onChange={set('source')} options={LEAD_SOURCES} />
          <Select
            label="Responsável"
            value={form.ownerId}
            onChange={set('ownerId')}
            options={team.map((u) => ({ value: u.id, label: u.name }))}
          />
        </div>

        {/* Tags */}
        <div>
          <span className="field-label">Tags</span>
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Digite e pressione Enter"
              className="field flex-1"
            />
            <Button variant="secondary" onClick={addTag}>Adicionar</Button>
          </div>
          {form.tags.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {form.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 rounded-lg bg-brand-50 py-1 pl-2.5 pr-1 text-xs font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                  {t}
                  <button
                    onClick={() => setForm((f) => ({ ...f, tags: f.tags.filter((x) => x !== t) }))}
                    className="rounded p-0.5 transition-colors hover:bg-brand-100 dark:hover:bg-brand-500/20"
                    aria-label={`Remover ${t}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <Textarea label="Observações" value={form.notes} onChange={set('notes')} rows={3} placeholder="Preferências, contexto da negociação, histórico relevante..." />
      </div>
    </Modal>
  )
}
