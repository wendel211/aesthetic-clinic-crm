import {
  agendaItems,
  clientFocusItems,
  followUpItems,
  navigationItems,
  overviewMetrics,
  packageHealthItems,
  priorityItems,
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
              <section
                id="agenda"
                className="animate-rise-delay-2 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] backdrop-blur sm:p-6"
              >
                <SectionHeading
                  title="Agenda do dia"
                  description="Priorize os atendimentos correntes, identifique confirmacoes pendentes e ja puxe renovacao de pacote onde houver oportunidade."
                />

                <div className="mt-6 space-y-4">
                  {agendaItems.map((item) => (
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
                  {clientFocusItems.map((item) => (
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
                      className="rounded-[1.4rem] border border-[var(--line)] bg-[rgba(255,255,255,0.62)] px-4 py-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-semibold tracking-[-0.02em]">{item.client}</h3>
                        <span className="font-mono text-xs text-[var(--muted)]">
                          Follow-up
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[var(--foreground)]">{item.reason}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {item.targetDate}
                      </p>
                    </article>
                  ))}
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

                <div className="mt-6 space-y-4">
                  {whatsAppQueueItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[1.6rem] border border-[var(--line)] bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold tracking-[-0.02em]">{item.client}</h3>
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
                      <p className="mt-4 text-sm leading-6 text-[var(--foreground)]">
                        {item.template}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
