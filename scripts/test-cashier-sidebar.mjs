import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");
const cashRegister = await readFile(new URL("../src/cash-register.js", import.meta.url), "utf8");
const css = await readFile(new URL("../src/admin-dashboard.css", import.meta.url), "utf8");
const layout = app.match(/^function cashierLayout\(content,title\).*$/m)?.[0];
const sidebar = cashRegister.slice(cashRegister.indexOf("state.cashier.sidebarCollapsed=localStorage"));
assert(layout && sidebar.startsWith("state.cashier.sidebarCollapsed="));
assert.match(css, /\.cashier-side \.admin-nav\{align-content:start\}/);
assert.match(css, /\.cashier-side \.admin-side-footer \.secondary-btn\{display:flex/);
assert.match(css, /@media\(min-width:1100px\)\s*\{\s*\.cashier-delivery-orders \.cashier-order-board\{grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
assert.match(css, /\.cashier-counter-orders \.cashier-order-board\{grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);

let mobile = false;
const stored = new Map(), classes = new Set(), navHandlers = [];
const toggle = { setAttribute(name, value) { this[name] = value; } };
const close = {};
const navButton = { addEventListener(type, handler) { navHandlers.push(handler); } };
const shell = {
  classList: {
    toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); }
  },
  querySelector(selector) {
    return selector === "[data-cashier-sidebar-toggle]" ? toggle : close;
  },
  querySelectorAll() { return [navButton]; }
};
const context = {
  state: { cashier: { name: "Teste", branch: "teste" } },
  localStorage: { getItem(key) { return stored.get(key) || null; }, setItem(key, value) { stored.set(key, value); } },
  document: { querySelector() { return { closest() { return shell; } }; } },
  matchMedia() { return { matches: mobile }; },
  cashierNav() { return '<button data-cashier-view="orders">Pedidos</button>'; },
  bindCashierV2() {},
  JW_LOGO: "logo.svg",
  esc(value) { return value; }
};
vm.createContext(context);
vm.runInContext(`${layout}\n${sidebar}`, context);
const markup = vm.runInContext('cashierLayout("conteúdo","Pedidos")', context);
assert.match(markup, /class="admin-side cashier-side"/);
assert.match(markup, /data-cashier-sidebar-toggle/);
assert.match(markup, /data-cashier-sidebar-close/);
assert.match(markup, /class="admin-title-group"/);

context.bindCashierV2();
assert.equal(toggle["aria-expanded"], "true");
toggle.onclick();
assert(classes.has("sidebar-collapsed"));
assert.equal(toggle["aria-expanded"], "false");
assert.equal(stored.get("jw_cashier_sidebar_collapsed"), "1");
context.bindCashierV2();
assert(classes.has("sidebar-collapsed"));

mobile = true;
context.bindCashierV2();
assert(!classes.has("sidebar-collapsed"));
toggle.onclick();
assert(classes.has("sidebar-open"));
assert.equal(toggle["aria-expanded"], "true");
close.onclick();
assert(!classes.has("sidebar-open"));
toggle.onclick();
navHandlers.at(-1)();
assert.equal(context.state.cashier.sidebarOpen, false);
console.log("Cashier sidebar tests passed");
