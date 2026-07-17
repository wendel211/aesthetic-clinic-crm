# Backlog do CRM Estetica Pro

## Estrutura do MVP

### Modulos principais

- Painel operacional: agenda do dia, faturamento previsto, faltas, retornos e pacotes a vencer.
- Clientes: cadastro, contatos, preferencias, historico e etiquetas.
- Profissionais: agenda individual, comissoes e produtividade.
- Procedimentos: nome, duracao, preco, categoria e cuidados.
- Pacotes: quantidade de sessoes, validade, saldo restante e renovacao.
- Agenda: agendamentos, confirmacao, remarcacao, falta e status.
- Anamnese: ficha por cliente/procedimento, alertas e observacoes sensiveis.
- Atendimento: registro da sessao, evolucao, produtos usados e proximos passos.
- Financeiro simples: pagamentos, recebimentos previstos, pacotes vendidos e comissoes.
- WhatsApp: mensagens prontas, links de contato, lembretes e campanhas futuras.

### Entidades iniciais

- Empresa: nome, telefone, endereco, plano e configuracoes.
- Usuario: nome, email, papel e empresa.
- Cliente: nome, telefone, aniversario, etiquetas, observacoes e consentimentos.
- Profissional: nome, especialidades, agenda, percentual de comissao.
- Procedimento: nome, duracao, preco, categoria e instrucoes.
- Pacote: cliente, procedimento, total de sessoes, sessoes usadas, validade e status.
- Agendamento: cliente, profissional, procedimento, data, horario, status e origem.
- Anamnese: cliente, procedimento, respostas, restricoes e data.
- Atendimento: agendamento, evolucao, observacoes, fotos futuras e retorno recomendado.
- Pagamento: cliente, pacote/agendamento, valor, metodo, status e vencimento.

### Primeira jornada do usuario

1. A recepcao cadastra uma cliente.
2. Cadastra ou escolhe um procedimento.
3. Agenda a primeira sessao.
4. Marca se a cliente comprou pacote.
5. Acompanha saldo de sessoes.
6. Confirma o atendimento por WhatsApp.
7. Registra a sessao realizada.
8. O sistema sugere retorno, renovacao ou reativacao.

### Ordem recomendada de desenvolvimento

1. Base Next.js com tela operacional inicial.
2. Modelos mockados para clientes, agenda, procedimentos e pacotes.
3. Formularios de cliente e agendamento.
4. Controle visual de pacotes e sessoes.
5. Persistencia inicial com PostgreSQL e Prisma.
6. Ficha de anamnese.
7. Mensagens prontas de WhatsApp.
8. Dashboard de comissoes e produtividade.
9. Autenticacao e multiempresa.
10. Deploy e fluxo comercial.

## Agora

- Conectar a dashboard inicial a entidades tipadas de clientes, agenda, procedimentos e pacotes.
- Persistir o cadastro rapido de clientes e agendamentos.
- Criar agenda de procedimentos com formularios persistidos.
- Persistir controle de pacotes, sessoes restantes e fechamento de atendimento.
- Persistir regua de renovacao de pacotes, proposta apresentada e resultado comercial.
- Criar historico de atendimentos.
- Criar migration inicial PostgreSQL a partir do schema Prisma.
- Conectar os formularios da tela operacional ao Prisma.

## Arquitetura de dados

- Banco oficial: PostgreSQL.
- ORM/migrations: Prisma.
- Provedores recomendados para MVP: Neon Postgres ou Supabase Postgres.
- Padrao SaaS: todas as entidades de negocio devem carregar `companyId` para multiempresa.
- Evitar SQLite/Firebase como base principal, porque o produto tem relacoes fortes entre cliente, profissional, agenda, pacote, sessao, pagamento, anamnese e comissao.

### Entidades iniciais PostgreSQL

- companies: empresa contratante do sistema.
- users: usuarios vinculados a uma empresa.
- customers: clientes da clinica.
- professionals: profissionais que executam procedimentos.
- procedures: procedimentos, duracao, preco e cuidados.
- packages: pacotes comprados pela cliente.
- package_sessions: sessoes consumidas ou disponiveis dentro de um pacote.
- appointments: agendamentos e status.
- anamnesis_forms: fichas e respostas de anamnese.
- attendances: registros de atendimento/sessao.
- payments: pagamentos e recebimentos previstos.
- commissions: comissoes por profissional.

## Entregue no momento

- Base Next.js com TypeScript, Tailwind CSS e ESLint.
- Tela operacional inicial, sem landing page, focada no uso diario da clinica.
- Dados mockados tipados para agenda, clientes, pacotes, retornos e WhatsApp.
- Fluxo rapido em memoria para cadastrar cliente, criar agendamento e preparar confirmacao por WhatsApp.
- Bloco de fechamento de sessao em memoria para controlar baixa de pacote, cobranca e proximo retorno.
- Central de confirmacao por WhatsApp em memoria com prioridade, prazo sugerido, contadores de pendencias e marcacao de contato enviado.
- Central de campanhas de reativacao por WhatsApp com clientes paradas, risco de receita e oferta sugerida.
- Fila de risco de falta e reagendamento com motivo, acao sugerida, horarios alternativos e CTA de WhatsApp.
- Regua de renovacao de pacotes com receita em aberto, proposta pronta, CTA de WhatsApp e marcacao em memoria de proposta apresentada.
- Prisma 7 configurado com schema PostgreSQL multiempresa para empresas, usuarios, clientes, profissionais, procedimentos, pacotes, sessoes, agendamentos, anamnese, atendimentos, pagamentos e comissoes.

## Proximas features comerciais

- Persistir propostas de renovacao, aceite/recusa e motivo quando a cliente nao fechar.
- Persistir campanhas de reativacao e retornos recomendados.
- Lembrete de confirmacao por WhatsApp.
- Controle de faltas e reagendamento.
- Persistir tentativas de confirmacao, risco de falta e horarios alternativos de reagendamento.
- Ficha de anamnese por procedimento.
- Antes/depois com imagens.
- Comissoes por profissional.
- Dashboard de faturamento, agenda e retorno.
- Campanhas para clientes inativos.
- Renovacao automatica de pacotes.
- Persistir status de confirmacao enviada, resposta recebida e falta/reagendamento por agendamento.
- Permissoes por perfil: dona, gestora, recepcao e profissional.

## Hipoteses de produto

- Clinicas pequenas perdem dinheiro por falta, esquecimento de retorno e baixa renovacao de pacotes.
- O MVP deve controlar agenda, cliente e pacote antes de tentar automacoes complexas.
- O diferencial comercial pode ser "CRM que aumenta retorno e renovacao de pacotes pelo WhatsApp".

## Ideias futuras

- Integracao com WhatsApp Business API.
- Link de confirmacao de agendamento.
- Area da cliente para ver proximas sessoes.
- Assinatura mensal de procedimentos.
- Controle de produtos usados em atendimento.
- Relatorio de produtividade por profissional.
- Importacao de clientes via planilha.
