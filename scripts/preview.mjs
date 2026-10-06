import http from "node:http";
import { adminPage, customerPage } from "../worker/pages.js";
import { categories, defaultSettings, initialProducts } from "../worker/data.js";

const products = initialProducts.map((p, index) => ({ id: index + 1, name: p[0], description: p[1], category: p[2], price: p[3], image_url: p[4], featured: p[5], active: 1, sort_order: index }));
const send = (res, value, type = "application/json; charset=utf-8") => { res.writeHead(200, { "content-type": type }); res.end(type.startsWith("application/json") ? JSON.stringify(value) : value); };
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1:4173");
  if (url.pathname === "/") return send(res, customerPage(), "text/html; charset=utf-8");
  if (url.pathname === "/admin") return send(res, adminPage(), "text/html; charset=utf-8");
  if (url.pathname === "/api/catalog") return send(res, { products, categories, settings: defaultSettings });
  if (url.pathname === "/api/orders" && req.method === "POST") return send(res, { code: "JW-DEMO", total: 0 });
  if (url.pathname === "/api/admin/login") return send(res, { ok: true });
  if (url.pathname === "/api/admin/session") { res.writeHead(401, { "content-type": "application/json" }); return res.end('{"error":"login"}'); }
  if (url.pathname === "/api/admin/dashboard") return send(res, { products, categories, settings: defaultSettings, orders: [], stats: { ordersToday: 0, preparing: 0, revenueToday: 0, averageTicket: 0 } });
  res.writeHead(404); res.end("Not found");
});
server.listen(4173, "127.0.0.1", () => console.log("Local: http://127.0.0.1:4173"));
