import { useEffect, useState } from 'react'
import { Users, Plus, Pencil, Trash2, Mail, ShieldCheck, UserCog } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Modal, { ConfirmDialog } from '../ui/Modal'
import { Input, Select } from '../ui/Fields'
import { useCrm } from '../../store/CrmContext'
import { formatCurrency, initialsOf } from '../../utils/format'

const PERMISSIONS = ['Administrador', 'Vendedor', 'Somente leitura']

// 🎨 Cores disponíveis para o avatar de novos usuários
const AVATAR_COLORS = [
  'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-sky-500',
  'bg-rose-500', 'bg-violet-500', 'bg-teal-500', 'bg-orange-500',
]

const EMPTY = { name: '', role: '', email: '', phone: '', permission: 'Vendedor', status: 'ativo', goal: 200000, color: AVATAR_COLORS[0] }

/** Gestão de usuários/equipe (mock) */
export default function TeamManagement() {
  const { team, upsertUser, deleteUser, currentUser, notify } = useCrm()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toDelete, setToDelete] = useState(null)
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    if (!formOpen) return
    setForm(editing ? { ...EMPTY, ...editing } : { ...EMPTY, color: AVATAR_COLORS[team.length % AVATAR_COLORS.length] })
  }, [formOpen, editing, team.length])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      notify('Preencha o nome e o e-mail do usuário.', 'warning')
      return
    }
    upsertUser({ ...form, goal: Number(form.goal) || 0, initials: initialsOf(form.name) })
    notify(editing ? 'Usuário atualizado!' : 'Convite enviado com sucesso!')
    setFormOpen(false)
    setEditing(null)
  }

  return (
    <>
      <Card>
        <CardHeader
          icon={Users}
          title="Equipe e usuários"
          subtitle={`${team.length} usuários · ${team.filter((u) => u.status === 'ativo').length} ativos`}
          action={
            <Button size="sm" icon={Plus} onClick={() => { setEditing(null); setFormOpen(true) }}>
              Convidar
            </Button>
          }
        />
        <CardBody className="pt-0">
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {team.map((u) => (
              <li key={u.id} className="group flex flex-wrap items-center gap-3 py-3.5">
                <Avatar name={u.name} initials={u.initials} color={u.color} size="lg" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{u.name}</p>
                    {u.id === currentUser.id && (
                      <Badge size="sm" className="bg-brand-50 text-brand-700 ring-brand-600/15 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-400/20">
                        Você
                      </Badge>
                    )}
                    {u.status === 'convidado' && (
                      <Badge size="sm" className="bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20">
                        Convite pendente
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-[13px] text-slate-500 dark:text-slate-400">{u.role}</p>
                  <p className="mt-0.5 inline-flex items-center gap-1.5 truncate text-[11px] text-slate-400">
                    <Mail className="h-3 w-3" /> {u.email}
                  </p>
                </div>

                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Meta</p>
                  <p className="tnum text-[13px] font-bold text-slate-800 dark:text-slate-100">{formatCurrency(u.goal)}</p>
                </div>

                <div className="shrink-0">
                  <Badge
                    size="sm"
                    className={
                      u.permission === 'Administrador'
                        ? 'bg-violet-50 text-violet-700 ring-violet-600/15 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20'
                        : u.permission === 'Vendedor'
                          ? 'bg-sky-50 text-sky-700 ring-sky-600/15 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20'
                          : 'bg-slate-100 text-slate-600 ring-slate-500/15 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600/30'
                    }
                  >
                    {u.permission === 'Administrador' ? <ShieldCheck className="h-3 w-3" /> : <UserCog className="h-3 w-3" />}
                    {u.permission}
                  </Badge>
                </div>

                <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => { setEditing(u); setFormOpen(true) }}
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                    aria-label="Editar usuário"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setToDelete(u)}
                    disabled={u.id === currentUser.id}
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-rose-500/10"
                    aria-label="Remover usuário"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      {/* Formulário de usuário */}
      <Modal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditing(null) }}
        icon={Users}
        title={editing ? 'Editar usuário' : 'Convidar usuário'}
        subtitle={editing ? editing.email : 'O convite será enviado por e-mail'}
        footer={
          <>
            <Button variant="secondary" onClick={() => { setFormOpen(false); setEditing(null) }}>Cancelar</Button>
            <Button onClick={handleSave}>{editing ? 'Salvar' : 'Enviar convite'}</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Nome completo *" value={form.name} onChange={set('name')} placeholder="Ex.: Carolina Ribeiro" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="E-mail *" type="email" value={form.email} onChange={set('email')} placeholder="nome@empresa.com.br" />
            <Input label="Telefone" value={form.phone} onChange={set('phone')} placeholder="(11) 90000-0000" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Cargo" value={form.role} onChange={set('role')} placeholder="Ex.: Executivo de Contas" />
            <Select label="Permissão" value={form.permission} onChange={set('permission')} options={PERMISSIONS} />
          </div>
          <Input label="Meta de vendas (R$)" type="number" step="10000" value={form.goal} onChange={set('goal')} />

          <div>
            <span className="field-label">Cor do avatar</span>
            <div className="flex flex-wrap gap-2">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm((f) => ({ ...f, color: c }))}
                  className={`h-8 w-8 rounded-full ${c} transition-transform hover:scale-110 ${
                    form.color === c ? 'ring-2 ring-slate-900 ring-offset-2 dark:ring-white dark:ring-offset-slate-900' : ''
                  }`}
                  aria-label={`Cor ${c}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          deleteUser(toDelete.id)
          notify('Usuário removido da equipe.', 'warning')
        }}
        title="Remover usuário"
        message={`Remover ${toDelete?.name} da equipe? Os negócios atribuídos precisarão ser redistribuídos.`}
        confirmLabel="Remover"
      />
    </>
  )
}
