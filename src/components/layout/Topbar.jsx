import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Menu, Search, Bell, Moon, Sun, ChevronDown, Plus, Building2, User as UserIcon,
  LogOut, Settings as SettingsIcon, HelpCircle, CircleDollarSign,
} from 'lucide-react'
import { APP_TEXT, STAGE_META } from '../../config/theme'
import { useCrm } from '../../store/CrmContext'
import { cx, formatCurrency, timeAgo } from '../../utils/format'
import Avatar from '../ui/Avatar'
import { ACTIVITY_FEED } from '../../data/mockData'

export default function Topbar({ onOpenMobileNav, onNavigate, onQuickAdd, onOpenContact, onOpenDeal }) {
  const { currentUser, contacts, deals, mode, toggleMode, notify } = useCrm()
  const [query, setQuery] = useState('')
  const [openMenu, setOpenMenu] = useState(null) // 'user' | 'bell' | null
  const wrapRef = useRef(null)

  // Fecha dropdowns ao clicar fora
  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Busca global: contatos + negócios
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return null
    return {
      contacts: contacts
        .filter((c) => `${c.name} ${c.company} ${c.email}`.toLowerCase().includes(q))
        .slice(0, 4),
      deals: deals.filter((d) => `${d.title} ${d.company}`.toLowerCase().includes(q)).slice(0, 4),
    }
  }, [query, contacts, deals])

  const unread = ACTIVITY_FEED.slice(0, 4)

  return (
    /* 🎨 Topbar de vidro sobre o preto — mesma receita do template */
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md dark:border-slate-800/50 dark:bg-black/80">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6" ref={wrapRef}>
        <button
          onClick={onOpenMobileNav}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* ── Busca global ──────────────────────────────────────── */}
        <div className="relative max-w-lg flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            /* 📝 TEXTO: placeholder da busca (APP_TEXT.searchPlaceholder) */
            placeholder={APP_TEXT.searchPlaceholder}
            className="h-10 w-full rounded-xl border border-transparent bg-slate-100 pl-10 pr-16 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white/25 dark:focus:bg-slate-900 dark:focus:ring-white/10"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-300 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 sm:block dark:border-slate-600">
            ⌘K
          </kbd>

          {/* Resultados */}
          {results && (
            <div className="absolute left-0 right-0 top-12 animate-scale-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-float dark:border-slate-800 dark:bg-slate-900/95 dark:backdrop-blur-xl">
              {!results.contacts.length && !results.deals.length ? (
                <p className="px-4 py-6 text-center text-sm text-slate-500">
                  Nenhum resultado para “{query}”
                </p>
              ) : (
                <div className="max-h-96 overflow-y-auto py-2">
                  {results.contacts.length > 0 && (
                    <>
                      <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Contatos</p>
                      {results.contacts.map((c) => (
                        <button
                          key={c.id}
                          onMouseDown={() => { onOpenContact?.(c); setQuery('') }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/60"
                        >
                          <Avatar name={c.name} size="sm" color="bg-slate-400 dark:bg-slate-600" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{c.name}</span>
                            <span className="block truncate text-xs text-slate-500">{c.company}</span>
                          </span>
                        </button>
                      ))}
                    </>
                  )}
                  {results.deals.length > 0 && (
                    <>
                      <p className="mt-1 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Negócios</p>
                      {results.deals.map((d) => (
                        <button
                          key={d.id}
                          onMouseDown={() => { onOpenDeal?.(d); setQuery('') }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/60"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                            <CircleDollarSign className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{d.title}</span>
                            <span className="block truncate text-xs text-slate-500">
                              {d.company} · {STAGE_META[d.stage].label}
                            </span>
                          </span>
                          <span className="tnum shrink-0 text-xs font-bold text-slate-700 dark:text-slate-200">
                            {formatCurrency(d.value)}
                          </span>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* Novo negócio */}
          <button
            onClick={onQuickAdd}
            className="hidden h-10 items-center gap-2 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-brand-fg shadow-sm shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95 sm:inline-flex"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Novo negócio
          </button>

          {/* Modo claro/escuro */}
          <button
            onClick={toggleMode}
            aria-label="Alternar tema"
            className="rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {mode === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          {/* Notificações */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu((m) => (m === 'bell' ? null : 'bell'))}
              aria-label="Notificações"
              className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
            {openMenu === 'bell' && (
              <div className="absolute right-0 top-12 w-80 animate-scale-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-float dark:border-slate-800 dark:bg-slate-900/95 dark:backdrop-blur-xl">
                <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Notificações</p>
                </div>
                <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-700">
                  {unread.map((a) => (
                    <div key={a.id} className="px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <p
                        className="text-[13px] leading-snug text-slate-600 dark:text-slate-300"
                        dangerouslySetInnerHTML={{
                          __html: a.text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>'),
                        }}
                      />
                      <p className="mt-1 text-[11px] text-slate-400">{timeAgo(a.at)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Perfil do usuário */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu((m) => (m === 'user' ? null : 'user'))}
              className="flex items-center gap-2 rounded-xl p-1 pr-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Avatar name={currentUser.name} initials={currentUser.initials} color={currentUser.color} size="md" />
              <span className="hidden text-left md:block">
                <span className="block max-w-[9rem] truncate text-[13px] font-semibold leading-tight text-slate-800 dark:text-slate-100">
                  {currentUser.name.split(' ').slice(0, 2).join(' ')}
                </span>
                <span className="block text-[11px] text-slate-400">{currentUser.role}</span>
              </span>
              <ChevronDown className={cx('h-4 w-4 text-slate-400 transition-transform', openMenu === 'user' && 'rotate-180')} />
            </button>

            {openMenu === 'user' && (
              <div className="absolute right-0 top-14 w-64 animate-scale-in overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-float dark:border-slate-800 dark:bg-slate-900/95 dark:backdrop-blur-xl">
                <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5 dark:border-slate-700">
                  <Avatar name={currentUser.name} initials={currentUser.initials} color={currentUser.color} size="lg" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                    <p className="truncate text-xs text-slate-500">{currentUser.email}</p>
                  </div>
                </div>
                <div className="p-1.5">
                  {[
                    { icon: UserIcon, label: 'Meu perfil', action: () => onNavigate('settings') },
                    { icon: Building2, label: 'Perfil da empresa', action: () => onNavigate('settings') },
                    { icon: SettingsIcon, label: 'Configurações', action: () => onNavigate('settings') },
                    { icon: HelpCircle, label: 'Central de ajuda', action: () => notify('Ambiente de demonstração.', 'info') },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { item.action(); setOpenMenu(null) }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      <item.icon className="h-4 w-4 text-slate-400" />
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="border-t border-slate-100 p-1.5 dark:border-slate-700">
                  <button
                    onClick={() => { notify('Sessão encerrada (demonstração).', 'info'); setOpenMenu(null) }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
