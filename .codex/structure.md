# Estrutura do Sistema

## Produto

CRM Estetica Pro e um SaaS vertical para clinicas de estetica e studios de beleza que precisam controlar agenda, clientes, pacotes, sessoes e retorno por WhatsApp.

## Principios

- Comecar pela operacao diaria, nao por landing page.
- Cada tela deve ajudar a recepcao, profissional ou dona da clinica a decidir ou prosseguir.
- Pacotes e recorrencia sao o centro economico do produto.
- WhatsApp deve ser tratado como canal operacional principal.
- Dados sensiveis de anamnese devem ser tratados com cuidado e minimo necessario.

## Stack atual

- Next.js 16 com App Router.
- TypeScript.
- Tailwind CSS 4.
- ESLint.

## Banco de dados

- Banco oficial: PostgreSQL.
- ORM/migrations: Prisma.
- Provedor recomendado para MVP: Neon Postgres ou Supabase Postgres.
- Modelo SaaS: usar `companyId` nas entidades de negocio para permitir multiempresa.

## Entidades principais

- Company: empresa assinante.
- User: usuario do sistema.
- Customer: cliente da clinica.
- Professional: profissional responsavel por atendimentos.
- Procedure: procedimento oferecido.
- Package: pacote vendido para uma cliente.
- PackageSession: sessao de pacote consumida ou disponivel.
- Appointment: agendamento.
- AnamnesisForm: ficha e respostas de anamnese.
- Attendance: registro de atendimento.
- Payment: pagamento ou recebimento previsto.
- Commission: comissao por profissional.

## Superficie atual

- Dashboard operacional inicial em portugues do Brasil.
- Blocos para agenda, clientes em aquecimento, saude dos pacotes, retornos e fila de WhatsApp.
- Fila de WhatsApp com prioridade, prazo de envio, contadores de pendencias e marcacao em memoria de contato enviado.
- Ofertas de renovacao de pacotes com valor sugerido, argumento comercial, mensagem de WhatsApp e marcacao em memoria de proposta apresentada.
- Resultado em memoria das ofertas de renovacao, com aceite/recusa, aguardando resposta, receita em aberto e receita aceita.
- Dados mockados tipados para acelerar formularios e persistencia.

## Areas do sistema

### Operacao

- Agenda do dia.
- Confirmacoes.
- Faltas.
- Remarcacoes.
- Proximos retornos.

### Relacionamento

- Clientes.
- Historico.
- Etiquetas.
- Campanhas.
- Mensagens prontas de WhatsApp.

### Pacotes

- Venda de pacote.
- Sessoes consumidas.
- Saldo restante.
- Validade.
- Renovacao.

### Atendimento

- Procedimento realizado.
- Profissional responsavel.
- Anamnese.
- Observacoes.
- Recomendacao de retorno.

### Gestao

- Faturamento previsto.
- Comissoes.
- Produtividade.
- Clientes inativos.
- Pacotes proximos do vencimento.

## Roadmap tecnico sugerido

1. Base Next.js, TypeScript, Tailwind e ESLint.
2. Componentes de interface operacional.
3. Dados mockados tipados.
4. Formularios client-side para clientes e agendamentos.
5. Persistencia com PostgreSQL e Prisma.
6. Autenticacao.
7. Multiempresa.
8. Integracoes de WhatsApp e pagamentos.

## Criterios de uma boa feature diaria

- Cabe em um PR pequeno.
- Tem validacao local clara.
- Melhora uma jornada real da clinica.
- Atualiza backlog e estado quando muda prioridade ou estrutura.
- Nao depende de servico pago sem decisao registrada.
