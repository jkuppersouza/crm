import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import {
  COMPANY_PROFILE,
  TEAM,
  CONTACTS,
  DEALS,
  TASKS,
  CURRENT_USER_ID,
} from '../data/mockData'
import { applyBrand, DEFAULT_BRAND, DEFAULT_MODE, BRAND_PRESETS } from '../config/theme'

// ─────────────────────────────────────────────────────────────────────
// Estado global do CRM — 100% local (useState), sem backend.
// Tudo o que o usuário cria/edita/apaga na demo vive aqui.
// ─────────────────────────────────────────────────────────────────────

const CrmContext = createContext(null)

export function CrmProvider({ children }) {
  const [company, setCompany] = useState(COMPANY_PROFILE)
  const [team, setTeam] = useState(TEAM)
  const [contacts, setContacts] = useState(CONTACTS)
  const [deals, setDeals] = useState(DEALS)
  const [tasks, setTasks] = useState(TASKS)

  // Tema
  const [brand, setBrand] = useState(DEFAULT_BRAND)
  const [mode, setMode] = useState(DEFAULT_MODE)

  // Notificações "toast" da demo
  const [toasts, setToasts] = useState([])

  const notify = useCallback((message, variant = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, message, variant }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  // Aplica a paleta da marca como variáveis CSS
  useEffect(() => {
    applyBrand(brand)
  }, [brand])

  // Alterna modo claro/escuro
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    root.style.colorScheme = mode
  }, [mode])

  const currentUser = useMemo(
    () => team.find((u) => u.id === CURRENT_USER_ID) || team[0],
    [team],
  )

  const userById = useCallback((id) => team.find((u) => u.id === id) || null, [team])
  const contactById = useCallback((id) => contacts.find((c) => c.id === id) || null, [contacts])
  const dealById = useCallback((id) => deals.find((d) => d.id === id) || null, [deals])

  // ── Ações: negócios ────────────────────────────────────────────────
  const moveDeal = useCallback((dealId, stage) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? { ...d, stage, probability: stage === 'ganho' ? 100 : stage === 'perdido' ? 0 : d.probability }
          : d,
      ),
    )
  }, [])

  const upsertDeal = useCallback((deal) => {
    setDeals((prev) => {
      const exists = prev.some((d) => d.id === deal.id)
      return exists ? prev.map((d) => (d.id === deal.id ? { ...d, ...deal } : d)) : [{ ...deal, id: `d${Date.now()}` }, ...prev]
    })
  }, [])

  const deleteDeal = useCallback((dealId) => {
    setDeals((prev) => prev.filter((d) => d.id !== dealId))
  }, [])

  // ── Ações: contatos ────────────────────────────────────────────────
  const upsertContact = useCallback((contact) => {
    setContacts((prev) => {
      const exists = prev.some((c) => c.id === contact.id)
      if (exists) return prev.map((c) => (c.id === contact.id ? { ...c, ...contact } : c))
      return [
        {
          interactions: [],
          tags: [],
          createdAt: new Date().toISOString().slice(0, 10),
          lastContact: new Date().toISOString().slice(0, 10),
          ...contact,
          id: `c${Date.now()}`,
        },
        ...prev,
      ]
    })
  }, [])

  const deleteContact = useCallback((contactId) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactId))
  }, [])

  const addInteraction = useCallback((contactId, interaction) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contactId
          ? {
              ...c,
              lastContact: interaction.date,
              interactions: [{ ...interaction, id: `i${Date.now()}` }, ...(c.interactions || [])],
            }
          : c,
      ),
    )
  }, [])

  // ── Ações: tarefas ─────────────────────────────────────────────────
  const toggleTask = useCallback((taskId) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)))
  }, [])

  const upsertTask = useCallback((task) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === task.id)
      return exists ? prev.map((t) => (t.id === task.id ? { ...t, ...task } : t)) : [{ done: false, ...task, id: `t${Date.now()}` }, ...prev]
    })
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }, [])

  // ── Ações: equipe ──────────────────────────────────────────────────
  const upsertUser = useCallback((user) => {
    setTeam((prev) => {
      const exists = prev.some((u) => u.id === user.id)
      return exists ? prev.map((u) => (u.id === user.id ? { ...u, ...user } : u)) : [...prev, { ...user, id: `u${Date.now()}` }]
    })
  }, [])

  const deleteUser = useCallback((userId) => {
    setTeam((prev) => prev.filter((u) => u.id !== userId))
  }, [])

  const value = {
    // dados
    company, setCompany,
    team, contacts, deals, tasks,
    currentUser,
    // lookups
    userById, contactById, dealById,
    // ações
    moveDeal, upsertDeal, deleteDeal,
    upsertContact, deleteContact, addInteraction,
    toggleTask, upsertTask, deleteTask,
    upsertUser, deleteUser,
    // tema
    brand, setBrand, brandPreset: BRAND_PRESETS[brand], mode, setMode,
    toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')),
    // feedback
    toasts, notify,
  }

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>
}

export function useCrm() {
  const ctx = useContext(CrmContext)
  if (!ctx) throw new Error('useCrm precisa estar dentro de <CrmProvider>')
  return ctx
}
