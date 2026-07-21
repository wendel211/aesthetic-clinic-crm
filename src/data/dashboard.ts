export type OverviewMetric = {
  label: string;
  value: string;
  detail: string;
};

export type AgendaItem = {
  id: string;
  time: string;
  duration: string;
  client: string;
  procedure: string;
  professional: string;
  status: "Confirmado" | "Aguardando" | "Retorno" | "Atendimento";
  packageNote: string;
};

export type ClientFocusItem = {
  id: string;
  name: string;
  tag: string;
  summary: string;
  nextAction: string;
};

export type PackageHealthItem = {
  id: string;
  client: string;
  procedure: string;
  remainingSessions: string;
  expiresAt: string;
  status: "Renovar agora" | "Acompanhar" | "Saudavel";
};

export type RenewalOfferItem = {
  id: string;
  client: string;
  procedure: string;
  currentBalance: string;
  suggestedPackage: string;
  price: string;
  argument: string;
  nextStep: string;
  template: string;
  url: string;
  tone: "Alta" | "Media";
};

export type FollowUpItem = {
  id: string;
  client: string;
  reason: string;
  targetDate: string;
  suggestedSlot: string;
  priority: "Alta" | "Media";
  opportunity: string;
  template: string;
  url: string;
  tone: "Alta" | "Media";
};

export type NoShowRecoveryItem = {
  id: string;
  client: string;
  missedAt: string;
  procedure: string;
  packageImpact: string;
  revenueRisk: string;
  suggestedSlot: string;
  template: string;
  url: string;
  priority: "Hoje" | "Esta semana";
};

export type AttendanceClosingItem = {
  id: string;
  client: string;
  procedure: string;
  professional: string;
  packageBalance: string;
  paymentStatus: string;
  nextStep: string;
  priority: "Consumir sessao" | "Cobrar hoje" | "Agendar retorno";
};

export type AnamnesisAlertItem = {
  id: string;
  client: string;
  procedure: string;
  appointmentTime: string;
  status: "Pendente" | "Revisar" | "Liberada";
  restriction: string;
  pendingQuestion: string;
  orientation: string;
  url: string;
};

export type NoShowRiskItem = {
  id: string;
  client: string;
  appointmentTime: string;
  procedure: string;
  reason: string;
  suggestedAction: string;
  fallbackSlots: string[];
  template: string;
  url: string;
  tone: "Alto" | "Medio";
};

export type WhatsAppQueueItem = {
  id: string;
  client: string;
  reason: string;
  template: string;
  url: string;
  dueLabel: string;
  priority: "Alta" | "Media";
};

export type RetentionCampaignItem = {
  id: string;
  client: string;
  segment: string;
  daysWithoutVisit: number;
  revenueRisk: string;
  offer: string;
  responseWindow: string;
  nextAttempt: string;
  successAction: string;
  template: string;
  url: string;
  tone: "Alta" | "Media";
};

export type ProfessionalPerformanceItem = {
  id: string;
  professional: string;
  specialty: string;
  appointmentsToday: number;
  projectedRevenue: string;
  commissionPreview: string;
  occupancy: string;
  packagesSold: string;
  nextAction: string;
  status: "Acima da meta" | "Acompanhar" | "Precisa acao";
};

export type PriorityItem = {
  id: string;
  badge: string;
  title: string;
  detail: string;
  recommendation: string;
  impact: string;
  href: string;
  hrefLabel: string;
  tone: "Alta" | "Media";
};

export const navigationItems = [
  "Dashboard",
  "Agenda",
  "Clientes",
  "Pacotes",
  "Atendimentos",
  "Financeiro",
];

export const overviewMetrics: OverviewMetric[] = [
  {
    label: "Agenda confirmada",
    value: "12 de 15",
    detail: "3 horarios ainda dependem de confirmacao.",
  },
  {
    label: "Faturamento previsto",
    value: "R$ 4.860",
    detail: "Considerando sessoes avulsas e pacotes do dia.",
  },
  {
    label: "Pacotes em alerta",
    value: "5",
    detail: "Clientes com saldo curto, validade proxima ou renovacao pronta.",
  },
  {
    label: "Retornos em 7 dias",
    value: "8",
    detail: "Base prioritaria para reativacao e manutencao.",
  },
];

export const agendaItems: AgendaItem[] = [
  {
    id: "ag-1",
    time: "08:30",
    duration: "50 min",
    client: "Marina Costa",
    procedure: "Limpeza de pele premium",
    professional: "Dra. Larissa",
    status: "Atendimento",
    packageNote: "Pacote facial com 3 de 6 sessoes usadas.",
  },
  {
    id: "ag-2",
    time: "09:40",
    duration: "40 min",
    client: "Bianca Alves",
    procedure: "Laser para axilas",
    professional: "Camila Reis",
    status: "Confirmado",
    packageNote: "Ultima sessao do pacote atual.",
  },
  {
    id: "ag-3",
    time: "11:00",
    duration: "60 min",
    client: "Juliana Prado",
    procedure: "Microagulhamento com drug delivery",
    professional: "Dra. Larissa",
    status: "Retorno",
    packageNote: "Volta indicada para 21 dias apos a sessao.",
  },
  {
    id: "ag-4",
    time: "14:20",
    duration: "45 min",
    client: "Renata Nogueira",
    procedure: "Depilacao a laser perna inteira",
    professional: "Camila Reis",
    status: "Aguardando",
    packageNote: "Cliente ainda nao respondeu o lembrete de hoje.",
  },
];

export const clientFocusItems: ClientFocusItem[] = [
  {
    id: "cl-1",
    name: "Fernanda Melo",
    tag: "Renovacao",
    summary: "Tem 1 sessao restante e costuma renovar no mesmo dia.",
    nextAction: "Oferecer upgrade para pacote de 8 sessoes apos o atendimento.",
  },
  {
    id: "cl-2",
    name: "Paula Siqueira",
    tag: "Retorno",
    summary: "Fez botox ha 5 meses e nao tem nova manutencao agendada.",
    nextAction: "Enviar mensagem com sugestao de avaliacao para a proxima semana.",
  },
  {
    id: "cl-3",
    name: "Aline Mota",
    tag: "Atencao",
    summary: "Faltou na ultima sessao de drenagem e respondeu pouco no WhatsApp.",
    nextAction: "Tentar reagendamento com horario de almoco e texto curto.",
  },
];

export const packageHealthItems: PackageHealthItem[] = [
  {
    id: "pk-1",
    client: "Bianca Alves",
    procedure: "Laser para axilas",
    remainingSessions: "1 de 10",
    expiresAt: "Validade em 12 dias",
    status: "Renovar agora",
  },
  {
    id: "pk-2",
    client: "Marina Costa",
    procedure: "Pacote facial premium",
    remainingSessions: "3 de 6",
    expiresAt: "Validade em 29 dias",
    status: "Acompanhar",
  },
  {
    id: "pk-3",
    client: "Tatiane Rocha",
    procedure: "Drenagem pos-operatoria",
    remainingSessions: "7 de 10",
    expiresAt: "Validade em 61 dias",
    status: "Saudavel",
  },
];

export const renewalOfferItems: RenewalOfferItem[] = [
  {
    id: "ren-1",
    client: "Bianca Alves",
    procedure: "Laser para axilas",
    currentBalance: "Ultima sessao hoje",
    suggestedPackage: "Renovar 10 sessoes com preco travado",
    price: "R$ 890",
    argument:
      "Cliente ja chega para encerrar o pacote; a proposta evita intervalo longo entre ciclos.",
    nextStep: "Apresentar oferta no checkout antes de finalizar o atendimento.",
    template:
      "Bianca, para voce nao perder o ritmo do laser, consigo deixar seu novo pacote de 10 sessoes com o mesmo valor de hoje. Quer que eu reserve?",
    url: "https://wa.me/5511955555555",
    tone: "Alta",
  },
  {
    id: "ren-2",
    client: "Marina Costa",
    procedure: "Pacote facial premium",
    currentBalance: "3 de 6 sessoes restantes",
    suggestedPackage: "Upgrade para 8 sessoes com manutencao mensal",
    price: "R$ 1.240",
    argument:
      "Ainda ha saldo suficiente para vender upgrade sem parecer urgencia artificial.",
    nextStep: "Sinalizar para a Dra. Larissa mencionar o plano no fim da sessao.",
    template:
      "Marina, a Dra. Larissa comentou que seu resultado esta evoluindo bem. Posso te mostrar a opcao de upgrade para manter a rotina mensal?",
    url: "https://wa.me/5511966666666",
    tone: "Media",
  },
];

export const followUpItems: FollowUpItem[] = [
  {
    id: "fu-1",
    client: "Juliana Prado",
    reason: "Revisao de microagulhamento",
    targetDate: "Recomendar agenda ate 28/06",
    suggestedSlot: "Quinta 10:30 ou sexta 15:20",
    opportunity: "Retorno tecnico para avaliar pele e vender continuidade.",
    template:
      "Oi, Juliana! Sua revisao do microagulhamento ja esta na janela ideal. Posso reservar quinta 10h30 ou sexta 15h20 para avaliarmos o resultado?",
    url: "https://wa.me/5511955555555",
    priority: "Alta",
    tone: "Alta",
  },
  {
    id: "fu-2",
    client: "Paula Siqueira",
    reason: "Manutencao de toxina",
    targetDate: "Retomar contato em 3 dias",
    suggestedSlot: "Avaliacao rapida na terca 11:40",
    opportunity: "Manutencao recorrente com boa chance de novo pacote.",
    template:
      "Oi, Paula! Ja podemos programar sua manutencao de toxina. Tenho uma avaliacao rapida na terca 11h40, quer que eu deixe separado?",
    url: "https://wa.me/5511922222222",
    priority: "Alta",
    tone: "Alta",
  },
  {
    id: "fu-3",
    client: "Fernanda Melo",
    reason: "Fechamento de novo pacote corporal",
    targetDate: "Confirmar interesse apos a sessao de sexta",
    suggestedSlot: "Conversa de renovacao apos a sessao",
    opportunity: "Cliente com intencao de compra e timing de renovacao.",
    template:
      "Oi, Fernanda! Depois da sua sessao de sexta, posso te mostrar a melhor opcao para manter o pacote corporal sem perder o intervalo.",
    url: "https://wa.me/5511966666666",
    priority: "Media",
    tone: "Media",
  },
];

export const noShowRecoveryItems: NoShowRecoveryItem[] = [
  {
    id: "ns-1",
    client: "Aline Mota",
    missedAt: "Faltou ontem as 15:10",
    procedure: "Drenagem pos-operatoria",
    packageImpact: "4 sessoes restantes; intervalo ideal ja atrasado.",
    revenueRisk: "R$ 720 em recorrencia do pacote",
    suggestedSlot: "Oferecer hoje 12:20 ou amanha 08:40.",
    template:
      "Oi, Aline! Vi que nao conseguimos fazer sua drenagem ontem. Tenho hoje 12h20 ou amanha 08h40 para voce nao perder o ritmo do pacote. Qual fica melhor?",
    url: "https://wa.me/5511933333333",
    priority: "Hoje",
  },
  {
    id: "ns-2",
    client: "Renata Nogueira",
    missedAt: "Cancelou em cima da hora na ultima visita",
    procedure: "Depilacao a laser perna inteira",
    packageImpact: "Pacote com validade em 18 dias.",
    revenueRisk: "Risco de perder renovacao de R$ 1.290",
    suggestedSlot: "Tentar encaixe no almoco desta semana.",
    template:
      "Oi, Renata! Para nao deixar seu pacote vencer, consigo te encaixar no horario de almoco esta semana. Quer que eu veja duas opcoes?",
    url: "https://wa.me/5511911111111",
    priority: "Esta semana",
  },
];

export const attendanceClosingItems: AttendanceClosingItem[] = [
  {
    id: "clo-1",
    client: "Marina Costa",
    procedure: "Limpeza de pele premium",
    professional: "Dra. Larissa",
    packageBalance: "Consumir 1 sessao; ficara 2 de 6",
    paymentStatus: "Pacote ja pago",
    nextStep: "Agendar retorno facial em 28 dias.",
    priority: "Consumir sessao",
  },
  {
    id: "clo-2",
    client: "Bianca Alves",
    procedure: "Laser para axilas",
    professional: "Camila Reis",
    packageBalance: "Ultima sessao do pacote atual",
    paymentStatus: "Preparar renovacao de R$ 890",
    nextStep: "Oferecer renovacao antes de encerrar o atendimento.",
    priority: "Cobrar hoje",
  },
  {
    id: "clo-3",
    client: "Juliana Prado",
    procedure: "Microagulhamento com drug delivery",
    professional: "Dra. Larissa",
    packageBalance: "Sessao avulsa; sem pacote ativo",
    paymentStatus: "Receber R$ 420 no checkout",
    nextStep: "Criar lembrete de revisao para 21 dias.",
    priority: "Agendar retorno",
  },
];

export const anamnesisAlertItems: AnamnesisAlertItem[] = [
  {
    id: "ana-1",
    client: "Juliana Prado",
    procedure: "Microagulhamento com drug delivery",
    appointmentTime: "11:00",
    status: "Pendente",
    restriction: "Confirmar uso de acido nos ultimos 7 dias.",
    pendingQuestion: "A cliente suspendeu retinoides antes do procedimento?",
    orientation:
      "Enviar pergunta pelo WhatsApp antes de liberar a sala e registrar resposta na ficha.",
    url: "https://wa.me/5511955555555",
  },
  {
    id: "ana-2",
    client: "Renata Nogueira",
    procedure: "Depilacao a laser perna inteira",
    appointmentTime: "14:20",
    status: "Revisar",
    restriction: "Historico de pele sensivel informado na ultima visita.",
    pendingQuestion: "Houve exposicao solar ou irritacao recente na area?",
    orientation:
      "Revisar com a profissional antes do disparo e remarcar se houver irritacao ativa.",
    url: "https://wa.me/5511911111111",
  },
  {
    id: "ana-3",
    client: "Marina Costa",
    procedure: "Limpeza de pele premium",
    appointmentTime: "08:30",
    status: "Liberada",
    restriction: "Ficha atualizada no ultimo atendimento.",
    pendingQuestion: "Sem pendencias criticas para hoje.",
    orientation:
      "Confirmar apenas produtos usados em casa e seguir atendimento conforme protocolo.",
    url: "https://wa.me/5511966666666",
  },
];

export const noShowRiskItems: NoShowRiskItem[] = [
  {
    id: "ns-1",
    client: "Renata Nogueira",
    appointmentTime: "14:20",
    procedure: "Depilacao a laser perna inteira",
    reason: "Confirmacao pendente e historico de resposta lenta no mesmo dia.",
    suggestedAction:
      "Enviar confirmacao curta agora e oferecer troca para 16:30 se nao puder vir.",
    fallbackSlots: ["16:30", "18:10"],
    template:
      "Oi, Renata! Seu horario das 14h20 segue reservado. Consegue confirmar? Se apertar para hoje, tenho 16h30 como alternativa.",
    url: "https://wa.me/5511911111111",
    tone: "Alto",
  },
  {
    id: "ns-2",
    client: "Aline Mota",
    appointmentTime: "Sem horario ativo",
    procedure: "Drenagem pos-operatoria",
    reason: "Faltou na ultima sessao e ainda tem saldo de pacote parado.",
    suggestedAction:
      "Oferecer dois horarios de almoco e reforcar que o pacote continua reservado.",
    fallbackSlots: ["12:10", "12:50"],
    template:
      "Oi, Aline! Para nao esfriar seu resultado, separei 12h10 ou 12h50 para retomar sua drenagem. Qual fica melhor?",
    url: "https://wa.me/5511933333333",
    tone: "Medio",
  },
];

export const whatsAppQueueItems: WhatsAppQueueItem[] = [
  {
    id: "wa-1",
    client: "Renata Nogueira",
    reason: "Confirmacao pendente de hoje",
    template: "Oi, Renata! Passando para confirmar seu horario das 14h20.",
    url: "https://wa.me/5511911111111",
    dueLabel: "Enviar ate 13:20",
    priority: "Alta",
  },
  {
    id: "wa-2",
    client: "Paula Siqueira",
    reason: "Retorno de manutencao",
    template: "Oi, Paula! Ja podemos programar sua proxima manutencao.",
    url: "https://wa.me/5511922222222",
    dueLabel: "Enviar hoje",
    priority: "Media",
  },
  {
    id: "wa-3",
    client: "Aline Mota",
    reason: "Reagendamento apos falta",
    template: "Separei dois horarios praticos para voce retomar o tratamento.",
    url: "https://wa.me/5511933333333",
    dueLabel: "Enviar antes das 17:00",
    priority: "Alta",
  },
  {
    id: "wa-4",
    client: "Renata Nogueira",
    reason: "Recuperar cancelamento recente",
    template:
      "Para nao deixar seu pacote vencer, consigo te encaixar no horario de almoco esta semana.",
    url: "https://wa.me/5511911111111",
    dueLabel: "Enviar hoje",
    priority: "Alta",
  },
];

export const retentionCampaignItems: RetentionCampaignItem[] = [
  {
    id: "ret-1",
    client: "Paula Siqueira",
    segment: "Manutencao facial",
    daysWithoutVisit: 151,
    revenueRisk: "R$ 620 em manutencao prevista",
    offer: "Avaliacao de retorno com bonus de limpeza expressa.",
    responseWindow: "Aguardar resposta ate amanha 10:00.",
    nextAttempt: "Se nao responder, tentar audio curto com 2 opcoes de horario.",
    successAction: "Com resposta, criar retorno de avaliacao e registrar origem WhatsApp.",
    template:
      "Oi, Paula! Notei que ja esta na janela da sua manutencao. Quer que eu separe uma avaliacao rapida esta semana?",
    url: "https://wa.me/5511922222222",
    tone: "Alta",
  },
  {
    id: "ret-2",
    client: "Aline Mota",
    segment: "Reagendamento apos falta",
    daysWithoutVisit: 34,
    revenueRisk: "4 sessoes de drenagem ainda em aberto",
    offer: "Dois horarios curtos no almoco para retomar o pacote.",
    responseWindow: "Aguardar resposta por 4 horas.",
    nextAttempt: "Se nao responder, reenviar com apenas um horario de encaixe.",
    successAction: "Com resposta, reagendar sessao e manter alerta de pacote ativo.",
    template:
      "Oi, Aline! Tenho dois horarios praticos para voce retomar sua drenagem sem perder o ritmo do pacote. Posso te mandar?",
    url: "https://wa.me/5511933333333",
    tone: "Alta",
  },
  {
    id: "ret-3",
    client: "Tatiane Rocha",
    segment: "Pacote saudavel",
    daysWithoutVisit: 22,
    revenueRisk: "Reter recorrencia corporal",
    offer: "Lembrete preventivo para manter intervalo ideal.",
    responseWindow: "Aguardar resposta ate o fim do dia.",
    nextAttempt: "Se nao responder, tentar novamente na proxima janela de manutencao.",
    successAction: "Com resposta, reservar proxima sessao e retirar da fila de risco.",
    template:
      "Oi, Tatiane! Passando para manter seu intervalo certinho. Quer deixar sua proxima sessao reservada?",
    url: "https://wa.me/5511944444444",
    tone: "Media",
  },
];

export const professionalPerformanceItems: ProfessionalPerformanceItem[] = [
  {
    id: "perf-1",
    professional: "Dra. Larissa",
    specialty: "Facial e injetaveis",
    appointmentsToday: 6,
    projectedRevenue: "R$ 2.640",
    commissionPreview: "R$ 528 em comissao prevista",
    occupancy: "86% da agenda ocupada",
    packagesSold: "2 oportunidades de pacote facial",
    nextAction:
      "Preparar proposta de manutencao para Juliana e renovacao facial para Marina.",
    status: "Acima da meta",
  },
  {
    id: "perf-2",
    professional: "Camila Reis",
    specialty: "Laser e corporal",
    appointmentsToday: 5,
    projectedRevenue: "R$ 1.780",
    commissionPreview: "R$ 356 em comissao prevista",
    occupancy: "71% da agenda ocupada",
    packagesSold: "1 renovacao critica no checkout",
    nextAction:
      "Garantir confirmacao da Renata e oferta de renovacao para Bianca antes da saida.",
    status: "Acompanhar",
  },
  {
    id: "perf-3",
    professional: "Equipe recepcao",
    specialty: "Confirmacao e retorno",
    appointmentsToday: 8,
    projectedRevenue: "R$ 1.120 em agenda protegida",
    commissionPreview: "Sem comissao direta",
    occupancy: "3 horarios dependem de contato",
    packagesSold: "4 contatos com chance de retorno",
    nextAction:
      "Resolver fila de WhatsApp de alta prioridade ate o inicio da tarde.",
    status: "Precisa acao",
  },
];

const pendingConfirmations = agendaItems.filter((item) => item.status === "Aguardando");
const renewalCandidates = packageHealthItems.filter(
  (item) => item.status === "Renovar agora",
);
const highPriorityRenewalOffers = renewalOfferItems.filter(
  (item) => item.tone === "Alta",
);
const sameDayRenewal = renewalCandidates.find((item) =>
  agendaItems.some((agendaItem) => agendaItem.client === item.client),
);
const sameDayRenewalAppointment = sameDayRenewal
  ? agendaItems.find((item) => item.client === sameDayRenewal.client)
  : undefined;
const nextFollowUps = followUpItems.slice(0, 2);

export const priorityItems: PriorityItem[] = [
  {
    id: "prio-1",
    badge: `${pendingConfirmations.length} confirmacao pendente`,
    title: "Destravar agenda com mensagem curta",
    detail: pendingConfirmations[0]
      ? `${pendingConfirmations[0].client} ainda nao confirmou o horario das ${pendingConfirmations[0].time}.`
      : "Todas as clientes do turno ja confirmaram o horario previsto.",
    recommendation:
      "Envie a confirmacao agora e ofereca remarcacao rapida se nao houver resposta ate uma hora antes.",
    impact: "Reduz falta e protege a ocupacao da agenda do dia.",
    href: "#whatsapp",
    hrefLabel: "Abrir fila de WhatsApp",
    tone: "Alta",
  },
  {
    id: "prio-2",
    badge: `${highPriorityRenewalOffers.length} oferta pronta`,
    title: "Fechar pacote antes da ultima sessao",
    detail:
      sameDayRenewal && sameDayRenewalAppointment
        ? `${sameDayRenewal.client} chega hoje para ${sameDayRenewalAppointment.procedure.toLowerCase()} com a ultima sessao ativa.`
        : "Existe pacote em fase de renovacao e vale preparar a proposta ainda hoje.",
    recommendation:
      "Use a oferta sugerida para apresentar valor, argumento e proximo passo antes do checkout.",
    impact: "Aumenta recorrencia e reduz perda de receita por espera.",
    href: "#pacotes",
    hrefLabel: "Ver ofertas de renovacao",
    tone: "Alta",
  },
  {
    id: "prio-3",
    badge: `${nextFollowUps.length} retornos aquecidos`,
    title: "Puxar manutencoes antes de esfriar",
    detail:
      nextFollowUps.length > 1
        ? `${nextFollowUps[0].client} e ${nextFollowUps[1].client} ja entram na janela ideal de contato.`
        : "Ha retorno recomendado aguardando contato da recepcao.",
    recommendation:
      "Concentre o bloco de reativacao no fim da manha para aproveitar a mesma janela operacional.",
    impact: "Recupera agenda futura com baixo esforco comercial.",
    href: "#retornos",
    hrefLabel: "Ver retornos recomendados",
    tone: "Media",
  },
];
