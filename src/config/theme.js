// ╔══════════════════════════════════════════════════════════════════╗
// ║  🎨  CENTRAL DE CUSTOMIZAÇÃO — CORES E TEXTOS                    ║
// ║                                                                  ║
// ║  Este é o ÚNICO arquivo que você precisa editar para adaptar     ║
// ║  a demonstração a cada empresa/apresentação.                     ║
// ║                                                                  ║
// ║  1) BRAND_PRESETS  → paletas de cor prontas                      ║
// ║  2) DEFAULT_BRAND  → qual paleta abre por padrão                 ║
// ║  3) APP_TEXT       → todos os textos de destaque da interface    ║
// ║  4) CHART_COLORS   → cores dos gráficos                          ║
// ║  5) STATUS_STYLES  → cores semânticas (ganho, perdido, etc.)     ║
// ╚══════════════════════════════════════════════════════════════════╝

// ─────────────────────────────────────────────────────────────────────
// 1) PALETAS DE COR DA MARCA
//    Cada paleta tem 11 tons. O tom 500/600 é a cor principal usada em
//    botões, links, gráficos e destaques.
//    Para criar a sua: copie um bloco, troque os valores RGB ("R G B")
//    e adicione o nome em BRAND_PRESETS.
// ─────────────────────────────────────────────────────────────────────
export const BRAND_PRESETS = {
  // ─────────────────────────────────────────────────────────────────
  // 🎨 MONO — a paleta do template: branco sobre preto, sem cor.
  //    `fg` é a cor do TEXTO que fica em cima da cor da marca.
  //    Aqui é preto (#000), porque o botão primário é branco.
  // ─────────────────────────────────────────────────────────────────
  mono: {
    label: 'Mono',
    hex: '#FFFFFF',
    fg: '0 0 0',
    shades: {
      50: '249 250 251',
      100: '243 244 246',
      200: '229 231 235',
      300: '209 213 219',
      400: '243 244 246', // usado em dark:text-brand-400 → precisa ser claro
      500: '255 255 255',
      600: '255 255 255', // cor primária (botões, destaques)
      700: '229 231 235', // estado :hover do botão primário
      800: '209 213 219',
      900: '156 163 175',
      950: '107 114 128',
    },
  },
  indigo: {
    label: 'Índigo',
    hex: '#6366F1', // cor principal (usada nos gráficos e no seletor)
    fg: '255 255 255',
    shades: {
      50: '238 242 255',
      100: '224 231 255',
      200: '199 210 254',
      300: '165 180 252',
      400: '129 140 248',
      500: '99 102 241',
      600: '79 70 229',
      700: '67 56 202',
      800: '55 48 163',
      900: '49 46 129',
      950: '30 27 75',
    },
  },
  violet: {
    label: 'Violeta',
    hex: '#8B5CF6',
    shades: {
      50: '245 243 255',
      100: '237 233 254',
      200: '221 214 254',
      300: '196 181 253',
      400: '167 139 250',
      500: '139 92 246',
      600: '124 58 237',
      700: '109 40 217',
      800: '91 33 182',
      900: '76 29 149',
      950: '46 16 101',
    },
  },
  blue: {
    label: 'Azul',
    hex: '#3B82F6',
    shades: {
      50: '239 246 255',
      100: '219 234 254',
      200: '191 219 254',
      300: '147 197 253',
      400: '96 165 250',
      500: '59 130 246',
      600: '37 99 235',
      700: '29 78 216',
      800: '30 64 175',
      900: '30 58 138',
      950: '23 37 84',
    },
  },
  emerald: {
    label: 'Esmeralda',
    hex: '#10B981',
    shades: {
      50: '236 253 245',
      100: '209 250 229',
      200: '167 243 208',
      300: '110 231 183',
      400: '52 211 153',
      500: '16 185 129',
      600: '5 150 105',
      700: '4 120 87',
      800: '6 95 70',
      900: '6 78 59',
      950: '2 44 34',
    },
  },
  orange: {
    label: 'Laranja',
    hex: '#F97316',
    shades: {
      50: '255 247 237',
      100: '255 237 213',
      200: '254 215 170',
      300: '253 186 116',
      400: '251 146 60',
      500: '249 115 22',
      600: '234 88 12',
      700: '194 65 12',
      800: '154 52 18',
      900: '124 45 18',
      950: '67 20 7',
    },
  },
  rose: {
    label: 'Rosé',
    hex: '#F43F5E',
    shades: {
      50: '255 241 242',
      100: '255 228 230',
      200: '254 205 211',
      300: '253 164 175',
      400: '251 113 133',
      500: '244 63 94',
      600: '225 29 72',
      700: '190 18 60',
      800: '159 18 57',
      900: '136 19 55',
      950: '76 5 25',
    },
  },
  teal: {
    label: 'Turquesa',
    hex: '#14B8A6',
    shades: {
      50: '240 253 250',
      100: '204 251 241',
      200: '153 246 228',
      300: '94 234 212',
      400: '45 212 191',
      500: '20 184 166',
      600: '13 148 136',
      700: '15 118 110',
      800: '17 94 89',
      900: '19 78 74',
      950: '4 47 46',
    },
  },
  slate: {
    label: 'Grafite',
    hex: '#475569',
    shades: {
      50: '248 250 252',
      100: '241 245 249',
      200: '226 232 240',
      300: '203 213 225',
      400: '148 163 184',
      500: '100 116 139',
      600: '71 85 105',
      700: '51 65 85',
      800: '30 41 59',
      900: '15 23 42',
      950: '2 6 23',
    },
  },
}

// ─────────────────────────────────────────────────────────────────────
// 2) COR PADRÃO DA APRESENTAÇÃO
//    Troque para 'emerald', 'blue', 'orange'... conforme o cliente.
// ─────────────────────────────────────────────────────────────────────
export const DEFAULT_BRAND = 'mono'

// Modo padrão ao abrir o app: 'light' ou 'dark'
// 🎨 O visual premium do template foi desenhado para o escuro.
export const DEFAULT_MODE = 'dark'

// ─────────────────────────────────────────────────────────────────────
// 3) 📝 TEXTOS DE DESTAQUE
//    Tudo que aparece escrito na interface fora dos dados mockados.
// ─────────────────────────────────────────────────────────────────────
export const APP_TEXT = {
  // Identidade do produto (aparece na sidebar e no login)
  productName: 'Nexus CRM',
  productTagline: 'Plataforma de Vendas',

  // Saudação do dashboard
  dashboardGreeting: 'Bom dia',
  dashboardSubtitle: 'Aqui está o resumo da sua operação comercial hoje.',

  // Títulos e subtítulos de cada tela
  pages: {
    dashboard: { title: 'Dashboard', subtitle: 'Visão geral do desempenho comercial' },
    pipeline: { title: 'Pipeline de Vendas', subtitle: 'Arraste os cards para mover as oportunidades entre estágios' },
    contacts: { title: 'Contatos', subtitle: 'Sua base de clientes e leads' },
    tasks: { title: 'Tarefas e Atividades', subtitle: 'Organize o dia da equipe comercial' },
    reports: { title: 'Relatórios', subtitle: 'Desempenho, conversão e receita' },
    settings: { title: 'Configurações', subtitle: 'Personalize o CRM para a sua operação' },
  },

  // Placeholder da busca do topo
  searchPlaceholder: 'Buscar contatos, empresas, negócios...',

  // Rodapé da sidebar — banner de upgrade (ótimo gancho de venda na demo)
  upgradeBanner: {
    title: 'Plano Professional',
    description: 'Automações, e-mail integrado e relatórios avançados.',
    cta: 'Fazer upgrade',
  },
}

// ─────────────────────────────────────────────────────────────────────
// 4) CORES DOS GRÁFICOS
//    A primeira cor é sempre substituída pela cor da marca ativa.
// ─────────────────────────────────────────────────────────────────────
export const CHART_COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#06B6D4', '#EC4899', '#8B5CF6']

// ─────────────────────────────────────────────────────────────────────
// 5) CORES SEMÂNTICAS (estágios, status, prioridades)
//    Classes Tailwind completas — troque livremente.
// ─────────────────────────────────────────────────────────────────────
export const STAGE_META = {
  novo: { label: 'Novo Lead', dot: 'bg-sky-500', bar: 'from-sky-400 to-sky-500', text: 'text-sky-600 dark:text-sky-400', soft: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300', hex: '#0EA5E9' },
  qualificacao: { label: 'Qualificação', dot: 'bg-violet-500', bar: 'from-violet-400 to-violet-500', text: 'text-violet-600 dark:text-violet-400', soft: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300', hex: '#8B5CF6' },
  proposta: { label: 'Proposta', dot: 'bg-amber-500', bar: 'from-amber-400 to-amber-500', text: 'text-amber-600 dark:text-amber-400', soft: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300', hex: '#F59E0B' },
  negociacao: { label: 'Negociação', dot: 'bg-orange-500', bar: 'from-orange-400 to-orange-500', text: 'text-orange-600 dark:text-orange-400', soft: 'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300', hex: '#F97316' },
  ganho: { label: 'Fechado — Ganho', dot: 'bg-emerald-500', bar: 'from-emerald-400 to-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', soft: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300', hex: '#10B981' },
  perdido: { label: 'Fechado — Perdido', dot: 'bg-rose-500', bar: 'from-rose-400 to-rose-500', text: 'text-rose-600 dark:text-rose-400', soft: 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300', hex: '#F43F5E' },
}

export const STAGE_ORDER = ['novo', 'qualificacao', 'proposta', 'negociacao', 'ganho', 'perdido']

export const PRIORITY_META = {
  alta: { label: 'Alta', soft: 'bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20', dot: 'bg-rose-500' },
  media: { label: 'Média', soft: 'bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20', dot: 'bg-amber-500' },
  baixa: { label: 'Baixa', soft: 'bg-slate-100 text-slate-600 ring-slate-500/15 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-400/20', dot: 'bg-slate-400' },
}

export const CONTACT_STATUS_META = {
  cliente: { label: 'Cliente', soft: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20' },
  lead: { label: 'Lead', soft: 'bg-sky-50 text-sky-700 ring-sky-600/15 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20' },
  oportunidade: { label: 'Oportunidade', soft: 'bg-violet-50 text-violet-700 ring-violet-600/15 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20' },
  inativo: { label: 'Inativo', soft: 'bg-slate-100 text-slate-600 ring-slate-500/15 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-400/20' },
}

// ─────────────────────────────────────────────────────────────────────
// Helper: aplica a paleta escolhida como variáveis CSS no <html>.
// Chamado pelo CrmProvider — você não precisa mexer aqui.
// ─────────────────────────────────────────────────────────────────────
export function applyBrand(brandKey) {
  const preset = BRAND_PRESETS[brandKey] || BRAND_PRESETS[DEFAULT_BRAND]
  const root = document.documentElement
  Object.entries(preset.shades).forEach(([tone, rgb]) => {
    root.style.setProperty(`--brand-${tone}`, rgb)
  })
  root.style.setProperty('--brand-hex', preset.hex)
  // Cor do texto sobre a marca — branca, exceto nas paletas claras (mono)
  root.style.setProperty('--brand-fg', preset.fg || '255 255 255')
  return preset
}
