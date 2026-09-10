# Nexus CRM — Demonstração Comercial

CRM completo em **React + Vite + Tailwind CSS**, feito para apresentações comerciais.
Sem backend: todo o estado vive em `useState`.

---

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Para gerar a versão de produção (pasta `dist/`, pode ser hospedada em qualquer lugar):

```bash
npm run build
npm run preview
```

---

## 🎨 Onde customizar para cada apresentação

Você só precisa de **dois arquivos**:

| Arquivo | O que tem lá |
|---|---|
| **`src/config/theme.js`** | Cores da marca, textos de destaque, cores dos gráficos e dos status |
| **`src/data/mockData.js`** | Empresa, equipe, contatos, negócios, tarefas e séries dos gráficos |

### Trocar a cor principal em 5 segundos

Em `src/config/theme.js`:

```js
export const DEFAULT_BRAND = 'indigo'   // → 'emerald', 'blue', 'orange', 'rose', 'teal', 'violet', 'slate'
```

Ou, durante a demo, use **Configurações → Aparência** e troque no clique — a
interface inteira muda de cor na hora.

Para adicionar a paleta do cliente, copie um bloco de `BRAND_PRESETS` e troque
os valores RGB (formato `"R G B"`, sem vírgulas).

### Trocar os textos

Ainda em `src/config/theme.js`, no objeto `APP_TEXT`: nome do produto, saudação
do dashboard, títulos das telas, placeholder da busca e o banner de upgrade.

Todos os pontos customizáveis no código estão marcados com os comentários
`// 🎨` (cores) e `// 📝` (textos).

### Trocar os dados

`src/data/mockData.js` está dividido em seções comentadas de **A** a **G**:
perfil da empresa, equipe, contatos, negócios, tarefas, série histórica de vendas
e feed de atividades. Os `id` se referenciam entre si (`ownerId` → `TEAM`,
`contactId` → `CONTACTS`, `dealId` → `DEALS`).

As datas são geradas em relação a *hoje* (`daysFromNow(-2)`), então a demo nunca
aparece com prazos vencidos.

---

## Telas

| Tela | O que demonstra |
|---|---|
| **Dashboard** | 4 cards de métricas, receita por mês (linha/barras), pipeline por estágio, meta do mês, ranking da equipe, timeline de atividades e próximas tarefas |
| **Pipeline** | Kanban com 6 colunas e **drag and drop** nativo; clique no card abre o detalhe completo; criar, editar e excluir |
| **Contatos** | Tabela com busca, 3 filtros e ordenação; ficha lateral com abas (informações, histórico de interações, negócios); CRUD completo |
| **Tarefas** | Lista agrupada por dia, filtros por status/prioridade/responsável, calendário mensal clicável e agenda do dia |
| **Relatórios** | 6 indicadores, receita por período (3/6/12 meses), funil de conversão, desempenho por vendedor e receita por origem |
| **Configurações** | Perfil da empresa, seletor de tema (8 paletas + claro/escuro), gestão de usuários e preferências de notificação |

Recursos transversais: busca global na topbar, modo escuro, notificações toast,
layout responsivo e animações de entrada/hover.

---

## Estrutura

```
src/
├── config/theme.js          🎨 cores + textos  ← EDITE AQUI
├── data/mockData.js         🗂️ dados mockados  ← E AQUI
├── store/CrmContext.jsx     estado global (useState)
├── utils/
│   ├── format.js            moeda, datas, percentuais (pt-BR)
│   └── metrics.js           métricas derivadas do pipeline
├── components/
│   ├── ui/                  Button, Card, Modal, Drawer, Avatar, Badge, Fields, Toasts
│   ├── layout/              Sidebar, Topbar, PageHeader, navigation
│   ├── dashboard/           MetricCard, SalesChart, PipelineChart, ActivityFeed, UpcomingTasks
│   ├── pipeline/            DealCard, KanbanColumn, DealModal, DealFormModal
│   ├── contacts/            ContactsTable, ContactDrawer, ContactFormModal
│   ├── tasks/               TaskItem, TaskFormModal, MiniCalendar
│   ├── reports/             SellerPerformance, ConversionFunnel, RevenueByPeriod, RevenueBySource
│   └── settings/            CompanyProfile, ThemeSettings, TeamManagement
├── pages/                   Dashboard, Pipeline, Contacts, Tasks, Reports, Settings
└── App.jsx                  navegação por estado (sem react-router)
```

---

## Dicas para a apresentação

1. Abra em **Configurações → Aparência** e troque a cor para a do cliente antes de começar.
2. No **Pipeline**, arraste um card de "Proposta" para "Fechado — Ganho" — é o momento que mais impressiona.
3. Em **Contatos**, abra uma ficha e registre uma interação ao vivo na aba *Histórico*.
4. Use a **busca da topbar** para mostrar que tudo é encontrável em um lugar só.
5. Alterne o **modo escuro** pelo ícone da lua na topbar.

As alterações feitas durante a demo somem ao recarregar a página — dá para
reapresentar quantas vezes quiser sempre do estado inicial.

---

## Stack

React 18 · Vite 5 · Tailwind CSS 3 · Recharts · lucide-react
