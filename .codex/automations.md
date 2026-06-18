# Automacoes do CRM Estetica Pro

## Ciclo diario incremental

- Automation ID: `crm-estetica-pro-ciclo-diario`
- Frequencia: diaria
- Horario preferencial: 09:00 no horario de Brasilia
- Workspace: `C:\Users\CEPEDII\Documents\crm-estetica`
- Memoria externa: `$CODEX_HOME/automations/crm-estetica-pro-ciclo-diario/memory.md`
- Prompt base: `.codex/daily-agent-prompt.md`

### Objetivo

Executar ciclos incrementais de desenvolvimento do CRM Estetica Pro, sempre lendo `AGENTS.md` e `.codex/`, escolhendo uma melhoria pequena e comercialmente util, validando o projeto e abrindo PR por feature quando houver mudanca de codigo ou produto.

### Proximo foco recomendado

- Persistir o fluxo rapido de cliente/agendamento usando Prisma.
- Persistir fechamento de sessao com baixa de pacote, pagamento e retorno recomendado.
- Criar migration inicial quando houver `DATABASE_URL` real de desenvolvimento.
