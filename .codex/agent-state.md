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

Ainda pendente:
- Persistir o fluxo rapido e o fechamento de sessao em banco.
- Implementar persistencia inicial com PostgreSQL e Prisma.
- Modelar entidades para evoluir mock para fluxo real.
- Configurar testes automatizados quando a primeira camada de regras estiver pronta.

## Preferencia atual de ciclo

Executar diariamente as 09:30 no horario de Brasilia, para nao colidir com o ciclo do CRM Pet Feira.

## Proxima acao recomendada

Implementar o primeiro fluxo operacional editavel:
- schema Prisma/PostgreSQL para clientes, agenda, pacotes e atendimentos
- persistencia do cadastro rapido e fechamento de sessao
- regras de baixa de sessoes e agenda de retorno
- preparacao do schema PostgreSQL/Prisma para persistencia real

## Decisoes em aberto

- Nome comercial final.
- Politica de merge automatico.
- Integracao real com WhatsApp ou apenas links e atalhos no MVP.
