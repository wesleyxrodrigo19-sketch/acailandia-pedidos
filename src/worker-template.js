const APP_HTML = __APP_HTML__;
const APP_CSS = __APP_CSS__;
const APP_JS = __APP_JS__;
const APP_MEDIA = __APP_MEDIA__;

// Cardápio exclusivo da Açaí Prime, preservado durante a modernização do sistema.
const PRODUCT_SEED = [[1,"Monte sua marmita","Marmita 500ml","Açaí, cremes e acompanhamentos escolhidos até a capacidade da embalagem.",2600,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687247/202512032249_S6I4_.jpeg",1,0,0],[2,"Monte seu copo","Copo 300ml","Açaí, cremes e acompanhamentos escolhidos até a capacidade da embalagem.",2200,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3717671/17908253COPO300ML.jpg",1,0,1],[3,"Açaí na garrafa","Açaí na garrafa","500ml. Açaí batido com leite e cobertura de leite condensado.",2300,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3843615/3509ee45garr.jpeg",1,0,2],[4,"Pote de açaí 1 litro","Pote de açaí 1 litro","Açaí tradicional.",3000,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687242/thumb_202504051847_3RV4_.jpeg",0,0,3],[5,"Monte seu copo","Copo 400ml","Açaí, cremes e acompanhamentos escolhidos até a capacidade da embalagem.",2400,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687243/thumb_d6b0d1a2COPO300ML.jpg",0,0,4],[6,"Monte seu copo","Copo 500ml","Açaí, cremes e acompanhamentos escolhidos até a capacidade da embalagem.",2600,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687244/thumb_dd9845f9COPO300ML.jpg",0,0,5],[7,"Monte sua marmita","Marmita 750ml","Açaí, cremes e acompanhamentos escolhidos até a capacidade da embalagem.",3800,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687248/thumb_202512032310_XY9W_.jpeg",0,0,6],[8,"Monte sua marmita","Marmita 1 litro","Açaí, cremes e acompanhamentos escolhidos até a capacidade da embalagem.",4500,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687250/thumb_202512040009_4MCG_.jpeg",0,0,7],[9,"Escolha seu Milkshake","Milk-shake 330ml","Escolha seu sabor favorito.",1800,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687251/thumb_fd4f3118MILK.jpeg",0,0,8],[10,"Escolha seu Milkshake","Milk-shake 440ml","Escolha seu sabor favorito.",2000,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687252/thumb_f1934c6cMILK.jpeg",0,0,9],[11,"Brownie","Brownie com sorvete","Brownie recheado, duas bolas de sorvete, amendoim granulado e calda quente.",2000,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687253/thumb_202508292007_8UYO_.jpeg",0,0,10],[12,"Brownie","Brownie recheado","Brownie recheado.",800,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687254/thumb_507300f4val.jpeg",0,0,11],[13,"Lanches","Pastel de forno","Frango.",800,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687256/thumb_202507041943_2SRD_.jpeg",0,0,12],[14,"Lanches","Pastel de forno Carne seca","Carne seca, queijo e catupiry.",800,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3795766/thumb_f9675530Carne_seca.jpeg",0,0,13],[15,"Lanches","Pão Salsicha","Salsicha, molho, queijo, batata palha e catupiry.",800,null,"/media/menu-pao-salsicha.png",0,0,14],[16,"Lanches","Pão Hambúrguer","Carne de hambúrguer, presunto e queijo.",800,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3789975/thumb_81f382a7hamb.jpeg",0,0,15],[17,"Bebidas","Refrigerante Coca-Cola Lata 350ml","Lata 350ml.",600,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687257/thumb_202210200237_btcjxya1zoh.jpg",0,0,16],[18,"Bebidas","Refrigerante Coca Cola Zero Lata 350ml","Lata 350ml.",600,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687262/thumb_202601080004_b7yghpp2htq.jpeg",0,0,17],[19,"Bebidas","Fanta Laranja Lata 350ml","Lata 350ml.",600,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687269/thumb_202210211307_zym9dpas7in.jpg",0,0,18],[20,"Bebidas","Refrigerante Guaraná Antarctica Lata 350ml","Lata 350ml.",600,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687259/thumb_202302231327_s871e9d8h5.jpg",0,0,19],[21,"Bebidas","Cajuína São Geraldo","350ml.",600,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687260/thumb_202507071939_353H_.jpeg",0,0,20],[22,"Bebidas","Refrigerante Pepsi Garrafa 200ml","Garrafa 200ml.",300,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687258/thumb_202411121548_79td3oy0kov.png",0,0,21],[23,"Bebidas","Refrigerante Guaraná Antarctica 200ml","Embalagem 200ml.",300,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687265/thumb_202408301212_r4tx1h63gk.png",0,0,22],[24,"Bebidas","Guaraná Antarctica 1l","Embalagem 1l.",800,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687264/thumb_202210190235_7yak7flqtt9.jpg",0,0,23],[25,"Bebidas","Água mineral sem gás","500ml.",300,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687266/thumb_202104091802_WSPn_.jpeg",0,0,24],[26,"Bebidas","Água mineral com gás","500ml.",450,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687267/thumb_202104091807_QnVl_.jpeg",0,0,25],[27,"Bebidas","Refrigerante H2O Limoneto Pet 500ml","Garrafa 500ml.",650,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687263/thumb_202210192314_4txx6jh01yc.jpg",0,0,26],[28,"Bebidas","Suco de laranja","300ml.",500,null,"https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/3687268/thumb_202510172158_P0P8_.jpeg",0,0,27],[29,"Mentos","Mentos","Mentos.",1500,null,"/media/menu-mentos.png",0,0,28]];

const BLISS_PRODUCT_SEED=[[1,"Garrafinha trufada","Garrafinha trufada 300 ml","Açaí trufado: ninho, maracujá, Nutella, cookies, Oreo, morango ou café.",1999,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1789071935170blob.webp",1,0,0],[2,"Garrafinha trufada","Garrafinha trufada 500 ml","Garrafinha trufada de açaí.",3300,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1786994112355blob.webp",1,0,1],[3,"Garrafinha trufada","Garrafinha açaí zero & whey","Açaí zero trufado com pasta de amendoim e whey.",2290,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1787860115693blob.webp",1,0,2],[4,"Açaí","Monte seu açaí 300 g","Monte com seus acompanhamentos.",2100,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1786205416813blob.webp",1,0,3],[5,"Açaí","Monte seu açaí 500 g","Açaí com 5 acompanhamentos.",3400,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1786205430361blob.webp",1,0,4],[6,"Açaí","Monte seu açaí 1 kg","Açaí com 5 acompanhamentos.",6599,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1786205443947blob.webp",0,0,5],[7,"Copos trufados","Nuteninho com morango","Copo trufado com Nutella, creme de ninho, açaí e morango fresco. 300 ml.",2400,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1789072765010blob.webp",1,0,6],[8,"Copos trufados","Nuteninho com Oreo","Copo trufado com Nutella, creme de ninho, açaí e Oreo. 300 ml.",2400,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785518921513blob.webp",0,0,7],[9,"Copos trufados","Nuteninho tradicional","Copo trufado com Nutella, creme de ninho e açaí. 300 ml.",2400,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785519349421blob.webp",0,0,8],[10,"Milk shake","Milk shake 300 ml","Escolha seu sabor preferido.",1500,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1786205817961blob.webp",1,0,9],[11,"Milk shake","Milk shake 500 ml","Escolha seu sabor preferido.",1800,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1786205817961blob.webp",0,0,10],[12,"Milk shake","Milkshake na garrafa","Consulte sabores disponíveis.",1800,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1789072017755blob.webp",1,0,11],[13,"Barca de açaí","Barca de açaí 400 g","Monte a barca do seu jeito.",2990,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1789072467814blob.webp",1,0,12],[14,"Sorvetes Gellatos","Pavê italiano","Sorvete Gellato pavê italiano.",1000,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785520631138blob.webp",0,0,13],[15,"Sorvetes Gellatos","Mousse de maracujá","Sorvete Gellato mousse de maracujá.",1000,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785520741059blob.webp",0,0,14],[16,"Sorvetes Gellatos","Ninho trufado","Sorvete Gellato ninho trufado.",1000,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785520795411blob.webp",0,0,15],[17,"Sorvetes Gellatos","Côco da Malásia","Sorvete Gellato côco da Malásia.",1000,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785520876732blob.webp",0,0,16],[18,"Sorvetes Gellatos","Ovomaltine","Sorvete Gellato Ovomaltine.",1000,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785520911074blob.webp",0,0,17],[19,"Sorvetes Gellatos","Morango recheado","Sorvete Gellato com pedaços de morango.",1000,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785520973807blob.webp",0,0,18],[20,"Sorvetes Gellatos","Morango zero lactose","Sorvete Gellato zero lactose.",1000,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785521020371blob.webp",0,0,19],[21,"Sorvetes Gellatos","Chocobrownie","Sorvete Gellato chocobrownie.",1000,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785521061912blob.webp",0,0,20],[22,"Sorvetes Gellatos","Torta de limão","Sorvete Gellato torta de limão.",1000,null,"https://client-assets.anota.ai/produtos/6a6a55d96f09799abdc49170/-1785521093905blob.webp",0,0,21],[23,"Água mineral","Água mineral 500 ml","Água mineral sem gás.",350,null,"https://pedido.anota.ai/assets/item_no_image-DJEgmuUL.png",0,0,22]];

// Dados públicos conferidos no cardápio da Açailandia PE (RV Pedidos, 06/10/2026).
// Fotos e dados de contato podem ser definidos pelo administrador após a implantação.
const ACAILANDIA_PRODUCT_SEED=[
  [1,"Copos promocionais","Copo 1 — 300 ml","Açaí, leite condensado, leite em pó, granola e banana.",1890,null,"/media/bliss-acai-bowl.png",1,1,0],
  [2,"Copos promocionais","Copo 1 — 400 ml","Açaí, leite condensado, leite em pó, granola e banana.",2390,null,"/media/bliss-acai-bowl.png",0,1,1],
  [3,"Copos promocionais","Copo 2","Açaí, leite em pó, leite condensado e morango. Escolha o tamanho no pedido.",1890,null,"/media/bliss-acai-bowl.png",1,1,2],
  [4,"Copos promocionais","Copo 3","Açaí, leite condensado, morango e paçoca. Escolha o tamanho no pedido.",1890,null,"/media/bliss-acai-bowl.png",1,1,3],
  [5,"Copos promocionais","Copo 4","Açaí intercalado de creme de ninho, leite em pó e morango. Escolha o tamanho no pedido.",1890,null,"/media/bliss-dessert.png",1,1,4],
  [6,"Monte seu combo pote","Combo açaí 500 ml","Escolha 3 complementos grátis. Itens enviados separadamente para preservar a textura.",3990,null,"/media/bliss-acai-bowl.png",1,0,5],
  [7,"Monte seu combo pote","Combo açaí 1000 ml","Escolha 3 complementos grátis. Itens enviados separadamente para preservar a textura.",5490,null,"/media/bliss-acai-bowl.png",1,0,6],
  [8,"Monte seu açaí no copo","Monte seu copo","Açaí no copo com até 6 complementos grátis, em uma única embalagem.",2590,null,"/media/bliss-acai-bowl.png",1,0,7],
  [9,"Potes individuais","Pote de açaí","A partir de R$ 29,90. Escolha seu tamanho e complementos.",2990,null,"/media/bliss-acai-bowl.png",0,0,8],
  [10,"Potes individuais","Pote de creme","A partir de R$ 28,90. Escolha seu tamanho e sabor.",2890,null,"/media/bliss-dessert.png",0,0,9],
  [11,"Potes individuais","Pote de sorvete","A partir de R$ 23,00. Escolha seu tamanho e sabor.",2300,null,"/media/bliss-dessert.png",0,0,10],
  [12,"Milk shake","Milk 330 ml","Milk shake cremoso.",1400,null,"/media/bliss-dessert.png",0,0,11],
  [13,"Milk shake","Milk 440 ml","Milk shake cremoso.",1600,null,"/media/bliss-dessert.png",0,0,12],
  [14,"Milk shake","Milk 550 ml","Milk shake cremoso.",1800,null,"/media/bliss-dessert.png",0,0,13],
  [15,"Milk shake","Milk 770 ml","Milk shake cremoso.",2100,null,"/media/bliss-dessert.png",0,0,14],
  [16,"Bebidas","Água mineral","Água mineral sem gás.",300,null,"/media/bliss-water.png",0,0,15],
  [17,"Bebidas","Água mineral com gás","Água mineral com gás.",400,null,"/media/bliss-water.png",0,0,16]
];

const DEFAULT_DELIVERY_FEES=[];
const ORDER_STATUSES = new Set(["novo","confirmado","preparando","pronto","saiu_entrega","concluido","cancelado"]);
const PAYMENT_METHODS = new Set(["dinheiro","pix","credito","debito"]);
const DELETE_ORDER_PASSWORD_HASH = "8a9bcf1e51e812d0af8465a8dbcc9f741064bf0af3b3d08e6b0246437c19f7fb";

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
}

// O cardápio público é a rota mais acessada. Um cache curto reduz leituras no
// D1 e é invalidado sempre que o proprietário altera cardápio ou configurações.
const CATALOG_CACHE_KEY = "https://prime-acai-internal-cache.local/catalog-v1";
const CATALOG_CACHE_SECONDS = 60;
async function clearCatalogCache() {
  try { if (typeof caches !== "undefined" && caches.default) await caches.default.delete(CATALOG_CACHE_KEY); } catch {}
}

function text(content, type, cache = "public, max-age=300") {
  return new Response(content, { headers: { "content-type": `${type}; charset=utf-8`, "cache-control": cache } });
}

function media(name) {
  const base64 = APP_MEDIA[name];
  if (!base64) return new Response("Imagem não encontrada", { status: 404 });
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const extension = name.toLowerCase().split(".").pop();
  const contentType = extension === "svg" ? "image/svg+xml" : extension === "png" ? "image/png" : extension === "jpg" || extension === "jpeg" ? "image/jpeg" : "image/webp";
  return new Response(bytes, { headers: { "content-type": contentType, "cache-control": "public, max-age=31536000, immutable" } });
}

function brandPlaceholder() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ef62bb"/><stop offset=".55" stop-color="#8c38b8"/><stop offset="1" stop-color="#471365"/></linearGradient></defs><rect width="160" height="160" rx="36" fill="url(#g)"/><path d="M43 94c9 25 65 25 74 0l-8-42H51z" fill="#2d1044"/><path d="M53 67c11-26 43-26 54 0" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/><circle cx="80" cy="40" r="8" fill="#fff"/><path d="M80 18v12M62 25l8 9M98 25l-8 9" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`;
  return new Response(svg,{headers:{"content-type":"image/svg+xml; charset=utf-8","cache-control":"public, max-age=3600"}});
}

function clean(value, max = 300) {
  return String(value ?? "").trim().slice(0, max);
}

function int(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.round(n) : fallback;
}

function bool(value) {
  return value === true || value === 1 || value === "1" || value === "true" || value === "on";
}

function auditStatement(db, actionType, entityType, entityId, summary, details = {}) {
  const serialized=JSON.stringify(details || {});
  return db.prepare(`INSERT INTO audit_log (action_type,entity_type,entity_id,summary,details_json) VALUES (?,?,?,?,?)`)
    .bind(clean(actionType,40),clean(entityType,40),clean(entityId,100),clean(summary,300),serialized.length<=4000?serialized:JSON.stringify({ truncated:true }));
}

async function listAuditLog(env) {
  const rows=(await env.DB.prepare(`SELECT * FROM audit_log ORDER BY datetime(created_at) DESC,id DESC LIMIT 500`).all()).results;
  return rows.map(row=>({ ...row, details:parseJson(row.details_json,{}) }));
}

function paymentMethod(value) {
  const normalized = clean(value, 30).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (normalized.includes("credito")) return "credito";
  if (normalized.includes("debito")) return "debito";
  if (normalized.includes("cartao")) return "credito";
  if (normalized.includes("pix")) return "pix";
  if (normalized.includes("folha")) return "folha";
  return "dinheiro";
}

function paymentLabel(value) {
  if (clean(value,30).toLowerCase() === "misto") return "Pagamento dividido";
  return ({ dinheiro:"Dinheiro", pix:"Pix", credito:"Cartão de crédito", debito:"Cartão de débito" })[paymentMethod(value)];
}

function statusLabelForAudit(value) {
  return ({ novo:"novo",confirmado:"confirmado",preparando:"em preparação",pronto:"pronto",saiu_entrega:"saiu para entrega",concluido:"concluído",cancelado:"cancelado" })[value] || clean(value,30);
}

function googleMapsUrl(value) {
  const url = clean(value, 500);
  return /^https:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|maps\.google\.[a-z.]+|www\.google\.[a-z.]+\/maps)(\/|\?|$)/i.test(url) ? url : "";
}

function normalizeNeighborhood(value) {
  return clean(value, 100).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ");
}

function deliveryRules(value) {
  let raw = value;
  if (typeof raw === "string") { try { raw = JSON.parse(raw); } catch { raw = []; } }
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  return raw.slice(0, 500).map(rule => { const stored=clean(rule?.neighborhood,100),parts=stored.split("|"); return { city: clean(rule?.city,60) === "Juazeiro" || parts[0] === "Juazeiro" ? "Juazeiro" : "Petrolina", neighborhood: parts.length > 1 ? clean(parts.slice(1).join("|"),100) : stored, fee_cents: Math.max(0, int(rule?.fee_cents)) }; })
    .filter(rule => { const key=`${rule.city}:${normalizeNeighborhood(rule.neighborhood)}`; return rule.neighborhood && !seen.has(key) && (seen.add(key) || true); });
}

function deliveryFeeFor(settings, city, neighborhood) {
  const rule = deliveryRules(settings.delivery_neighborhood_fees_json).find(item => item.city === city && normalizeNeighborhood(item.neighborhood) === normalizeNeighborhood(neighborhood));
  const base = rule ? rule.fee_cents : 0;
  return base && bool(settings.delivery_surcharge_enabled) ? Math.round(base * (1 + Math.max(0, Math.min(100, int(settings.delivery_surcharge_percent))) / 100)) : base;
}

function hostedImageUrl(value) {
  return clean(value, 500);
}

async function proxyImage(requestUrl) {
  const source = requestUrl.searchParams.get("src") || "";
  if (!/^https:\/\/api\.japedido\.com\.br\/(imgs_produtos|imagens_produtos|delivery\/logos)\//i.test(source)) return new Response("Imagem não permitida", { status: 400 });
  try {
    // Alguns ambientes de publicação não expõem o Cache API. A imagem deve
    // continuar funcionando mesmo sem cache, em vez de derrubar a rota.
    const cache = typeof caches === "undefined" ? null : caches.default;
    const cacheKey = new Request(requestUrl.toString());
    const cached = cache ? await cache.match(cacheKey) : null;
    if (cached) return cached;
    const upstream = await fetch(source, { cf: { cacheEverything: true, cacheTtl: 31536000 } });
    if (!upstream.ok) return brandPlaceholder();
    const type = upstream.headers.get("content-type") || "image/jpeg";
    if (!type.startsWith("image/")) return brandPlaceholder();
    const response = new Response(upstream.body, { headers: { "content-type": type, "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" } });
    if (cache) await cache.put(cacheKey, response.clone());
    return response;
  } catch { return brandPlaceholder(); }
}

async function seed(db) {
  await db.prepare(`INSERT OR IGNORE INTO settings (id) VALUES (1)`).run();
  const settings=await db.prepare(`SELECT delivery_neighborhood_fees_json FROM settings WHERE id=1`).first();
  if (!deliveryRules(settings?.delivery_neighborhood_fees_json).length) await db.prepare(`UPDATE settings SET delivery_neighborhood_fees_json=?,updated_at=CURRENT_TIMESTAMP WHERE id=1`).bind(JSON.stringify(DEFAULT_DELIVERY_FEES)).run();
  const statements = ACAILANDIA_PRODUCT_SEED.map(p => db.prepare(`INSERT OR IGNORE INTO products
    (id,category,name,description,price_cents,old_price_cents,image_url,is_featured,is_promo,is_available,sort_order)
    VALUES (?,?,?,?,?,?,?,?,?,1,?)`).bind(...p));
  await db.batch(statements);
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(value) {
  const bytes=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(String(value||"")));
  return [...new Uint8Array(bytes)].map(byte=>byte.toString(16).padStart(2,"0")).join("");
}

function cookieMap(request) {
  return Object.fromEntries((request.headers.get("cookie") || "").split(";").map(v => v.trim()).filter(Boolean).map(v => { const i=v.indexOf("="); return [v.slice(0,i), decodeURIComponent(v.slice(i+1))]; }));
}

async function isAdmin(request, env) {
  if (!env.SESSION_SECRET) return false;
  const token = cookieMap(request).loja_admin;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = await hmac(expires, env.SESSION_SECRET);
  return signature === expected;
}

async function readJson(request) {
  try { return await request.json(); } catch { return null; }
}

async function scaleAuthorized(request, env) {
  const url=new URL(request.url),key=clean(request.headers.get("x-scale-key")||url.searchParams.get("token"),160);
  if(!key)return false;
  if(env.SCALE_BRIDGE_KEY&&key===env.SCALE_BRIDGE_KEY)return true;
  const row=await env.DB.prepare(`SELECT scale_agent_token_hash FROM settings WHERE id=1`).first();
  return Boolean(row?.scale_agent_token_hash&&await sha256(key)===row.scale_agent_token_hash);
}

function parseJson(value, fallback = []) {
  try { const parsed = JSON.parse(value || ""); return Array.isArray(parsed) ? parsed : fallback; } catch { return fallback; }
}

function cleanComplements(value) {
  const source = Array.isArray(value) ? value : parseJson(value, []);
  return source.slice(0, 20).map(item => ({
    name: clean(item?.name, 80),
    price_cents: Math.max(0, int(item?.price_cents)),
    max_quantity: Math.max(1, Math.min(20, int(item?.max_quantity, 1)))
  })).filter(item => item.name);
}

const DEFAULT_HOURS = [
  {day:0,label:"Domingo",enabled:true,open:"17:30",close:"23:20"},
  {day:1,label:"Segunda-feira",enabled:true,open:"17:30",close:"23:20"},
  {day:2,label:"Terça-feira",enabled:false,open:"17:30",close:"23:20"},
  {day:3,label:"Quarta-feira",enabled:true,open:"17:30",close:"23:20"},
  {day:4,label:"Quinta-feira",enabled:true,open:"17:30",close:"23:20"},
  {day:5,label:"Sexta-feira",enabled:true,open:"17:30",close:"23:20"},
  {day:6,label:"Sábado",enabled:true,open:"17:30",close:"23:20"}
];

function businessHours(value) {
  const raw = parseJson(value, DEFAULT_HOURS);
  return DEFAULT_HOURS.map(fallback => { const item=raw.find(row=>int(row?.day,-1)===fallback.day)||fallback; return { day:fallback.day,label:fallback.label,enabled:Boolean(item.enabled),open:/^\d{2}:\d{2}$/.test(item.open)?item.open:fallback.open,close:/^\d{2}:\d{2}$/.test(item.close)?item.close:fallback.close }; });
}

function storeAvailability(settings, now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(now).filter(part=>part.type!=="literal").map(part=>[part.type,part.value]));
  const dayMap={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6},day=dayMap[parts.weekday],minutes=int(parts.hour)*60+int(parts.minute),hours=businessHours(settings.business_hours_json),today=hours.find(row=>row.day===day)||DEFAULT_HOURS[day],toMinutes=value=>{const [hour,minute]=value.split(":").map(Number);return hour*60+minute},scheduled=Boolean(today.enabled&&minutes>=toMinutes(today.open)&&minutes<toMinutes(today.close)),manual=Boolean(settings.manual_closed);
  return { is_open:scheduled&&!manual,scheduled_open:scheduled,manual_closed:manual,manual_closed_reason:clean(settings.manual_closed_reason,160),business_hours:hours,today };
}

async function normalizeOrderItems(db, requestedItems) {
  if (!Array.isArray(requestedItems) || !requestedItems.length || requestedItems.length > 50) throw new Error("Adicione ao menos um produto.");
  const requested = requestedItems.map(item => ({
    product_id: int(item?.product_id),
    quantity: Math.max(1, Math.min(20, int(item?.quantity, 1))),
    complements: Array.isArray(item?.complements) ? item.complements : [],
    notes: clean(item?.notes, 300)
  })).filter(item => item.product_id);
  const ids = [...new Set(requested.map(item => item.product_id))];
  if (!ids.length) throw new Error("Pedido sem produtos válidos.");
  const found = await db.prepare(`SELECT id,name,price_cents,is_available,complements_json FROM products WHERE id IN (${ids.map(() => "?").join(",")})`).bind(...ids).all();
  const products = new Map(found.results.map(product => [int(product.id), product]));
  if (products.size !== ids.length || [...products.values()].some(product => !product.is_available)) throw new Error("Um produto do pedido não está disponível.");
  return requested.map(item => {
    const product = products.get(item.product_id);
    const allowed = new Map(cleanComplements(product.complements_json).map(option => [option.name.toLocaleLowerCase("pt-BR"), option]));
    const selected = [];
    for (const raw of item.complements.slice(0, 20)) {
      const option = allowed.get(clean(raw?.name, 80).toLocaleLowerCase("pt-BR"));
      if (!option) continue;
      const quantity = Math.max(1, Math.min(option.max_quantity, int(raw?.quantity, 1)));
      selected.push({ name:option.name, price_cents:option.price_cents, quantity });
    }
    const productId=int(product.id),requiresFlavor=false;
    const additions = selected.reduce((sum, option) => sum + option.price_cents * option.quantity, 0);
    // Garrafinhas trufadas e milk shakes têm sabor obrigatório, mas o sabor já
    // está incluído no preço do tamanho. Nunca some os dois valores.
    const flavorIncludedInBasePrice=false;
    const unitPrice=flavorIncludedInBasePrice?product.price_cents:product.price_cents + additions;
    return { product_id:product.id, product_name:product.name, quantity:item.quantity, unit_price_cents:unitPrice, complements:selected, notes:item.notes };
  });
}

async function shortOrderCode(db) {
  for (let attempt = 0; attempt < 12; attempt++) {
    const bytes = crypto.getRandomValues(new Uint8Array(4));
    const code = `${String(((bytes[0] << 8) | bytes[1]) % 1000).padStart(3,"0")}${String.fromCharCode(65 + bytes[2] % 26)}`;
    if (!(await db.prepare(`SELECT id FROM orders WHERE id=?`).bind(code).first())) return code;
  }
  return `${String(Date.now()).slice(-3)}${String.fromCharCode(65 + crypto.getRandomValues(new Uint8Array(1))[0] % 26)}`;
}

const BRANCHES={"acailandia":{id:"acailandia",name:"Açailandia PE"}};
function validBranch(value){return BRANCHES[value]?value:"acailandia"}

async function getCatalog(env, includeAdminSettings = false, branchId = "acailandia") {
  await seed(env.DB);
  branchId=validBranch(branchId);
  const [settingsRow, branch, productRows, neighborhoodFeeRows, rateRows] = await Promise.all([
    env.DB.prepare(`SELECT * FROM settings WHERE id=1`).first(),
    env.DB.prepare(`SELECT * FROM branches WHERE id=? AND is_active=1`).bind(branchId).first(),
    env.DB.prepare(`SELECT p.*,COALESCE(pb.is_available,1) AS branch_available,COALESCE(s.sales_count,0) AS sales_count FROM products p LEFT JOIN product_branches pb ON pb.product_id=p.id AND pb.branch_id=? LEFT JOIN (SELECT oi.product_id,SUM(oi.quantity) AS sales_count FROM order_items oi JOIN orders o ON o.id=oi.order_id WHERE o.status!='cancelado' GROUP BY oi.product_id) s ON s.product_id=p.id ORDER BY p.sort_order,p.id`).bind(branchId).all(),
    env.DB.prepare(`SELECT city,neighborhood,distance_km,fee_cents FROM branch_neighborhood_fees WHERE branch_id=? ORDER BY city,neighborhood`).bind(branchId).all(),
    env.DB.prepare(`SELECT from_km,to_km,fee_cents FROM branch_delivery_rates WHERE branch_id=? ORDER BY from_km`).bind(branchId).all()
  ]);
  const { print_bridge_key, reception_printer, kitchen_printer, delivery_neighborhood_fees_json, category_order_json, business_hours_json, pedeai_enabled, pedeai_environment, pedeai_store_id, pedeai_client_id, pedeai_api_base_url, pedeai_api_token, pedeai_webhook_secret, pedeai_last_sync_at, pedeai_last_error, ...publicSettings } = settingsRow;
  const configuredOrder = parseJson(category_order_json, []).map(value => clean(value,80)).filter(Boolean);
  const existingCategories = [...new Set(productRows.results.map(product => product.category))];
  const categories = [...configuredOrder.filter(category => existingCategories.includes(category)), ...existingCategories.filter(category => !configuredOrder.includes(category))];
  const categoryPosition = new Map(categories.map((category,index) => [category,index]));
  const featuredProductLimit=Math.max(1,Math.min(30,int(settingsRow.featured_product_limit,15)));
  const ranked = [...productRows.results].filter(product => product.is_available).sort((a,b) => int(b.sales_count)-int(a.sales_count) || int(b.is_featured)-int(a.is_featured) || int(a.sort_order)-int(b.sort_order));
  const automaticFeatured = new Set(ranked.slice(0,featuredProductLimit).map(product => int(product.id)));
  const sortedProducts = [...productRows.results].sort((a,b) => (categoryPosition.get(a.category) ?? 999)-(categoryPosition.get(b.category) ?? 999) || int(a.sort_order)-int(b.sort_order) || int(a.id)-int(b.id));
  return {
    settings: { ...publicSettings, store_name:branch?.name||"Açailandia PE", store_address:branch?.address||publicSettings.store_address, branch_id:branchId, branch_name:branch?.name||BRANCHES[branchId].name, ...storeAvailability(settingsRow), ...(includeAdminSettings?{reception_printer,kitchen_printer,pedeai_enabled:Boolean(pedeai_enabled),pedeai_environment:pedeai_environment||"sandbox",pedeai_store_id:pedeai_store_id||"",pedeai_client_id:pedeai_client_id||"",pedeai_api_base_url:pedeai_api_base_url||"",pedeai_api_token_configured:Boolean(pedeai_api_token),pedeai_webhook_secret_configured:Boolean(pedeai_webhook_secret),pedeai_last_sync_at:pedeai_last_sync_at||"",pedeai_last_error:pedeai_last_error||""}:{}), delivery_neighborhood_fees:neighborhoodFeeRows.results, delivery_rate_tiers:rateRows.results, waiter_fee_enabled:Boolean(settingsRow.waiter_fee_enabled), auto_print_enabled:Boolean(settingsRow.auto_print_enabled), delivery_surcharge_enabled:Boolean(settingsRow.delivery_surcharge_enabled), print_bridge_configured:Boolean(print_bridge_key) },
    categories,
    products: sortedProducts.map(p => ({ ...p, image_url:hostedImageUrl(p.image_url), complements:cleanComplements(p.complements_json), is_featured:automaticFeatured.has(int(p.id)), is_promo:Boolean(p.is_promo), catalog_available:Boolean(p.is_available), branch_available:Boolean(p.branch_available), is_available:Boolean(p.is_available)&&Boolean(p.branch_available) }))
  };
}

async function cashRegisterSummary(db,branchId){
  const active=await db.prepare(`SELECT * FROM cash_register_sessions WHERE branch_id=? AND status='open' ORDER BY id DESC LIMIT 1`).bind(branchId).first();
  const sessions=(await db.prepare(`SELECT * FROM cash_register_sessions WHERE branch_id=? ORDER BY opened_at DESC LIMIT 7`).bind(branchId).all()).results||[];
  if(!active)return {active:null,history:sessions};
  const [sales,changes,entries]=await Promise.all([
    db.prepare(`SELECT COALESCE(SUM(CASE WHEN payment_method='dinheiro' THEN total_cents WHEN payment_method='misto' THEN COALESCE((SELECT SUM(amount_cents) FROM order_payments WHERE order_id=orders.id AND method='dinheiro'),0) ELSE 0 END),0) AS value FROM orders WHERE branch_id=? AND payment_status='pago' AND status!='cancelado' AND updated_at>=?`).bind(branchId,active.opened_at).first(),
    db.prepare(`SELECT COALESCE(SUM(change_for_cents),0) AS value FROM orders WHERE branch_id=? AND payment_status='pago' AND status!='cancelado' AND updated_at>=?`).bind(branchId,active.opened_at).first(),
    db.prepare(`SELECT COALESCE(SUM(CASE WHEN entry_type='in' THEN amount_cents ELSE 0 END),0) AS cash_in,COALESCE(SUM(CASE WHEN entry_type='out' THEN amount_cents ELSE 0 END),0) AS cash_out FROM cash_register_entries WHERE session_id=?`).bind(active.id).first()
  ]);
  const current={...active,cash_sales_cents:int(sales?.value),change_cents:int(changes?.value),cash_in_cents:int(entries?.cash_in),cash_out_cents:int(entries?.cash_out)};
  current.expected_cash_cents=Math.max(0,int(current.opening_cash_cents)+current.cash_sales_cents-current.change_cents+current.cash_in_cents-current.cash_out_cents);
  return {active:current,history:sessions};
}

async function cashRegisterAction(env,branchId,body){
  const action=clean(body?.action,20),summary=await cashRegisterSummary(env.DB,branchId),active=summary.active;
  if(action==='open'){
    if(active)throw new Error('Já existe um caixa aberto nesta unidade.');
    const opening=Math.max(0,int(body?.opening_cash_cents));
    await env.DB.prepare(`INSERT INTO cash_register_sessions (branch_id,opening_cash_cents,expected_cash_cents,status) VALUES (?,?,?,'open')`).bind(branchId,opening,opening).run();
  }else if(action==='entry'){
    if(!active)throw new Error('Abra o caixa antes de registrar entrada ou sangria.');
    const type=body?.entry_type==='out'?'out':'in',amount=Math.max(1,int(body?.amount_cents));
    await env.DB.prepare(`INSERT INTO cash_register_entries (session_id,branch_id,entry_type,amount_cents,reason) VALUES (?,?,?,?,?)`).bind(active.id,branchId,type,amount,clean(body?.reason,160)).run();
  }else if(action==='close'){
    if(!active)throw new Error('Não há caixa aberto nesta unidade.');
    const expected=active.expected_cash_cents,reported=Math.max(0,int(body?.reported_closing_cents));
    await env.DB.prepare(`UPDATE cash_register_sessions SET closed_at=CURRENT_TIMESTAMP,reported_closing_cents=?,cash_sales_cents=?,change_cents=?,cash_in_cents=?,cash_out_cents=?,expected_cash_cents=?,difference_cents=?,closing_notes=?,status='closed' WHERE id=?`).bind(reported,active.cash_sales_cents,active.change_cents,active.cash_in_cents,active.cash_out_cents,expected,reported-expected,clean(body?.closing_notes,500),active.id).run();
  }else throw new Error('Ação de caixa inválida.');
  return cashRegisterSummary(env.DB,branchId);
}
async function cashierBranch(request,env){
  if(!env.SESSION_SECRET)return null; const token=cookieMap(request).loja_cashier; if(!token)return null;
  const [branchId,expires,signature]=token.split("."); if(!BRANCHES[branchId]||!expires||!signature||Number(expires)<Date.now())return null;
  return signature===await hmac(`${branchId}.${expires}.cashier`,env.SESSION_SECRET)?branchId:null;
}

async function counterOrderItems(env, body, settings) {
  const requestedItems=Array.isArray(body?.items)?body.items:[];
  const items = requestedItems.length ? await normalizeOrderItems(env.DB,requestedItems) : [];
  const selfServiceEntries=Array.isArray(body?.self_service_items)
    ? body.self_service_items
    : (body?.self_service?[body.self_service]:[]);
  for(const entry of selfServiceEntries){
    const grams=Math.max(0,int(entry?.grams)),capturedAt=clean(entry?.captured_at,40),manual=bool(entry?.manual);
    const capturedMs=Date.parse(capturedAt);
    if(!grams||grams>30000)throw new Error("Peso do self-service inválido.");
    if(!manual&&(!capturedAt||!Number.isFinite(capturedMs)||capturedMs>Date.now()+60000))throw new Error("A leitura da balança é inválida. Pese novamente o self-service.");
    const pricePerKg=Math.max(1,int(settings.self_service_price_per_kg_cents||3000)),totalCents=Math.round(grams*pricePerKg/1000);
    items.push({product_id:null,product_name:`Self-service ${String(grams/1000).replace(".",",")} kg`,quantity:1,unit_price_cents:totalCents,complements:[],notes:`Peso: ${grams} g • ${new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(pricePerKg/100)}/kg • ${manual?"peso manual auditado":"leitura automática Prix 3 Toledo"}`});
  }
  return {items,selfServiceEntries};
}

async function createOrder(env, body, channel) {
  const branchId=validBranch(body?.branch_id);
  const settings = await env.DB.prepare(`SELECT * FROM settings WHERE id=1`).first();
  const counterItems=channel==="counter"?await counterOrderItems(env,body,settings):null;
  const items=counterItems?counterItems.items:(Array.isArray(body?.items)&&body.items.length?await normalizeOrderItems(env.DB,body.items):[]);
  if(!items.length)throw new Error("Pedido sem produtos válidos.");
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price_cents, 0);
  if (channel === "online" && !storeAvailability(settings).is_open) throw new Error("A loja está fechada no momento. Consulte os horários de funcionamento.");
  if (channel === "online" && subtotal < settings.minimum_order_cents) throw new Error("O pedido não atingiu o valor mínimo.");
  const requestedOrderType=clean(body.order_type,20);
  const orderType = new Set(["pickup","dine_in","delivery"]).has(requestedOrderType) ? requestedOrderType : "pickup";
  const tableNumber = channel === "counter" && orderType === "dine_in" ? int(body.table_number) : 0;
  if (channel === "counter" && orderType === "dine_in") {
    const tableSettings = await env.DB.prepare(`SELECT table_count FROM settings WHERE id=1`).first();
    if (!tableNumber || tableNumber < 1 || tableNumber > int(tableSettings?.table_count)) throw new Error("Selecione uma mesa disponível.");
    const occupied = await env.DB.prepare(`SELECT id FROM orders WHERE table_number=? AND status NOT IN ('concluido','cancelado') LIMIT 1`).bind(tableNumber).first();
    if (occupied) throw new Error("Esta mesa já está ocupada. Finalize ou cancele o pedido anterior antes de reutilizá-la.");
  }
  const city = clean(body.city, 30);
  const neighborhood = clean(body.neighborhood, 100);
  // A taxa é definida no fechamento da conta, nunca na abertura da comanda.
  const waiterFee = 0;
  const branchFee=orderType === "delivery" ? await env.DB.prepare(`SELECT fee_cents FROM branch_neighborhood_fees WHERE branch_id=? AND city=? AND lower(neighborhood)=lower(?)`).bind(branchId,city,neighborhood).first() : null;
  const deliveryFee = orderType === "delivery" ? (branchFee?int(branchFee.fee_cents):deliveryFeeFor(settings, city, neighborhood)) : 0;
  const total = subtotal + waiterFee + deliveryFee;
  const selectedPaymentMethod = paymentMethod(body.payment_method);
  const initialPaymentStatus = channel === "counter"
    ? (clean(body.payment_status,20) === "aberto" ? "aberto" : "pago")
    : (selectedPaymentMethod === "pix" ? "aberto" : "pago");
  const id = await shortOrderCode(env.DB);
  const customerName = clean(body.customer_name, 80) || (channel === "counter" ? "Balcão" : "Cliente");
  const phone = clean(body.phone, 30);
  const street = clean(body.street, 160);
  const houseNumber = clean(body.house_number, 20);
  const block = clean(body.block, 40);
  const referencePoint = clean(body.reference_point, 160);
  const complement = clean(body.complement, 120);
  const mapsUrl = googleMapsUrl(body.maps_url);
  if (channel === "online") {
    if (!clean(body.customer_name,80)) throw new Error("Informe seu nome.");
    if (!/^\d{11}$/.test(phone.replace(/\D/g,""))) throw new Error("Informe um WhatsApp válido com DDD.");
  }
  if (orderType === "delivery") {
    if (!city) throw new Error("Selecione a cidade.");
    if (!neighborhood || !street || !houseNumber) throw new Error("Preencha cidade, bairro, rua e número do endereço.");
    if (!branchFee) throw new Error("Selecione um bairro da lista para calcular a taxa de entrega.");
  }
  const address = orderType === "delivery" ? `${street}, ${houseNumber}${block?` - Bloco ${block}`:""} - ${neighborhood}, ${city}${referencePoint?`. Referência: ${referencePoint}`:""}${complement?`. Complemento: ${complement}`:""}` : "";
  const statements = [env.DB.prepare(`INSERT INTO orders
    (id,branch_id,channel,customer_name,phone,order_type,address,city,neighborhood,street,house_number,block,reference_point,complement,maps_url,payment_method,payment_status,change_for_cents,notes,status,subtotal_cents,delivery_fee_cents,waiter_fee_cents,total_cents,table_number)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'novo',?,?,?,?,?)`).bind(id,branchId,channel,customerName,phone,orderType,address,city,neighborhood,street,houseNumber,block,referencePoint,complement,mapsUrl,selectedPaymentMethod,initialPaymentStatus,body.change_for_cents == null ? null : int(body.change_for_cents),clean(body.notes,500),subtotal,deliveryFee,waiterFee,total,tableNumber||null)];
  for (const item of items) statements.push(env.DB.prepare(`INSERT INTO order_items (order_id,product_id,product_name,quantity,unit_price_cents,complements_json,notes) VALUES (?,?,?,?,?,?,?)`).bind(id,item.product_id,item.product_name,item.quantity,item.unit_price_cents,JSON.stringify(item.complements),item.notes));
  const abandonedCartId = clean(body?.abandoned_cart_id, 64);
  if (channel === "online" && /^[0-9a-f-]{20,64}$/i.test(abandonedCartId)) statements.push(env.DB.prepare(`UPDATE abandoned_carts SET status='converted',updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(abandonedCartId));
  statements.push(auditStatement(env.DB,"order_created","order",id,`Pedido ${id} criado`,{ channel,customer_name:customerName,order_type:orderType,payment_status:initialPaymentStatus,payment_method:selectedPaymentMethod,total_cents:total,table_number:tableNumber||null,self_service:(counterItems?.selfServiceEntries||[]).map(entry=>({grams:int(entry?.grams),manual:bool(entry?.manual)})) }));
  if (settings.auto_print_enabled) {
    const copies=Math.max(1,Math.min(5,int(settings.print_copies,1)));
    if (clean(settings.reception_printer,120)) for (let copy=0;copy<copies;copy++) statements.push(env.DB.prepare(`INSERT INTO print_jobs (order_id,target,status) VALUES (?,'reception','pending')`).bind(id));
    if (clean(settings.kitchen_printer,120) && settings.kitchen_printer !== settings.reception_printer) for (let copy=0;copy<copies;copy++) statements.push(env.DB.prepare(`INSERT INTO print_jobs (order_id,target,status) VALUES (?,'kitchen','pending')`).bind(id));
  }
  await env.DB.batch(statements);
  await clearCatalogCache();
  return { id, branch_id:branchId, subtotal_cents:subtotal, delivery_fee_cents:deliveryFee, waiter_fee_cents:waiterFee, total_cents:total, status:"novo", channel, table_number:tableNumber||null, customer_name:customerName, phone, order_type:orderType, city, neighborhood, street, house_number:houseNumber, block, reference_point:referencePoint, complement, maps_url:mapsUrl, payment_method:selectedPaymentMethod, payment_status:initialPaymentStatus, notes:clean(body.notes,500), items };
}

async function appendCounterOrderItems(env, orderId, body, branchId) {
  const order=await env.DB.prepare(`SELECT * FROM orders WHERE id=? AND branch_id=? AND channel='counter'`).bind(orderId,branchId).first();
  if(!order)throw new Error("Pedido não encontrado nesta unidade.");
  if(order.status==="cancelado")throw new Error("Não é possível adicionar itens a um pedido cancelado.");
  if(order.payment_status!=="aberto")throw new Error("Este pedido já foi pago. Reabra o pagamento antes de adicionar itens.");
  const settings=await env.DB.prepare(`SELECT * FROM settings WHERE id=1`).first();
  const {items,selfServiceEntries}=await counterOrderItems(env,body,settings);
  if(!items.length)throw new Error("Adicione pelo menos um produto ou uma pesagem.");
  const addedSubtotal=items.reduce((sum,item)=>sum+item.quantity*item.unit_price_cents,0),subtotal=Math.max(0,int(order.subtotal_cents))+addedSubtotal;
  const waiterFee=order.waiter_fee_cents&&order.subtotal_cents?Math.round(subtotal*int(order.waiter_fee_cents)/int(order.subtotal_cents)):0;
  const total=subtotal+Math.max(0,int(order.delivery_fee_cents))+waiterFee;
  const statements=[];
  for(const item of items)statements.push(env.DB.prepare(`INSERT INTO order_items (order_id,product_id,product_name,quantity,unit_price_cents,complements_json,notes) VALUES (?,?,?,?,?,?,?)`).bind(order.id,item.product_id,item.product_name,item.quantity,item.unit_price_cents,JSON.stringify(item.complements),item.notes));
  statements.push(env.DB.prepare(`UPDATE orders SET subtotal_cents=?,waiter_fee_cents=?,total_cents=?,updated_at=CURRENT_TIMESTAMP WHERE id=? AND branch_id=?`).bind(subtotal,waiterFee,total,order.id,branchId));
  statements.push(auditStatement(env.DB,"cashier_order_items_added","order",order.id,`Caixa adicionou ${items.length} item(ns) ao pedido ${order.id}`,{branch_id:branchId,added_subtotal_cents:addedSubtotal,total_cents:total,self_service:selfServiceEntries.map(entry=>({grams:int(entry?.grams),manual:bool(entry?.manual)}))}));
  await env.DB.batch(statements);
  return {ok:true,id:order.id,subtotal_cents:subtotal,waiter_fee_cents:waiterFee,delivery_fee_cents:Math.max(0,int(order.delivery_fee_cents)),total_cents:total,items_added:items.length};
}

async function saveAbandonedCart(env, body) {
  const id = clean(body?.id, 64), customerName = clean(body?.customer_name, 80), phone = clean(body?.phone, 30).replace(/\D/g,"");
  if (!/^[0-9a-f-]{20,64}$/i.test(id)) throw new Error("Identificador do carrinho inválido.");
  if (!customerName || !/^\d{11}$/.test(phone)) throw new Error("Informe nome e WhatsApp válidos.");
  const items = await normalizeOrderItems(env.DB, body?.items);
  const subtotal = items.reduce((sum,item) => sum + item.quantity * item.unit_price_cents, 0);
  const settings = await env.DB.prepare(`SELECT * FROM settings WHERE id=1`).first();
  const requestedOrderType=clean(body?.order_type,20);
  const orderType = new Set(["pickup","dine_in","delivery"]).has(requestedOrderType) ? requestedOrderType : "pickup";
  const city = clean(body?.city,30), neighborhood = clean(body?.neighborhood,100);
  const deliveryFee = orderType === "delivery" ? deliveryFeeFor(settings,city,neighborhood) : 0;
  const safeItems = items.map(item => ({ product_id:item.product_id, product_name:item.product_name, quantity:item.quantity, unit_price_cents:item.unit_price_cents, complements:item.complements, notes:item.notes }));
  await env.DB.prepare(`INSERT INTO abandoned_carts
    (id,customer_name,phone,order_type,city,neighborhood,street,house_number,block,reference_point,complement,payment_method,notes,items_json,subtotal_cents,delivery_fee_cents,total_cents,status,updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'active',CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET customer_name=excluded.customer_name,phone=excluded.phone,order_type=excluded.order_type,city=excluded.city,neighborhood=excluded.neighborhood,street=excluded.street,house_number=excluded.house_number,block=excluded.block,reference_point=excluded.reference_point,complement=excluded.complement,payment_method=excluded.payment_method,notes=excluded.notes,items_json=excluded.items_json,subtotal_cents=excluded.subtotal_cents,delivery_fee_cents=excluded.delivery_fee_cents,total_cents=excluded.total_cents,status=CASE WHEN abandoned_carts.status='converted' THEN 'converted' ELSE 'active' END,updated_at=CURRENT_TIMESTAMP`)
    .bind(id,customerName,phone,orderType,city,neighborhood,clean(body?.street,160),clean(body?.house_number,20),clean(body?.block,40),clean(body?.reference_point,160),clean(body?.complement,120),paymentMethod(body?.payment_method),clean(body?.notes,500),JSON.stringify(safeItems),subtotal,deliveryFee,subtotal+deliveryFee).run();
  return { ok:true,id };
}

async function listAbandonedCarts(env) {
  const rows = (await env.DB.prepare(`SELECT * FROM abandoned_carts WHERE status='active' AND updated_at >= datetime('now','-8 days') ORDER BY updated_at DESC LIMIT 100`).all()).results;
  return rows.map(row => { let items=[]; try { items=JSON.parse(row.items_json||"[]") } catch {} return { ...row, items }; });
}

async function listAdminOrders(env, branchId="") {
  const branch=branchId?validBranch(branchId):"";
  const orders = (await (branch?env.DB.prepare(`SELECT * FROM orders WHERE branch_id=? ORDER BY datetime(created_at) DESC LIMIT 200`).bind(branch):env.DB.prepare(`SELECT * FROM orders ORDER BY datetime(created_at) DESC LIMIT 200`)).all()).results;
  if (!orders.length) return [];
  // Evita exceder o limite de parâmetros do D1 quando a lista estiver cheia.
  const items = (await env.DB.prepare(`SELECT oi.* FROM order_items oi INNER JOIN (SELECT id FROM orders ORDER BY datetime(created_at) DESC LIMIT 200) recent_orders ON recent_orders.id=oi.order_id ORDER BY oi.id`).all()).results;
  const grouped = new Map();
  for (const item of items) { if (!grouped.has(item.order_id)) grouped.set(item.order_id, []); grouped.get(item.order_id).push(item); }
  return orders.map(o => ({ ...o, items: grouped.get(o.id) || [] }));
}

async function publicCatalog(env, branchId) {
  const cache = null;
  const response=json(await getCatalog(env,false,branchId),200,{"cache-control":`public, max-age=${CATALOG_CACHE_SECONDS}, s-maxage=${CATALOG_CACHE_SECONDS}`});
  if (cache) { try { await cache.put(CATALOG_CACHE_KEY,response.clone()); } catch {} }
  return response;
}

function brazilCalendar(now=new Date()) {
  const parts=Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(now).filter(part=>part.type!=="literal").map(part=>[part.type,part.value]));
  return { date:`${parts.year}-${parts.month}-${parts.day}`,weekday:({Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6})[parts.weekday],minutes:int(parts.hour)*60+int(parts.minute) };
}

function visitWindowOpen(settings, now=new Date()) {
  const local=brazilCalendar(now),hours=businessHours(settings?.business_hours_json),today=hours.find(row=>row.day===local.weekday)||DEFAULT_HOURS[local.weekday];
  const [hour,minute]=String(today.open||"17:30").split(":").map(Number);
  return Boolean(today.enabled&&local.minutes>=hour*60+minute);
}

async function visitSummary(env, from, to, branchId = "") {
  const local=brazilCalendar(),monthStart=`${local.date.slice(0,7)}-01`,rangeFrom=/^\d{4}-\d{2}-\d{2}$/.test(from||"")?from:monthStart,rangeTo=/^\d{4}-\d{2}-\d{2}$/.test(to||"")?to:local.date;
  const settings=await env.DB.prepare(`SELECT business_hours_json FROM settings WHERE id=1`).first(),hours=businessHours(settings?.business_hours_json).filter(row=>row.enabled);
  if(!hours.length)return { today:0,total:0,period:0,from:rangeFrom,to:rangeTo,by_day:[] };
  const branch=BRANCHES[branchId]?branchId:"",clause=hours.map(()=>`(strftime('%w',datetime(created_at,'-3 hours'))=? AND time(datetime(created_at,'-3 hours'))>=?)`).join(" OR "),bindings=[...hours.flatMap(row=>[String(row.day),row.open]),...(branch?[branch]:[])];
  const rows=(await env.DB.prepare(`SELECT visited_on,COUNT(*) AS visits FROM site_visits WHERE (${clause})${branch?" AND branch_id=?":""} GROUP BY visited_on ORDER BY visited_on DESC`).bind(...bindings).all()).results.map(row=>({visited_on:row.visited_on,visits:int(row.visits)}));
  return { today:rows.find(row=>row.visited_on===local.date)?.visits||0,total:rows.reduce((sum,row)=>sum+row.visits,0),period:rows.filter(row=>row.visited_on>=rangeFrom&&row.visited_on<=rangeTo).reduce((sum,row)=>sum+row.visits,0),from:rangeFrom,to:rangeTo,by_day:rows.filter(row=>row.visited_on>=rangeFrom&&row.visited_on<=rangeTo) };
}

async function orderManagementReport(env,url) {
  const local=brazilCalendar(),from=/^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get("from")||"")?url.searchParams.get("from"):local.date,to=/^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get("to")||"")?url.searchParams.get("to"):local.date;
  const branchId=BRANCHES[url.searchParams.get("branch")]?url.searchParams.get("branch"):"",filter=branchId?" AND branch_id=?":"",orderParams=branchId?[from,to,branchId]:[from,to];
  const orders = (await env.DB.prepare(`SELECT id,branch_id,channel,customer_name,phone,order_type,city,neighborhood,payment_method,payment_status,status,total_cents,created_at FROM orders WHERE date(datetime(created_at,'-3 hours')) BETWEEN ? AND ?${filter} ORDER BY datetime(created_at) DESC`).bind(...orderParams).all()).results;
  const products = (await env.DB.prepare(`SELECT oi.product_name,SUM(oi.quantity) AS quantity,SUM(oi.quantity*oi.unit_price_cents) AS total_cents FROM order_items oi JOIN orders o ON o.id=oi.order_id WHERE o.status!='cancelado' AND date(datetime(o.created_at,'-3 hours')) BETWEEN ? AND ?${branchId?" AND o.branch_id=?":""} GROUP BY oi.product_name ORDER BY quantity DESC,total_cents DESC LIMIT 10`).bind(...orderParams).all()).results;
  const neighborhoods = (await env.DB.prepare(`SELECT neighborhood,city,COUNT(*) AS order_count,SUM(total_cents) AS total_cents FROM orders WHERE status!='cancelado' AND order_type='delivery' AND TRIM(COALESCE(neighborhood,''))!='' AND date(datetime(created_at,'-3 hours')) BETWEEN ? AND ?${filter} GROUP BY city,neighborhood ORDER BY order_count DESC,total_cents DESC LIMIT 10`).bind(...orderParams).all()).results;
  const summary = orders.reduce((result,order) => {
    result.total_orders++;
    if (order.status === "cancelado") result.cancelled_orders++;
    else result.revenue_cents += int(order.total_cents);
    return result;
  }, { total_orders:0,cancelled_orders:0,revenue_cents:0 });
  return { from,to,branch_id:branchId,orders,products,neighborhoods,summary,visits:await visitSummary(env,from,to,branchId) };
}

async function tableBoard(env) {
  const settings = await env.DB.prepare(`SELECT table_count FROM settings WHERE id=1`).first();
  const occupied = (await env.DB.prepare(`SELECT table_number,id,status,customer_name,created_at FROM orders WHERE table_number IS NOT NULL AND status NOT IN ('concluido','cancelado') ORDER BY table_number`).all()).results;
  const maxActive = occupied.reduce((max, order) => Math.max(max, int(order.table_number)), 0);
  const count = Math.max(0, Math.min(200, Math.max(int(settings?.table_count), maxActive)));
  const byNumber = new Map(occupied.map(order => [int(order.table_number), order]));
  return { table_count: count, occupied_count: occupied.length, available_count: Math.max(0, count - occupied.length), tables: Array.from({ length: count }, (_, index) => {
    const number = index + 1, order = byNumber.get(number);
    return order ? { number, occupied: true, order_id: order.id, status: order.status, customer_name: order.customer_name, created_at: order.created_at } : { number, occupied: false };
  }) };
}

async function updateOrderItems(env, orderId, body) {
  const order = await env.DB.prepare(`SELECT * FROM orders WHERE id=?`).bind(orderId).first();
  if (!order) throw new Error("Pedido não encontrado.");
  if (order.status === "cancelado") throw new Error("Não é possível editar um pedido cancelado.");
  const items = await normalizeOrderItems(env.DB, body?.items);
  const subtotal = items.reduce((sum,item) => sum + item.quantity * item.unit_price_cents, 0);
  const waiterFee = order.waiter_fee_cents && order.subtotal_cents ? Math.round(subtotal * order.waiter_fee_cents / order.subtotal_cents) : 0;
  const statements = [env.DB.prepare(`DELETE FROM order_items WHERE order_id=?`).bind(orderId)];
  for (const item of items) statements.push(env.DB.prepare(`INSERT INTO order_items (order_id,product_id,product_name,quantity,unit_price_cents,complements_json,notes) VALUES (?,?,?,?,?,?,?)`).bind(orderId,item.product_id,item.product_name,item.quantity,item.unit_price_cents,JSON.stringify(item.complements),item.notes));
  statements.push(env.DB.prepare(`UPDATE orders SET subtotal_cents=?,waiter_fee_cents=?,total_cents=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(subtotal,waiterFee,subtotal+waiterFee+(order.delivery_fee_cents||0),orderId));
  statements.push(auditStatement(env.DB,"order_edited","order",orderId,`Itens do pedido ${orderId} alterados`,{ previous_total_cents:order.total_cents,total_cents:subtotal+waiterFee+(order.delivery_fee_cents||0),item_count:items.reduce((sum,item)=>sum+item.quantity,0) }));
  await env.DB.batch(statements);
  return { ok:true, subtotal_cents:subtotal, delivery_fee_cents:order.delivery_fee_cents||0, waiter_fee_cents:waiterFee, total_cents:subtotal+waiterFee+(order.delivery_fee_cents||0) };
}

async function updateOrderDetails(env, orderId, body) {
  const order = await env.DB.prepare(`SELECT * FROM orders WHERE id=?`).bind(orderId).first();
  if (!order) throw new Error("Pedido não encontrado.");
  if (order.status === "cancelado") throw new Error("Não é possível editar um pedido cancelado.");
  const settings = await env.DB.prepare(`SELECT * FROM settings WHERE id=1`).first();
  const requestedType = clean(body?.order_type,20);
  const orderType = ["delivery","pickup","dine_in"].includes(requestedType) ? requestedType : order.order_type;
  const delivery = orderType === "delivery";
  const city = delivery ? clean(body?.city,80) : "";
  const neighborhood = delivery ? clean(body?.neighborhood,120) : "";
  const street = delivery ? clean(body?.street,160) : "";
  const houseNumber = delivery ? clean(body?.house_number,20) : "";
  const block = delivery ? clean(body?.block,40) : "";
  const referencePoint = delivery ? clean(body?.reference_point,160) : "";
  const complement = delivery ? clean(body?.complement,120) : "";
  const mapsUrl = delivery ? (safeMapsUrl(body?.maps_url) || "") : "";
  const address = delivery ? `${street}, ${houseNumber}${block?` - Bloco ${block}`:""} - ${neighborhood}, ${city}${referencePoint?`. Referência: ${referencePoint}`:""}${complement?`. Complemento: ${complement}`:""}` : "";
  const deliveryFee = delivery ? deliveryFeeFor(settings,city,neighborhood) : 0;
  const payment = paymentMethod(body?.payment_method ?? order.payment_method);
  const total = Math.max(0,int(order.subtotal_cents)) + Math.max(0,int(order.waiter_fee_cents)) + deliveryFee;
  await env.DB.batch([
    env.DB.prepare(`UPDATE orders SET order_type=?,address=?,city=?,neighborhood=?,street=?,house_number=?,block=?,reference_point=?,complement=?,maps_url=?,payment_method=?,delivery_fee_cents=?,total_cents=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(orderType,address,city,neighborhood,street,houseNumber,block,referencePoint,complement,mapsUrl,payment,deliveryFee,total,orderId),
    env.DB.prepare(`DELETE FROM order_payments WHERE order_id=?`).bind(orderId),
    auditStatement(env.DB,"order_details_edited","order",orderId,`Dados do pedido ${orderId} alterados`,{ order_type:orderType,city,neighborhood,payment_method:payment,delivery_fee_cents:deliveryFee,total_cents:total })
  ]);
  return { ok:true, order_type:orderType, payment_method:payment, delivery_fee_cents:deliveryFee, total_cents:total };
}

async function saveProductImage(env, file) {
  if (!file || typeof file.arrayBuffer !== "function" || !file.size) return null;
  if (!env.MEDIA) throw new Error("O armazenamento de imagens ainda não está configurado.");
  if (file.size > 3 * 1024 * 1024) throw new Error("A imagem deve ter no máximo 3 MB.");
  const allowed = { "image/jpeg":"jpg", "image/png":"png", "image/webp":"webp" };
  const extension = allowed[file.type];
  if (!extension) throw new Error("Use uma imagem JPG, PNG ou WebP.");
  const key = `products/${crypto.randomUUID()}.${extension}`;
  await env.MEDIA.put(key, await file.arrayBuffer(), { httpMetadata:{ contentType:file.type, cacheControl:"public, max-age=31536000, immutable" } });
  return `/uploads/${key}`;
}

async function productInput(request, env, current = null) {
  const type = request.headers.get("content-type") || "";
  let body;
  if (type.includes("multipart/form-data")) {
    const form = await request.formData();
    body = Object.fromEntries(form.entries());
    const uploaded = await saveProductImage(env, form.get("image"));
    if (uploaded) body.image_url = uploaded;
  } else body = await readJson(request) || {};
  return {
    name: clean(body.name, 120) || current?.name || "",
    description: body.description == null ? (current?.description || "") : clean(body.description, 500),
    category: clean(body.category, 80) || current?.category || "Outros",
    price_cents: body.price_cents == null ? (current?.price_cents ?? 0) : Math.max(0, int(body.price_cents)),
    old_price_cents: body.old_price_cents == null ? (current?.old_price_cents ?? null) : (int(body.old_price_cents)>0?int(body.old_price_cents):null),
    image_url: clean(body.image_url, 500) || current?.image_url || "/brand-placeholder.svg",
    is_available: body.is_available == null ? (current?.is_available ?? 1) : (bool(body.is_available) ? 1 : 0),
    is_featured: body.is_featured == null ? (current?.is_featured ?? 0) : (bool(body.is_featured) ? 1 : 0),
    is_promo: body.is_promo == null ? (current?.is_promo ?? 0) : (bool(body.is_promo) ? 1 : 0),
    complements_json: body.complements_json == null ? (current?.complements_json || "[]") : JSON.stringify(cleanComplements(body.complements_json))
  };
}

async function revenueReport(env, url, branchId = "") {
  const now = new Date();
  const today = now.toLocaleDateString("en-CA", { timeZone:"America/Sao_Paulo" });
  const monthStart = `${today.slice(0,7)}-01`;
  const from = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get("from") || "") ? url.searchParams.get("from") : monthStart;
  const to = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get("to") || "") ? url.searchParams.get("to") : today;
  const branchFilter=BRANCHES[branchId]?" AND branch_id=?":"",params=BRANCHES[branchId]?[from,to,branchId]:[from,to];
  const rows = (await env.DB.prepare(`SELECT id,payment_method,channel,total_cents,waiter_fee_cents,created_at FROM orders WHERE status != 'cancelado' AND date(datetime(created_at,'-3 hours')) BETWEEN ? AND ?${branchFilter} ORDER BY datetime(created_at) DESC`).bind(...params).all()).results;
  const byPayment = { dinheiro:0, pix:0, credito:0, debito:0 };
  const byChannel = { online:0, counter:0 };
  let total = 0, waiterFees = 0;
  for (const row of rows) {
    total += row.total_cents || 0;
    waiterFees += row.waiter_fee_cents || 0;
    if (row.payment_method !== "misto") byPayment[paymentMethod(row.payment_method)] += row.total_cents || 0;
    byChannel[row.channel === "online" ? "online" : "counter"] += row.total_cents || 0;
  }
  const splitPayments = (await env.DB.prepare(`SELECT p.method,p.amount_cents FROM order_payments p JOIN orders o ON o.id=p.order_id WHERE o.status != 'cancelado' AND date(datetime(o.created_at,'-3 hours')) BETWEEN ? AND ?${BRANCHES[branchId]?" AND o.branch_id=?":""}`).bind(...params).all()).results;
  for (const payment of splitPayments) byPayment[paymentMethod(payment.method)] += payment.amount_cents || 0;
  const visits=await visitSummary(env,from,to,branchId);
  return { from, to, total_cents:total, waiter_fee_cents:waiterFees, order_count:rows.length, average_cents:rows.length?Math.round(total/rows.length):0, visit_count:visits.period,visits_by_day:visits.by_day,by_payment:byPayment, by_channel:byChannel };
}

function ticketText(order, items, target, settings) {
  const typeLabel=order.order_type === "delivery" ? "Entrega/Delivery" : order.order_type === "dine_in" ? "Consumir no local" : "Retirada";
  const lines = [settings.store_name || "Bliss Açaiteria", target === "kitchen" ? "*** COZINHA ***" : "*** CAIXA / RECEPÇÃO ***", `Pedido: ${order.id}`, `Origem: ${order.channel === "online" ? "SITE" : "BALCÃO"}`, `Cliente: ${order.customer_name || "Cliente"}`, `Tipo do pedido: ${typeLabel}`];
  if (order.order_type === "dine_in" && order.table_number) lines.push(`Mesa: ${order.table_number}`);
  if (order.phone) lines.push(`Telefone: ${order.phone}`);
  if (order.city) {
    lines.push(`Endereço: ${order.street}, ${order.house_number}`, `Bairro: ${order.neighborhood}`, `Cidade: ${order.city}`, `Referência: ${order.reference_point}`);
    if (order.block) lines.splice(lines.length-3, 0, `Bloco: ${order.block}`);
    if (order.complement) lines.push(`Complemento: ${order.complement}`);
    if (order.maps_url) lines.push(`Google Maps: ${order.maps_url}`);
  } else if (order.address) lines.push(`Endereço: ${order.address}`);
  lines.push("--------------------------------");
  for (const item of items) {
    lines.push(target === "kitchen" ? `${item.quantity}x ${item.product_name}` : `${item.quantity}x ${item.product_name}  ${(item.quantity*item.unit_price_cents/100).toFixed(2).replace(".",",")}`);
    for (const option of parseJson(item.complements_json, [])) lines.push(`  + ${option.quantity || 1}x ${option.name}`);
    if (item.notes) lines.push(`  OBS: ${item.notes}`);
  }
  if (order.notes) lines.push("--------------------------------", `OBS. COZINHA: ${order.notes}`);
  if (target === "reception") {
    lines.push("--------------------------------", `Subtotal: R$ ${((order.subtotal_cents || order.total_cents-order.waiter_fee_cents)/100).toFixed(2).replace(".",",")}`);
    if (order.delivery_fee_cents) lines.push(`Taxa entrega: R$ ${(order.delivery_fee_cents/100).toFixed(2).replace(".",",")}`);
    if (order.waiter_fee_cents) lines.push(`Taxa garçom: R$ ${(order.waiter_fee_cents/100).toFixed(2).replace(".",",")}`);
    lines.push(`TOTAL: R$ ${(order.total_cents/100).toFixed(2).replace(".",",")}`, `Pagamento: ${paymentLabel(order.payment_method)}`);
  }
  lines.push("", new Date(`${order.created_at}Z`).toLocaleString("pt-BR", { timeZone:"America/Sao_Paulo" }), "", "");
  return lines.join("\r\n");
}

async function printBridgeAuthorized(request, env) {
  const settings = await env.DB.prepare(`SELECT print_bridge_key FROM settings WHERE id=1`).first();
  const supplied = request.headers.get("x-print-key") || "";
  return Boolean(settings?.print_bridge_key && supplied.length >= 16 && supplied === settings.print_bridge_key);
}

async function listPrintJobs(env) {
  const settings = await env.DB.prepare(`SELECT * FROM settings WHERE id=1`).first();
  const jobs = (await env.DB.prepare(`SELECT * FROM print_jobs WHERE status IN ('pending','failed') OR (status='processing' AND datetime(updated_at) < datetime('now','-5 minutes')) ORDER BY id LIMIT 10`).all()).results;
  const result = [];
  for (const job of jobs) {
    const order = await env.DB.prepare(`SELECT * FROM orders WHERE id=?`).bind(job.order_id).first();
    const items = (await env.DB.prepare(`SELECT * FROM order_items WHERE order_id=? ORDER BY id`).bind(job.order_id).all()).results;
    if (order) result.push({ id:job.id, order_id:job.order_id, target:job.target, printer_name:job.target === "kitchen" ? settings.kitchen_printer : settings.reception_printer, ticket:ticketText(order,items,job.target,settings) });
  }
  if (jobs.length) await env.DB.batch(jobs.map(job=>env.DB.prepare(`UPDATE print_jobs SET status='processing',updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(job.id)));
  return result;
}

function ps(value) { return String(value || "").replace(/'/g,"''"); }
function bridgeScript(settings, siteOrigin) {
  return [
    "# Conector gratuito de impressão - Açaí Prime",
    "# Comanda térmica em bobina de 100 mm. A impressora corta ao fim de cada pedido.",
    `$Site = '${ps(siteOrigin)}'`,
    `$Chave = '${ps(settings.print_bridge_key)}'`,
    `$ImpressoraCaixa = '${ps(settings.reception_printer)}'`,
    `$ImpressoraCozinha = '${ps(settings.kitchen_printer)}'`,
    `$Headers = @{ 'X-Print-Key' = $Chave }`,
    "Add-Type -AssemblyName System.Drawing",
    "function Get-TicketLines {",
    "  param([string]$Conteudo)",
    "  $Resultado = New-Object System.Collections.Generic.List[string]",
    "  foreach ($TextoOriginal in ($Conteudo -split \"`r?`n\")) {",
    "    $Texto = $TextoOriginal.TrimEnd()",
    "    if ($Texto.Length -eq 0) { $Resultado.Add(\"\"); continue }",
    "    # Fonte ampliada para leitura rápida. Limita cada linha para caber nos 100 mm.",
    "    while ($Texto.Length -gt 36) {",
    "      $Corte = $Texto.LastIndexOf(\" \",36)",
    "      if ($Corte -lt 1) { $Corte = 36 }",
    "      $Resultado.Add($Texto.Substring(0,$Corte).TrimEnd())",
    "      $Texto = $Texto.Substring($Corte).TrimStart()",
    "    }",
    "    $Resultado.Add($Texto)",
    "  }",
    "  return $Resultado.ToArray()",
    "}",
    "function Print-Ticket {",
    "  param([string]$Conteudo,[string]$NomeImpressora)",
    "  $Documento = New-Object System.Drawing.Printing.PrintDocument",
    "  $Documento.PrinterSettings.PrinterName = $NomeImpressora",
    "  if (-not $Documento.PrinterSettings.IsValid) { throw \"Impressora não encontrada: ${NomeImpressora}\" }",
    "  $script:JWPrintLines = @(Get-TicketLines $Conteudo)",
    "  # 394 = 100 mm em centésimos de polegada. A altura cresce com o pedido.",
    "  $AlturaPapel = [Math]::Max(560,[Math]::Min(5200,($script:JWPrintLines.Count * 48) + 240))",
    "  $Papel = New-Object System.Drawing.Printing.PaperSize(\"Bobina 100mm\",394,$AlturaPapel)",
    "  $Documento.DefaultPageSettings.PaperSize = $Papel",
    "  $Documento.DefaultPageSettings.Margins = New-Object System.Drawing.Printing.Margins(10,10,8,8)",
    "  $script:JWPrintPosition = 0",
    "  $Documento.add_PrintPage({",
    "    param($Remetente,$Evento)",
    "    $Normal = New-Object System.Drawing.Font(\"Arial\",16)",
    "    $Destaque = New-Object System.Drawing.Font(\"Arial\",19,[System.Drawing.FontStyle]::Bold)",
    "    $Titulo = New-Object System.Drawing.Font(\"Arial\",21,[System.Drawing.FontStyle]::Bold)",
    "    $Esquerda = New-Object System.Drawing.StringFormat",
    "    $Centro = New-Object System.Drawing.StringFormat; $Centro.Alignment = [System.Drawing.StringAlignment]::Center",
    "    $Y = $Evento.MarginBounds.Top",
    "    while ($script:JWPrintPosition -lt $script:JWPrintLines.Count) {",
    "      $Texto = $script:JWPrintLines[$script:JWPrintPosition]",
    "      $Cabecalho = $script:JWPrintPosition -eq 0 -or $Texto -match \"^(\\*\\*\\*|Pedido:|TOTAL:)\"",
    "      $Fonte = if ($script:JWPrintPosition -eq 0) { $Titulo } elseif ($Cabecalho) { $Destaque } else { $Normal }",
    "      $Formato = if ($script:JWPrintPosition -eq 0 -or $Texto -match \"^\\*\\*\\*\") { $Centro } else { $Esquerda }",
    "      $AlturaLinha = $Fonte.GetHeight($Evento.Graphics) + 3",
    "      if (($Y + $AlturaLinha) -gt $Evento.MarginBounds.Bottom) { break }",
    "      $Evento.Graphics.DrawString($Texto,$Fonte,[System.Drawing.Brushes]::Black,$Evento.MarginBounds.Left,$Y,$Formato)",
    "      $Y += $AlturaLinha; $script:JWPrintPosition++",
    "    }",
    "    $Evento.HasMorePages = $script:JWPrintPosition -lt $script:JWPrintLines.Count",
    "    $Normal.Dispose(); $Destaque.Dispose(); $Titulo.Dispose(); $Esquerda.Dispose(); $Centro.Dispose()",
    "  })",
    "  $Documento.Print()",
    "  $Documento.Dispose()",
    "}",
    "Write-Host 'Conector Açaí Prime iniciado. Pressione Ctrl+C para encerrar.'",
    "while ($true) {",
    "  try {",
    "    $Resposta = Invoke-RestMethod -Uri \"$Site/api/print/jobs\" -Headers $Headers -Method Get",
    "    foreach ($Job in $Resposta.jobs) {",
    "      if ($Job.target -eq 'kitchen' -and $ImpressoraCozinha -eq $ImpressoraCaixa) {",
    "        Invoke-RestMethod -Uri \"$Site/api/print/jobs/$($Job.id)\" -Headers $Headers -Method Patch -ContentType 'application/json' -Body '{\"status\":\"printed\"}' | Out-Null",
    "        Write-Host \"Via da cozinha ignorada: $($Job.order_id)\"",
    "        continue",
    "      }",
    "      $Impressora = if ($Job.target -eq 'kitchen') { $ImpressoraCozinha } else { $ImpressoraCaixa }",
    "      try {",
    "        Print-Ticket -Conteudo $Job.ticket -NomeImpressora $Impressora",
    "        Invoke-RestMethod -Uri \"$Site/api/print/jobs/$($Job.id)\" -Headers $Headers -Method Patch -ContentType 'application/json' -Body '{\"status\":\"printed\"}' | Out-Null",
    "        Write-Host \"Impresso: $($Job.order_id) - $($Job.target)\"",
    "      } catch {",
    "        Invoke-RestMethod -Uri \"$Site/api/print/jobs/$($Job.id)\" -Headers $Headers -Method Patch -ContentType 'application/json' -Body '{\"status\":\"failed\"}' | Out-Null",
    "        Write-Warning \"Falha na impressora ${Impressora}: $($_.Exception.Message)\"",
    "      }",
    "    }",
    "  } catch { Write-Warning \"Sem conexão com o site: $($_.Exception.Message)\" }",
    "  Start-Sleep -Seconds 5",
    "}",
    ""
  ].join("\r\n");
}

async function api(request, env, url) {
  if (url.pathname === "/api/integrations/pedeai/webhook" && request.method === "POST") {
    const settings=await env.DB.prepare(`SELECT pedeai_enabled FROM settings WHERE id=1`).first();
    if (!settings?.pedeai_enabled) return json({ error:"Integração PedeAI em preparação. Conclua a homologação antes de liberar o recebimento." },503);
    return json({ error:"Endpoint PedeAI liberado para homologação; o mapeamento de pedidos será ativado após a especificação técnica aprovada." },501);
  }
  if (url.pathname === "/api/scale/weight" && request.method === "POST") {
    if (!(await scaleAuthorized(request, env))) return json({ error:"Ponte de balança não autorizada." },401);
    const body=await readJson(request),rawKg=Number(String(body?.Liquido??body?.Bruto??"").replace(",",".")), grams=Math.max(0,Math.min(32000,body?.grams!=null?int(body.grams):Math.round(rawKg*1000)));
    await env.DB.prepare(`UPDATE settings SET scale_last_grams=?,scale_captured_at=?,updated_at=CURRENT_TIMESTAMP WHERE id=1`).bind(grams,clean(body?.captured_at,40)||new Date().toISOString()).run();
    return json({ ok:true,grams });
  }
  await seed(env.DB);
  if (url.pathname === "/api/catalog" && request.method === "GET") return publicCatalog(env,validBranch(url.searchParams.get("branch")));
  if (url.pathname === "/api/analytics/visit" && request.method === "POST") {
    const body=await readJson(request),visitorKey=clean(body?.visitor_key,80),visitedOn=brazilCalendar().date,branchId=validBranch(body?.branch_id||url.searchParams.get("branch"));
    if (!/^[a-zA-Z0-9-]{16,80}$/.test(visitorKey)) return json({ error:"Visita inválida." },400);
    const settings=await env.DB.prepare(`SELECT business_hours_json FROM settings WHERE id=1`).first();
    if(!visitWindowOpen(settings))return json({ ok:true,counted:false,reason:"outside_operational_window" });
    await env.DB.prepare(`INSERT OR IGNORE INTO site_visits (visitor_key,visited_on,branch_id) VALUES (?,?,?)`).bind(visitorKey,visitedOn,branchId).run();
    return json({ ok:true,counted:true });
  }
  if (url.pathname === "/api/tables" && request.method === "GET") return json(await tableBoard(env));
  if (url.pathname === "/api/orders" && request.method === "POST") {
    try { const body=await readJson(request); body.branch_id=validBranch(body?.branch_id||url.searchParams.get("branch")); return json(await createOrder(env, body, "online"), 201); }
    catch (error) { return json({ error: error.message || "Não foi possível criar o pedido." }, 400); }
  }
  if (url.pathname === "/api/abandoned-carts" && request.method === "POST") {
    try { return json(await saveAbandonedCart(env,await readJson(request))); }
    catch (error) { return json({ error:error.message||"Não foi possível salvar o carrinho." },400); }
  }
  const publicOrder = url.pathname.match(/^\/api\/orders\/([^/]+)$/);
  if (publicOrder && request.method === "GET") {
    const order = await env.DB.prepare(`SELECT id,status,customer_name,phone,order_type,address,city,neighborhood,street,house_number,block,reference_point,complement,payment_method,payment_status,subtotal_cents,delivery_fee_cents,total_cents,cancel_reason,created_at,updated_at FROM orders WHERE id=?`).bind(publicOrder[1]).first();
    if (!order) return json({ error: "Pedido não encontrado." }, 404);
    const items = (await env.DB.prepare(`SELECT product_name,quantity,unit_price_cents,complements_json,notes FROM order_items WHERE order_id=?`).bind(order.id).all()).results;
    return json({ ...order, items });
  }
  if (url.pathname === "/api/admin/login" && request.method === "POST") {
    const body = await readJson(request);
    const adminPin = env.ADMIN_PIN || env.OWNER_PASSWORD;
    if (!adminPin || !env.SESSION_SECRET) return json({ error: "O acesso do proprietário ainda não foi configurado." }, 503);
    if (clean(body?.pin, 32) !== String(adminPin)) return json({ error: "PIN incorreto." }, 401);
    const expires = String(Date.now() + 12 * 60 * 60 * 1000);
    const token = `${expires}.${await hmac(expires, env.SESSION_SECRET)}`;
    const secure = url.protocol === "https:" ? "; Secure" : "";
    return json({ ok: true }, 200, { "set-cookie": `loja_admin=${encodeURIComponent(token)}; HttpOnly${secure}; SameSite=Strict; Path=/; Max-Age=43200` });
  }
  if (url.pathname === "/api/admin/logout" && request.method === "POST") return json({ ok:true }, 200, { "set-cookie": "loja_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0" });
  if (url.pathname === "/api/cashier/login" && request.method === "POST") {
    const body=await readJson(request),branchId=validBranch(body?.branch_id),expected=branchId==="sao-goncalo"?env.CASHIER_SG_PIN:env.CASHIER_DOM_PIN;
    if(!expected||!env.SESSION_SECRET)return json({error:"O acesso do caixa ainda não foi configurado."},503);
    if(clean(body?.pin,32)!==String(expected))return json({error:"PIN incorreto."},401);
    const expires=String(Date.now()+12*60*60*1000),token=`${branchId}.${expires}.${await hmac(`${branchId}.${expires}.cashier`,env.SESSION_SECRET)}`,secure=url.protocol==="https:"?"; Secure":"";
    return json({ok:true,branch_id:branchId},200,{"set-cookie":`loja_cashier=${encodeURIComponent(token)}; HttpOnly${secure}; SameSite=Strict; Path=/; Max-Age=43200`});
  }
  if (url.pathname === "/api/cashier/logout" && request.method === "POST") return json({ok:true},200,{"set-cookie":"loja_cashier=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0"});
  if (url.pathname === "/api/cashier/orders" && request.method === "GET") {
    const branch=await cashierBranch(request,env), requestedBranch=validBranch(url.searchParams.get("branch"));
    if(!branch)return json({error:"Acesso não autorizado."},401);
    if(!requestedBranch||requestedBranch!==branch)return json({error:"Este acesso de caixa pertence à outra unidade."},403);
    return json({branch_id:branch,orders:await listAdminOrders(env,branch),visits:await visitSummary(env,undefined,undefined,branch)});
  }
  if (url.pathname === "/api/cashier/catalog" && request.method === "GET") {
    const branch=await cashierBranch(request,env), requestedBranch=validBranch(url.searchParams.get("branch"));
    if(!branch)return json({error:"Acesso não autorizado."},401);
    if(!requestedBranch||requestedBranch!==branch)return json({error:"Este acesso de caixa pertence à outra unidade."},403);
    return json(await getCatalog(env,false,branch));
  }
  if (url.pathname === "/api/cashier/employees" && request.method === "GET") {
    const branch=await cashierBranch(request,env);if(!branch)return json({error:"Acesso não autorizado."},401);
    return json({employees:(await env.DB.prepare(`SELECT id,name FROM employees WHERE is_active=1 ORDER BY name`).all()).results||[]});
  }
  if (url.pathname === "/api/cashier/cash-register" && request.method === "GET") {
    const branch=await cashierBranch(request,env);if(!branch)return json({error:"Acesso não autorizado."},401);
    return json(await cashRegisterSummary(env.DB,branch));
  }
  if (url.pathname === "/api/cashier/cash-register" && request.method === "POST") {
    const branch=await cashierBranch(request,env);if(!branch)return json({error:"Acesso não autorizado."},401);
    try{return json(await cashRegisterAction(env,branch,await readJson(request)))}catch(error){return json({error:error.message||"Não foi possível atualizar o caixa."},400)}
  }
  if (url.pathname === "/api/cashier/scale/current" && request.method === "GET") {
    const branch=await cashierBranch(request,env); if(!branch)return json({error:"Acesso não autorizado."},401);
    const row=await env.DB.prepare(`SELECT scale_last_grams,scale_captured_at,self_service_price_per_kg_cents FROM settings WHERE id=1`).first();
    return json({grams:int(row?.scale_last_grams),captured_at:row?.scale_captured_at||"",price_per_kg_cents:int(row?.self_service_price_per_kg_cents,3000)});
  }
  if (url.pathname === "/api/cashier/orders" && request.method === "POST") {
    const branch=await cashierBranch(request,env); if(!branch)return json({error:"Acesso não autorizado."},401);
    try { const body=await readJson(request),productIds=[...new Set((Array.isArray(body?.items)?body.items:[]).map(item=>int(item?.product_id)).filter(Boolean))];
      if(productIds.length){const available=(await env.DB.prepare(`SELECT p.id FROM products p LEFT JOIN product_branches pb ON pb.product_id=p.id AND pb.branch_id=? WHERE p.id IN (${productIds.map(()=>"?").join(",")}) AND p.is_available=1 AND COALESCE(pb.is_available,1)=1`).bind(branch,...productIds).all()).results;if(available.length!==productIds.length)return json({error:"Um ou mais produtos não estão disponíveis nesta unidade."},400);}
      body.branch_id=branch; return json(await createOrder(env,body,"counter"),201); }
    catch(error){return json({error:error.message||"Não foi possível registrar o pedido."},400);}
  }
  const cashierOrderItems=url.pathname.match(/^\/api\/cashier\/orders\/([^/]+)\/items$/);
  if(cashierOrderItems&&request.method==="POST"){
    const branch=await cashierBranch(request,env); if(!branch)return json({error:"Acesso não autorizado."},401);
    try{const body=await readJson(request),productIds=[...new Set((Array.isArray(body?.items)?body.items:[]).map(item=>int(item?.product_id)).filter(Boolean))];
      if(productIds.length){const available=(await env.DB.prepare(`SELECT p.id FROM products p LEFT JOIN product_branches pb ON pb.product_id=p.id AND pb.branch_id=? WHERE p.id IN (${productIds.map(()=>"?").join(",")}) AND p.is_available=1 AND COALESCE(pb.is_available,1)=1`).bind(branch,...productIds).all()).results;if(available.length!==productIds.length)return json({error:"Um ou mais produtos não estão disponíveis nesta unidade."},400);}
      return json(await appendCounterOrderItems(env,cashierOrderItems[1],body,branch));
    }catch(error){return json({error:error.message||"Não foi possível adicionar itens ao pedido."},400);}
  }
  const cashierOrderDetails=url.pathname.match(/^\/api\/cashier\/orders\/([^/]+)\/details$/);
  if(cashierOrderDetails&&request.method==="PATCH"){
    const branch=await cashierBranch(request,env); if(!branch)return json({error:"Acesso não autorizado."},401);
    const order=await env.DB.prepare(`SELECT id FROM orders WHERE id=? AND branch_id=?`).bind(cashierOrderDetails[1],branch).first();
    if(!order)return json({error:"Pedido não encontrado nesta unidade."},404);
    try { const result=await updateOrderDetails(env,cashierOrderDetails[1],await readJson(request)); await auditStatement(env.DB,"cashier_order_details_edited","order",cashierOrderDetails[1],`Caixa alterou os dados do pedido ${cashierOrderDetails[1]}`,{branch_id:branch}).run(); return json(result); }
    catch(error){return json({error:error.message||"Não foi possível editar o pedido."},400);}
  }
  const cashierOrderCancel=url.pathname.match(/^\/api\/cashier\/orders\/([^/]+)\/cancel$/);
  if(cashierOrderCancel&&request.method==="PATCH"){
    const branch=await cashierBranch(request,env); if(!branch)return json({error:"Acesso não autorizado."},401);
    const body=await readJson(request),reason=clean(body?.reason,500);
    if(!reason)return json({error:"Informe o motivo do cancelamento."},400);
    const result=await env.DB.prepare(`UPDATE orders SET status='cancelado',cancel_reason=?,updated_at=CURRENT_TIMESTAMP WHERE id=? AND branch_id=? AND status<>'cancelado'`).bind(reason,cashierOrderCancel[1],branch).run();
    if(!result.meta.changes)return json({error:"Pedido não encontrado nesta unidade ou já cancelado."},404);
    await auditStatement(env.DB,"cashier_order_cancelled","order",cashierOrderCancel[1],`Caixa cancelou pedido ${cashierOrderCancel[1]}`,{branch_id:branch,reason}).run();
    return json({ok:true,status:"cancelado",cancel_reason:reason});
  }
  const cashierOrderDelete=url.pathname.match(/^\/api\/cashier\/orders\/([^/]+)$/);
  if(cashierOrderDelete&&request.method==="DELETE"){
    const branch=await cashierBranch(request,env); if(!branch)return json({error:"Acesso não autorizado."},401);
    const body=await readJson(request),submitted=String(body?.password||""),configured=String(env.DELETE_ORDER_PASSWORD||"");
    const passwordMatches=configured ? submitted===configured : await sha256(submitted)===DELETE_ORDER_PASSWORD_HASH;
    if(!passwordMatches)return json({error:"Senha de exclusão incorreta."},401);
    const order=await env.DB.prepare(`SELECT * FROM orders WHERE id=? AND branch_id=?`).bind(cashierOrderDelete[1],branch).first();
    if(!order)return json({error:"Pedido não encontrado nesta unidade."},404);
    const items=(await env.DB.prepare(`SELECT product_name,quantity,unit_price_cents FROM order_items WHERE order_id=? ORDER BY id`).bind(order.id).all()).results;
    await env.DB.batch([
      auditStatement(env.DB,"cashier_order_deleted","order",order.id,`Caixa excluiu pedido ${order.id}`,{branch_id:branch,customer_name:order.customer_name,total_cents:order.total_cents,status:order.status,created_at:order.created_at,items}),
      env.DB.prepare(`DELETE FROM print_jobs WHERE order_id=?`).bind(order.id),
      env.DB.prepare(`DELETE FROM order_payments WHERE order_id=?`).bind(order.id),
      env.DB.prepare(`DELETE FROM order_items WHERE order_id=?`).bind(order.id),
      env.DB.prepare(`DELETE FROM orders WHERE id=? AND branch_id=?`).bind(order.id,branch)
    ]);
    return json({ok:true,id:order.id});
  }
  const cashierOrderStatus=url.pathname.match(/^\/api\/cashier\/orders\/([^/]+)$/);
  if(cashierOrderStatus&&request.method==="PATCH") {
    const branch=await cashierBranch(request,env),body=await readJson(request),status=clean(body?.status,30);
    if(!branch)return json({error:"Acesso não autorizado."},401);
    if(!ORDER_STATUSES.has(status)||status==="cancelado")return json({error:"Status inválido."},400);
    const previous=await env.DB.prepare(`SELECT status FROM orders WHERE id=? AND branch_id=?`).bind(cashierOrderStatus[1],branch).first();
    if(!previous)return json({error:"Pedido não encontrado nesta unidade."},404);
    await env.DB.batch([env.DB.prepare(`UPDATE orders SET status=?,cancel_reason='',updated_at=CURRENT_TIMESTAMP WHERE id=? AND branch_id=?`).bind(status,cashierOrderStatus[1],branch),auditStatement(env.DB,"cashier_order_status_changed","order",cashierOrderStatus[1],`Caixa alterou pedido ${cashierOrderStatus[1]} para ${statusLabelForAudit(status)}`,{from:previous.status,to:status,branch_id:branch})]);
    return json({ok:true,status});
  }
  const cashierPayment=url.pathname.match(/^\/api\/cashier\/orders\/([^/]+)\/payment$/);
  if(cashierPayment&&request.method==="PATCH") {
    const branch=await cashierBranch(request,env),body=await readJson(request),paymentStatus=clean(body?.payment_status,20)==="aberto"?"aberto":"pago";
    if(!branch)return json({error:"Acesso não autorizado."},401);
    const order=await env.DB.prepare(`SELECT * FROM orders WHERE id=? AND branch_id=?`).bind(cashierPayment[1],branch).first();
    if(!order)return json({error:"Pedido não encontrado nesta unidade."},404);
    const requestedPayments=Array.isArray(body?.payments)?body.payments.slice(0,4).map(payment=>({method:paymentMethod(payment?.method),amount_cents:Math.max(0,int(payment?.amount_cents))})).filter(payment=>payment.amount_cents>0):[];
    const settings=await env.DB.prepare(`SELECT employee_discount_percent FROM settings WHERE id=1`).first();
    const grossTotal=Math.max(0,int(order.subtotal_cents)+int(order.delivery_fee_cents)+int(order.waiter_fee_cents));
    const employee=paymentStatus==="pago"&&bool(body?.employee_discount)?await env.DB.prepare(`SELECT id,name FROM employees WHERE id=? AND is_active=1`).bind(int(body?.employee_id)).first():null;
    const isEmployee=Boolean(employee);
    if(paymentStatus==="pago"&&bool(body?.employee_discount)&&!employee)return json({error:"Selecione o funcionário responsável pela compra."},400);
    const discountMode=clean(body?.discount_mode,20);
    const discountType=isEmployee?"funcionario":(discountMode==="percent"?"percent":(discountMode==="amount"?"amount":""));
    const discountCents=paymentStatus!=="pago"?0:Math.min(grossTotal,isEmployee?Math.round(grossTotal*Math.max(0,Math.min(100,int(settings?.employee_discount_percent)))/100):discountType==="percent"?Math.round(grossTotal*Math.max(0,Math.min(100,Number(body?.discount_percent)||0))/100):discountType==="amount"?Math.max(0,int(body?.discount_amount_cents)):0);
    const total=Math.max(0,grossTotal-discountCents),splitPayment=requestedPayments.length>1,method=splitPayment?"misto":(requestedPayments[0]?.method||(body?.payment_method?paymentMethod(body.payment_method):order.payment_method));
    if(method==="folha"&&!isEmployee)return json({error:"Débito em folha é permitido apenas para funcionário identificado."},400);
    if(paymentStatus==="pago"&&requestedPayments.length&&requestedPayments.reduce((sum,payment)=>sum+payment.amount_cents,0)!==total)return json({error:"As formas de pagamento devem somar exatamente o total da conta."},400);
    const cashDue=method==="dinheiro"?total:requestedPayments.filter(payment=>payment.method==="dinheiro").reduce((sum,payment)=>sum+payment.amount_cents,0);
    const cashReceived=paymentStatus==="pago"&&cashDue>0?(body?.cash_received_cents==null?cashDue:Math.max(0,int(body.cash_received_cents))):null;
    if(paymentStatus==="pago"&&cashDue>0&&cashReceived<cashDue)return json({error:"O valor informado deve ser igual ou maior que a parte em dinheiro."},400);
    const change=paymentStatus==="pago"&&cashDue>0?cashReceived-cashDue:null;
    const statements=[env.DB.prepare(`UPDATE orders SET payment_status=?,payment_method=?,total_cents=?,discount_cents=?,discount_type=?,employee_discount=?,employee_id=?,employee_name=?,payroll_debit=?,cash_received_cents=?,change_for_cents=?,updated_at=CURRENT_TIMESTAMP WHERE id=? AND branch_id=?`).bind(paymentStatus,method,total,discountCents,discountType,isEmployee?1:0,employee?.id||null,employee?.name||"",method==="folha"?1:0,cashReceived,change,cashierPayment[1],branch),env.DB.prepare(`DELETE FROM order_payments WHERE order_id=?`).bind(cashierPayment[1])];
    if(paymentStatus==="pago"&&requestedPayments.length)for(const payment of requestedPayments)statements.push(env.DB.prepare(`INSERT INTO order_payments (order_id,method,amount_cents) VALUES (?,?,?)`).bind(order.id,payment.method,payment.amount_cents));
    statements.push(auditStatement(env.DB,paymentStatus==="pago"?"cashier_payment_received":"cashier_payment_reopened","order",cashierPayment[1],paymentStatus==="pago"?`Caixa recebeu pagamento do pedido ${cashierPayment[1]}`:`Caixa reabriu pagamento do pedido ${cashierPayment[1]}`,{branch_id:branch,payment_method:method,payments:requestedPayments,discount_cents:discountCents,discount_type:discountType,employee_discount:isEmployee,cash_received_cents:cashReceived,change_for_cents:change}));
    await env.DB.batch(statements);
    return json({ok:true,payment_status:paymentStatus,payment_method:method,payments:requestedPayments,total_cents:total,discount_cents:discountCents,discount_type:discountType,cash_received_cents:cashReceived,change_for_cents:change});
  }
  const cashierProduct=url.pathname.match(/^\/api\/cashier\/products\/(\d+)$/);
  if(cashierProduct&&request.method==="PATCH") {
    const branch=await cashierBranch(request,env),body=await readJson(request); if(!branch)return json({error:"Acesso não autorizado."},401);
    if(body?.is_available==null)return json({error:"Informe a disponibilidade do produto."},400);
    const product=await env.DB.prepare(`SELECT id,is_available FROM products WHERE id=?`).bind(cashierProduct[1]).first();
    if(!product)return json({error:"Produto não encontrado."},404);
    if(!product.is_available&&bool(body.is_available))return json({error:"Este produto foi desativado pelo proprietário."},400);
    const available=bool(body.is_available)?1:0;
    await env.DB.batch([env.DB.prepare(`INSERT INTO product_branches (product_id,branch_id,is_available) VALUES (?,?,?) ON CONFLICT(product_id,branch_id) DO UPDATE SET is_available=excluded.is_available`).bind(product.id,branch,available),auditStatement(env.DB,"cashier_product_availability_changed","product",String(product.id),`Caixa alterou disponibilidade do produto ${product.id}`,{branch_id:branch,is_available:Boolean(available)})]);
    await clearCatalogCache();
    return json({ok:true,is_available:Boolean(available)});
  }
  if (url.pathname === "/api/print/jobs" && request.method === "GET") {
    if (!(await printBridgeAuthorized(request,env))) return json({ error:"Chave de impressão inválida." },401);
    return json({ jobs:await listPrintJobs(env) });
  }
  const printJob = url.pathname.match(/^\/api\/print\/jobs\/(\d+)$/);
  if (printJob && request.method === "PATCH") {
    if (!(await printBridgeAuthorized(request,env))) return json({ error:"Chave de impressão inválida." },401);
    const body = await readJson(request); const status = body?.status === "printed" ? "printed" : "failed";
    await env.DB.prepare(`UPDATE print_jobs SET status=?,attempts=attempts+1,printed_at=CASE WHEN ?='printed' THEN CURRENT_TIMESTAMP ELSE printed_at END,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(status,status,printJob[1]).run();
    return json({ ok:true });
  }
  if (url.pathname.startsWith("/api/admin/") && !(await isAdmin(request, env))) return json({ error: "Acesso não autorizado." }, 401);
  if (url.pathname === "/api/admin/employees" && request.method === "GET") return json({employees:(await env.DB.prepare(`SELECT * FROM employees ORDER BY is_active DESC,name`).all()).results||[]});
  if (url.pathname === "/api/admin/employees" && request.method === "POST") {const body=await readJson(request),name=clean(body?.name,100);if(!name)return json({error:"Informe o nome do funcionário."},400);const result=await env.DB.prepare(`INSERT INTO employees (name) VALUES (?)`).bind(name).run();return json({ok:true,id:result.meta.last_row_id})}
  const employeeRoute=url.pathname.match(/^\/api\/admin\/employees\/(\d+)$/);
  if(employeeRoute&&request.method==="PATCH"){const body=await readJson(request),name=clean(body?.name,100);if(!name)return json({error:"Informe o nome do funcionário."},400);await env.DB.prepare(`UPDATE employees SET name=?,is_active=? WHERE id=?`).bind(name,bool(body?.is_active)?1:0,employeeRoute[1]).run();return json({ok:true})}
  if (url.pathname === "/api/admin/employee-purchases" && request.method === "GET") {const from=clean(url.searchParams.get("from"),10)||"2000-01-01",to=clean(url.searchParams.get("to"),10)||"2999-12-31",employeeId=int(url.searchParams.get("employee_id"));const params=[from,to],filter=employeeId?" AND o.employee_id=?":"";if(employeeId)params.push(employeeId);const rows=(await env.DB.prepare(`SELECT o.id,o.created_at,o.employee_id,o.employee_name,o.subtotal_cents,o.discount_cents,o.total_cents,o.payment_method,o.payroll_debit,group_concat(oi.product_name,' • ') AS products FROM orders o LEFT JOIN order_items oi ON oi.order_id=o.id WHERE o.employee_id IS NOT NULL AND o.status!='cancelado' AND date(datetime(o.created_at,'-3 hours')) BETWEEN ? AND ?${filter} GROUP BY o.id ORDER BY datetime(o.created_at) DESC`).bind(...params).all()).results||[];const payroll=rows.filter(row=>bool(row.payroll_debit));return json({rows,summary:{all_count:rows.length,count:payroll.length,gross_cents:payroll.reduce((s,row)=>s+int(row.subtotal_cents),0),discount_cents:payroll.reduce((s,row)=>s+int(row.discount_cents),0),total_cents:payroll.reduce((s,row)=>s+int(row.total_cents),0)}})}
  if (url.pathname === "/api/admin/cash-register" && request.method === "GET") {
    const requested=url.searchParams.get("branch");
    if(requested&&BRANCHES[requested])return json({branches:{[requested]:await cashRegisterSummary(env.DB,requested)}});
    return json({branches:{"sao-goncalo":await cashRegisterSummary(env.DB,"sao-goncalo"),"dom-avelar":await cashRegisterSummary(env.DB,"dom-avelar")}});
  }
  if (url.pathname === "/api/admin/cash-register" && request.method === "POST") {
    const body=await readJson(request),branch=validBranch(body?.branch_id);
    try{return json(await cashRegisterAction(env,branch,body))}catch(error){return json({error:error.message||"Não foi possível atualizar o caixa."},400)}
  }
  if (url.pathname === "/api/admin/integrations/status" && request.method === "GET") {
    const row=await env.DB.prepare(`SELECT scale_last_grams,scale_captured_at,scale_agent_token_hash,scale_agent_token_created_at FROM settings WHERE id=1`).first();
    return json({ scale:{ configured:Boolean(env.SCALE_BRIDGE_KEY||row?.scale_agent_token_hash),grams:int(row?.scale_last_grams),captured_at:row?.scale_captured_at||"",token_created_at:row?.scale_agent_token_created_at||""} });
  }
  if (url.pathname === "/api/admin/integrations/scale-token" && request.method === "POST") {
    const bytes=crypto.getRandomValues(new Uint8Array(24)),token=`bliss-scale-${Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("")}`;
    await env.DB.prepare(`UPDATE settings SET scale_agent_token_hash=?,scale_agent_token_created_at=?,updated_at=CURRENT_TIMESTAMP WHERE id=1`).bind(await sha256(token),new Date().toISOString()).run();
    return json({token,agent_url:`${url.origin}/api/scale/weight`});
  }
  if (url.pathname === "/api/admin/scale/current" && request.method === "GET") {
    const row=await env.DB.prepare(`SELECT scale_last_grams,scale_captured_at FROM settings WHERE id=1`).first();
    return json({ grams:int(row?.scale_last_grams),captured_at:row?.scale_captured_at||"" });
  }
  if (url.pathname === "/api/admin/orders" && request.method === "GET") {
    const [visits,saoGoncalo,domAvelar]=await Promise.all([visitSummary(env),visitSummary(env,undefined,undefined,"sao-goncalo"),visitSummary(env,undefined,undefined,"dom-avelar")]);
    return json({ orders: await listAdminOrders(env), visits:{...visits,branches:{"sao-goncalo":saoGoncalo,"dom-avelar":domAvelar}} });
  }
  if (url.pathname === "/api/admin/order-management" && request.method === "GET") return json(await orderManagementReport(env,url));
  if (url.pathname === "/api/admin/neighborhood-fees" && request.method === "GET") {
    const result=await env.DB.prepare(`SELECT branch_id,city,neighborhood,distance_km,fee_cents FROM branch_neighborhood_fees WHERE branch_id IN ('sao-goncalo','dom-avelar') ORDER BY city,neighborhood,branch_id`).all();
    return json({ fees:result.results||[] });
  }
  if (url.pathname === "/api/admin/neighborhood-fees" && request.method === "PUT") {
    const body=await readJson(request),allowedCities=new Set(["Petrolina","Juazeiro"]),seen=new Set(),fees=[];
    for(const item of Array.isArray(body?.fees)?body.fees:[]){
      const city=clean(item?.city,40),neighborhood=clean(item?.neighborhood,100),key=`${city}\u0000${neighborhood}`;
      if(!allowedCities.has(city)||!neighborhood||seen.has(key))continue;
      seen.add(key);
      fees.push({city,neighborhood,sao:Math.max(0,Math.min(100000,int(item?.sao_goncalo_fee_cents))),dom:Math.max(0,Math.min(100000,int(item?.dom_avelar_fee_cents)))});
    }
    if(!fees.length)return json({ error:"Informe pelo menos um bairro válido." },400);
    const statements=[];
    for(const fee of fees)for(const [branchId,feeCents] of [["sao-goncalo",fee.sao],["dom-avelar",fee.dom]])statements.push(env.DB.prepare(`INSERT INTO branch_neighborhood_fees (branch_id,city,neighborhood,distance_km,fee_cents,updated_at) VALUES (?,?,?,0,?,CURRENT_TIMESTAMP) ON CONFLICT(branch_id,city,neighborhood) DO UPDATE SET distance_km=excluded.distance_km,fee_cents=excluded.fee_cents,updated_at=CURRENT_TIMESTAMP`).bind(branchId,fee.city,fee.neighborhood,feeCents));
    for(let index=0;index<statements.length;index+=80)await env.DB.batch(statements.slice(index,index+80));
    await auditStatement(env.DB,"branch_neighborhood_fees_updated","settings","branches",`Taxas de ${fees.length} bairros atualizadas nas duas unidades`,{neighborhood_count:fees.length}).run();
    await clearCatalogCache();
    return json({ ok:true,count:fees.length });
  }
  if (url.pathname === "/api/admin/audit" && request.method === "GET") return json({ entries:await listAuditLog(env) });
  if (url.pathname === "/api/admin/abandoned-carts" && request.method === "GET") return json({ carts: await listAbandonedCarts(env) });
  const abandonedCartStatus = url.pathname.match(/^\/api\/admin\/abandoned-carts\/([^/]+)$/);
  if (abandonedCartStatus && request.method === "PATCH") {
    const body=await readJson(request),status=clean(body?.status,20);
    if (!new Set(["dismissed","active"]).has(status)) return json({ error:"Situação inválida." },400);
    await env.DB.prepare(`UPDATE abandoned_carts SET status=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(status,abandonedCartStatus[1]).run();
    return json({ ok:true,status });
  }
  if (url.pathname === "/api/admin/store-availability" && request.method === "PATCH") {
    const body = await readJson(request),current=await env.DB.prepare(`SELECT * FROM settings WHERE id=1`).first();
    const hours = Array.isArray(body?.business_hours) ? businessHours(JSON.stringify(body.business_hours)) : businessHours(current.business_hours_json);
    const manualClosed = body?.manual_closed == null ? Boolean(current.manual_closed) : bool(body.manual_closed);
    await env.DB.batch([
      env.DB.prepare(`UPDATE settings SET manual_closed=?,manual_closed_reason=?,business_hours_json=?,closing_time=?,updated_at=CURRENT_TIMESTAMP WHERE id=1`).bind(manualClosed?1:0,clean(body?.manual_closed_reason,160),JSON.stringify(hours),hours.find(row=>row.enabled)?.close||"23:20"),
      auditStatement(env.DB,"availability_changed","settings","1",manualClosed?"Loja fechada manualmente":"Funcionamento da loja atualizado",{ manual_closed:manualClosed,business_hours:hours })
    ]);
    await clearCatalogCache();
    return json({ ok:true,...storeAvailability({...current,manual_closed:manualClosed?1:0,manual_closed_reason:clean(body?.manual_closed_reason,160),business_hours_json:JSON.stringify(hours)}) });
  }
  if (url.pathname === "/api/admin/tables" && request.method === "GET") return json(await tableBoard(env));
  if (url.pathname === "/api/admin/orders" && request.method === "POST") {
    try { return json(await createOrder(env, await readJson(request), "counter"), 201); }
    catch (error) { return json({ error: error.message || "Não foi possível criar o pedido." }, 400); }
  }
  const orderDetails = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)\/details$/);
  if (orderDetails && request.method === "PATCH") {
    try { return json(await updateOrderDetails(env,orderDetails[1],await readJson(request))); }
    catch (error) { return json({ error:error.message || "Não foi possível editar os dados do pedido." },400); }
  }
  const orderItems = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)\/items$/);
  if (orderItems && request.method === "PATCH") {
    try { return json(await updateOrderItems(env,orderItems[1],await readJson(request))); }
    catch (error) { return json({ error:error.message || "Não foi possível editar o pedido." },400); }
  }
  const orderCancel = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)\/cancel$/);
  if (orderCancel && request.method === "PATCH") {
    const body = await readJson(request); const reason = clean(body?.reason,500);
    if (!reason) return json({ error:"Informe o motivo do cancelamento." },400);
    const result = await env.DB.prepare(`UPDATE orders SET status='cancelado',cancel_reason=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(reason,orderCancel[1]).run();
    if (!result.meta.changes) return json({ error:"Pedido não encontrado." },404);
    await auditStatement(env.DB,"order_cancelled","order",orderCancel[1],`Pedido ${orderCancel[1]} cancelado`,{ reason }).run();
    return json({ ok:true,status:"cancelado",cancel_reason:reason });
  }
  const orderDelete = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)$/);
  if (orderDelete && request.method === "DELETE") {
    const body=await readJson(request),submitted=String(body?.password||""),configured=String(env.DELETE_ORDER_PASSWORD||"");
    const passwordMatches=configured ? submitted===configured : await sha256(submitted)===DELETE_ORDER_PASSWORD_HASH;
    if (!passwordMatches) return json({ error:"Senha de exclusão incorreta." },401);
    const order=await env.DB.prepare(`SELECT * FROM orders WHERE id=?`).bind(orderDelete[1]).first();
    if (!order) return json({ error:"Pedido não encontrado." },404);
    const items=(await env.DB.prepare(`SELECT product_name,quantity,unit_price_cents FROM order_items WHERE order_id=? ORDER BY id`).bind(order.id).all()).results;
    await env.DB.batch([
      auditStatement(env.DB,"order_deleted","order",order.id,`Pedido ${order.id} excluído do histórico`,{ customer_name:order.customer_name,total_cents:order.total_cents,status:order.status,created_at:order.created_at,items }),
      env.DB.prepare(`DELETE FROM print_jobs WHERE order_id=?`).bind(order.id),
      env.DB.prepare(`DELETE FROM order_payments WHERE order_id=?`).bind(order.id),
      env.DB.prepare(`DELETE FROM order_items WHERE order_id=?`).bind(order.id),
      env.DB.prepare(`DELETE FROM orders WHERE id=?`).bind(order.id)
    ]);
    return json({ ok:true,id:order.id });
  }
  const orderStatus = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)$/);
  if (orderStatus && request.method === "PATCH") {
    const body = await readJson(request); const status = clean(body?.status, 30);
    if (!ORDER_STATUSES.has(status)) return json({ error: "Status inválido." }, 400);
    if (status === "cancelado") return json({ error:"Use o botão Cancelar e informe o motivo." },400);
    const previous=await env.DB.prepare(`SELECT status FROM orders WHERE id=?`).bind(orderStatus[1]).first();
    if (!previous) return json({ error:"Pedido não encontrado." },404);
    await env.DB.batch([
      env.DB.prepare(`UPDATE orders SET status=?, cancel_reason='', updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(status,orderStatus[1]),
      auditStatement(env.DB,"order_status_changed","order",orderStatus[1],`Pedido ${orderStatus[1]} alterado para ${statusLabelForAudit(status)}`,{ from:previous.status,to:status })
    ]);
    return json({ ok:true, status });
  }
  const orderReprint = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)\/reprint$/);
  if (orderReprint && request.method === "POST") {
    const order = await env.DB.prepare(`SELECT id FROM orders WHERE id=?`).bind(orderReprint[1]).first();
    if (!order) return json({ error:"Pedido não encontrado." },404);
    const settings = await env.DB.prepare(`SELECT auto_print_enabled,reception_printer,kitchen_printer,print_copies FROM settings WHERE id=1`).first();
    if (!settings.auto_print_enabled) return json({ error:"Ative a impressão automática nas configurações antes de reimprimir." },400);
    if (!settings.reception_printer && !settings.kitchen_printer) return json({ error:"Informe pelo menos uma impressora nas configurações." },400);
    const copies=Math.max(1,Math.min(5,int(settings.print_copies,1))),statements=[];
    if (settings.reception_printer) for (let copy=0;copy<copies;copy++) statements.push(env.DB.prepare(`INSERT INTO print_jobs (order_id,target,status) VALUES (?,'reception','pending')`).bind(order.id));
    if (settings.kitchen_printer && settings.kitchen_printer !== settings.reception_printer) for (let copy=0;copy<copies;copy++) statements.push(env.DB.prepare(`INSERT INTO print_jobs (order_id,target,status) VALUES (?,'kitchen','pending')`).bind(order.id));
    statements.push(auditStatement(env.DB,"order_reprinted","order",order.id,`Comanda do pedido ${order.id} enviada novamente`,{ copies,targets:[settings.reception_printer?"reception":null,settings.kitchen_printer&&settings.kitchen_printer!==settings.reception_printer?"kitchen":null].filter(Boolean) }));
    await env.DB.batch(statements);
    return json({ ok:true });
  }
  const orderPayment = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)\/payment$/);
  if (orderPayment && request.method === "PATCH") {
    const body = await readJson(request); const order = await env.DB.prepare(`SELECT * FROM orders WHERE id=?`).bind(orderPayment[1]).first();
    if (!order) return json({ error:"Pedido não encontrado." },404);
    const paymentStatus = clean(body?.payment_status,20) === "aberto" ? "aberto" : "pago";
    const settings = await env.DB.prepare(`SELECT waiter_fee_enabled,waiter_fee_percent,employee_discount_percent FROM settings WHERE id=1`).first();
    const applyWaiterFee = paymentStatus === "pago" && order.channel === "counter" && bool(body?.apply_waiter_fee) && settings.waiter_fee_enabled;
    const waiterFee = applyWaiterFee ? Math.round((order.subtotal_cents || 0) * settings.waiter_fee_percent / 100) : 0;
    const grossTotal = (order.subtotal_cents || 0) + (order.delivery_fee_cents || 0) + waiterFee;
    const isEmployee=paymentStatus==="pago"&&bool(body?.employee_discount),discountMode=clean(body?.discount_mode,20),discountType=isEmployee?"funcionario":(discountMode==="percent"?"percent":(discountMode==="amount"?"amount":""));
    const discountCents=paymentStatus!=="pago"?0:Math.min(grossTotal,isEmployee?Math.round(grossTotal*Math.max(0,Math.min(100,int(settings.employee_discount_percent)))/100):discountType==="percent"?Math.round(grossTotal*Math.max(0,Math.min(100,Number(body?.discount_percent)||0))/100):discountType==="amount"?Math.max(0,int(body?.discount_amount_cents)):0);
    const total = Math.max(0,grossTotal-discountCents);
    const requestedPayments = Array.isArray(body?.payments) ? body.payments.slice(0,4).map(payment=>({ method:paymentMethod(payment?.method), amount_cents:Math.max(0,int(payment?.amount_cents)) })).filter(payment=>payment.amount_cents>0) : [];
    const splitPayment = requestedPayments.length > 1;
    const method = splitPayment ? "misto" : (requestedPayments[0]?.method || (body?.payment_method ? paymentMethod(body.payment_method) : order.payment_method));
    const cashDue = method === "dinheiro" ? total : requestedPayments.filter(payment=>payment.method==="dinheiro").reduce((sum,payment)=>sum+payment.amount_cents,0);
    const cashReceived = paymentStatus === "pago" && cashDue > 0 ? (body?.cash_received_cents == null ? cashDue : Math.max(0,int(body.cash_received_cents))) : null;
    if (paymentStatus === "pago" && requestedPayments.length && requestedPayments.reduce((sum,payment)=>sum+payment.amount_cents,0) !== total) return json({ error:"As formas de pagamento devem somar exatamente o total da conta." },400);
    if (paymentStatus === "pago" && cashDue > 0 && cashReceived < cashDue) return json({ error:"O valor informado deve ser igual ou maior que a parte em dinheiro." },400);
    const change = paymentStatus === "pago" && cashDue > 0 ? cashReceived - cashDue : null;
    const statements = [env.DB.prepare(`UPDATE orders SET payment_status=?,payment_method=?,waiter_fee_cents=?,total_cents=?,discount_cents=?,discount_type=?,employee_discount=?,cash_received_cents=?,change_for_cents=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(paymentStatus,method,waiterFee,total,discountCents,discountType,isEmployee?1:0,cashReceived,change,orderPayment[1]),env.DB.prepare(`DELETE FROM order_payments WHERE order_id=?`).bind(orderPayment[1])];
    if (paymentStatus === "pago" && requestedPayments.length) for (const payment of requestedPayments) statements.push(env.DB.prepare(`INSERT INTO order_payments (order_id,method,amount_cents) VALUES (?,?,?)`).bind(orderPayment[1],payment.method,payment.amount_cents));
    await env.DB.batch(statements);
    await auditStatement(env.DB,paymentStatus==="pago"?"payment_received":"payment_reopened","order",order.id,paymentStatus==="pago"?`Pagamento do pedido ${order.id} recebido`:`Pagamento do pedido ${order.id} deixado em aberto`,{ payment_method:method,total_cents:total,waiter_fee_cents:waiterFee,discount_cents:discountCents,discount_type:discountType,employee_discount:isEmployee,payments:requestedPayments }).run();
    return json({ ok:true,payment_status:paymentStatus,payment_method:method,waiter_fee_cents:waiterFee,total_cents:total,discount_cents:discountCents,discount_type:discountType,cash_received_cents:cashReceived,change_for_cents:change,payments:requestedPayments });
  }
  if (url.pathname === "/api/admin/products" && request.method === "GET") return json(await getCatalog(env,true));
  if (url.pathname === "/api/admin/products" && request.method === "POST") {
    try {
      const input = await productInput(request,env);
      if (!input.name || !input.category || input.price_cents <= 0) return json({ error:"Informe nome, categoria e preço válido." },400);
      if (input.is_promo && (!input.old_price_cents || input.old_price_cents <= input.price_cents)) return json({ error:"O valor original deve ser maior que o valor da promoção." },400);
      const next = await env.DB.prepare(`SELECT COALESCE(MAX(sort_order),0)+1 AS value FROM products`).first();
      const result = await env.DB.prepare(`INSERT INTO products (category,name,description,price_cents,old_price_cents,image_url,is_featured,is_promo,is_available,sort_order,complements_json) VALUES (?,?,?,?,?,?,?,?,?,?,?)`).bind(input.category,input.name,input.description,input.price_cents,input.old_price_cents,input.image_url,input.is_featured,input.is_promo,input.is_available,next.value,input.complements_json).run();
      await auditStatement(env.DB,"product_created","product",String(result.meta.last_row_id),`Produto ${input.name} cadastrado`,{ category:input.category,price_cents:input.price_cents }).run();
      await clearCatalogCache();
      return json({ ok:true,id:result.meta.last_row_id },201);
    } catch (error) { return json({ error:error.message || "Não foi possível cadastrar o produto." },400); }
  }
  const product = url.pathname.match(/^\/api\/admin\/products\/(\d+)$/);
  if (product && request.method === "PATCH") {
    const current = await env.DB.prepare(`SELECT * FROM products WHERE id=?`).bind(product[1]).first();
    if (!current) return json({ error: "Produto não encontrado." }, 404);
    try {
      const input = await productInput(request,env,current);
      if (!input.name || !input.category || input.price_cents <= 0) return json({ error:"Informe nome, categoria e preço válido." },400);
      if (input.is_promo && (!input.old_price_cents || input.old_price_cents <= input.price_cents)) return json({ error:"O valor original deve ser maior que o valor da promoção." },400);
      await env.DB.prepare(`UPDATE products SET category=?,name=?,description=?,price_cents=?,old_price_cents=?,image_url=?,is_featured=?,is_promo=?,is_available=?,complements_json=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(input.category,input.name,input.description,input.price_cents,input.old_price_cents,input.image_url,input.is_featured,input.is_promo,input.is_available,input.complements_json,product[1]).run();
      await auditStatement(env.DB,"product_updated","product",product[1],`Produto ${input.name} atualizado`,{ category:input.category,price_cents:input.price_cents,is_available:Boolean(input.is_available) }).run();
      await clearCatalogCache();
    } catch (error) { return json({ error:error.message || "Não foi possível editar o produto." },400); }
    return json({ ok:true });
  }
  if (url.pathname === "/api/admin/categories/order" && request.method === "PATCH") {
    const body = await readJson(request);
    const existing = (await env.DB.prepare(`SELECT DISTINCT category FROM products`).all()).results.map(row => row.category);
    const requested = (Array.isArray(body?.categories) ? body.categories : []).map(value => clean(value,80)).filter((value,index,list) => value && existing.includes(value) && list.indexOf(value)===index);
    const categories = [...requested,...existing.filter(value => !requested.includes(value))];
    await env.DB.prepare(`UPDATE settings SET category_order_json=?,updated_at=CURRENT_TIMESTAMP WHERE id=1`).bind(JSON.stringify(categories)).run();
    await clearCatalogCache();
    return json({ ok:true,categories });
  }
  if (url.pathname === "/api/admin/revenue" && request.method === "GET") {
    const branchId=url.searchParams.get("branch")||"";
    return json(await revenueReport(env,url,BRANCHES[branchId]?branchId:""));
  }
  if (url.pathname === "/api/admin/print-status" && request.method === "GET") {
    const settings = await env.DB.prepare(`SELECT auto_print_enabled,reception_printer,kitchen_printer,print_bridge_key,print_copies FROM settings WHERE id=1`).first();
    const counts = await env.DB.prepare(`SELECT SUM(CASE WHEN status IN ('pending','failed','processing') THEN 1 ELSE 0 END) AS pending,SUM(CASE WHEN status='printed' THEN 1 ELSE 0 END) AS printed FROM print_jobs`).first();
    return json({ enabled:Boolean(settings.auto_print_enabled),configured:Boolean(settings.print_bridge_key&&(settings.reception_printer||settings.kitchen_printer)),reception_printer:settings.reception_printer,kitchen_printer:settings.kitchen_printer,print_copies:Math.max(1,int(settings.print_copies,1)),pending:counts.pending||0,printed:counts.printed||0 });
  }
  if (url.pathname === "/api/admin/print-bridge.ps1" && request.method === "GET") {
    const settings = await env.DB.prepare(`SELECT * FROM settings WHERE id=1`).first();
    if (!settings.print_bridge_key || (!settings.reception_printer && !settings.kitchen_printer)) return json({ error:"Configure a chave e pelo menos uma impressora antes de baixar." },400);
    return new Response(bridgeScript(settings,url.origin),{headers:{"content-type":"text/plain; charset=utf-8","content-disposition":"attachment; filename=conector-impressao-acaiteria.ps1","cache-control":"no-store"}});
  }
  if (url.pathname === "/api/admin/settings" && request.method === "PATCH") {
    const body = await readJson(request); const current = await env.DB.prepare(`SELECT * FROM settings WHERE id=1`).first();
    const bridgeKey = body.print_bridge_key == null || clean(body.print_bridge_key,100)==="" ? current.print_bridge_key : clean(body.print_bridge_key,100);
    const pedeaiToken = body.pedeai_api_token == null || clean(body.pedeai_api_token,500)==="" ? current.pedeai_api_token : clean(body.pedeai_api_token,500);
    const pedeaiWebhookSecret = body.pedeai_webhook_secret == null || clean(body.pedeai_webhook_secret,500)==="" ? current.pedeai_webhook_secret : clean(body.pedeai_webhook_secret,500);
    if (bridgeKey && bridgeKey.length < 16) return json({ error:"A chave de impressão deve ter pelo menos 16 caracteres." },400);
    const neighborhoodFees = deliveryRules(body.delivery_neighborhood_fees == null ? current.delivery_neighborhood_fees_json : body.delivery_neighborhood_fees);
    const printCopies=Math.max(1,Math.min(5,int(body.print_copies,current.print_copies||1))),featuredProductLimit=Math.max(1,Math.min(30,int(body.featured_product_limit,current.featured_product_limit||15))),selfServicePrice=Math.max(1,Math.min(100000,int(body.self_service_price_per_kg_cents,current.self_service_price_per_kg_cents||3000))),employeeDiscountPercent=Math.max(0,Math.min(100,Number(body.employee_discount_percent??current.employee_discount_percent)||0));
    await env.DB.batch([
      env.DB.prepare(`UPDATE settings SET is_open=?,closing_time=?,minimum_order_cents=?,delivery_fee_cents=0,delivery_eta=?,pickup_eta=?,phone=?,address=?,table_count=?,featured_product_limit=?,self_service_price_per_kg_cents=?,waiter_fee_enabled=?,waiter_fee_percent=?,employee_discount_percent=?,delivery_neighborhood_fees_json=?,delivery_surcharge_enabled=?,delivery_surcharge_percent=?,delivery_surcharge_label=?,auto_print_enabled=?,reception_printer=?,kitchen_printer=?,print_bridge_key=?,print_copies=?,pedeai_enabled=?,pedeai_environment=?,pedeai_store_id=?,pedeai_client_id=?,pedeai_api_base_url=?,pedeai_api_token=?,pedeai_webhook_secret=?,updated_at=CURRENT_TIMESTAMP WHERE id=1`).bind(
        body.is_open == null ? current.is_open : (bool(body.is_open) ? 1 : 0), clean(body.closing_time,10)||current.closing_time, Math.max(0,int(body.minimum_order_cents,current.minimum_order_cents)), clean(body.delivery_eta,30)||current.delivery_eta, clean(body.pickup_eta,30)||current.pickup_eta, clean(body.phone,30)||current.phone, clean(body.address,240)||current.address, Math.max(0,Math.min(200,int(body.table_count,current.table_count))),featuredProductLimit,selfServicePrice, body.waiter_fee_enabled == null ? current.waiter_fee_enabled : (bool(body.waiter_fee_enabled)?1:0), Math.max(0,Math.min(30,int(body.waiter_fee_percent,current.waiter_fee_percent))),employeeDiscountPercent, JSON.stringify(neighborhoodFees), body.delivery_surcharge_enabled == null ? current.delivery_surcharge_enabled : (bool(body.delivery_surcharge_enabled)?1:0), Math.max(0,Math.min(100,int(body.delivery_surcharge_percent,current.delivery_surcharge_percent))), clean(body.delivery_surcharge_label,80)||current.delivery_surcharge_label||"Acréscimo em dias chuvosos", body.auto_print_enabled == null ? current.auto_print_enabled : (bool(body.auto_print_enabled)?1:0), body.reception_printer == null ? current.reception_printer : clean(body.reception_printer,120), body.kitchen_printer == null ? current.kitchen_printer : clean(body.kitchen_printer,120), bridgeKey,printCopies,body.pedeai_enabled == null ? current.pedeai_enabled : (bool(body.pedeai_enabled)?1:0),["sandbox","production"].includes(body.pedeai_environment)?body.pedeai_environment:(current.pedeai_environment||"sandbox"),clean(body.pedeai_store_id == null ? current.pedeai_store_id : body.pedeai_store_id,160),clean(body.pedeai_client_id == null ? current.pedeai_client_id : body.pedeai_client_id,160),clean(body.pedeai_api_base_url == null ? current.pedeai_api_base_url : body.pedeai_api_base_url,300),pedeaiToken,pedeaiWebhookSecret
      ),
      auditStatement(env.DB,"settings_updated","settings","1","Configurações do sistema atualizadas",{ table_count:Math.max(0,Math.min(200,int(body.table_count,current.table_count))),featured_product_limit:featuredProductLimit,print_copies:printCopies,delivery_fee_rules:neighborhoodFees.length })
    ]);
    await clearCatalogCache();
    return json({ ok:true });
  }
  return json({ error: "Rota não encontrada." }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith("/api/")) return await api(request, env, url);
      if (url.pathname === "/app.css") return text(APP_CSS, "text/css", "no-cache");
      if (url.pathname === "/app.js") return text(APP_JS, "text/javascript", "no-cache");
      if (url.pathname === "/image") return await proxyImage(url);
      if (url.pathname === "/brand-placeholder.svg") return brandPlaceholder();
      if (url.pathname.startsWith("/media/")) return media(url.pathname.slice(7));
      if (url.pathname.startsWith("/uploads/") && env.MEDIA) {
        const object = await env.MEDIA.get(decodeURIComponent(url.pathname.slice(9)));
        if (!object) return new Response("Imagem não encontrada",{status:404});
        const headers = new Headers(); object.writeHttpMetadata(headers); headers.set("etag",object.httpEtag); headers.set("cache-control","public, max-age=31536000, immutable");
        return new Response(object.body,{headers});
      }
      if (["/","/painel","/pedido","/mesas","/dom-avelar","/sao-goncalo","/caixa/dom-avelar","/caixa/sao-goncalo"].includes(url.pathname)) return text(APP_HTML, "text/html", "no-cache");
      return new Response("Não encontrado", { status:404 });
    } catch (error) {
      console.error(error);
      return url.pathname.startsWith("/api/") ? json({ error:"O serviço está temporariamente indisponível." },500) : new Response("Serviço indisponível",{status:500});
    }
  }
};

