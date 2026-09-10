// ╔══════════════════════════════════════════════════════════════════╗
// ║  🗂️  DADOS MOCKADOS — EDITE AQUI                                 ║
// ║                                                                  ║
// ║  Todos os dados exibidos no CRM vêm deste arquivo.               ║
// ║  Troque nomes, empresas e valores para personalizar a demo.      ║
// ║                                                                  ║
// ║  Seções:                                                         ║
// ║   A) COMPANY_PROFILE  — a empresa dona do CRM                    ║
// ║   B) TEAM             — usuários / vendedores                    ║
// ║   C) CONTACTS         — contatos e clientes                      ║
// ║   D) DEALS            — oportunidades do pipeline                ║
// ║   E) TASKS            — tarefas e atividades                     ║
// ║   F) MONTHLY_SALES    — série histórica dos gráficos             ║
// ║   G) ACTIVITY_FEED    — timeline de atividades recentes          ║
// ╚══════════════════════════════════════════════════════════════════╝

// Helpers de data — mantêm a demo sempre "atual", sem datas vencidas.
const NOW = new Date()
const iso = (d) => d.toISOString().slice(0, 10)
const daysFromNow = (n) => {
  const d = new Date(NOW)
  d.setDate(d.getDate() + n)
  return iso(d)
}
const hoursAgo = (n) => new Date(NOW.getTime() - n * 3600 * 1000).toISOString()

// ─────────────────────────────────────────────────────────────────────
// A) PERFIL DA EMPRESA (aparece na sidebar, topbar e configurações)
// ─────────────────────────────────────────────────────────────────────
export const COMPANY_PROFILE = {
  name: 'Nexus Tecnologia',
  legalName: 'Nexus Tecnologia e Serviços LTDA',
  cnpj: '18.472.905/0001-64',
  segment: 'Software B2B',
  website: 'www.nexustec.com.br',
  phone: '(11) 4003-2201',
  email: 'comercial@nexustec.com.br',
  address: 'Av. Brigadeiro Faria Lima, 3477 — São Paulo/SP',
  // Iniciais usadas no logo quando não há imagem
  logoInitials: 'NX',
  currency: 'BRL',
  fiscalYearGoal: 12_000_000,
}

// ─────────────────────────────────────────────────────────────────────
// B) EQUIPE / USUÁRIOS
//    `id` é referenciado por deals, contatos e tarefas.
// ─────────────────────────────────────────────────────────────────────
export const TEAM = [
  { id: 'u1', name: 'Ana Beatriz Moraes', role: 'Gerente Comercial', email: 'ana.moraes@nexustec.com.br', phone: '(11) 98812-4409', initials: 'AM', color: 'bg-indigo-500', permission: 'Administrador', status: 'ativo', goal: 420000 },
  { id: 'u2', name: 'Rafael Nogueira', role: 'Executivo de Contas Sr.', email: 'rafael.nogueira@nexustec.com.br', phone: '(11) 99145-7723', initials: 'RN', color: 'bg-emerald-500', permission: 'Vendedor', status: 'ativo', goal: 380000 },
  { id: 'u3', name: 'Camila Duarte', role: 'Executiva de Contas', email: 'camila.duarte@nexustec.com.br', phone: '(11) 98330-1187', initials: 'CD', color: 'bg-amber-500', permission: 'Vendedor', status: 'ativo', goal: 320000 },
  { id: 'u4', name: 'Thiago Menezes', role: 'SDR / Pré-vendas', email: 'thiago.menezes@nexustec.com.br', phone: '(11) 97722-6650', initials: 'TM', color: 'bg-sky-500', permission: 'Vendedor', status: 'ativo', goal: 180000 },
  { id: 'u5', name: 'Juliana Castro', role: 'Customer Success', email: 'juliana.castro@nexustec.com.br', phone: '(11) 99604-3318', initials: 'JC', color: 'bg-rose-500', permission: 'Somente leitura', status: 'convidado', goal: 120000 },
]

// Usuário logado na demo (aparece no canto superior direito)
export const CURRENT_USER_ID = 'u1'

// Origens de lead disponíveis nos formulários
export const LEAD_SOURCES = [
  'Site / Formulário',
  'Indicação',
  'LinkedIn',
  'Google Ads',
  'Evento / Feira',
  'Prospecção ativa',
  'Parceiro',
  'Inbound / Blog',
]

// ─────────────────────────────────────────────────────────────────────
// C) CONTATOS / CLIENTES
// ─────────────────────────────────────────────────────────────────────
export const CONTACTS = [
  {
    id: 'c1', name: 'Marcos Vinícius Prado', company: 'Vertex Logística', role: 'Diretor de Operações',
    email: 'marcos.prado@vertexlog.com.br', phone: '(11) 3255-8890', mobile: '(11) 99812-3345',
    city: 'São Paulo/SP', status: 'oportunidade', source: 'Indicação', ownerId: 'u2',
    tags: ['Enterprise', 'Logística', 'Alta prioridade'], createdAt: daysFromNow(-84), lastContact: daysFromNow(-2),
    notes: 'Decisor final. Prefere reuniões pela manhã. Muito focado em ROI e prazo de implantação.',
    interactions: [
      { id: 'i1', type: 'reuniao', title: 'Apresentação da proposta comercial', date: daysFromNow(-2), user: 'u2', description: 'Rodamos a demo completa do módulo de roteirização. Marcos pediu simulação de ROI para 18 meses.' },
      { id: 'i2', type: 'email', title: 'Envio do case Transportes Andrade', date: daysFromNow(-9), user: 'u2', description: 'Enviado material com o case de redução de 22% em custo de frota.' },
      { id: 'i3', type: 'ligacao', title: 'Call de descoberta', date: daysFromNow(-21), user: 'u4', description: 'Mapeamos a dor: falta de visibilidade em tempo real da frota terceirizada.' },
    ],
  },
  {
    id: 'c2', name: 'Patrícia Camargo', company: 'Grupo Aurora Alimentos', role: 'Gerente de TI',
    email: 'patricia.camargo@grupoaurora.com.br', phone: '(19) 3742-1120', mobile: '(19) 98844-2210',
    city: 'Campinas/SP', status: 'oportunidade', source: 'Evento / Feira', ownerId: 'u3',
    tags: ['Mid-Market', 'Alimentos'], createdAt: daysFromNow(-61), lastContact: daysFromNow(-4),
    notes: 'Precisa de aprovação do comitê de tecnologia. Ciclo de compra longo, ~90 dias.',
    interactions: [
      { id: 'i4', type: 'reuniao', title: 'Workshop técnico com o time de TI', date: daysFromNow(-4), user: 'u3', description: 'Validação de integração com o ERP atual (TOTVS). Sem bloqueios técnicos.' },
      { id: 'i5', type: 'nota', title: 'Comitê remarcado', date: daysFromNow(-12), user: 'u3', description: 'Comitê de tecnologia foi adiado para a primeira semana do mês que vem.' },
      { id: 'i6', type: 'email', title: 'Follow-up pós-evento', date: daysFromNow(-58), user: 'u4', description: 'Contato inicial após a feira Food Tech Summit.' },
    ],
  },
  {
    id: 'c3', name: 'Eduardo Salles', company: 'TechNova Sistemas', role: 'CEO',
    email: 'eduardo@technova.io', phone: '(11) 3090-4455', mobile: '(11) 99320-8877',
    city: 'São Paulo/SP', status: 'cliente', source: 'LinkedIn', ownerId: 'u1',
    tags: ['Enterprise', 'SaaS', 'Renovação'], createdAt: daysFromNow(-420), lastContact: daysFromNow(-6),
    notes: 'Cliente desde o ano passado. Contrato de renovação anual em aberto — expansão para 3 novas filiais.',
    interactions: [
      { id: 'i7', type: 'reuniao', title: 'Revisão trimestral de resultados (QBR)', date: daysFromNow(-6), user: 'u1', description: 'NPS 9. Interesse claro em expandir o contrato para as filiais do Sul.' },
      { id: 'i8', type: 'ligacao', title: 'Alinhamento sobre renovação', date: daysFromNow(-30), user: 'u1', description: 'Eduardo sinalizou intenção de renovar com upgrade de plano.' },
      { id: 'i9', type: 'nota', title: 'Onboarding concluído com sucesso', date: daysFromNow(-380), user: 'u5', description: 'Equipe treinada em 3 semanas. Adoção de 87% das licenças.' },
    ],
  },
  {
    id: 'c4', name: 'Renata Bittencourt', company: 'Construtora Belmonte', role: 'Diretora Financeira',
    email: 'renata.b@belmonte.eng.br', phone: '(31) 3271-9080', mobile: '(31) 98811-5522',
    city: 'Belo Horizonte/MG', status: 'oportunidade', source: 'Google Ads', ownerId: 'u2',
    tags: ['Construção', 'Mid-Market'], createdAt: daysFromNow(-45), lastContact: daysFromNow(-1),
    notes: 'Sensível a preço. Comparando com dois concorrentes. Precisa de condição de pagamento diferenciada.',
    interactions: [
      { id: 'i10', type: 'ligacao', title: 'Negociação de condições comerciais', date: daysFromNow(-1), user: 'u2', description: 'Pediu 12x sem juros e desconto de 8%. Aprovado desconto de 5%.' },
      { id: 'i11', type: 'email', title: 'Proposta revisada enviada', date: daysFromNow(-8), user: 'u2', description: 'Segunda versão da proposta, com escopo reduzido na fase 1.' },
    ],
  },
  {
    id: 'c5', name: 'Dr. Fernando Aguiar', company: 'Clínica Vitalis', role: 'Sócio-fundador',
    email: 'fernando.aguiar@vitalis.med.br', phone: '(21) 2555-3311', mobile: '(21) 99177-4408',
    city: 'Rio de Janeiro/RJ', status: 'cliente', source: 'Indicação', ownerId: 'u3',
    tags: ['Saúde', 'SMB'], createdAt: daysFromNow(-210), lastContact: daysFromNow(-15),
    notes: 'Indicado pela Rede Farmais. Ótimo promotor da marca — já gerou 2 indicações.',
    interactions: [
      { id: 'i12', type: 'reuniao', title: 'Treinamento do novo módulo de agenda', date: daysFromNow(-15), user: 'u5', description: 'Equipe de recepção treinada. Feedback muito positivo.' },
      { id: 'i13', type: 'nota', title: 'Indicou 2 novos leads', date: daysFromNow(-40), user: 'u3', description: 'Indicou Laboratório Gênesis e Óptica Visione.' },
    ],
  },
  {
    id: 'c6', name: 'Luciana Tavares', company: 'Rede Farmais', role: 'Head de Expansão',
    email: 'luciana.tavares@redefarmais.com.br', phone: '(41) 3322-7788', mobile: '(41) 99503-2216',
    city: 'Curitiba/PR', status: 'cliente', source: 'Prospecção ativa', ownerId: 'u1',
    tags: ['Varejo', 'Enterprise', 'Multi-unidade'], createdAt: daysFromNow(-330), lastContact: daysFromNow(-9),
    notes: 'Rede com 84 lojas. Rollout em ondas — 30 lojas já implantadas.',
    interactions: [
      { id: 'i14', type: 'reuniao', title: 'Planejamento da onda 3 de rollout', date: daysFromNow(-9), user: 'u1', description: 'Definidas mais 25 lojas para o próximo trimestre.' },
      { id: 'i15', type: 'email', title: 'Relatório de adoção — onda 2', date: daysFromNow(-25), user: 'u5', description: '92% de adoção nas lojas da onda 2.' },
      { id: 'i16', type: 'ligacao', title: 'Alinhamento de suporte dedicado', date: daysFromNow(-52), user: 'u5', description: 'Solicitaram canal prioritário de atendimento.' },
    ],
  },
  {
    id: 'c7', name: 'Gustavo Lemos', company: 'Agro São Rafael', role: 'Gerente Administrativo',
    email: 'gustavo.lemos@agrosaorafael.com.br', phone: '(62) 3241-6600', mobile: '(62) 98120-4477',
    city: 'Goiânia/GO', status: 'lead', source: 'Site / Formulário', ownerId: 'u4',
    tags: ['Agro', 'SMB'], createdAt: daysFromNow(-11), lastContact: daysFromNow(-3),
    notes: 'Baixou o e-book de gestão agrícola. Ainda em fase de descoberta.',
    interactions: [
      { id: 'i17', type: 'ligacao', title: 'Primeiro contato de qualificação', date: daysFromNow(-3), user: 'u4', description: 'Empresa com 40 funcionários. Orçamento ainda não definido.' },
      { id: 'i18', type: 'email', title: 'Sequência de nutrição — e-mail 1', date: daysFromNow(-10), user: 'u4', description: 'Enviado material introdutório.' },
    ],
  },
  {
    id: 'c8', name: 'Beatriz Fontoura', company: 'Delta Engenharia', role: 'Coordenadora de Projetos',
    email: 'beatriz.fontoura@deltaeng.com.br', phone: '(51) 3019-4422', mobile: '(51) 99880-1103',
    city: 'Porto Alegre/RS', status: 'oportunidade', source: 'LinkedIn', ownerId: 'u3',
    tags: ['Engenharia', 'Mid-Market'], createdAt: daysFromNow(-38), lastContact: daysFromNow(-5),
    notes: 'Influenciadora técnica. O decisor é o diretor, Paulo Renner.',
    interactions: [
      { id: 'i19', type: 'reuniao', title: 'Demo do módulo de gestão de obras', date: daysFromNow(-5), user: 'u3', description: 'Boa aderência. Vai apresentar internamente ao diretor.' },
      { id: 'i20', type: 'nota', title: 'Mapeamento de stakeholders', date: daysFromNow(-20), user: 'u3', description: 'Decisor: Paulo Renner (Diretor). Beatriz é a champion interna.' },
    ],
  },
  {
    id: 'c9', name: 'André Kowalski', company: 'Blueprint Arquitetura', role: 'Sócio-diretor',
    email: 'andre@blueprintarq.com.br', phone: '(11) 3814-2299', mobile: '(11) 98446-7712',
    city: 'São Paulo/SP', status: 'lead', source: 'Inbound / Blog', ownerId: 'u4',
    tags: ['Arquitetura', 'SMB'], createdAt: daysFromNow(-7), lastContact: daysFromNow(-7),
    notes: 'Escritório com 12 pessoas. Perfil mais enxuto, ideal para o plano Starter.',
    interactions: [
      { id: 'i21', type: 'email', title: 'Solicitou demonstração pelo site', date: daysFromNow(-7), user: 'u4', description: 'Preencheu formulário de contato após ler artigo sobre gestão de projetos.' },
    ],
  },
  {
    id: 'c10', name: 'Sônia Rezende', company: 'Instituto Horizonte', role: 'Diretora Executiva',
    email: 'sonia.rezende@institutohorizonte.org', phone: '(11) 3667-1140', mobile: '(11) 99011-6654',
    city: 'São Paulo/SP', status: 'cliente', source: 'Indicação', ownerId: 'u2',
    tags: ['Terceiro setor', 'SMB'], createdAt: daysFromNow(-290), lastContact: daysFromNow(-22),
    notes: 'ONG com condição comercial especial. Contrato anual.',
    interactions: [
      { id: 'i22', type: 'email', title: 'Envio da nota fiscal mensal', date: daysFromNow(-22), user: 'u5', description: 'Rotina administrativa.' },
      { id: 'i23', type: 'reuniao', title: 'Revisão de uso da plataforma', date: daysFromNow(-70), user: 'u5', description: 'Uso estável. Sem demandas adicionais.' },
    ],
  },
  {
    id: 'c11', name: 'Paulo Renner', company: 'Delta Engenharia', role: 'Diretor de Operações',
    email: 'paulo.renner@deltaeng.com.br', phone: '(51) 3019-4400', mobile: '(51) 99712-3390',
    city: 'Porto Alegre/RS', status: 'oportunidade', source: 'LinkedIn', ownerId: 'u3',
    tags: ['Engenharia', 'Decisor'], createdAt: daysFromNow(-30), lastContact: daysFromNow(-13),
    notes: 'Decisor final da Delta. Agenda muito disputada.',
    interactions: [
      { id: 'i24', type: 'ligacao', title: 'Breve alinhamento de expectativas', date: daysFromNow(-13), user: 'u3', description: 'Pediu para envolver o financeiro na próxima etapa.' },
    ],
  },
  {
    id: 'c12', name: 'Vanessa Lira', company: 'Móveis Lumina', role: 'Proprietária',
    email: 'vanessa@moveislumina.com.br', phone: '(48) 3225-7711', mobile: '(48) 99633-2244',
    city: 'Florianópolis/SC', status: 'lead', source: 'Google Ads', ownerId: 'u4',
    tags: ['Varejo', 'SMB'], createdAt: daysFromNow(-16), lastContact: daysFromNow(-6),
    notes: 'Duas lojas físicas + e-commerce. Quer integrar estoque.',
    interactions: [
      { id: 'i25', type: 'ligacao', title: 'Qualificação inicial', date: daysFromNow(-6), user: 'u4', description: 'Orçamento entre R$ 15k e R$ 25k/ano. Perfil qualificado.' },
    ],
  },
  {
    id: 'c13', name: 'Ricardo Amorim', company: 'Transportes Andrade', role: 'Diretor Comercial',
    email: 'ricardo.amorim@transandrade.com.br', phone: '(11) 4412-8800', mobile: '(11) 98255-9911',
    city: 'Guarulhos/SP', status: 'cliente', source: 'Prospecção ativa', ownerId: 'u2',
    tags: ['Logística', 'Enterprise', 'Case'], createdAt: daysFromNow(-500), lastContact: daysFromNow(-18),
    notes: 'Case público de sucesso. Aceita participar de webinars e depoimentos.',
    interactions: [
      { id: 'i26', type: 'reuniao', title: 'Gravação de depoimento em vídeo', date: daysFromNow(-18), user: 'u1', description: 'Depoimento gravado para o site. Excelente material.' },
      { id: 'i27', type: 'nota', title: 'Resultado de 22% de economia', date: daysFromNow(-120), user: 'u5', description: 'Redução comprovada de custo operacional de frota.' },
    ],
  },
  {
    id: 'c14', name: 'Helena Sampaio', company: 'Cortex Analytics', role: 'COO',
    email: 'helena.sampaio@cortexanalytics.com', phone: '(11) 3230-9977', mobile: '(11) 99408-1123',
    city: 'São Paulo/SP', status: 'oportunidade', source: 'Parceiro', ownerId: 'u1',
    tags: ['Tecnologia', 'Enterprise'], createdAt: daysFromNow(-52), lastContact: daysFromNow(-3),
    notes: 'Chegou via parceiro de integração. Negociação avançada, foco em SLA.',
    interactions: [
      { id: 'i28', type: 'reuniao', title: 'Discussão de SLA e contrato', date: daysFromNow(-3), user: 'u1', description: 'Jurídico revisando cláusulas de disponibilidade (99,9%).' },
      { id: 'i29', type: 'email', title: 'Minuta contratual enviada', date: daysFromNow(-11), user: 'u1', description: 'Contrato enviado para análise jurídica.' },
    ],
  },
  {
    id: 'c15', name: 'Otávio Bernardes', company: 'Grupo Mirante', role: 'Gerente de Compras',
    email: 'otavio.bernardes@grupomirante.com.br', phone: '(85) 3444-2210', mobile: '(85) 98811-7745',
    city: 'Fortaleza/CE', status: 'inativo', source: 'Evento / Feira', ownerId: 'u3',
    tags: ['Varejo', 'Reativar'], createdAt: daysFromNow(-260), lastContact: daysFromNow(-95),
    notes: 'Perdeu o budget no último ciclo. Reabordar no próximo planejamento anual.',
    interactions: [
      { id: 'i30', type: 'email', title: 'Comunicado de pausa no projeto', date: daysFromNow(-95), user: 'u3', description: 'Projeto congelado por corte orçamentário.' },
    ],
  },
  {
    id: 'c16', name: 'Mariana Lourenço', company: 'Laboratório Gênesis', role: 'Gerente de Qualidade',
    email: 'mariana.lourenco@labgenesis.com.br', phone: '(21) 2233-6688', mobile: '(21) 99522-3301',
    city: 'Niterói/RJ', status: 'oportunidade', source: 'Indicação', ownerId: 'u3',
    tags: ['Saúde', 'Mid-Market'], createdAt: daysFromNow(-26), lastContact: daysFromNow(-2),
    notes: 'Indicação da Clínica Vitalis. Precisa de conformidade com normas da ANVISA.',
    interactions: [
      { id: 'i31', type: 'reuniao', title: 'Demonstração focada em compliance', date: daysFromNow(-2), user: 'u3', description: 'Módulo de auditoria e rastreabilidade agradou muito.' },
      { id: 'i32', type: 'ligacao', title: 'Contato de indicação', date: daysFromNow(-24), user: 'u3', description: 'Apresentação inicial via indicação do Dr. Fernando.' },
    ],
  },
  {
    id: 'c17', name: 'Sérgio Palmeira', company: 'Metalúrgica Kron', role: 'Diretor Industrial',
    email: 'sergio.palmeira@kronmetal.ind.br', phone: '(47) 3388-1120', mobile: '(47) 99144-8802',
    city: 'Joinville/SC', status: 'oportunidade', source: 'Prospecção ativa', ownerId: 'u2',
    tags: ['Indústria', 'Mid-Market'], createdAt: daysFromNow(-44), lastContact: daysFromNow(-10),
    notes: 'Processo de compra formal, com tomada de preços entre 3 fornecedores.',
    interactions: [
      { id: 'i33', type: 'email', title: 'Envio de documentação técnica', date: daysFromNow(-10), user: 'u2', description: 'Enviados certificados e documentação de segurança da informação.' },
      { id: 'i34', type: 'reuniao', title: 'Visita técnica à planta', date: daysFromNow(-28), user: 'u2', description: 'Visita presencial em Joinville. Mapeados 4 processos críticos.' },
    ],
  },
  {
    id: 'c18', name: 'Cristina Vasques', company: 'EducaMais', role: 'Diretora Pedagógica',
    email: 'cristina.vasques@educamais.edu.br', phone: '(11) 3555-7742', mobile: '(11) 99377-2214',
    city: 'Santo André/SP', status: 'lead', source: 'Inbound / Blog', ownerId: 'u4',
    tags: ['Educação', 'SMB'], createdAt: daysFromNow(-5), lastContact: daysFromNow(-4),
    notes: 'Rede com 4 unidades de ensino. Interesse em gestão de matrículas.',
    interactions: [
      { id: 'i35', type: 'email', title: 'Resposta ao material sobre gestão escolar', date: daysFromNow(-4), user: 'u4', description: 'Pediu uma demonstração para a próxima semana.' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────
// D) OPORTUNIDADES / NEGÓCIOS (Pipeline Kanban)
//    stage: 'novo' | 'qualificacao' | 'proposta' | 'negociacao' | 'ganho' | 'perdido'
// ─────────────────────────────────────────────────────────────────────
export const DEALS = [
  { id: 'd1', title: 'Plataforma de roteirização — 120 veículos', contactId: 'c1', company: 'Vertex Logística', value: 486000, stage: 'negociacao', ownerId: 'u2', closeDate: daysFromNow(12), probability: 70, createdAt: daysFromNow(-84), source: 'Indicação', products: ['Nexus Core', 'Módulo Logística', 'Suporte Premium'], nextStep: 'Enviar simulação de ROI de 18 meses', description: 'Substituição do sistema legado de roteirização. Escopo inclui integração com telemetria.' },
  { id: 'd2', title: 'Implantação ERP integrado — 6 plantas', contactId: 'c2', company: 'Grupo Aurora Alimentos', value: 720000, stage: 'proposta', ownerId: 'u3', closeDate: daysFromNow(38), probability: 45, createdAt: daysFromNow(-61), source: 'Evento / Feira', products: ['Nexus Core', 'Integração TOTVS'], nextStep: 'Aguardar aprovação do comitê de tecnologia', description: 'Projeto multi-planta com rollout em 3 ondas ao longo de 12 meses.' },
  { id: 'd3', title: 'Renovação anual + expansão 3 filiais', contactId: 'c3', company: 'TechNova Sistemas', value: 315000, stage: 'negociacao', ownerId: 'u1', closeDate: daysFromNow(6), probability: 85, createdAt: daysFromNow(-40), source: 'LinkedIn', products: ['Nexus Core', 'Licenças adicionais'], nextStep: 'Fechar condição de upgrade para o plano Enterprise', description: 'Renovação com upsell. Cliente com NPS 9 e alta adoção.' },
  { id: 'd4', title: 'Gestão de obras e medições', contactId: 'c4', company: 'Construtora Belmonte', value: 168000, stage: 'negociacao', ownerId: 'u2', closeDate: daysFromNow(9), probability: 60, createdAt: daysFromNow(-45), source: 'Google Ads', products: ['Nexus Core', 'Módulo Obras'], nextStep: 'Reenviar proposta com desconto de 5% aprovado', description: 'Cliente comparando com 2 concorrentes. Diferencial: implantação em 30 dias.' },
  { id: 'd5', title: 'Módulo de agenda e prontuário', contactId: 'c5', company: 'Clínica Vitalis', value: 54000, stage: 'ganho', ownerId: 'u3', closeDate: daysFromNow(-14), probability: 100, createdAt: daysFromNow(-90), source: 'Indicação', products: ['Nexus Saúde'], nextStep: 'Contrato assinado — onboarding concluído', description: 'Expansão de contrato existente. Fechado sem objeções.' },
  { id: 'd6', title: 'Rollout onda 3 — 25 lojas', contactId: 'c6', company: 'Rede Farmais', value: 392000, stage: 'proposta', ownerId: 'u1', closeDate: daysFromNow(27), probability: 65, createdAt: daysFromNow(-35), source: 'Prospecção ativa', products: ['Nexus Core', 'Licenças multi-loja'], nextStep: 'Apresentar cronograma de implantação das 25 lojas', description: 'Continuidade do rollout. Rede tem 84 lojas no total.' },
  { id: 'd7', title: 'Gestão administrativa e financeira', contactId: 'c7', company: 'Agro São Rafael', value: 42000, stage: 'novo', ownerId: 'u4', closeDate: daysFromNow(62), probability: 15, createdAt: daysFromNow(-11), source: 'Site / Formulário', products: ['Nexus Starter'], nextStep: 'Agendar demonstração com o diretor', description: 'Lead inbound. Ainda em fase de descoberta de necessidades.' },
  { id: 'd8', title: 'Plataforma de gestão de projetos', contactId: 'c8', company: 'Delta Engenharia', value: 224000, stage: 'qualificacao', ownerId: 'u3', closeDate: daysFromNow(48), probability: 35, createdAt: daysFromNow(-38), source: 'LinkedIn', products: ['Nexus Core', 'Módulo Projetos'], nextStep: 'Reunião com o decisor Paulo Renner', description: 'Champion interna engajada. Falta acesso ao decisor final.' },
  { id: 'd9', title: 'Plano Starter — 12 licenças', contactId: 'c9', company: 'Blueprint Arquitetura', value: 18600, stage: 'novo', ownerId: 'u4', closeDate: daysFromNow(45), probability: 20, createdAt: daysFromNow(-7), source: 'Inbound / Blog', products: ['Nexus Starter'], nextStep: 'Enviar convite para demonstração', description: 'Escritório pequeno, decisão rápida esperada.' },
  { id: 'd10', title: 'Renovação anual — Instituto', contactId: 'c10', company: 'Instituto Horizonte', value: 36000, stage: 'ganho', ownerId: 'u2', closeDate: daysFromNow(-32), probability: 100, createdAt: daysFromNow(-120), source: 'Indicação', products: ['Nexus Core'], nextStep: 'Renovação concluída', description: 'Renovação automática com condição especial para terceiro setor.' },
  { id: 'd11', title: 'Integração de estoque omnichannel', contactId: 'c12', company: 'Móveis Lumina', value: 27500, stage: 'qualificacao', ownerId: 'u4', closeDate: daysFromNow(41), probability: 30, createdAt: daysFromNow(-16), source: 'Google Ads', products: ['Nexus Starter', 'Módulo E-commerce'], nextStep: 'Confirmar orçamento disponível', description: 'Duas lojas físicas e um e-commerce para integrar.' },
  { id: 'd12', title: 'Contrato enterprise + SLA 99,9%', contactId: 'c14', company: 'Cortex Analytics', value: 540000, stage: 'negociacao', ownerId: 'u1', closeDate: daysFromNow(17), probability: 75, createdAt: daysFromNow(-52), source: 'Parceiro', products: ['Nexus Enterprise', 'SLA Premium', 'Suporte 24/7'], nextStep: 'Retorno do jurídico sobre cláusulas de SLA', description: 'Oportunidade trazida por parceiro de integração. Alta prioridade.' },
  { id: 'd13', title: 'Digitalização de processos industriais', contactId: 'c17', company: 'Metalúrgica Kron', value: 296000, stage: 'proposta', ownerId: 'u2', closeDate: daysFromNow(33), probability: 50, createdAt: daysFromNow(-44), source: 'Prospecção ativa', products: ['Nexus Core', 'Módulo Indústria'], nextStep: 'Participar da tomada de preços', description: 'Concorrência formal com mais 2 fornecedores.' },
  { id: 'd14', title: 'Sistema de rastreabilidade laboratorial', contactId: 'c16', company: 'Laboratório Gênesis', value: 132000, stage: 'qualificacao', ownerId: 'u3', closeDate: daysFromNow(52), probability: 40, createdAt: daysFromNow(-26), source: 'Indicação', products: ['Nexus Saúde', 'Módulo Compliance'], nextStep: 'Enviar documentação de conformidade ANVISA', description: 'Requisito forte de compliance regulatório.' },
  { id: 'd15', title: 'Expansão de licenças — 40 usuários', contactId: 'c13', company: 'Transportes Andrade', value: 96000, stage: 'ganho', ownerId: 'u2', closeDate: daysFromNow(-8), probability: 100, createdAt: daysFromNow(-70), source: 'Prospecção ativa', products: ['Licenças adicionais'], nextStep: 'Licenças ativadas', description: 'Expansão natural do contrato após crescimento da operação.' },
  { id: 'd16', title: 'Projeto de gestão integrada', contactId: 'c15', company: 'Grupo Mirante', value: 258000, stage: 'perdido', ownerId: 'u3', closeDate: daysFromNow(-40), probability: 0, createdAt: daysFromNow(-200), source: 'Evento / Feira', products: ['Nexus Core'], nextStep: 'Reabordar no próximo ciclo orçamentário', lostReason: 'Corte de orçamento', description: 'Projeto congelado por corte orçamentário interno.' },
  { id: 'd17', title: 'Gestão de matrículas — 4 unidades', contactId: 'c18', company: 'EducaMais', value: 64000, stage: 'novo', ownerId: 'u4', closeDate: daysFromNow(58), probability: 20, createdAt: daysFromNow(-5), source: 'Inbound / Blog', products: ['Nexus Educação'], nextStep: 'Agendar demonstração para a diretoria', description: 'Lead inbound qualificado. Rede em crescimento.' },
  { id: 'd18', title: 'Piloto módulo de obras — fase 1', contactId: 'c11', company: 'Delta Engenharia', value: 78000, stage: 'proposta', ownerId: 'u3', closeDate: daysFromNow(21), probability: 55, createdAt: daysFromNow(-30), source: 'LinkedIn', products: ['Nexus Core', 'Piloto'], nextStep: 'Envolver o time financeiro na negociação', description: 'Alternativa de entrada com escopo reduzido para acelerar a decisão.' },
  { id: 'd19', title: 'Plataforma completa — 3 anos', contactId: 'c1', company: 'Vertex Logística', value: 184000, stage: 'perdido', ownerId: 'u2', closeDate: daysFromNow(-75), probability: 0, createdAt: daysFromNow(-180), source: 'Indicação', products: ['Nexus Core'], nextStep: 'Reaberto como oportunidade d1', lostReason: 'Preço acima do orçamento', description: 'Primeira tentativa perdida por preço — reaberta com novo escopo.' },
  { id: 'd20', title: 'Upgrade plano Professional', contactId: 'c5', company: 'Clínica Vitalis', value: 31200, stage: 'novo', ownerId: 'u3', closeDate: daysFromNow(35), probability: 25, createdAt: daysFromNow(-4), source: 'Indicação', products: ['Nexus Professional'], nextStep: 'Apresentar comparativo de planos', description: 'Cliente atual com potencial de upgrade.' },
]

// ─────────────────────────────────────────────────────────────────────
// E) TAREFAS E ATIVIDADES
//    type: 'ligacao' | 'email' | 'reuniao' | 'tarefa'
//    priority: 'alta' | 'media' | 'baixa'
// ─────────────────────────────────────────────────────────────────────
export const TASKS = [
  { id: 't1', title: 'Enviar simulação de ROI para a Vertex', type: 'email', priority: 'alta', done: false, dueDate: daysFromNow(0), time: '09:30', ownerId: 'u2', contactId: 'c1', dealId: 'd1', notes: 'Usar o template de ROI com dados da frota terceirizada.' },
  { id: 't2', title: 'Call de fechamento — TechNova', type: 'ligacao', priority: 'alta', done: false, dueDate: daysFromNow(0), time: '14:00', ownerId: 'u1', contactId: 'c3', dealId: 'd3', notes: 'Objetivo: fechar a renovação com upgrade de plano.' },
  { id: 't3', title: 'Revisar minuta contratual da Cortex', type: 'tarefa', priority: 'alta', done: false, dueDate: daysFromNow(1), time: '11:00', ownerId: 'u1', contactId: 'c14', dealId: 'd12', notes: 'Validar cláusula de SLA 99,9% com o jurídico.' },
  { id: 't4', title: 'Reunião de apresentação — Laboratório Gênesis', type: 'reuniao', priority: 'media', done: false, dueDate: daysFromNow(1), time: '15:30', ownerId: 'u3', contactId: 'c16', dealId: 'd14', notes: 'Focar em rastreabilidade e conformidade ANVISA.' },
  { id: 't5', title: 'Follow-up da proposta — Belmonte', type: 'ligacao', priority: 'alta', done: false, dueDate: daysFromNow(2), time: '10:00', ownerId: 'u2', contactId: 'c4', dealId: 'd4', notes: 'Confirmar recebimento da proposta com desconto aprovado.' },
  { id: 't6', title: 'Preparar cronograma de rollout — Farmais', type: 'tarefa', priority: 'media', done: false, dueDate: daysFromNow(2), time: '16:00', ownerId: 'u1', contactId: 'c6', dealId: 'd6', notes: '25 lojas divididas em 3 sub-ondas.' },
  { id: 't7', title: 'Demo agendada — EducaMais', type: 'reuniao', priority: 'media', done: false, dueDate: daysFromNow(3), time: '09:00', ownerId: 'u4', contactId: 'c18', dealId: 'd17', notes: 'Participação da diretoria pedagógica e financeira.' },
  { id: 't8', title: 'Qualificar lead Agro São Rafael', type: 'ligacao', priority: 'baixa', done: false, dueDate: daysFromNow(3), time: '13:30', ownerId: 'u4', contactId: 'c7', dealId: 'd7', notes: 'Descobrir orçamento e prazo de decisão.' },
  { id: 't9', title: 'Enviar documentação técnica — Kron', type: 'email', priority: 'media', done: false, dueDate: daysFromNow(4), time: '10:30', ownerId: 'u2', contactId: 'c17', dealId: 'd13', notes: 'Anexar certificados ISO e política de segurança.' },
  { id: 't10', title: 'Agendar reunião com Paulo Renner', type: 'tarefa', priority: 'alta', done: false, dueDate: daysFromNow(4), time: '17:00', ownerId: 'u3', contactId: 'c11', dealId: 'd8', notes: 'Decisor final da Delta Engenharia.' },
  { id: 't11', title: 'Enviar convite de demo — Blueprint', type: 'email', priority: 'baixa', done: false, dueDate: daysFromNow(5), time: '11:30', ownerId: 'u4', contactId: 'c9', dealId: 'd9', notes: 'Template de demo para escritórios pequenos.' },
  { id: 't12', title: 'Apresentar comparativo de planos — Vitalis', type: 'reuniao', priority: 'media', done: false, dueDate: daysFromNow(6), time: '14:30', ownerId: 'u3', contactId: 'c5', dealId: 'd20', notes: 'Oportunidade de upgrade para o plano Professional.' },
  { id: 't13', title: 'Reabordar Grupo Mirante', type: 'ligacao', priority: 'baixa', done: false, dueDate: daysFromNow(8), time: '15:00', ownerId: 'u3', contactId: 'c15', dealId: 'd16', notes: 'Verificar se o orçamento foi liberado no novo ciclo.' },
  { id: 't14', title: 'Atualizar previsão do trimestre', type: 'tarefa', priority: 'media', done: false, dueDate: daysFromNow(-1), time: '18:00', ownerId: 'u1', contactId: null, dealId: null, notes: 'Consolidar forecast com todos os executivos de conta.' },
  { id: 't15', title: 'Enviar NPS trimestral aos clientes', type: 'email', priority: 'baixa', done: true, dueDate: daysFromNow(-2), time: '09:00', ownerId: 'u5', contactId: null, dealId: null, notes: 'Disparo concluído para 42 clientes ativos.' },
  { id: 't16', title: 'Workshop técnico — Grupo Aurora', type: 'reuniao', priority: 'alta', done: true, dueDate: daysFromNow(-4), time: '10:00', ownerId: 'u3', contactId: 'c2', dealId: 'd2', notes: 'Integração com TOTVS validada, sem bloqueios.' },
  { id: 't17', title: 'Gravar depoimento — Transportes Andrade', type: 'reuniao', priority: 'media', done: true, dueDate: daysFromNow(-18), time: '14:00', ownerId: 'u1', contactId: 'c13', dealId: 'd15', notes: 'Vídeo aprovado e publicado no site.' },
  { id: 't18', title: 'Preparar deck da reunião de pipeline', type: 'tarefa', priority: 'media', done: false, dueDate: daysFromNow(7), time: '08:30', ownerId: 'u1', contactId: null, dealId: null, notes: 'Reunião semanal de pipeline com a diretoria.' },
]

// ─────────────────────────────────────────────────────────────────────
// F) SÉRIE HISTÓRICA DE VENDAS (gráficos do dashboard e relatórios)
//    valor em R$ — `meta` é o objetivo do mês
// ─────────────────────────────────────────────────────────────────────
export const MONTHLY_SALES = [
  { month: 'Out', receita: 612000, meta: 700000, negocios: 14 },
  { month: 'Nov', receita: 748000, meta: 700000, negocios: 17 },
  { month: 'Dez', receita: 903000, meta: 850000, negocios: 21 },
  { month: 'Jan', receita: 561000, meta: 650000, negocios: 12 },
  { month: 'Fev', receita: 694000, meta: 650000, negocios: 15 },
  { month: 'Mar', receita: 812000, meta: 750000, negocios: 19 },
  { month: 'Abr', receita: 776000, meta: 750000, negocios: 18 },
  { month: 'Mai', receita: 941000, meta: 850000, negocios: 22 },
  { month: 'Jun', receita: 887000, meta: 850000, negocios: 20 },
  { month: 'Jul', receita: 1024000, meta: 900000, negocios: 24 },
  { month: 'Ago', receita: 968000, meta: 900000, negocios: 23 },
  { month: 'Set', receita: 1136000, meta: 1000000, negocios: 26 },
]

// Funil de conversão — volumes de topo de funil (relatórios)
export const FUNNEL_STAGES = [
  { stage: 'Visitantes do site', value: 24800 },
  { stage: 'Leads capturados', value: 3120 },
  { stage: 'Leads qualificados (MQL)', value: 940 },
  { stage: 'Oportunidades (SQL)', value: 312 },
  { stage: 'Propostas enviadas', value: 148 },
  { stage: 'Negócios fechados', value: 62 },
]

// Receita por origem de lead (relatórios)
export const REVENUE_BY_SOURCE = [
  { source: 'Indicação', value: 2480000 },
  { source: 'Prospecção ativa', value: 1920000 },
  { source: 'LinkedIn', value: 1340000 },
  { source: 'Evento / Feira', value: 980000 },
  { source: 'Google Ads', value: 720000 },
  { source: 'Inbound / Blog', value: 540000 },
]

// ─────────────────────────────────────────────────────────────────────
// G) FEED DE ATIVIDADES RECENTES (dashboard)
// ─────────────────────────────────────────────────────────────────────
export const ACTIVITY_FEED = [
  { id: 'a1', type: 'ganho', userId: 'u2', text: 'fechou o negócio **Expansão de licenças — 40 usuários** com a Transportes Andrade', value: 96000, at: hoursAgo(3) },
  { id: 'a2', type: 'reuniao', userId: 'u1', text: 'registrou uma reunião com **Helena Sampaio** — Cortex Analytics', at: hoursAgo(6) },
  { id: 'a3', type: 'proposta', userId: 'u3', text: 'enviou proposta para o **Grupo Aurora Alimentos**', value: 720000, at: hoursAgo(9) },
  { id: 'a4', type: 'lead', userId: 'u4', text: 'cadastrou o lead **Cristina Vasques** — EducaMais', at: hoursAgo(26) },
  { id: 'a5', type: 'ligacao', userId: 'u2', text: 'fez uma ligação de negociação com **Renata Bittencourt**', at: hoursAgo(29) },
  { id: 'a6', type: 'estagio', userId: 'u1', text: 'moveu **Renovação anual + expansão 3 filiais** para *Negociação*', at: hoursAgo(34) },
  { id: 'a7', type: 'ganho', userId: 'u3', text: 'fechou o negócio **Módulo de agenda e prontuário** com a Clínica Vitalis', value: 54000, at: hoursAgo(52) },
  { id: 'a8', type: 'email', userId: 'u4', text: 'enviou sequência de nutrição para **7 novos leads**', at: hoursAgo(58) },
]

// Metas e indicadores extras exibidos no dashboard
export const KPI_TRENDS = {
  leads: { delta: 12.4, direction: 'up' },
  opportunities: { delta: 8.1, direction: 'up' },
  forecast: { delta: 18.7, direction: 'up' },
  conversion: { delta: -2.3, direction: 'down' },
}
