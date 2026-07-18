# Estado do Agente

## Sistema

CRM Estetica Pro

## Responsabilidade deste chat

Conduzir o desenvolvimento continuo deste sistema com ciclos diarios automatizados:
- Planejar a proxima melhoria.
- Implementar.
- Validar.
- Preparar PR quando houver GitHub configurado.
- Atualizar memoria operacional.

## Estado atual

Workspace configurado com memoria operacional, backlog, repositorio GitHub conectado e aplicacao Next.js inicial criada.
Ja existe uma primeira tela funcional do produto com dashboard operacional, agenda, clientes, pacotes, retornos e fila de WhatsApp usando dados mockados tipados.
O fluxo rapido da recepcao ja permite criar cliente/agendamento em memoria e preparar mensagem de confirmacao por WhatsApp.
Foi adicionado um bloco de fechamento de sessao para a equipe marcar consumo de pacote, cobranca no checkout e proximo retorno do atendimento.
Foi adicionada a base inicial de persistencia com Prisma 7 e schema PostgreSQL multiempresa para clientes, profissionais, procedimentos, pacotes, sessoes, agenda, anamnese, atendimentos, pagamentos e comissoes.
Foi adicionada uma central de confirmacao por WhatsApp em memoria, com prioridade, prazo sugerido, contadores de pendencias e botao para marcar contato enviado.
Foi adicionada uma central de campanhas de reativacao por WhatsApp, ainda mockada, para priorizar clientes paradas ou em risco com oferta sugerida e link de contato.
Foi adicionada uma secao operacional de alertas de anamnese pre-atendimento, ainda mockada, para destacar pendencias, restricoes e validacao por WhatsApp antes de procedimentos sensiveis.
Foi adicionada uma fila mockada de risco de falta e reagendamento, com motivo do risco, horarios alternativos e mensagem pronta por WhatsApp para proteger a agenda do dia.

Ainda pendente:
- Persistir o fluxo rapido e o fechamento de sessao em banco.
- Persistir retornos recomendados e campanhas de reativacao.
- Persistir alertas de anamnese por cliente, procedimento e agendamento.
- Persistir risco de falta, tentativa de contato e reagendamento sugerido.
- Criar migrations quando houver `DATABASE_URL` real configurada.
- Conectar formularios e cards operacionais ao Prisma.
- Persistir status de mensagens enviadas, respostas de confirmacao e reagendamentos.
- Configurar testes automatizados quando a primeira camada de regras estiver pronta.

## Preferencia atual de ciclo

Executar diariamente as 09:30 no horario de Brasilia, para nao colidir com o ciclo do CRM Pet Feira.

## Proxima acao recomendada

Implementar o primeiro fluxo operacional editavel:
- persistencia do cadastro rapido e fechamento de sessao
- persistencia da central de confirmacao por WhatsApp
- persistencia das campanhas de reativacao e retornos recomendados
- persistencia dos alertas de anamnese pre-atendimento
- persistencia de risco de falta e tentativa de reagendamento
- regras de baixa de sessoes e agenda de retorno
- migration inicial PostgreSQL quando o banco de desenvolvimento estiver definido

## Decisoes em aberto

- Nome comercial final.
- Politica de merge automatico.
- Integracao real com WhatsApp ou apenas links e atalhos no MVP.
