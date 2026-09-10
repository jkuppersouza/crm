import { useState } from 'react'
import { Building2, Palette, Users, Bell, Info } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import CompanyProfile from '../components/settings/CompanyProfile'
import ThemeSettings from '../components/settings/ThemeSettings'
import TeamManagement from '../components/settings/TeamManagement'
import Card, { CardBody, CardHeader } from '../components/ui/Card'
import { APP_TEXT } from '../config/theme'
import { useCrm } from '../store/CrmContext'
import { cx } from '../utils/format'

const TABS = [
  { id: 'company', label: 'Empresa', icon: Building2 },
  { id: 'theme', label: 'Aparência', icon: Palette },
  { id: 'team', label: 'Equipe', icon: Users },
  { id: 'notifications', label: 'Notificações', icon: Bell },
]

// 📝 TEXTO: preferências de notificação exibidas na aba correspondente
const NOTIFICATION_PREFS = [
  { id: 'n1', label: 'Novo lead atribuído a mim', description: 'Receba um alerta sempre que um lead for direcionado para você.', on: true },
  { id: 'n2', label: 'Negócio movido no pipeline', description: 'Acompanhe mudanças de estágio das oportunidades da sua equipe.', on: true },
  { id: 'n3', label: 'Tarefa próxima do vencimento', description: 'Lembrete enviado 1 hora antes do horário agendado.', on: true },
  { id: 'n4', label: 'Resumo diário por e-mail', description: 'Um panorama da operação todos os dias às 8h.', on: false },
  { id: 'n5', label: 'Relatório semanal de desempenho', description: 'Enviado toda segunda-feira para gestores.', on: true },
  { id: 'n6', label: 'Menções em comentários', description: 'Avise quando alguém mencionar você em uma nota.', on: false },
]

export default function Settings() {
  const { notify } = useCrm()
  const [tab, setTab] = useState('company')
  const [prefs, setPrefs] = useState(NOTIFICATION_PREFS)

  const togglePref = (id) => {
    setPrefs((p) => p.map((x) => (x.id === id ? { ...x, on: !x.on } : x)))
    notify('Preferência de notificação atualizada.')
  }

  return (
    <>
      <PageHeader title={APP_TEXT.pages.settings.title} subtitle={APP_TEXT.pages.settings.subtitle} />

      {/* Abas */}
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-800">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cx(
              'relative flex shrink-0 items-center gap-2 px-4 py-3 text-[13.5px] font-semibold transition-colors',
              tab === t.id
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
            )}
          >
            <t.icon className="h-4 w-4" strokeWidth={2.2} />
            {t.label}
            {tab === t.id && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-600 dark:bg-brand-400" />}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {tab === 'company' && <CompanyProfile />}
        {tab === 'theme' && <ThemeSettings />}
        {tab === 'team' && <TeamManagement />}

        {tab === 'notifications' && (
          <Card>
            <CardHeader icon={Bell} title="Preferências de notificação" subtitle="Escolha o que a equipe recebe por e-mail e no app" />
            <CardBody className="pt-0">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {prefs.map((p) => (
                  <li key={p.id} className="flex items-start justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{p.label}</p>
                      <p className="mt-0.5 text-[13px] text-slate-500 dark:text-slate-400">{p.description}</p>
                    </div>
                    {/* Toggle switch */}
                    <button
                      onClick={() => togglePref(p.id)}
                      role="switch"
                      aria-checked={p.on}
                      className={cx(
                        'relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
                        p.on ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-700',
                      )}
                    >
                      <span
                        className={cx(
                          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                          p.on ? 'translate-x-[22px]' : 'translate-x-0.5',
                        )}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        )}

        {/* Aviso de ambiente de demonstração */}
        <div className="flex items-start gap-3 rounded-2xl border border-brand-200/70 bg-brand-50/60 p-4 dark:border-brand-500/20 dark:bg-brand-500/5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
            {/* 📝 TEXTO: aviso de demonstração — remova este bloco na versão de produção */}
            Este é um <strong className="font-semibold text-slate-900 dark:text-white">ambiente de demonstração</strong>.
            Todos os dados são fictícios e as alterações ficam apenas nesta sessão do navegador —
            ao recarregar a página, tudo volta ao estado original.
          </p>
        </div>
      </div>
    </>
  )
}
