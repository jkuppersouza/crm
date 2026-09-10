import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  CheckSquare,
  BarChart3,
  Settings,
} from 'lucide-react'

// 📝 Menu lateral — para adicionar/remover telas, edite esta lista
// e o `switch` de src/App.jsx.
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pipeline', label: 'Pipeline', icon: KanbanSquare },
  { id: 'contacts', label: 'Contatos', icon: Users },
  { id: 'tasks', label: 'Tarefas', icon: CheckSquare },
  { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  { id: 'settings', label: 'Configurações', icon: Settings },
]
