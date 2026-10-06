import { adminPage, customerPage } from "./pages.js";
import { catalogCorrections, categories, defaultSettings, initialProducts } from "./data.js";

const encoder = new TextEncoder();
const jsonHeaders = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };

function reply(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...jsonHeaders, ...headers } });
}

function error(message, status = 400) {
  return reply({ error: message }, status);
}

async function body(request) {
  try { return await request.json(); } catch { return {}; }
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function sessionCookie(secret) {
  const expires = String(Date.now() + 12 * 60 * 60 * 1000);
  const signature = await hmac(expires, secret);
  return `jw_admin=${expires}.${signature}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`;
}

async function authenticated(request, env) {
  if (!env.SESSION_SECRET) return false;
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)jw_admin=([^;]+)/);
  if (!match) return false;
  const [expires, signature] = match[1].split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, await hmac(expires, env.SESSION_SECRET));
}

async function ensureSchema(db) {
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL, category TEXT NOT NULL, price REAL NOT NULL, image_url TEXT NOT NULL, featured INTEGER DEFAULT 0 NOT NULL, active INTEGER DEFAULT 1 NOT NULL, sort_order INTEGER DEFAULT 0 NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, code TEXT NOT NULL, channel TEXT NOT NULL, customer_name TEXT NOT NULL, phone TEXT DEFAULT '' NOT NULL, fulfillment TEXT NOT NULL, address TEXT DEFAULT '' NOT NULL, location_url TEXT DEFAULT '' NOT NULL, payment_method TEXT NOT NULL, notes TEXT DEFAULT '' NOT NULL, status TEXT DEFAULT 'novo' NOT NULL, subtotal REAL NOT NULL, delivery_fee REAL DEFAULT 0 NOT NULL, total REAL NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS orders_code_unique ON orders (code)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders (status, created_at)"),
    db.prepare("CREATE TABLE IF NOT EXISTS order_items (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, order_id INTEGER NOT NULL, product_id INTEGER, product_name TEXT NOT NULL, unit_price REAL NOT NULL, quantity INTEGER NOT NULL, notes TEXT DEFAULT '' NOT NULL, line_total REAL NOT NULL, FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE NO ACTION ON DELETE NO ACTION)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id)"),
    db.prepare("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL, updated_at TEXT NOT NULL)"),
  ]);
  const orderColumns = (await db.prepare("PRAGMA table_info(orders)").all()).results || [];
  if (!orderColumns.some((column) => column.name === "payment_status")) {
    await db.prepare("ALTER TABLE orders ADD COLUMN payment_status TEXT DEFAULT 'pago' NOT NULL").run();
  }
  if (!orderColumns.some((column) => column.name === "location_url")) {
    await db.prepare("ALTER TABLE orders ADD COLUMN location_url TEXT DEFAULT '' NOT NULL").run();
  }
}

async function seed(db) {
  await ensureSchema(db);
  const result = await db.prepare("SELECT COUNT(*) AS count FROM products").first();
  if (Number(result?.count || 0) === 0) {
    const now = new Date().toISOString();
    const statements = initialProducts.map((p, index) => db.prepare(
      "INSERT INTO products (name, description, category, price, image_url, featured, active, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)"
    ).bind(p[0], p[1], p[2], p[3], p[4], p[5], index, now, now));
    await db.batch(statements);
  }
  const correctedAt = new Date().toISOString();
  await db.batch(catalogCorrections.map(([name, description, imageUrl]) => db.prepare(
    "UPDATE products SET description = ?, image_url = ?, updated_at = ? WHERE name = ? AND image_url <> ?"
  ).bind(description, imageUrl, correctedAt, name, imageUrl)));
  const settingsResult = await db.prepare("SELECT COUNT(*) AS count FROM settings").first();
  if (Number(settingsResult?.count || 0) === 0) {
    const now = new Date().toISOString();
    await db.batch(Object.entries(defaultSettings).map(([key, value]) => db.prepare(
      "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?)"
    ).bind(key, value, now)));
  }
}

async function getSettings(db) {
  const rows = await db.prepare("SELECT key, value FROM settings").all();
  return Object.fromEntries((rows.results || []).map((r) => [r.key, r.value]));
}

async function getProducts(db, includeInactive = false) {
  const sql = `SELECT id, name, description, category, price, image_url, featured, active, sort_order FROM products ${includeInactive ? "" : "WHERE active = 1"} ORDER BY sort_order, id`;
  return (await db.prepare(sql).all()).results || [];
}

function normalizeItems(items) {
  if (!Array.isArray(items) || !items.length || items.length > 50) return null;
  const normalized = items.map((item) => ({
    productId: Number(item.productId),
    quantity: Math.max(1, Math.min(99, Math.floor(Number(item.quantity) || 1))),
    notes: String(item.notes || "").slice(0, 200),
  })).filter((item) => Number.isInteger(item.productId) && item.productId > 0);
  return normalized.length ? normalized : null;
}

async function createOrder(db, payload, channel, settings) {
  const requested = normalizeItems(payload.items);
  if (!requested) throw new Error("Adicione pelo menos um produto ao pedido.");
  const ids = [...new Set(requested.map((item) => item.productId))];
  const placeholders = ids.map(() => "?").join(",");
  const rows = (await db.prepare(`SELECT id, name, price, active FROM products WHERE id IN (${placeholders})`).bind(...ids).all()).results || [];
  const map = new Map(rows.map((row) => [Number(row.id), row]));
  const items = requested.map((item) => {
    const product = map.get(item.productId);
    if (!product || !product.active) throw new Error("Um produto do pedido não está mais disponível.");
    return { ...item, name: product.name, price: Number(product.price), lineTotal: Number(product.price) * item.quantity };
  });
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const fulfillment = channel === "balcao" ? "presencial" : (payload.fulfillment === "pickup" ? "pickup" : "delivery");
  const address = String(payload.address || "").trim().slice(0, 180);
  const locationUrl = /^https:\/\/www\.google\.com\/maps\?q=-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$/.test(String(payload.locationUrl || "")) ? String(payload.locationUrl) : "";
  if (channel === "online" && subtotal < Number(settings.minimum_order || 0)) throw new Error(`O pedido mínimo é R$ ${Number(settings.minimum_order || 0).toFixed(2).replace(".", ",")}.`);
  if (channel === "online" && settings.store_open !== "1") throw new Error("A loja está fechada no momento.");
  if (fulfillment === "delivery" && !address && !locationUrl) throw new Error("Informe o endereço ou compartilhe sua localização.");
  const fee = fulfillment === "delivery" ? Number(settings.delivery_fee || 0) : 0;
  const total = subtotal + fee;
  const now = new Date().toISOString();
  const temporaryCode = `TMP-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const paymentStatus = channel === "online" ? "a_receber" : (payload.paymentStatus === "aberto" ? "aberto" : "pago");
  const insert = await db.prepare("INSERT INTO orders (code, channel, customer_name, phone, fulfillment, address, location_url, payment_method, payment_status, notes, status, subtotal, delivery_fee, total, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'novo', ?, ?, ?, ?, ?)")
    .bind(temporaryCode, channel, String(payload.customerName || (channel === "balcao" ? "Balcão" : "")).trim().slice(0, 80), String(payload.phone || "").slice(0, 20), fulfillment, address, locationUrl, String(payload.paymentMethod || "Não informado").slice(0, 40), paymentStatus, String(payload.notes || "").slice(0, 300), subtotal, fee, total, now, now).run();
  const orderId = Number(insert.meta?.last_row_id);
  const code = `#${String(orderId).padStart(4, "0")}`;
  await db.batch([
    db.prepare("UPDATE orders SET code = ? WHERE id = ?").bind(code, orderId),
    ...items.map((item) => db.prepare("INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, notes, line_total) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(orderId, item.productId, item.name, item.price, item.quantity, item.notes, item.lineTotal)),
  ]);
  return { id: orderId, code, subtotal, deliveryFee: fee, total, paymentStatus };
}

async function updateOrder(db, orderId, payload, settings) {
  const current = await db.prepare("SELECT * FROM orders WHERE id = ?").bind(orderId).first();
  if (!current) throw new Error("Pedido não encontrado.");
  const requested = normalizeItems(payload.items);
  if (!requested) throw new Error("Adicione pelo menos um produto ao pedido.");
  const ids = [...new Set(requested.map((item) => item.productId))];
  const rows = (await db.prepare(`SELECT id, name, price, active FROM products WHERE id IN (${ids.map(() => "?").join(",")})`).bind(...ids).all()).results || [];
  const productMap = new Map(rows.map((row) => [Number(row.id), row]));
  const items = requested.map((item) => {
    const product = productMap.get(item.productId);
    if (!product || !product.active) throw new Error("Um produto do pedido não está mais disponível.");
    return { ...item, name: product.name, price: Number(product.price), lineTotal: Number(product.price) * item.quantity };
  });
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const fee = current.fulfillment === "delivery" ? Number(settings.delivery_fee || current.delivery_fee || 0) : 0;
  const total = subtotal + fee;
  const paymentStatus = ["pago", "aberto", "a_receber"].includes(payload.paymentStatus) ? payload.paymentStatus : current.payment_status;
  const now = new Date().toISOString();
  await db.batch([
    db.prepare("UPDATE orders SET customer_name = ?, payment_method = ?, payment_status = ?, notes = ?, subtotal = ?, delivery_fee = ?, total = ?, updated_at = ? WHERE id = ?")
      .bind(String(payload.customerName || current.customer_name).trim().slice(0, 80), String(payload.paymentMethod || current.payment_method).slice(0, 40), paymentStatus, String(payload.notes || "").slice(0, 300), subtotal, fee, total, now, orderId),
    db.prepare("DELETE FROM order_items WHERE order_id = ?").bind(orderId),
    ...items.map((item) => db.prepare("INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, notes, line_total) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(orderId, item.productId, item.name, item.price, item.quantity, item.notes, item.lineTotal)),
  ]);
  return { id: orderId, code: current.code, subtotal, deliveryFee: fee, total, paymentStatus };
}

async function getOrders(db) {
  const orders = (await db.prepare("SELECT * FROM orders ORDER BY datetime(created_at) DESC LIMIT 150").all()).results || [];
  if (!orders.length) return [];
  const ids = orders.map((o) => o.id);
  const items = (await db.prepare(`SELECT * FROM order_items WHERE order_id IN (${ids.map(() => "?").join(",")}) ORDER BY id`).bind(...ids).all()).results || [];
  return orders.map((order) => ({ ...order, items: items.filter((item) => Number(item.order_id) === Number(order.id)) }));
}

async function adminApi(request, env, path) {
  if (path === "/api/admin/login" && request.method === "POST") {
    const data = await body(request);
    if (!env.OWNER_PASSWORD || !env.SESSION_SECRET) return error("Acesso administrativo ainda não configurado.", 503);
    if (!safeEqual(String(data.password || ""), String(env.OWNER_PASSWORD))) return error("Senha incorreta.", 401);
    return reply({ ok: true }, 200, { "set-cookie": await sessionCookie(env.SESSION_SECRET) });
  }
  if (path === "/api/admin/logout" && request.method === "POST") return reply({ ok: true }, 200, { "set-cookie": "jw_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0" });
  if (!(await authenticated(request, env))) return error("Acesso não autorizado.", 401);
  if (path === "/api/admin/session") return reply({ ok: true });
  await seed(env.DB);
  if (path === "/api/admin/dashboard" && request.method === "GET") {
    const [products, settings, orders] = await Promise.all([getProducts(env.DB, true), getSettings(env.DB), getOrders(env.DB)]);
    const today = new Date().toISOString().slice(0, 10);
    const todays = orders.filter((o) => String(o.created_at).slice(0, 10) === today && o.status !== "cancelado");
    const revenue = todays.reduce((sum, o) => sum + Number(o.total), 0);
    return reply({ products, categories, settings, orders, stats: { ordersToday: todays.length, preparing: orders.filter((o) => o.status === "preparo").length, revenueToday: revenue, averageTicket: todays.length ? revenue / todays.length : 0 } });
  }
  if (path === "/api/admin/orders" && request.method === "POST") {
    const settings = await getSettings(env.DB);
    return reply(await createOrder(env.DB, await body(request), "balcao", settings), 201);
  }
  const orderMatch = path.match(/^\/api\/admin\/orders\/(\d+)$/);
  if (orderMatch && request.method === "PUT") {
    const settings = await getSettings(env.DB);
    return reply(await updateOrder(env.DB, Number(orderMatch[1]), await body(request), settings));
  }
  const statusMatch = path.match(/^\/api\/admin\/orders\/(\d+)\/status$/);
  if (statusMatch && request.method === "PUT") {
    const data = await body(request);
    if (!["novo", "preparo", "pronto", "concluido", "cancelado"].includes(data.status)) return error("Status inválido.");
    await env.DB.prepare("UPDATE orders SET status = ?, updated_at = ? WHERE id = ?").bind(data.status, new Date().toISOString(), Number(statusMatch[1])).run();
    return reply({ ok: true });
  }
  if (path === "/api/admin/products" && request.method === "POST") {
    const data = await body(request); const now = new Date().toISOString();
    if (!data.name || !data.category || !(Number(data.price) >= 0)) return error("Preencha nome, categoria e preço.");
    const result = await env.DB.prepare("INSERT INTO products (name, description, category, price, image_url, featured, active, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, 999, ?, ?)")
      .bind(String(data.name).slice(0, 100), String(data.description || "").slice(0, 500), String(data.category).slice(0, 80), Number(data.price), String(data.imageUrl || "").slice(0, 500), data.featured ? 1 : 0, data.active ? 1 : 0, now, now).run();
    return reply({ id: result.meta?.last_row_id }, 201);
  }
  const productMatch = path.match(/^\/api\/admin\/products\/(\d+)$/);
  if (productMatch && request.method === "PUT") {
    const data = await body(request);
    if (!data.name || !data.category || !(Number(data.price) >= 0)) return error("Preencha nome, categoria e preço.");
    await env.DB.prepare("UPDATE products SET name = ?, description = ?, category = ?, price = ?, image_url = ?, featured = ?, active = ?, updated_at = ? WHERE id = ?")
      .bind(String(data.name).slice(0, 100), String(data.description || "").slice(0, 500), String(data.category).slice(0, 80), Number(data.price), String(data.imageUrl || "").slice(0, 500), data.featured ? 1 : 0, data.active ? 1 : 0, new Date().toISOString(), Number(productMatch[1])).run();
    return reply({ ok: true });
  }
  if (path === "/api/admin/settings" && request.method === "PUT") {
    const data = await body(request); const now = new Date().toISOString();
    const allowed = Object.keys(defaultSettings);
    const statements = allowed.filter((key) => data[key] != null).map((key) => env.DB.prepare("INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at").bind(key, String(data[key]).slice(0, 300), now));
    if (statements.length) await env.DB.batch(statements);
    return reply(await getSettings(env.DB));
  }
  return error("Rota não encontrada.", 404);
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      if (path.startsWith("/api/admin/")) return await adminApi(request, env, path);
      if (path === "/api/catalog" && request.method === "GET") {
        await seed(env.DB);
        const [products, settings] = await Promise.all([getProducts(env.DB), getSettings(env.DB)]);
        return reply({ products, settings, categories });
      }
      if (path === "/api/orders" && request.method === "POST") {
        await seed(env.DB);
        const settings = await getSettings(env.DB);
        return reply(await createOrder(env.DB, await body(request), "online", settings), 201);
      }
      if (path === "/admin") return new Response(adminPage(), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
      if (path === "/" || path === "/index.html") return new Response(customerPage(), { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
      return new Response("Página não encontrada", { status: 404 });
    } catch (cause) {
      console.error("JW worker error", cause);
      return error(cause instanceof Error ? cause.message : "Erro inesperado.", 500);
    }
  }
};
