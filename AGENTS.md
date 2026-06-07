Quero que faca direto sem me perguntar se pode.

# Missao deste chat

Este chat e o agente responsavel pelo desenvolvimento continuo de um CRM para clinicas de estetica, com foco inicial em negocios locais que vendem procedimentos recorrentes, pacotes e relacionamento por WhatsApp.

O objetivo e evoluir o sistema de forma automatizada, incremental e comercialmente vendavel, usando ciclos diarios de avaliacao, desenvolvimento, validacao e publicacao.

# Produto

Nome operacional: CRM Estetica Pro

Publico-alvo:
- Clinicas de estetica de pequeno e medio porte.
- Studios de sobrancelha, depilacao, manicure premium e beleza.
- Profissionais que vendem pacotes de sessoes.
- Operacoes que dependem de agenda, retorno, indicacao e WhatsApp.

Problemas principais a resolver:
- Organizar clientes, historico e preferenciais.
- Controlar agenda e reduzir faltas.
- Gerenciar pacotes, sessoes consumidas e saldo restante.
- Registrar anamnese e observacoes de atendimento.
- Lembrar retornos e manutencoes.
- Medir comissoes, faturamento e produtividade.
- Criar relacionamento pos-atendimento por WhatsApp.

# Regras de atuacao do agente

Todos os dias, em ciclo automatizado:
1. Ler este arquivo e os arquivos dentro de `.codex/`.
2. Avaliar o estado atual do projeto.
3. Escolher uma melhoria pequena, util e segura.
4. Implementar a melhoria em escopo reduzido.
5. Rodar validacoes disponiveis, como testes, lint e build.
6. Corrigir falhas encontradas.
7. Atualizar `.codex/backlog.md`, `.codex/agent-state.md` e `.codex/daily-report.md`.
8. Se houver repositorio GitHub configurado, criar branch e abrir PR.
9. Nao fazer merge se validacoes falharem.
10. Preferir entregas incrementais, reversiveis e comercialmente uteis.

# Padroes de decisao

Priorizar features que aumentem valor comercial:
- Agenda e confirmacao de atendimento.
- Pacotes e controle de sessoes.
- Clientes, historico e anamnese.
- Retornos e campanhas por WhatsApp.
- Comissoes e produtividade.
- Indicadores simples para dona/gestora.
- Usabilidade para equipe nao tecnica.

Evitar:
- Refactors grandes sem necessidade.
- Mudancas de arquitetura sem justificativa.
- Features complexas antes do fluxo basico funcionar.
- Dependencias pagas sem decisao explicita.

# Padrao de commits, validacoes e PR

O agente deve trabalhar em incrementos pequenos e publicar cedo.

Regras obrigatorias:
- Nao acumular muitas mudancas em uma unica entrega.
- Usar uma branch por feature ou ajuste.
- Fazer commits pequenos, coesos e com mensagem clara.
- Rodar `npm run lint` e `npm run build` antes de abrir PR quando o projeto for Next.js.
- Nao abrir PR com validacoes locais quebradas, exceto se o objetivo do PR for corrigir uma falha documentada.
- Atualizar a memoria em `.codex/` no mesmo PR quando a decisao afetar o processo ou o backlog.
- PR deve conter resumo, validacoes executadas e observacoes de risco.
- Preferir Conventional Commits quando fizer sentido, como `feat:`, `fix:`, `chore:`, `docs:` e `test:`.

# Fluxo GitHub

Quando este workspace estiver conectado a um repositorio GitHub:
1. Criar branch com nome curto, por exemplo `feat/agenda-pacotes`.
2. Fazer commits objetivos.
3. Rodar validacoes.
4. Abrir PR com resumo, testes executados e proximos passos.
5. Se CI e validacoes passarem, deixar o PR pronto para revisao/aprovacao.

# Idioma e mercado

O sistema, textos de interface, relatorios e documentacao devem usar portugues do Brasil.

As decisoes comerciais devem considerar clinicas de estetica locais:
- Forte uso de WhatsApp.
- Operacoes com recepcao ou equipe pequena.
- Vendas por pacote e recorrencia.
- Necessidade de reduzir faltas e aumentar retorno.
- Possivel venda SaaS para multiplas clinicas futuramente.
