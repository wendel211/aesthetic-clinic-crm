"use client";

import { FormEvent, useMemo, useState } from "react";

import {
  agendaItems,
  type AgendaItem,
  anamnesisAlertItems,
  attendanceClosingItems,
  type ClientFocusItem,
  clientFocusItems,
  followUpItems,
  navigationItems,
  noShowRecoveryItems,
  noShowRiskItems,
  overviewMetrics,
  packageHealthItems,
  priorityItems,
  retentionCampaignItems,
  type WhatsAppQueueItem,
  whatsAppQueueItems,
} from "@/data/dashboard";

const agendaStatusClassName: Record<(typeof agendaItems)[number]["status"], string> = {
  Atendimento:
    "border-transparent bg-[rgba(31,138,112,0.16)] text-[var(--success)]",
  Aguardando:
    "border-transparent bg-[rgba(176,76,72,0.14)] text-[var(--danger)]",
  Confirmado:
    "border-transparent bg-[var(--accent-soft)] text-[var(--accent)]",
  Retorno: "border-transparent bg-[rgba(169,111,28,0.14)] text-[var(--warning)]",
};

const packageStatusClassName: Record<
  (typeof packageHealthItems)[number]["status"],
  string
> = {
  Acompanhar: "text-[var(--warning)]",
  "Renovar agora": "text-[var(--danger)]",
  Saudavel: "text-[var(--success)]",
};

const priorityToneClassName: Record<(typeof priorityItems)[number]["tone"], string> = {
  Alta: "bg-[rgba(176,76,72,0.12)] text-[var(--danger)]",
  Media: "bg-[rgba(169,111,28,0.12)] text-[var(--warning)]",
};

const closingPriorityClassName: Record<
  (typeof attendanceClosingItems)[number]["priority"],
  string
> = {
  "Agendar retorno": "bg-[var(--accent-soft)] text-[var(--accent)]",
  "Cobrar hoje": "bg-[rgba(176,76,72,0.12)] text-[var(--danger)]",
  "Consumir sessao": "bg-[rgba(31,138,112,0.14)] text-[var(--success)]",
};

const anamnesisStatusClassName: Record<
  (typeof anamnesisAlertItems)[number]["status"],
  string
> = {
  Liberada: "bg-[rgba(31,138,112,0.14)] text-[var(--success)]",
  Pendente: "bg-[rgba(176,76,72,0.12)] text-[var(--danger)]",
  Revisar: "bg-[rgba(169,111,28,0.12)] text-[var(--warning)]",
};

const whatsAppPriorityClassName: Record<WhatsAppQueueItem["priority"], string> = {
  Alta: "bg-[rgba(176,76,72,0.12)] text-[var(--danger)]",
  Media: "bg-[rgba(169,111,28,0.12)] text-[var(--warning)]",
};

const retentionToneClassName: Record<
  (typeof retentionCampaignItems)[number]["tone"],
  string
> = {
  Alta: "bg-[rgba(176,76,72,0.12)] text-[var(--danger)]",
  Media: "bg-[rgba(169,111,28,0.12)] text-[var(--warning)]",
};

const followUpToneClassName: Record<
  (typeof followUpItems)[number]["tone"],
  string
> = {
  Alta: "bg-[rgba(176,76,72,0.12)] text-[var(--danger)]",
  Media: "bg-[rgba(169,111,28,0.12)] text-[var(--warning)]",
};

const noShowPriorityClassName: Record<
  (typeof noShowRecoveryItems)[number]["priority"],
  string
> = {
  Hoje: "bg-[rgba(176,76,72,0.12)] text-[var(--danger)]",
  "Esta semana": "bg-[var(--accent-soft)] text-[var(--accent)]",
};

const noShowToneClassName: Record<(typeof noShowRiskItems)[number]["tone"], string> = {
  Alto: "bg-[rgba(176,76,72,0.12)] text-[var(--danger)]",
  Medio: "bg-[rgba(169,111,28,0.12)] text-[var(--warning)]",
};

type QuickFlowForm = {
  client: string;
  phone: string;
  interest: string;
  time: string;
  procedure: string;
  professional: string;
  packageNote: string;
};

const initialQuickFlowForm: QuickFlowForm = {
  client: "",
  phone: "",
  interest: "Avaliacao",
  time: "16:00",
  procedure: "Limpeza de pele premium",
  professional: "Dra. Larissa",
  packageNote: "Primeiro atendimento; avaliar indicacao de pacote.",
};

function buildConfirmationTemplate({
  client,
  procedure,
  time,
}: {
  client: string;
  procedure: string;
  time: string;
}) {
  const firstName = client.trim().split(" ")[0] || "tudo bem";

  return `Oi, ${firstName}! Passando para confirmar seu horario de ${procedure.toLowerCase()} hoje as ${time}. Posso deixar confirmado?`;
}

function buildWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");

  if (!digits) {
    return "#";
  }

  return `https://wa.me/55${digits}?text=${encodeURIComponent(message)}`;
}

function getDateLabel() {
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    weekday: "long",
  }).format(new Date());

  return `${formattedDate.slice(0, 1).toUpperCase()}${formattedDate.slice(1)}`;
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
          {title}
        </h2>
        <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const dateLabel = getDateLabel();
  const [quickFlowForm, setQuickFlowForm] = useState<QuickFlowForm>(
    initialQuickFlowForm,
  );
  const [createdAppointments, setCreatedAppointments] = useState<AgendaItem[]>([]);
  const [createdClients, setCreatedClients] = useState<ClientFocusItem[]>([]);
  const [createdWhatsAppItems, setCreatedWhatsAppItems] = useState<
    WhatsAppQueueItem[]
  >([]);
  const [completedClosingIds, setCompletedClosingIds] = useState<string[]>([]);
  const [contactedNoShowIds, setContactedNoShowIds] = useState<string[]>([]);
  const [sentWhatsAppIds, setSentWhatsAppIds] = useState<string[]>([]);
  const [activatedCampaignIds, setActivatedCampaignIds] = useState<string[]>([]);
  const agendaList = useMemo(
    () => [...agendaItems, ...createdAppointments],
    [createdAppointments],
  );
  const clientFocusList = useMemo(
    () => [...createdClients, ...clientFocusItems],
    [createdClients],
  );
  const whatsAppQueueList = useMemo(
    () => [...createdWhatsAppItems, ...whatsAppQueueItems],
    [createdWhatsAppItems],
  );
  const completedClosingCount = completedClosingIds.length;
  const pendingClosingCount =
    attendanceClosingItems.length - completedClosingCount;
  const recoveredNoShowCount = contactedNoShowIds.length;
  const pendingNoShowCount =
    noShowRecoveryItems.length - recoveredNoShowCount;
  const pendingWhatsAppCount = whatsAppQueueList.filter(
    (item) => !sentWhatsAppIds.includes(item.id),
  ).length;
  const highPriorityWhatsAppCount = whatsAppQueueList.filter(
    (item) => item.priority === "Alta" && !sentWhatsAppIds.includes(item.id),
  ).length;
  const activatedCampaignCount = activatedCampaignIds.length;
  const pendingCampaignCount =
    retentionCampaignItems.length - activatedCampaignCount;
  const highPriorityPendingCampaignCount = retentionCampaignItems.filter(
    (item) => item.tone === "Alta" && !activatedCampaignIds.includes(item.id),
  ).length;
  const quickFlowTemplate = buildConfirmationTemplate({
    client: quickFlowForm.client,
    procedure: quickFlowForm.procedure,
    time: quickFlowForm.time,
  });
  const quickFlowWhatsAppUrl = buildWhatsAppUrl(
    quickFlowForm.phone,
    quickFlowTemplate,
  );

  function updateQuickFlowForm(field: keyof QuickFlowForm, value: string) {
    setQuickFlowForm((current) => ({ ...current, [field]: value }));
  }

  function handleQuickFlowSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const clientName = quickFlowForm.client.trim();
    if (!clientName) {
      return;
    }

    const idSuffix = `${Date.now()}`;
    setCreatedClients((current) => [
      {
        id: `novo-cliente-${idSuffix}`,
        name: clientName,
        tag: quickFlowForm.interest,
        summary: quickFlowForm.phone
          ? `Contato informado: ${quickFlowForm.phone}.`
          : "Contato ainda precisa ser confirmado pela recepcao.",
        nextAction: `Confirmar ${quickFlowForm.procedure.toLowerCase()} as ${quickFlowForm.time} por WhatsApp.`,
      },
      ...current,
    ]);

    setCreatedAppointments((current) => [
      ...current,
      {
        id: `novo-agendamento-${idSuffix}`,
        time: quickFlowForm.time,
        duration: "50 min",
        client: clientName,
        procedure: quickFlowForm.procedure,
        professional: quickFlowForm.professional,
        status: "Aguardando",
        packageNote: quickFlowForm.packageNote,
      },
    ]);

    if (quickFlowForm.phone.trim()) {
      setCreatedWhatsAppItems((current) => [
        {
          id: `novo-whatsapp-${idSuffix}`,
          client: clientName,
          reason: "Confirmacao criada no fluxo rapido",
          template: buildConfirmationTemplate({
            client: clientName,
            procedure: quickFlowForm.procedure,
            time: quickFlowForm.time,
          }),
          url: buildWhatsAppUrl(
            quickFlowForm.phone,
            buildConfirmationTemplate({
              client: clientName,
              procedure: quickFlowForm.procedure,
              time: quickFlowForm.time,
            }),
          ),
          dueLabel: "Enviar agora",
          priority: "Alta",
        },
        ...current,
      ]);
    }

    setQuickFlowForm(initialQuickFlowForm);
  }

  function toggleClosing(id: string) {
    setCompletedClosingIds((current) =>
      current.includes(id)
        ? current.filter((completedId) => completedId !== id)
        : [...current, id],
    );
  }

  function toggleNoShowContact(id: string) {
    setContactedNoShowIds((current) =>
      current.includes(id)
        ? current.filter((contactedId) => contactedId !== id)
        : [...current, id],
    );
  }

  function toggleWhatsAppSent(id: string) {
    setSentWhatsAppIds((current) =>
      current.includes(id)
        ? current.filter((sentId) => sentId !== id)
        : [...current, id],
    );
  }

  function toggleRetentionCampaign(id: string) {
    setActivatedCampaignIds((current) =>
      current.includes(id)
        ? current.filter((campaignId) => campaignId !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <aside className="hidden w-64 shrink-0 flex-col justify-between rounded-[2rem] border border-[var(--line)] bg-[rgba(255,248,242,0.72)] p-6 shadow-[var(--shadow)] backdrop-blur xl:flex">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
                CRM Estetica Pro
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold leading-tight tracking-[-0.05em]">
                  Studio Aura
                </h1>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Operacao pensada para recepcao, pacote recorrente e contato rapido
                  pelo WhatsApp.
                </p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors ${
                    index === 0
                      ? "bg-[var(--foreground)] text-white"
                      : "text-[var(--muted)] hover:bg-white/60 hover:text-[var(--foreground)]"
                  }`}
                >
                  <span>{item}</span>
                  <span className="font-mono text-xs">{index + 1}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
              Foco do turno
            </p>
            <p className="text-sm leading-6 text-[var(--foreground)]">
              Renovar o pacote da Bianca, recuperar a Renata e fechar retorno da
              Juliana antes do fim do dia.
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--muted)]">Aberturas rapidas</span>
              <span className="font-mono text-[var(--accent)]">03</span>
            </div>
          </div>
        </aside>

        <div className="flex-1 space-y-6">
          <header className="animate-rise rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-[var(--line)] bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--muted)] xl:hidden">
                  Studio Aura
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                    {dateLabel}
                  </p>
                  <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-4xl">
                    Painel operacional para agenda, clientes e pacotes sem perder o
                    ritmo da recepcao.
                  </h1>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                  A tela inicial ja nasce orientada para o trabalho diario: confirmar
                  atendimento, enxergar risco de pacote e puxar o proximo contato por
                  WhatsApp.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="#agenda"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  Ver agenda do dia
                </a>
                <a
                  href="#whatsapp"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/70 px-5 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-white"
                >
                  Abrir fila de WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-6 flex gap-3 overflow-x-auto pb-1 xl:hidden">
              {navigationItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
                    index === 0
                      ? "bg-[var(--foreground)] text-white"
                      : "border border-[var(--line)] bg-white/70 text-[var(--muted)]"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </header>

          <section className="animate-rise-delay-1 grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
            {overviewMetrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-[1.8rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur"
              >
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  {metric.label}
                </p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <strong className="text-3xl font-semibold tracking-[-0.05em]">
                    {metric.value}
                  </strong>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                    +
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {metric.detail}
                </p>
              </article>
            ))}
          </section>

          <section
            id="fluxo-rapido"
            className="animate-rise-delay-2 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6"
          >
            <SectionHeading
              title="Fluxo rapido da recepcao"
              description="Cadastre uma cliente interessada e ja coloque o primeiro horario na agenda do dia, com acao de WhatsApp pronta para confirmacao."
            />

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
              <form
                className="grid gap-4 rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,255,255,0.68)] p-4 sm:grid-cols-2"
                onSubmit={handleQuickFlowSubmit}
              >
                <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
                  Cliente
                  <input
                    className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-[var(--accent)]"
                    onChange={(event) =>
                      updateQuickFlowForm("client", event.target.value)
                    }
                    placeholder="Nome da cliente"
                    required
                    value={quickFlowForm.client}
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
                  WhatsApp
                  <input
                    className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-[var(--accent)]"
                    inputMode="tel"
                    onChange={(event) =>
                      updateQuickFlowForm("phone", event.target.value)
                    }
                    placeholder="11999998888"
                    value={quickFlowForm.phone}
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
                  Interesse
                  <select
                    className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-[var(--accent)]"
                    onChange={(event) =>
                      updateQuickFlowForm("interest", event.target.value)
                    }
                    value={quickFlowForm.interest}
                  >
                    <option>Avaliacao</option>
                    <option>Retorno</option>
                    <option>Renovacao</option>
                    <option>Reagendamento</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
                  Horario
                  <input
                    className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-[var(--accent)]"
                    onChange={(event) =>
                      updateQuickFlowForm("time", event.target.value)
                    }
                    type="time"
                    value={quickFlowForm.time}
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
                  Procedimento
                  <select
                    className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-[var(--accent)]"
                    onChange={(event) =>
                      updateQuickFlowForm("procedure", event.target.value)
                    }
                    value={quickFlowForm.procedure}
                  >
                    <option>Limpeza de pele premium</option>
                    <option>Laser para axilas</option>
                    <option>Microagulhamento com drug delivery</option>
                    <option>Depilacao a laser perna inteira</option>
                    <option>Drenagem pos-operatoria</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-medium text-[var(--foreground)]">
                  Profissional
                  <select
                    className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-[var(--accent)]"
                    onChange={(event) =>
                      updateQuickFlowForm("professional", event.target.value)
                    }
                    value={quickFlowForm.professional}
                  >
                    <option>Dra. Larissa</option>
                    <option>Camila Reis</option>
                    <option>Recepcao comercial</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-medium text-[var(--foreground)] sm:col-span-2">
                  Observacao de pacote
                  <textarea
                    className="min-h-24 w-full resize-none rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-normal leading-6 outline-none transition-colors focus:border-[var(--accent)]"
                    onChange={(event) =>
                      updateQuickFlowForm("packageNote", event.target.value)
                    }
                    value={quickFlowForm.packageNote}
                  />
                </label>

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                    type="submit"
                  >
                    Cadastrar e agendar
                  </button>
                  <a
                    className={`inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium transition-colors ${
                      quickFlowForm.phone
                        ? "bg-white text-[var(--foreground)] hover:bg-[var(--accent-soft)]"
                        : "pointer-events-none bg-white/50 text-[var(--muted)]"
                    }`}
                    href={quickFlowWhatsAppUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Preparar WhatsApp
                  </a>
                </div>
              </form>

              <div className="rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface-strong)] p-5">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  Criados nesta sessao
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-[1.2rem] bg-white px-4 py-4">
                    <strong className="text-3xl font-semibold tracking-[-0.05em]">
                      {createdClients.length}
                    </strong>
                    <p className="mt-2 text-sm leading-5 text-[var(--muted)]">
                      clientes em aquecimento
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] bg-white px-4 py-4">
                    <strong className="text-3xl font-semibold tracking-[-0.05em]">
                      {createdAppointments.length}
                    </strong>
                    <p className="mt-2 text-sm leading-5 text-[var(--muted)]">
                      horarios aguardando confirmacao
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-[var(--foreground)]">
                  Mensagem sugerida: {quickFlowTemplate}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Ao cadastrar, clientes com telefone entram tambem na fila de
                  WhatsApp para confirmacao imediata.
                </p>
              </div>
            </div>
          </section>

          <section className="animate-rise-delay-2 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6">
            <SectionHeading
              title="Prioridades do turno"
              description="A recepcao precisa enxergar o que gera impacto agora: confirmar horarios, renovar pacotes e puxar retornos antes de perder timing."
            />

            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {priorityItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,255,255,0.7)] p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                      {item.badge}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${priorityToneClassName[item.tone]}`}
                    >
                      {item.tone} prioridade
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">
                    {item.detail}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                    {item.recommendation}
                  </p>
                  <p className="mt-4 rounded-[1.2rem] bg-[var(--surface-strong)] px-4 py-3 text-sm leading-6 text-[var(--foreground)]">
                    {item.impact}
                  </p>

                  <a
                    href={item.href}
                    className="mt-5 inline-flex items-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
                  >
                    {item.hrefLabel}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
            <div className="space-y-6">
              <section className="animate-rise-delay-2 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6">
                <SectionHeading
                  title="Alertas de anamnese"
                  description="Checagem rapida antes do atendimento para reduzir risco operacional em procedimentos sensiveis."
                />

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  {anamnesisAlertItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,255,255,0.68)] p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="font-mono text-xs text-[var(--muted)]">
                            {item.appointmentTime}
                          </p>
                          <h3 className="text-lg font-semibold tracking-[-0.03em]">
                            {item.client}
                          </h3>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${anamnesisStatusClassName[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-[var(--foreground)]">
                        {item.procedure}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                        {item.restriction}
                      </p>
                      <p className="mt-4 rounded-[1.2rem] bg-[var(--surface-strong)] px-4 py-3 text-sm leading-6 text-[var(--foreground)]">
                        {item.pendingQuestion}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                        {item.orientation}
                      </p>

                      <a
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
                        href={item.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Validar pelo WhatsApp
                      </a>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="agenda"
                className="animate-rise-delay-2 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6"
              >
                <SectionHeading
                  title="Agenda do dia"
                  description="Priorize os atendimentos correntes, identifique confirmacoes pendentes e ja puxe renovacao de pacote onde houver oportunidade."
                />

                <div className="mt-6 space-y-4">
                  {agendaList.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,255,255,0.64)] p-4 transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex gap-4">
                          <div className="w-20 shrink-0 rounded-[1.2rem] border border-[var(--line)] bg-white px-3 py-3 text-center">
                            <div className="font-mono text-sm text-[var(--muted)]">
                              {item.duration}
                            </div>
                            <div className="mt-2 text-2xl font-semibold tracking-[-0.05em]">
                              {item.time}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-semibold tracking-[-0.03em]">
                                {item.client}
                              </h3>
                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-medium ${agendaStatusClassName[item.status]}`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <p className="text-sm leading-6 text-[var(--foreground)]">
                              {item.procedure}
                            </p>
                            <p className="text-sm text-[var(--muted)]">
                              Profissional responsavel: {item.professional}
                            </p>
                          </div>
                        </div>

                        <p className="max-w-sm text-sm leading-6 text-[var(--muted)]">
                          {item.packageNote}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6">
                <SectionHeading
                  title="Clientes em aquecimento"
                  description="Lista curta para a recepcao nao perder retorno, reagendamento e renovacao de quem ja demonstrou intencao."
                />

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  {clientFocusList.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,255,255,0.68)] p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold tracking-[-0.03em]">
                          {item.name}
                        </h3>
                        <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                          {item.tag}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                        {item.summary}
                      </p>
                      <p className="mt-4 border-t border-[var(--line)] pt-4 text-sm leading-6 text-[var(--foreground)]">
                        {item.nextAction}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="recuperacao-faltas"
                className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6"
              >
                <SectionHeading
                  title="Recuperacao de faltas"
                  description="Fila curta para reagendar faltas e cancelamentos recentes antes que pacote, validade e receita escapem da agenda."
                />

                <div className="mt-5 flex flex-col gap-3 rounded-[1.4rem] border border-[var(--line)] bg-[rgba(255,255,255,0.68)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    Reagendamentos pendentes
                  </span>
                  <span className="font-mono text-sm text-[var(--muted)]">
                    {pendingNoShowCount} abertos / {recoveredNoShowCount} contatos feitos
                  </span>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {noShowRecoveryItems.map((item) => {
                    const isContacted = contactedNoShowIds.includes(item.id);

                    return (
                      <article
                        key={item.id}
                        className={`rounded-[1.6rem] border p-5 transition-colors ${
                          isContacted
                            ? "border-[rgba(31,138,112,0.24)] bg-[rgba(31,138,112,0.08)]"
                            : "border-[var(--line)] bg-[rgba(255,255,255,0.68)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="text-lg font-semibold tracking-[-0.03em]">
                              {item.client}
                            </h3>
                            <p className="text-sm text-[var(--muted)]">
                              {item.missedAt}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${noShowPriorityClassName[item.priority]}`}
                          >
                            {item.priority}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2 text-sm leading-6">
                          <p className="font-medium text-[var(--foreground)]">
                            {item.procedure}
                          </p>
                          <p className="text-[var(--muted)]">{item.packageImpact}</p>
                          <p className="text-[var(--foreground)]">{item.revenueRisk}</p>
                          <p className="text-[var(--muted)]">{item.suggestedSlot}</p>
                        </div>

                        <p className="mt-4 rounded-[1.2rem] bg-[var(--surface-strong)] px-4 py-3 text-sm leading-6 text-[var(--foreground)]">
                          {item.template}
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <a
                            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
                            href={item.url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Reagendar no WhatsApp
                          </a>
                          <button
                            className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              isContacted
                                ? "bg-[var(--success)] text-white"
                                : "border border-[var(--line)] bg-white text-[var(--foreground)] hover:bg-[var(--accent-soft)]"
                            }`}
                            onClick={() => toggleNoShowContact(item.id)}
                            type="button"
                          >
                            {isContacted ? "Contato feito" : "Marcar contato"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section
                id="pacotes"
                className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6"
              >
                <SectionHeading
                  title="Saude dos pacotes"
                  description="O saldo de sessoes aparece na superficie principal porque pacote e o centro economico do CRM."
                />

                <div className="mt-6 space-y-4">
                  {packageHealthItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,255,255,0.68)] p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="text-base font-semibold tracking-[-0.03em]">
                            {item.client}
                          </h3>
                          <p className="text-sm text-[var(--muted)]">{item.procedure}</p>
                        </div>
                        <span
                          className={`text-sm font-medium ${packageStatusClassName[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-4 flex items-end justify-between gap-4">
                        <strong className="text-2xl font-semibold tracking-[-0.05em]">
                          {item.remainingSessions}
                        </strong>
                        <span className="text-sm text-[var(--muted)]">
                          {item.expiresAt}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="retornos"
                className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6"
              >
                <SectionHeading
                  title="Retornos recomendados"
                  description="Atendimento bem encerrado gera a proxima agenda. Aqui entram os retornos que merecem acao antes de esfriar."
                />

                <div className="mt-6 space-y-3">
                  {followUpItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[1.4rem] border border-[var(--line)] bg-[rgba(255,255,255,0.62)] p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold tracking-[-0.02em]">
                            {item.client}
                          </h3>
                          <p className="text-sm text-[var(--muted)]">{item.reason}</p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${followUpToneClassName[item.tone]}`}
                        >
                          {item.tone}
                        </span>
                      </div>
                      <div className="mt-4 space-y-2 text-sm leading-6">
                        <p className="font-medium text-[var(--foreground)]">
                          {item.targetDate}
                        </p>
                        <p className="text-[var(--muted)]">{item.opportunity}</p>
                        <p className="text-[var(--foreground)]">{item.template}</p>
                      </div>
                      <a
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
                        href={item.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Chamar para retorno
                      </a>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="faltas"
                className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6"
              >
                <SectionHeading
                  title="Risco de falta e reagendamento"
                  description="Fila curta para proteger a agenda do dia: confirme quem esta em risco e ja ofereca um horario alternativo antes de perder receita."
                />

                <div className="mt-5 flex items-center justify-between rounded-[1.4rem] border border-[var(--line)] bg-[rgba(255,255,255,0.68)] px-4 py-3">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    Acoes preventivas
                  </span>
                  <span className="font-mono text-sm text-[var(--muted)]">
                    {noShowRiskItems.length} clientes em risco
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  {noShowRiskItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,255,255,0.68)] p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold tracking-[-0.02em]">
                            {item.client}
                          </h3>
                          <p className="text-sm leading-6 text-[var(--muted)]">
                            {item.appointmentTime} - {item.procedure}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${noShowToneClassName[item.tone]}`}
                        >
                          Risco {item.tone.toLowerCase()}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-sm leading-6">
                        <p className="text-[var(--foreground)]">{item.reason}</p>
                        <p className="text-[var(--muted)]">{item.suggestedAction}</p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.fallbackSlots.map((slot) => (
                          <span
                            key={slot}
                            className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs font-medium text-[var(--foreground)]"
                          >
                            Alternativa {slot}
                          </span>
                        ))}
                      </div>

                      <p className="mt-4 text-sm leading-6 text-[var(--foreground)]">
                        {item.template}
                      </p>

                      <a
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
                        href={item.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Confirmar ou reagendar
                      </a>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6">
                <SectionHeading
                  title="Fechamento de sessao"
                  description="Controle o que precisa ser baixado no pacote, cobrado no checkout ou reagendado antes da cliente sair."
                />

                <div className="mt-5 flex items-center justify-between rounded-[1.4rem] border border-[var(--line)] bg-[rgba(255,255,255,0.68)] px-4 py-3">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    Pendencias do dia
                  </span>
                  <span className="font-mono text-sm text-[var(--muted)]">
                    {pendingClosingCount} abertas / {completedClosingCount} feitas
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  {attendanceClosingItems.map((item) => {
                    const isCompleted = completedClosingIds.includes(item.id);

                    return (
                      <article
                        key={item.id}
                        className={`rounded-[1.6rem] border p-4 transition-colors ${
                          isCompleted
                            ? "border-[rgba(31,138,112,0.24)] bg-[rgba(31,138,112,0.08)]"
                            : "border-[var(--line)] bg-[rgba(255,255,255,0.68)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="font-semibold tracking-[-0.02em]">
                              {item.client}
                            </h3>
                            <p className="text-sm leading-6 text-[var(--muted)]">
                              {item.procedure} com {item.professional}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${closingPriorityClassName[item.priority]}`}
                          >
                            {item.priority}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2 text-sm leading-6">
                          <p className="text-[var(--foreground)]">
                            {item.packageBalance}
                          </p>
                          <p className="text-[var(--muted)]">{item.paymentStatus}</p>
                          <p className="text-[var(--foreground)]">{item.nextStep}</p>
                        </div>

                        <button
                          className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            isCompleted
                              ? "bg-[var(--success)] text-white"
                              : "border border-[var(--line)] bg-white text-[var(--foreground)] hover:bg-[var(--accent-soft)]"
                          }`}
                          onClick={() => toggleClosing(item.id)}
                          type="button"
                        >
                          {isCompleted ? "Sessao fechada" : "Marcar fechamento"}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section
                id="whatsapp"
                className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <SectionHeading
                    title="Fila de WhatsApp"
                    description="Mensagens prontas para confirmacao, retorno e reativacao sem sair da rotina da recepcao."
                  />
                  <div className="animate-pulse-soft hidden h-3 w-3 rounded-full bg-[var(--accent)] sm:block" />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.3rem] border border-[var(--line)] bg-white px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                      Pendentes
                    </p>
                    <strong className="mt-2 block text-2xl font-semibold tracking-[-0.05em]">
                      {pendingWhatsAppCount}
                    </strong>
                  </div>
                  <div className="rounded-[1.3rem] border border-[var(--line)] bg-white px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                      Alta prioridade
                    </p>
                    <strong className="mt-2 block text-2xl font-semibold tracking-[-0.05em]">
                      {highPriorityWhatsAppCount}
                    </strong>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {whatsAppQueueList.map((item) => {
                    const isSent = sentWhatsAppIds.includes(item.id);

                    return (
                      <article
                        key={item.id}
                        className={`rounded-[1.6rem] border p-4 transition-colors ${
                          isSent
                            ? "border-[rgba(31,138,112,0.24)] bg-[rgba(31,138,112,0.08)]"
                            : "border-[var(--line)] bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold tracking-[-0.02em]">
                                {item.client}
                              </h3>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${whatsAppPriorityClassName[item.priority]}`}
                              >
                                {item.priority}
                              </span>
                            </div>
                            <p className="text-sm text-[var(--muted)]">{item.reason}</p>
                          </div>
                          <a
                            href={item.url}
                            className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:bg-[var(--accent-soft)]"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Abrir
                          </a>
                        </div>
                        <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                          {item.dueLabel}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-[var(--foreground)]">
                          {item.template}
                        </p>
                        <button
                          className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                            isSent
                              ? "bg-[var(--success)] text-white"
                              : "border border-[var(--line)] bg-white text-[var(--foreground)] hover:bg-[var(--accent-soft)]"
                          }`}
                          onClick={() => toggleWhatsAppSent(item.id)}
                          type="button"
                        >
                          {isSent ? "Contato marcado como enviado" : "Marcar como enviado"}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6">
                <SectionHeading
                  title="Campanhas de reativacao"
                  description="Carteira curta de clientes paradas ou em risco, com oferta objetiva para recuperar agenda e recorrencia pelo WhatsApp."
                />

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.3rem] border border-[var(--line)] bg-white px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                      A acionar
                    </p>
                    <strong className="mt-2 block text-2xl font-semibold tracking-[-0.05em]">
                      {pendingCampaignCount}
                    </strong>
                  </div>
                  <div className="rounded-[1.3rem] border border-[var(--line)] bg-white px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                      Alta prioridade
                    </p>
                    <strong className="mt-2 block text-2xl font-semibold tracking-[-0.05em]">
                      {highPriorityPendingCampaignCount}
                    </strong>
                  </div>
                  <div className="rounded-[1.3rem] border border-[var(--line)] bg-white px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                      Acionadas
                    </p>
                    <strong className="mt-2 block text-2xl font-semibold tracking-[-0.05em]">
                      {activatedCampaignCount}
                    </strong>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {retentionCampaignItems.map((item) => {
                    const isActivated = activatedCampaignIds.includes(item.id);

                    return (
                      <article
                        key={item.id}
                        className={`rounded-[1.6rem] border p-4 transition-colors ${
                          isActivated
                            ? "border-[rgba(31,138,112,0.24)] bg-[rgba(31,138,112,0.08)]"
                            : "border-[var(--line)] bg-[rgba(255,255,255,0.68)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="font-semibold tracking-[-0.02em]">
                              {item.client}
                            </h3>
                            <p className="text-sm text-[var(--muted)]">
                              {item.segment} - {item.daysWithoutVisit} dias sem visita
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${retentionToneClassName[item.tone]}`}
                          >
                            {item.tone} prioridade
                          </span>
                        </div>

                        <div className="mt-4 space-y-2 text-sm leading-6">
                          <p className="font-medium text-[var(--foreground)]">
                            {item.revenueRisk}
                          </p>
                          <p className="text-[var(--muted)]">{item.offer}</p>
                          <p className="text-[var(--foreground)]">{item.template}</p>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <a
                            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-soft)]"
                            href={item.url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            Reativar pelo WhatsApp
                          </a>
                          <button
                            className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              isActivated
                                ? "bg-[var(--success)] text-white"
                                : "border border-[var(--line)] bg-white text-[var(--foreground)] hover:bg-[var(--accent-soft)]"
                            }`}
                            onClick={() => toggleRetentionCampaign(item.id)}
                            type="button"
                          >
                            {isActivated
                              ? "Campanha acionada"
                              : "Marcar como acionada"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
