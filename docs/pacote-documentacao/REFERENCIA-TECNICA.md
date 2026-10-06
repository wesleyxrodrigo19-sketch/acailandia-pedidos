# Referência técnica do Prime Açaí PDV

## Arquitetura

O sistema é publicado como Cloudflare Worker, com interface HTML, CSS e JavaScript incorporada no arquivo gerado `dist/server/index.js`. O banco é Cloudflare D1, ligado ao Worker pelo binding `DB`. A branch `main` do GitHub aciona a implantação contínua.

| Componente | Identificação |
|---|---|
| Worker | `prime-acai-pdv` |
| Banco D1 | `prime-acai-pdv-db` |
| ID do banco | `247b4f4d-0442-4633-b919-7c69e66d083e` |
| Domínio | `prime-acai.wpnz.com.br` |
| Entrada de build | `dist/server/index.js` |
| Compatibilidade | `2025-02-01` |

## Rotas públicas

- `GET /api/catalog`: catálogo e configurações públicas.
- `POST /api/orders`: criação de pedido.
- `GET /api/orders/:code`: acompanhamento do pedido.
- `GET /api/tables`: quadro público de mesas quando habilitado.
- `POST /api/abandoned-carts`: registro de carrinho abandonado.
- `POST /api/analytics/visit`: registro agregado de visita.
- `POST /api/scale/weight`: recebimento protegido do peso.
- `GET /api/admin/scale/current`: última leitura disponível para o balcão.
- A venda de self-service é aceita somente no canal de balcão, com leitura de até 120 segundos e conferência entre o peso enviado e o peso armazenado.
- O valor é calculado no servidor pela fórmula `arredondar(gramas × preço_em_centavos_por_kg ÷ 1000)`.
- `settings.self_service_price_per_kg_cents`: preço configurável, com padrão de 3000 centavos por kg.
- `POST /api/integrations/pedeai/webhook`: webhook reservado da PedeAI.

## Rotas administrativas principais

- `POST /api/admin/login` e `POST /api/admin/logout`.
- `GET /api/admin/orders`.
- `POST /api/admin/orders`.
- `PATCH /api/admin/orders/:id`.
- `POST /api/admin/orders/:id/cancel`.
- `DELETE /api/admin/orders/:id`.
- `POST /api/admin/orders/:id/reprint`.
- `POST /api/admin/orders/:id/payment`.
- `GET|POST /api/admin/products`.
- `PATCH|DELETE /api/admin/products/:id`.
- `PATCH /api/admin/settings`.
- `GET /api/admin/revenue`.
- `GET /api/admin/audit`.

## Tabelas do D1

`settings`, `products`, `orders`, `order_items`, `order_payments`, `print_jobs`, `abandoned_carts`, `site_visits` e `audit_log`.

As migrações devem ser executadas em ordem. Nunca apague o banco, não repita migrações já aplicadas e registre toda alteração estrutural em um novo arquivo SQL.

## Comandos

```text
npm run build
npm run test:dashboard
npm run cf:d1:migrate
npm run cf:deploy
```

## Segredos

- `ADMIN_PIN`: acesso do proprietário.
- `SESSION_SECRET`: assinatura das sessões administrativas.
- `SCALE_BRIDGE_KEY`: autenticação do agente local da balança.

Os valores nunca devem ser versionados.

## Verificação após publicação

1. Confirmar que o build aparece como Success na Cloudflare.
2. Abrir o cardápio e conferir categorias, imagens e preços.
3. Entrar no painel e criar um pedido de teste.
4. Percorrer os status e conferir impressão, pagamento e auditoria.
5. Conferir a última leitura da balança quando o agente estiver ativo.
