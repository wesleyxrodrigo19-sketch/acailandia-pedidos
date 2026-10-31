import assert from "node:assert/strict";
import { createHmac, webcrypto } from "node:crypto";
import { readFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const sql = new DatabaseSync(":memory:");
sql.exec(`
  PRAGMA foreign_keys=ON;
  CREATE TABLE orders (
    id TEXT PRIMARY KEY, branch_id TEXT, channel TEXT, table_number INTEGER, status TEXT,
    payment_status TEXT, subtotal_cents INTEGER, total_cents INTEGER, delivery_fee_cents INTEGER DEFAULT 0,
    waiter_fee_cents INTEGER DEFAULT 0, discount_cents INTEGER DEFAULT 0, payment_method TEXT DEFAULT 'dinheiro',
    cash_received_cents INTEGER, change_for_cents INTEGER, updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT, order_id TEXT NOT NULL, product_id INTEGER,
    product_name TEXT NOT NULL, quantity INTEGER NOT NULL, unit_price_cents INTEGER NOT NULL,
    complements_json TEXT NOT NULL DEFAULT '[]', notes TEXT NOT NULL DEFAULT '',
    FOREIGN KEY(order_id) REFERENCES orders(id)
  );
  CREATE TABLE products (
    id INTEGER PRIMARY KEY, name TEXT, price_cents INTEGER, is_available INTEGER, complements_json TEXT DEFAULT '[]',
    enable_acai_complements INTEGER DEFAULT 0, enable_acai_extras INTEGER DEFAULT 0,
    enable_flavors INTEGER DEFAULT 0, flavors_json TEXT DEFAULT '[]', selected_complement_ids_json TEXT DEFAULT '[]'
  );
  CREATE TABLE acai_complements (id INTEGER, name TEXT, price_cents INTEGER, group_id TEXT, is_active INTEGER);
  CREATE TABLE audit_log (action_type TEXT, entity_type TEXT, entity_id TEXT, summary TEXT, details_json TEXT);
  CREATE TABLE order_bill_splits (id TEXT PRIMARY KEY, order_id TEXT, customer_name TEXT, items_json TEXT, total_cents INTEGER, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
  CREATE TABLE order_payments (order_id TEXT, method TEXT, amount_cents INTEGER);
  INSERT INTO orders (id,branch_id,channel,table_number,status,payment_status,subtotal_cents,total_cents)
    VALUES ('TEST','sao-goncalo','counter',1,'novo','aberto',1200,1200);
  INSERT INTO products (id,name,price_cents,is_available) VALUES (100,'Produto original',600,1);
  INSERT INTO order_items (order_id,product_id,product_name,quantity,unit_price_cents)
    VALUES ('TEST',100,'Produto original',2,600);
`);
sql.exec(await readFile(new URL("drizzle-acailandia/0003_table_item_labels.sql", root), "utf8"));
sql.exec("CREATE TABLE settings (id INTEGER PRIMARY KEY, updated_at TEXT, reception_printer TEXT DEFAULT '', print_bridge_key TEXT DEFAULT ''); INSERT INTO settings (id) VALUES (1);");
sql.exec("CREATE TABLE print_jobs (id INTEGER PRIMARY KEY AUTOINCREMENT, order_id TEXT NOT NULL, target TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending');");
sql.exec(`
  CREATE TABLE cash_register_sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, branch_id TEXT, status TEXT DEFAULT 'open', opened_at TEXT DEFAULT CURRENT_TIMESTAMP, closed_at TEXT, opening_cash_cents INTEGER DEFAULT 0, expected_cash_cents INTEGER DEFAULT 0, reported_closing_cents INTEGER, cash_sales_cents INTEGER DEFAULT 0, change_cents INTEGER DEFAULT 0, cash_in_cents INTEGER DEFAULT 0, cash_out_cents INTEGER DEFAULT 0, difference_cents INTEGER, closing_notes TEXT);
  CREATE TABLE cash_register_entries (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id INTEGER, branch_id TEXT, entry_type TEXT, amount_cents INTEGER, reason TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
`);
sql.exec(await readFile(new URL("drizzle-acailandia/0004_whatsapp_message.sql", root), "utf8"));
sql.exec(await readFile(new URL("drizzle-acailandia/0010_fiado_message.sql", root), "utf8"));
sql.exec(await readFile(new URL("drizzle-acailandia/0009_table_name.sql", root), "utf8"));

class Statement {
  constructor(query) { this.query = query; this.values = []; }
  bind(...values) { this.values = values; return this; }
  async first() { return sql.prepare(this.query).get(...this.values) || null; }
  async all() { return { results: sql.prepare(this.query).all(...this.values) }; }
  async run() {
    const result = sql.prepare(this.query).run(...this.values);
    return { meta: { changes: Number(result.changes), last_row_id: Number(result.lastInsertRowid) } };
  }
}
const DB = {
  prepare(query) { return new Statement(query); },
  async batch(statements) {
    if (this.beforeBatch) {
      const hook = this.beforeBatch;
      this.beforeBatch = null;
      hook();
    }
    sql.exec("BEGIN");
    try {
      const results = [];
      for (const statement of statements) results.push(await statement.run());
      sql.exec("COMMIT");
      return results;
    } catch (error) {
      sql.exec("ROLLBACK");
      throw error;
    }
  }
};

let source = await readFile(new URL("src/worker-template.js", root), "utf8");
source = source.replaceAll("__APP_HTML__", '""').replaceAll("__APP_CSS__", '""').replaceAll("__APP_JS__", '""');
source = source.replaceAll("__APP_MEDIA__", "{}");
source = source.replaceAll("await seed(env.DB);", "").replace("export default {", "globalThis.worker = {");
const context = { console, crypto: webcrypto, TextEncoder, TextDecoder, URL, Request, Response, Headers, setTimeout, clearTimeout };
vm.runInNewContext(source, context);
const secret = "test-secret", expires = String(Date.now() + 60000);
const cookie = `loja_admin=${expires}.${createHmac("sha256", secret).update(expires).digest("hex")}`;
async function request(path, method = "GET", body, authenticated = true) {
  const headers = { "content-type": "application/json" };
  if (authenticated) headers.cookie = cookie;
  const response = await context.worker.fetch(new Request(`https://test.local${path}`, {
    method, headers, ...(body ? { body: JSON.stringify(body) } : {})
  }), { DB, SESSION_SECRET: secret });
  return { status: response.status, body: await response.json() };
}
const action = (id, body) => request(`/api/admin/orders/TEST/table-items/${id}`, "PATCH", body);
const pay = (id, amount = 600) => request("/api/admin/orders/TEST/bill-splits", "POST", {
  items: [{ order_item_id: id, quantity: 1 }],
  payments: [{ method: "pix", amount_cents: amount }]
});

DB.beforeBatch = () => sql.exec("UPDATE order_items SET quantity=1 WHERE id=1");
assert.equal((await pay(1)).status, 409);
assert.equal(sql.prepare("SELECT count(*) AS n FROM order_bill_splits").get().n, 0);
sql.exec("UPDATE order_items SET quantity=2 WHERE id=1");
DB.beforeBatch = () => sql.exec(`INSERT INTO order_bill_splits VALUES ('RACE','TEST','', '[{"order_item_id":1,"quantity":1}]',600,CURRENT_TIMESTAMP)`);
assert.equal((await pay(1)).status, 409);
assert.equal(sql.prepare("SELECT count(*) AS n FROM order_payments").get().n, 0);
sql.exec("DELETE FROM order_bill_splits");
assert.equal((await action(1, { action: "identify", label: "João" })).status, 200);
let rows = sql.prepare(`SELECT oi.*,tl.label FROM order_items oi LEFT JOIN table_item_labels tl ON tl.order_item_id=oi.id ORDER BY oi.id`).all();
assert.deepEqual(rows.map(row => [row.product_name, row.quantity, row.label]), [
  ["Produto original", 1, null], ["Produto original", 1, "João"]
]);
assert.equal(sql.prepare("SELECT total_cents FROM orders WHERE id='TEST'").get().total_cents, 1200);
assert.equal((await action(1, { action: "identify", label: "Camisa azul" })).status, 200);
const bill = await request("/api/admin/orders/TEST/bill-splits");
assert.equal(bill.status, 200);
assert.deepEqual(bill.body.items.map(item => item.table_label).sort(), ["Camisa azul", "João"]);
assert.equal((await action(1, { action: "edit", quantity: 2, notes: "" })).status, 400);
assert.equal((await action(1, { action: "edit", quantity: 1, notes: "Sem gelo" })).status, 200);
rows = sql.prepare("SELECT id,product_name,quantity,notes FROM order_items ORDER BY id").all();
assert.equal(rows[0].notes, "Sem gelo");
assert(rows.every(row => row.product_name === "Produto original"));

const updated = await request("/api/admin/orders/TEST/items", "PATCH", { items: [
  { product_id: 100, quantity: 1, complements: [], notes: "Sem gelo" },
  { product_id: 100, quantity: 1, complements: [], notes: "" }
] });
assert.equal(updated.status, 200, JSON.stringify(updated.body));
assert.equal(sql.prepare("SELECT count(*) AS n FROM table_item_labels").get().n, 2);
assert.equal(sql.prepare("SELECT total_cents FROM orders WHERE id='TEST'").get().total_cents, 1200);
DB.beforeBatch = () => sql.exec("UPDATE table_item_labels SET label='Maria' WHERE order_item_id=2");
assert.equal((await action(2, { action: "identify", label: "Pedro" })).status, 409);
assert.equal(sql.prepare("SELECT label FROM table_item_labels WHERE order_item_id=2").get().label, "Maria");
sql.exec("UPDATE table_item_labels SET label='João' WHERE order_item_id=2");
DB.beforeBatch = () => sql.exec("DELETE FROM order_items WHERE id=2");
assert.equal((await pay(2)).status, 409);
assert.equal(sql.prepare("SELECT count(*) AS n FROM order_payments").get().n, 0);
sql.exec("INSERT INTO order_items (id,order_id,product_id,product_name,quantity,unit_price_cents) VALUES (2,'TEST',100,'Produto original',1,600); INSERT INTO table_item_labels VALUES (2,'João')");
const payment = await pay(2);
assert.equal(payment.status, 201, JSON.stringify(payment.body));
assert.equal(payment.body.due_cents, 600);
const afterPayment = await request("/api/admin/orders/TEST/bill-splits");
assert.equal(afterPayment.body.items.find(item => item.id === 2).available_quantity, 0);
assert.equal(afterPayment.body.items.find(item => item.id === 1).table_label, "Camisa azul");
assert.equal(afterPayment.body.splits[0].items[0].product_name, "Produto original");
assert.equal((await action(1, { action: "delete" })).status, 409);
assert.equal((await action(2, { action: "identify", label: "Outra pessoa" })).status, 409);
assert.equal((await action(1, { action: "identify", label: "Ana" })).status, 200);
assert.equal((await request("/api/admin/orders/TEST/table-items/1", "PATCH", { action: "delete" }, false)).status, 401);
const cashierExpires = String(Date.now() + 60000);
const cashierCookie = `loja_cashier=acailandia.${cashierExpires}.${createHmac("sha256", secret).update(`acailandia.${cashierExpires}.cashier`).digest("hex")}`;
const asCashier = async (path, method = "GET", body) => (await context.worker.fetch(new Request(`https://test.local${path}`, {
  method, headers: { "content-type": "application/json", cookie: cashierCookie }, ...(body ? { body: JSON.stringify(body) } : {})
}), { DB, SESSION_SECRET: secret })).status;
assert.equal(await asCashier("/api/admin/orders/TEST/table-items/1", "PATCH", { action: "identify", label: "Ana" }), 404);
assert.equal(await asCashier("/api/admin/orders/TEST/bill-splits"), 404);
assert.equal(await asCashier("/api/admin/products/1", "PATCH", { name: "x" }), 401);
assert.equal(await asCashier("/api/admin/orders/TEST", "DELETE"), 401);
assert.equal(await asCashier("/api/admin/settings", "GET"), 401);
assert.equal(await asCashier("/api/admin/whatsapp-message", "PATCH", { whatsapp_message: "x" }), 401);
const waSaved = await request("/api/admin/whatsapp-message", "PATCH", { whatsapp_message: "  Olá {nome}\r\nPedido {pedido}  " });
assert.equal(waSaved.status, 200, JSON.stringify(waSaved.body));
const fSaved = await request("/api/admin/fiado-message", "PATCH", { fiado_message: "  Oi {nome} {valor}  " });
assert.equal(fSaved.status, 200, JSON.stringify(fSaved.body));
assert.equal(fSaved.body.fiado_message, "Oi {nome} {valor}");
assert.equal(sql.prepare("SELECT whatsapp_message AS m FROM settings WHERE id=1").get().m, "Olá {nome}\nPedido {pedido}");

assert.equal((await request("/api/admin/orders/TEST/print-receipt", "POST")).status, 400);
sql.exec("UPDATE settings SET reception_printer='MP-100S TH' WHERE id=1");
assert.equal((await request("/api/admin/orders/TEST/print-receipt", "POST")).status, 200);
assert.equal(sql.prepare("SELECT count(*) AS n FROM print_jobs WHERE order_id='TEST' AND target='customer'").get().n, 1);
assert.equal(await asCashier("/api/admin/orders/TEST/print-receipt", "POST"), 404);
const ticketOrder = { id: "T1", channel: "counter", order_type: "dine_in", table_number: 6, created_at: "2026-10-31 22:14:00", notes: "Pessoas: 1 • Atendente: ACAILANDIA PE", subtotal_cents: 4800, total_cents: 4800, waiter_fee_cents: 0 };
const ticketItems = [
  { product_id: 8, product_name: "Milk 330ml casa", quantity: 1, unit_price_cents: 1400, complements_json: '[{"name":"Amendoim","quantity":1}]', notes: "" },
  { product_id: 20, product_name: "Água mineral", quantity: 2, unit_price_cents: 1000, complements_json: "[]", notes: "" }
];
const prepTicket = context.ticketText(ticketOrder, ticketItems, "prep", { store_name: "Açailandia PE" });
assert.match(prepTicket, /MILK 330ML CASA \(Cód\.: 8\)/);
assert.match(prepTicket, /- AMENDOIM/);
assert.doesNotMatch(prepTicket, /R\$|Água|ÁGUA/i);
assert.doesNotMatch(prepTicket, /Atendente|Qtd de pessoas|Impresso em/);
const customerTicket = context.ticketText(ticketOrder, ticketItems, "customer", { store_name: "Açailandia PE" });
assert.match(customerTicket, /MESA 06/);
assert.match(customerTicket, /R\$ 14,00/);
assert.match(customerTicket, /ÁGUA MINERAL/);
assert.doesNotMatch(customerTicket, /Quantidade de itens|Açailandia PE|TOTAL:/);
assert.match(customerTicket, /Total\s+R\$ 48,00/);
assert.match(context.ticketText({ ...ticketOrder, table_name: "3 sofá" }, ticketItems, "prep", { store_name: "Açailandia PE" }), /MESA 06 \(3 SOFÁ\)/);
assert.doesNotMatch(customerTicket, /Atendente|Cód\. interno|Fornecido por|Subtotal/);
assert.match(customerTicket, /\+\+\+ NÃO É DOCUMENTO FISCAL \+\+\+/);
assert.equal(await asCashier("/api/admin/orders/TEST/reprint", "GET"), 401);
sql.exec("UPDATE orders SET branch_id='acailandia' WHERE id='TEST'");
assert.equal(await asCashier("/api/admin/orders/TEST/table-items/1", "PATCH", { action: "identify", label: "Ana" }), 200);
assert.equal(await asCashier("/api/admin/orders/TEST/bill-splits"), 200);
sql.exec("UPDATE orders SET branch_id='sao-goncalo' WHERE id='TEST'");
const finalPayment = await pay(1);
assert.equal(finalPayment.status, 201, JSON.stringify(finalPayment.body));
assert.equal(finalPayment.body.due_cents, 0);
assert.equal(finalPayment.body.payment_status, "pago");
sql.exec("DELETE FROM order_bill_splits; DELETE FROM order_payments; UPDATE orders SET payment_method='dinheiro',payment_status='aberto' WHERE id='TEST'");
assert.equal((await action(2, { action: "delete" })).status, 200);
assert.equal(sql.prepare("SELECT total_cents FROM orders WHERE id='TEST'").get().total_cents, 600);
assert.equal((await action(1, { action: "identify", label: "" })).status, 200);
assert.equal((await action(1, { action: "edit", quantity: 3, notes: "Sem gelo" })).status, 200);
assert.equal(sql.prepare("SELECT total_cents FROM orders WHERE id='TEST'").get().total_cents, 1800);
const insertSplit = () => sql.exec("INSERT INTO order_bill_splits (id,order_id,customer_name,items_json,total_cents) VALUES ('S','TEST','','[]',600)");
DB.beforeBatch = insertSplit;
assert.equal((await action(1, { action: "edit", quantity: 2, notes: "" })).status, 409);
assert.equal(sql.prepare("SELECT quantity FROM order_items WHERE id=1").get().quantity, 3);
sql.exec("DELETE FROM order_bill_splits");
DB.beforeBatch = insertSplit;
const racedUpdate = await request("/api/admin/orders/TEST/items", "PATCH", { items: [
  { product_id: 100, quantity: 2, complements: [], notes: "Sem gelo" }
] });
assert.equal(racedUpdate.status, 400);
assert.match(racedUpdate.body.error, /comanda foi alterada/i);
assert.equal(sql.prepare("SELECT quantity FROM order_items WHERE id=1").get().quantity, 3);
assert.equal(sql.prepare("SELECT total_cents FROM orders WHERE id='TEST'").get().total_cents, 1800);
sql.exec("DELETE FROM order_bill_splits");
assert.equal((await pay(1)).status, 201);
assert.equal((await action(1, { action: "identify", label: "Beatriz" })).status, 200);
const partialBill = await request("/api/admin/orders/TEST/bill-splits");
const named = partialBill.body.items.find(item => item.table_label === "Beatriz");
assert.equal(named.quantity, 1);
assert.equal(partialBill.body.items.find(item => item.id === 1).available_quantity, 1);
assert.equal(partialBill.body.due_cents, 1200);
assert.equal((await pay(named.id)).status, 201);
assert.equal((await pay(1)).body.due_cents, 0);
sql.exec("DELETE FROM order_bill_splits; DELETE FROM order_payments; UPDATE orders SET payment_status='aberto' WHERE id='TEST'");
sql.exec("UPDATE orders SET status='concluido' WHERE id='TEST'");
assert.equal(sql.prepare("SELECT count(*) AS n FROM table_item_labels").get().n, 0);
assert(sql.prepare("SELECT product_name FROM order_items").all().every(row => row.product_name === "Produto original"));
sql.exec(`INSERT INTO orders (id,branch_id,channel,status,payment_status,subtotal_cents,total_cents,payment_method) VALUES ('FIA1','acailandia','counter','novo','aberto',5000,5000,'dinheiro')`);
sql.exec("INSERT INTO cash_register_sessions (branch_id,opening_cash_cents) VALUES ('acailandia',1000)");
assert.equal((await request("/api/admin/orders/FIA1/fiado", "POST", { payment_method: "dinheiro", received_cents: 5000 })).status, 400);
const fiado = await request("/api/admin/orders/FIA1/fiado", "POST", { payment_method: "dinheiro", received_cents: 3000, customer_name: "Ana", phone: "87999990000" });
assert.equal(fiado.status, 200, JSON.stringify(fiado.body));
assert.equal(fiado.body.fiado_cents, 2000);
assert.deepEqual({ ...sql.prepare("SELECT payment_status,total_cents FROM orders WHERE id='FIA1'").get() }, { payment_status: "pago", total_cents: 3000 });
assert.equal((await request("/api/admin/orders/FIA1/fiado", "POST", { received_cents: 0 })).status, 409);
const fiadoList = await request("/api/admin/fiado");
assert.equal(fiadoList.body.summary.open_cents, 2000);
const fiadoSummary = await request("/api/admin/cash-register");
assert.equal(fiadoSummary.body.branches.acailandia.active.fiado_cents, 2000);
assert.equal(fiadoSummary.body.branches.acailandia.active.cash_sales_cents, 3000);
const partialPay = await request(`/api/admin/fiado/${fiadoList.body.rows[0].id}/pay`, "POST", { amount_cents: 500, payment_method: "dinheiro" });
assert.equal(partialPay.body.status, "aberto");
assert.equal(sql.prepare("SELECT amount_cents FROM cash_register_entries WHERE entry_type='in'").get().amount_cents, 500);
const finalPay = await request(`/api/admin/fiado/${fiadoList.body.rows[0].id}/pay`, "POST", { payment_method: "pix" });
assert.equal(finalPay.body.status, "pago");
assert.equal((await request(`/api/admin/fiado/${fiadoList.body.rows[0].id}/pay`, "POST", {})).status, 409);
assert.equal(sql.prepare("SELECT fiado_cents FROM cash_register_sessions").get().fiado_cents, 0);
const unauthorizedFiado = await request("/api/admin/fiado", "GET", undefined, false);
assert.equal(unauthorizedFiado.status, 401);
sql.exec(`INSERT INTO orders (id,branch_id,channel,status,payment_status,subtotal_cents,total_cents,payment_method) VALUES ('FIA2','acailandia','counter','novo','aberto',5000,5000,'dinheiro')`);
const splitFiado = await request("/api/admin/orders/FIA2/fiado", "POST", { payment_method: "dinheiro", payments: [{ method: "dinheiro", amount_cents: 2000 }, { method: "pix", amount_cents: 1000 }], customer_name: "Bia" });
assert.equal(splitFiado.status, 200, JSON.stringify(splitFiado.body));
assert.equal(splitFiado.body.fiado_cents, 2000);
assert.deepEqual(sql.prepare("SELECT method,amount_cents FROM order_payments WHERE order_id='FIA2' ORDER BY rowid").all().map(row => ({ ...row })), [{ method: "dinheiro", amount_cents: 2000 }, { method: "pix", amount_cents: 1000 }]);
assert.equal(sql.prepare("SELECT payment_method FROM orders WHERE id='FIA2'").get().payment_method, "misto");
const onlineTicket = context.ticketText({ id: "O1", channel: "online", order_type: "delivery", customer_name: "Ana", phone: "87999", street: "Rua A", house_number: "10", neighborhood: "Centro", city: "Petrolina", reference_point: "Perto", maps_url: "https://maps.example/x", created_at: "2026-10-31 22:14:00", subtotal_cents: 2000, delivery_fee_cents: 500, total_cents: 2500, payment_method: "pix", payment_status: "pago" }, [{ quantity: 1, product_name: "Açaí", unit_price_cents: 2000, complements_json: "[]" }], "reception", { store_name: "Açailandia PE" });
assert.match(onlineTicket, /^\*\*\* Pedido Nº O1 \*\*\*/);
assert.match(onlineTicket, /ENDEREÇO PARA ENTREGA:/);
assert.match(onlineTicket, /FORMAS DE PAGAMENTO/);
assert.doesNotMatch(onlineTicket, /Google Maps|maps\.example|CAIXA \/ RECEPÇÃO|Origem/);
sql.exec("INSERT INTO orders (id,branch_id,channel,table_number,status,payment_status,subtotal_cents,total_cents) VALUES ('MESAX','acailandia','counter',9,'novo','aberto',0,0)");
assert.equal((await request("/api/admin/orders/MESAX/table-name", "PATCH", { table_name: "  3 sofá  " })).status, 200);
assert.equal(sql.prepare("SELECT table_name FROM orders WHERE id='MESAX'").get().table_name, "3 sofá");
assert.equal(await asCashier("/api/admin/orders/MESAX/table-name", "PATCH", { table_name: "Varanda" }), 200);
sql.exec("UPDATE orders SET status='concluido' WHERE id='MESAX'");
assert.equal((await request("/api/admin/orders/MESAX/table-name", "PATCH", { table_name: "x" })).status, 400);
console.log("Table item action tests passed");
