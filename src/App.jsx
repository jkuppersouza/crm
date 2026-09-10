import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import Toasts from './components/ui/Toasts'
import Dashboard from './pages/Dashboard'
import Pipeline from './pages/Pipeline'
import Contacts from './pages/Contacts'
import Tasks from './pages/Tasks'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import DealModal from './components/pipeline/DealModal'
import DealFormModal from './components/pipeline/DealFormModal'
import ContactDrawer from './components/contacts/ContactDrawer'

/**
 * Roteamento simples por estado — sem react-router.
 * Para adicionar uma tela: crie a página, registre em
 * src/components/layout/navigation.js e adicione um case aqui.
 */
export default function App() {
  const [page, setPage] = useState('dashboard')
  const [mobileNav, setMobileNav] = useState(false)

  // Itens abertos pela busca global da topbar
  const [quickDeal, setQuickDeal] = useState(null)
  const [quickContact, setQuickContact] = useState(null)
  const [quickAdd, setQuickAdd] = useState(false)

  const renderPage = () => {
    switch (page) {
      case 'pipeline': return <Pipeline />
      case 'contacts': return <Contacts />
      case 'tasks': return <Tasks />
      case 'reports': return <Reports />
      case 'settings': return <Settings />
      default: return <Dashboard onNavigate={setPage} />
    }
  }

  return (
    <div className="app-glow relative flex min-h-screen bg-slate-50 dark:bg-black">
      <Sidebar
        current={page}
        onNavigate={setPage}
        mobileOpen={mobileNav}
        onCloseMobile={() => setMobileNav(false)}
      />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <Topbar
          onOpenMobileNav={() => setMobileNav(true)}
          onNavigate={setPage}
          onQuickAdd={() => setQuickAdd(true)}
          onOpenContact={setQuickContact}
          onOpenDeal={setQuickDeal}
        />

        <main key={page} className="flex-1 animate-slide-up px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-[1600px]">{renderPage()}</div>
        </main>

        <footer className="border-t border-slate-200/80 px-6 py-4 dark:border-slate-800">
          <p className="text-center text-[12px] text-slate-400">
            {/* 📝 TEXTO: rodapé */}
            Nexus CRM · Ambiente de demonstração · Dados fictícios
          </p>
        </footer>
      </div>

      {/* Modais globais acionados pela busca da topbar */}
      <DealModal deal={quickDeal} open={!!quickDeal} onClose={() => setQuickDeal(null)} />
      <ContactDrawer
        contact={quickContact}
        open={!!quickContact}
        onClose={() => setQuickContact(null)}
        onOpenDeal={(d) => { setQuickContact(null); setQuickDeal(d) }}
      />
      <DealFormModal open={quickAdd} onClose={() => setQuickAdd(false)} />

      <Toasts />
    </div>
  )
}
