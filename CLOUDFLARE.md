# Implantação na Cloudflare Workers

Este projeto é um Worker com D1. O build gera `dist/server/index.js`, que é o único arquivo de entrada publicado.

## Preparação

1. Instale Node.js 22 ou superior.
2. No diretório do projeto, execute `npm install`.
3. Faça login na Cloudflare: `npx wrangler login`.
4. Confirme que sua conta tem acesso ao banco D1 `jmhamburgueria-db` (`d512a625-92c8-4100-a0c8-441375f126d1`).

## Banco D1

As migrações em `drizzle/` são sequenciais e são compatíveis com um banco vazio. A primeira cria o modelo legado e a seguinte transforma esses dados para o modelo atual; por isso todas devem ser aplicadas em ordem.

Antes de executar em produção, confira o banco selecionado no painel da Cloudflare. Não use nenhum comando de exclusão de banco.

```bash
npm run cf:d1:migrate
```

Para validar localmente, sem tocar no banco remoto:

```bash
copy .dev.vars.example .dev.vars
npm run cf:d1:migrate:local
npm run cf:dev
```

## Segredos obrigatórios

Defina os segredos diretamente na Cloudflare — nunca os salve no GitHub:

```bash
npx wrangler secret put ADMIN_PIN
npx wrangler secret put SESSION_SECRET
```

`SESSION_SECRET` deve ser um valor aleatório de ao menos 32 caracteres. O PIN é usado somente no painel administrativo.

## Publicação

```bash
npm run cf:deploy
```

Depois que o Worker responder normalmente, associe o domínio no painel: **Workers & Pages → jmhamburgueria → Settings → Domains & Routes → Add Custom Domain**, informando `hamburgueria.wpnz.com.br`. O DNS da zona `wpnz.com.br` precisa estar ativo na mesma conta Cloudflare.

## Verificação após deploy

1. Abra `/` e confirme que o cardápio carrega.
2. Faça um pedido de teste e confira a comanda no painel `/painel`.
3. Entre no painel usando o `ADMIN_PIN`, atualize um pedido e confirme o fechamento de conta.
4. Verifique no D1 que `orders`, `order_items`, `print_jobs` e `order_payments` receberam os registros esperados.
