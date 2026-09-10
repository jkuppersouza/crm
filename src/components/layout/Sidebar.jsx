import { Sparkles, X, Zap } from 'lucide-react'
import { NAV_ITEMS } from './navigation'
import { APP_TEXT } from '../../config/theme'
import { useCrm } from '../../store/CrmContext'
import { cx } from '../../utils/format'

export default function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }) {
  const { company, deals, tasks, notify } = useCrm()

  // Contadores exibidos como "badge" ao lado dos itens do menu
  const counters = {
    pipeline: deals.filter((d) => !['ganho', 'perdido'].includes(d.stage)).length,
    tasks: tasks.filter((t) => !t.done).length,
  }

  const content = (
    /* 🎨 No escuro a sidebar é preto translúcido com desfoque, como no template */
    <div className="flex h-full flex-col bg-white dark:bg-black/80 dark:backdrop-blur-md">
      {/* ── Logo / identidade ────────────────────────────────────── */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200/80 px-5 dark:border-slate-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-black text-brand-fg shadow-sm shadow-brand-600/30">
          {company.logoInitials}
        </div>
        <div className="min-w-0 flex-1">
          {/* 📝 TEXTO: nome do produto (src/config/theme.js → APP_TEXT.productName) */}
          <p className="truncate text-[15px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
            {APP_TEXT.productName}
          </p>
          <p className="truncate text-[11px] font-medium text-slate-400">{APP_TEXT.productTagline}</p>
        </div>
        <button
          onClick={onCloseMobile}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          aria-label="Fechar menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* ── Navegação ────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Menu principal
        </p>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = current === item.id
            const count = counters[item.id]
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onNavigate(item.id)
                    onCloseMobile?.()
                  }}
                  className={cx(
                    'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150',
                    active
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
                  )}
                >
                  {/* Indicador da aba ativa */}
                  {active && (
                    <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-brand-600 dark:bg-brand-400" />
                  )}
                  <item.icon
                    className={cx(
                      'h-[18px] w-[18px] transition-transform duration-150 group-hover:scale-110',
                      active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500',
                    )}
                    strokeWidth={2.2}
                  />
                  <span className="flex-1 text-left">{item.label}</span>
                  {count > 0 && (
                    <span
                      className={cx(
                        'tnum rounded-full px-2 py-0.5 text-[11px] font-bold',
                        active
                          ? 'bg-brand-600 text-brand-fg'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ── Banner de upgrade (gancho comercial da demo) ──────────── */}
      <div className="px-3 pb-4">
        {/* 🎨 Card de vidro escuro com borda fina — mesma receita do template */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
          <Sparkles
            className="absolute -right-3 -top-3 h-20 w-20 text-slate-200/70 dark:text-white/[0.04]"
            strokeWidth={1.5}
          />
          <div className="relative">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
              <Zap className="h-3 w-3" fill="currentColor" />
              Pro
            </div>
            {/* 📝 TEXTO: banner de upgrade (APP_TEXT.upgradeBanner) */}
            <p className="text-sm font-bold leading-tight text-slate-900 dark:text-white">
              {APP_TEXT.upgradeBanner.title}
            </p>
            <p className="mt-1 text-[12px] leading-snug text-slate-500 dark:text-slate-400">
              {APP_TEXT.upgradeBanner.description}
            </p>
            <button
              onClick={() => notify('Este é um ambiente de demonstração.', 'info')}
              className="mt-3 w-full rounded-lg bg-brand-600 py-2 text-[13px] font-bold text-brand-fg transition-transform hover:scale-[1.02] active:scale-95"
            >
              {APP_TEXT.upgradeBanner.cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop — sidebar fixa */}
      <aside className="relative z-10 hidden w-64 shrink-0 border-r border-slate-200/80 lg:block dark:border-slate-800">
        <div className="fixed inset-y-0 left-0 z-10 w-64 border-r border-slate-200/80 dark:border-slate-800">{content}</div>
      </aside>

      {/* Mobile — drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-slate-900/50 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative h-full w-72 animate-slide-in-left shadow-modal">{content}</div>
        </div>
      )}
    </>
  )
}
