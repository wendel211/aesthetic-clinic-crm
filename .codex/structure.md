# Estrutura do Sistema

## Produto

CRM Estetica Pro e um SaaS vertical para clinicas de estetica e studios de beleza que precisam controlar agenda, clientes, pacotes, sessoes e retorno por WhatsApp.

## Principios

- Comecar pela operacao diaria, nao por landing page.
- Cada tela deve ajudar a recepcao, profissional ou dona da clinica a decidir/prosseguir.
- Pacotes e recorrencia sao o centro economico do produto.
- WhatsApp deve ser tratado como canal operacional principal.
- Dados sensiveis de anamnese devem ser tratados com cuidado e minimo necessario.

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

1. Next.js, TypeScript, Tailwind e ESLint.
2. Componentes de interface operacional.
3. Dados mockados tipados.
4. Formularios client-side.
5. Persistencia com banco relacional.
6. Autenticacao.
7. Multiempresa.
8. Integrações de WhatsApp e pagamentos.

## Criterios de uma boa feature diaria

- Cabe em um PR pequeno.
- Tem validacao local clara.
- Melhora uma jornada real da clinica.
- Atualiza backlog/estado quando muda prioridade ou estrutura.
- Nao depende de servico pago sem decisao registrada.
