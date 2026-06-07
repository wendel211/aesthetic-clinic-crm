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
5. Persistencia local ou banco inicial.
6. Ficha de anamnese.
7. Mensagens prontas de WhatsApp.
8. Dashboard de comissoes e produtividade.
9. Autenticacao e multiempresa.
10. Deploy e fluxo comercial.

## Agora

- Definir ou criar stack inicial do sistema.
- Criar estrutura base do projeto.
- Modelar entidades principais: empresa, usuario, cliente, profissional, procedimento, pacote, sessao, agendamento, anamnese e pagamento.
- Criar tela inicial operacional, sem landing page, focada no uso diario da clinica.
- Criar cadastro de clientes.
- Criar agenda de procedimentos.
- Criar controle de pacotes e sessoes restantes.
- Criar historico de atendimentos.

## Proximas features comerciais

- Lembrete de confirmacao por WhatsApp.
- Controle de faltas e reagendamento.
- Ficha de anamnese por procedimento.
- Antes/depois com imagens.
- Comissoes por profissional.
- Dashboard de faturamento, agenda e retorno.
- Campanhas para clientes inativos.
- Renovacao automatica de pacotes.
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
