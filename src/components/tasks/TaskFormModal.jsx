import { useEffect, useState } from 'react'
import { CheckSquare } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { Input, Select, Textarea } from '../ui/Fields'
import { PRIORITY_META } from '../../config/theme'
import { TASK_TYPE_META } from './TaskItem'
import { useCrm } from '../../store/CrmContext'

const EMPTY = {
  title: '', type: 'ligacao', priority: 'media', dueDate: '', time: '09:00',
  ownerId: '', contactId: '', dealId: '', notes: '', done: false,
}

/** Formulário de criação/edição de tarefa */
export default function TaskFormModal({ open, onClose, task, defaultDate }) {
  const { team, contacts, deals, upsertTask, notify, currentUser } = useCrm()
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    if (!open) return
    setForm(
      task
        ? { ...EMPTY, ...task }
        : {
            ...EMPTY,
            ownerId: currentUser.id,
            dueDate: defaultDate || new Date().toISOString().slice(0, 10),
          },
    )
  }, [open, task, defaultDate, currentUser.id])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSave = () => {
    if (!form.title.trim()) {
      notify('Dê um título para a tarefa.', 'warning')
      return
    }
    upsertTask({
      ...form,
      contactId: form.contactId || null,
      dealId: form.dealId || null,
    })
    notify(task ? 'Tarefa atualizada!' : 'Tarefa criada com sucesso!')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={CheckSquare}
      title={task ? 'Editar tarefa' : 'Nova tarefa'}
      subtitle="Vincule a um contato ou oportunidade para manter o histórico completo"
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>{task ? 'Salvar alterações' : 'Criar tarefa'}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input label="Título *" value={form.title} onChange={set('title')} placeholder="Ex.: Ligar para confirmar a proposta" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Tipo de atividade"
            value={form.type}
            onChange={set('type')}
            options={Object.entries(TASK_TYPE_META).map(([v, m]) => ({ value: v, label: m.label }))}
          />
          <Select
            label="Prioridade"
            value={form.priority}
            onChange={set('priority')}
            options={Object.entries(PRIORITY_META).map(([v, m]) => ({ value: v, label: m.label }))}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="Data" type="date" value={form.dueDate} onChange={set('dueDate')} />
          <Input label="Horário" type="time" value={form.time} onChange={set('time')} />
          <Select
            label="Responsável"
            value={form.ownerId}
            onChange={set('ownerId')}
            options={team.map((u) => ({ value: u.id, label: u.name }))}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Contato vinculado"
            value={form.contactId || ''}
            onChange={set('contactId')}
            placeholder="Nenhum"
            options={contacts.map((c) => ({ value: c.id, label: `${c.name} — ${c.company}` }))}
          />
          <Select
            label="Negócio vinculado"
            value={form.dealId || ''}
            onChange={set('dealId')}
            placeholder="Nenhum"
            options={deals.map((d) => ({ value: d.id, label: `${d.title}` }))}
          />
        </div>

        <Textarea label="Observações" value={form.notes} onChange={set('notes')} rows={3} placeholder="Detalhes, roteiro da ligação, pontos a abordar..." />
      </div>
    </Modal>
  )
}
