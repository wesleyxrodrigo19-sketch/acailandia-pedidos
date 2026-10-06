# Guia de adaptação para a MB Pizzaria

Este pacote é uma cópia limpa do sistema publicado da JW Hamburgueria. Ele serve como base técnica para adaptar a lógica à MB Pizzaria, sem reaproveitar automaticamente os dados exclusivos da JW.

## O que já existe no sistema

- cardápio público sem login;
- bloqueio de novos pedidos no cardápio quando a loja está fechada, mantendo preços e produtos visíveis;
- pedido para **Retirada**, **Consumir no local** ou **Entrega/Delivery**;
- carrinho persistente, complementos e observações de cozinha;
- bairros pesquisáveis, opção "Outro" e taxa de entrega por bairro;
- pedidos do balcão, mesas, comandas, pagamentos simples ou divididos e cálculo de troco;
- impressão local por conector, reimpressão e quantidade configurável de vias;
- painel operacional diário, gestão histórica, auditoria, faturamento e indicadores;
- pedidos cancelados separados da operação diária;
- carrinhos abandonados e atalhos de WhatsApp;
- destaque automático dos produtos mais vendidos;
- horários de funcionamento e fechamento manual;
- contagem diária de visitas ao cardápio;
- banco Cloudflare D1 com migrações sequenciais;
- implantação automática por GitHub Actions em Cloudflare Workers.

## Arquivos principais

- `src/app.html`: estrutura das telas do cliente e do proprietário.
- `src/app.js`: cardápio, carrinho e finalização do cliente.
- `src/admin-dashboard.js`: painel do proprietário.
- `src/admin-operations.js`: mesas, configurações, bairros, gestão e auditoria.
- `src/worker-template.js`: API, regras de negócio e acesso ao D1.
- `src/*.css`: aparência do cliente e do painel.
- `scripts/build-system.mjs`: gera `dist/server/index.js` para publicação.
- `drizzle/*.sql`: estrutura e evolução do banco, em ordem numérica.
- `wrangler.jsonc`: Worker e vínculo D1.
- `.github/workflows/publicar-cloudflare.yml`: publicação manual pelo GitHub Actions.

## Não copiar da JW para a MB

Antes de publicar a versão da pizzaria, substitua e revise:

- nome, logotipo, banner, favicon e identidade visual;
- domínio e links públicos;
- telefone e WhatsApp;
- endereço, cidades, bairros e taxas;
- cardápio, categorias, preços, fotos e complementos;
- horários, tempo de retirada e entrega;
- dados de impressão e nomes das impressoras;
- nome do Worker, nome/ID do D1 e identificadores do projeto;
- PIN administrativo e segredo de sessão.

Não conecte a adaptação ao banco `jmhamburgueria-db`. Crie um D1 exclusivo para a MB Pizzaria para impedir mistura ou perda de dados.

## Configuração recomendada para a nova instalação

1. Crie um novo repositório para a MB Pizzaria e copie o conteúdo deste pacote.
2. Crie um banco D1 vazio exclusivo.
3. Altere em `wrangler.jsonc`:
   - `name` para o nome do novo Worker;
   - `database_name` para o novo banco;
   - `database_id` para o ID fornecido pela Cloudflare.
4. Revise o nome do banco no script `cf:d1:migrate` de `package.json` e no workflow de publicação.
5. Cadastre no GitHub Actions, em **Settings → Secrets and variables → Actions**:
   - `CLOUDFLARE_API_TOKEN`;
   - `CLOUDFLARE_ACCOUNT_ID`;
   - `JW_ADMIN_PIN` (pode ser renomeado para `MB_ADMIN_PIN` se o workflow também for atualizado);
   - `JW_SESSION_SECRET` (pode ser renomeado da mesma maneira).
6. Nunca envie `.dev.vars`, tokens, senhas ou PINs para o GitHub.
7. Aplique as migrações em ordem numérica no banco novo.
8. Publique o Worker e só depois associe o domínio da pizzaria.

## Comandos locais

Requer Node.js 22 ou superior.

```powershell
npm install
npm run test:dashboard
npm run build
npm run cf:d1:migrate:local
npm run cf:dev
```

Para o banco remoto e a publicação, somente depois de configurar o novo D1:

```powershell
npm run cf:d1:migrate
npm run cf:deploy
```

## Banco de dados e segurança

- As migrações de `drizzle/0000...` até `drizzle/0013...` devem ser aplicadas em ordem.
- Faça backup/exportação do banco antes de qualquer migração em uma instalação que já tenha pedidos.
- Nunca apague ou substitua o D1 da JW ao preparar a MB.
- As imagens usadas pelo sistema atual podem estar gravadas como URLs ou dados do próprio cardápio; troque-as pelas imagens oficiais da pizzaria.
- Os segredos não estão incluídos neste ZIP e devem ser criados novamente.

## Checklist antes de colocar a MB em produção

- conferir todos os produtos, complementos, fotos, preços e categorias;
- testar Retirada, Consumir no local e Entrega/Delivery;
- testar taxa de bairro e a opção Outro;
- testar pedido com loja aberta e bloqueio com loja fechada;
- testar pedido no painel, mesa ocupada, pagamento, divisão, troco e cancelamento;
- conferir auditoria, gestão de pedidos, faturamento e visitas;
- testar impressão e reimpressão no computador real da pizzaria;
- conferir WhatsApp e textos enviados ao cliente;
- validar o domínio em celular, inclusive iPhone e dados móveis;
- confirmar que o novo Worker está conectado apenas ao D1 da MB.

## Estado desta cópia

Base gerada em 22/09/2026 a partir da versão publicada da JW Hamburgueria, incluindo a seleção final dos tipos de pedido: **Retirada**, **Consumir no local** e **Entrega/Delivery**.
