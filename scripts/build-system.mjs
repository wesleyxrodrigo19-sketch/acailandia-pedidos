import { mkdir, readFile, writeFile, rm, readdir, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const [template, html, css, cashierUiFixesCss, client, cashierPayment, cashRegister, whatsappPix, whatsappPixCss, recovery, recoveryCss, adminOperations, adminOperationsCss, adminDashboard, adminDashboardCss, promotions, promotionsCss, cartFlow, cartFlowCss, cartResilience, cartResilienceCss, orderSound, orderSoundCss, paymentCopy, integrations, integrationsCss, selfServiceConfirm, selfServiceConfirmCss] = await Promise.all([
  readFile(path.join(root, "src", "worker-template.js"), "utf8"),
  readFile(path.join(root, "src", "app.html"), "utf8"),
  readFile(path.join(root, "src", "styles.css"), "utf8"),
  readFile(path.join(root, "src", "cashier-ui-fixes.css"), "utf8"),
  readFile(path.join(root, "src", "app.js"), "utf8"),
  readFile(path.join(root, "src", "cashier-payment.js"), "utf8"),
  readFile(path.join(root, "src", "cash-register.js"), "utf8"),
  readFile(path.join(root, "src", "whatsapp-pix.js"), "utf8"),
  readFile(path.join(root, "src", "whatsapp-pix.css"), "utf8"),
  readFile(path.join(root, "src", "customer-recovery.js"), "utf8"),
  readFile(path.join(root, "src", "customer-recovery.css"), "utf8"),
  readFile(path.join(root, "src", "admin-operations.js"), "utf8"),
  readFile(path.join(root, "src", "admin-operations.css"), "utf8"),
  readFile(path.join(root, "src", "admin-dashboard.js"), "utf8"),
  readFile(path.join(root, "src", "admin-dashboard.css"), "utf8"),
  readFile(path.join(root, "src", "promotions.js"), "utf8"),
  readFile(path.join(root, "src", "promotions.css"), "utf8"),
  readFile(path.join(root, "src", "customer-cart-flow.js"), "utf8"),
  readFile(path.join(root, "src", "customer-cart-flow.css"), "utf8"),
  readFile(path.join(root, "src", "customer-cart-resilience.js"), "utf8"),
  readFile(path.join(root, "src", "customer-cart-resilience.css"), "utf8"),
  readFile(path.join(root, "src", "admin-order-sound.js"), "utf8"),
  readFile(path.join(root, "src", "admin-order-sound.css"), "utf8"),
  readFile(path.join(root, "src", "payment-copy.js"), "utf8"),
  readFile(path.join(root, "src", "integrations.js"), "utf8"),
  readFile(path.join(root, "src", "integrations.css"), "utf8"),
  readFile(path.join(root, "src", "self-service-confirmation.js"), "utf8"),
  readFile(path.join(root, "src", "self-service-confirmation.css"), "utf8"),
  readFile(path.join(root, "src", "self-service-confirmation.js"), "utf8"),
  readFile(path.join(root, "src", "self-service-confirmation.css"), "utf8"),
]);

const mediaEntries = await readdir(path.join(root, "media"));
const media = Object.fromEntries(await Promise.all(mediaEntries.filter(name => /\.(svg|webp|png|jpe?g)$/i.test(name)).map(async name => [
  name,
  (await readFile(path.join(root, "media", name))).toString("base64"),
])));

const output = template
  .replace("__APP_HTML__", JSON.stringify(html))
  .replace("__APP_CSS__", JSON.stringify(`${css}\n${whatsappPixCss}\n${recoveryCss}\n${adminOperationsCss}\n${adminDashboardCss}\n${promotionsCss}\n${cartFlowCss}\n${cartResilienceCss}\n${orderSoundCss}\n${integrationsCss}\n${selfServiceConfirmCss}\n${cashierUiFixesCss}`))
  .replace("__APP_JS__", JSON.stringify(`${client}\n${whatsappPix}\n${recovery}\n${adminOperations}\n${adminDashboard}\n${promotions}\n${cartFlow}\n${cartResilience}\n${orderSound}\n${paymentCopy}\n${integrations}\n${selfServiceConfirm}\n${cashierPayment}\n${cashRegister}`))
  .replace("__APP_MEDIA__", JSON.stringify(media));

await rm(path.join(root, "dist"), { recursive: true, force: true });
await mkdir(path.join(root, "dist", "server"), { recursive: true });
await writeFile(path.join(root, "dist", "server", "index.js"), output);
await mkdir(path.join(root, "dist", ".openai"), { recursive: true });
await cp(path.join(root, ".openai", "hosting.json"), path.join(root, "dist", ".openai", "hosting.json"));
await cp(path.join(root, "drizzle"), path.join(root, "dist", ".openai", "drizzle"), { recursive: true });
console.log("Built dist/server/index.js");
