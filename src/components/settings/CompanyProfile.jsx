import { useState } from 'react'
import { Building2, Save, Upload } from 'lucide-react'
import Card, { CardBody, CardHeader } from '../ui/Card'
import Button from '../ui/Button'
import { Input } from '../ui/Fields'
import { useCrm } from '../../store/CrmContext'

/** Perfil da empresa — nome, logo (iniciais) e dados de contato */
export default function CompanyProfile() {
  const { company, setCompany, notify } = useCrm()
  const [form, setForm] = useState(company)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSave = () => {
    setCompany(form)
    notify('Perfil da empresa atualizado!')
  }

  return (
    <Card>
      <CardHeader icon={Building2} title="Perfil da empresa" subtitle="Dados exibidos no CRM e nos documentos gerados" />
      <CardBody>
        {/* Logo */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center dark:bg-slate-800/50">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-xl font-black text-brand-fg shadow-sm shadow-brand-600/30">
            {form.logoInitials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Logotipo</p>
            <p className="mt-0.5 text-[13px] text-slate-500 dark:text-slate-400">
              Formato PNG ou SVG, até 2 MB. Na demonstração usamos as iniciais.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Input
              value={form.logoInitials}
              onChange={(e) => setForm((f) => ({ ...f, logoInitials: e.target.value.slice(0, 2).toUpperCase() }))}
              className="w-16 text-center font-bold"
            />
            <Button variant="secondary" icon={Upload} onClick={() => notify('Upload disponível na versão completa.', 'info')}>
              Enviar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Nome fantasia" value={form.name} onChange={set('name')} />
          <Input label="Razão social" value={form.legalName} onChange={set('legalName')} />
          <Input label="CNPJ" value={form.cnpj} onChange={set('cnpj')} />
          <Input label="Segmento" value={form.segment} onChange={set('segment')} />
          <Input label="Site" value={form.website} onChange={set('website')} />
          <Input label="Telefone comercial" value={form.phone} onChange={set('phone')} />
          <Input label="E-mail comercial" value={form.email} onChange={set('email')} />
          <Input
            label="Meta anual (R$)"
            type="number"
            value={form.fiscalYearGoal}
            onChange={(e) => setForm((f) => ({ ...f, fiscalYearGoal: Number(e.target.value) }))}
          />
          <div className="sm:col-span-2">
            <Input label="Endereço" value={form.address} onChange={set('address')} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button icon={Save} onClick={handleSave}>Salvar alterações</Button>
        </div>
      </CardBody>
    </Card>
  )
}
