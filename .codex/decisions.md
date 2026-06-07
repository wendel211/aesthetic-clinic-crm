# Decisoes do Produto e Engenharia

## 2026-06-07

- Este chat sera responsavel pelo sistema CRM Estetica Pro.
- O produto sera focado inicialmente em clinicas de estetica, studios de beleza e profissionais que vendem pacotes recorrentes.
- A evolucao sera feita em ciclos diarios automatizados.
- O agente deve priorizar features pequenas, validaveis e uteis para venda futura.
- A memoria operacional ficara no repositorio em arquivos dentro de `.codex/`.
- O fluxo deve usar branches pequenas, validacoes antes de PR e commits coesos.
- O agente nao deve acumular muitas mudancas antes de subir.
- O repositorio GitHub base e `https://github.com/wendel211/aesthetic-clinic-crm.git`.
- A stack inicial do produto sera Next.js 16 com TypeScript, Tailwind CSS 4 e ESLint.
- A primeira entrega tecnica sera uma superficie operacional em vez de landing page, com dashboard, agenda, clientes, pacotes e WhatsApp.
- O banco de dados oficial do produto sera PostgreSQL.
- A camada de modelagem e migrations recomendada sera Prisma.
- A arquitetura deve nascer multiempresa usando `companyId` nas entidades de negocio.
- Para MVP, priorizar Neon Postgres ou Supabase Postgres como provedor gerenciado.

## Decisoes pendentes

- Estrategia de autenticacao.
- Estrategia de deploy.
