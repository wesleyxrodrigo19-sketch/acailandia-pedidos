import fs from "node:fs";
import path from "node:path";

const [sourcePath, outputPath = "drizzle/0006_sync_full_menu.sql"] = process.argv.slice(2);
if (!sourcePath) throw new Error("Informe o JSON original do cardápio.");

const categories = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const categoryNames = new Map([
  ["MEGA BURGÃO ARTESANAL", "Mega Burgão Artesanal"],
  ["BARCAS", "Barcas"],
  ["HOTDOGS GOURMET 🌭", "Hotdogs Gourmet"],
  ["HOT DOGS 🌭", "Hot Dogs"],
  ["HAMBURGÚRGUERES 🍔", "Hambúrgueres"],
  ["BATATA FRITA 🍟", "Batata Frita"],
  ["COMBOS PROMOCIONAIS", "Combos Promocionais"],
  ["SUCOS   🥤", "Sucos"],
  ["REFRIGERANTES", "Refrigerantes"],
]);

const products = categories.flatMap((category) =>
  category.produtos.map((product) => ({
    sourceId: product.id,
    category: categoryNames.get(category.nome) || category.nome.trim(),
    name: product.produto?.nome?.trim() || "Produto",
    description: String(product.descricao || "").trim(),
    priceCents: Math.round(Number(product.valor || 0) * 100),
    oldPriceCents: Number(product.valor_anterior || 0) > 0
      ? Math.round(Number(product.valor_anterior) * 100)
      : null,
    imageUrl: String(product.img || "").trim(),
    featured: Number(product.destaque) === 1 ? 1 : 0,
  })),
);

const seededNamesById = [
  "BARCA MEGA EGG ARTESANAL",
  "HOT DOG ESPECIAL",
  "X-BACON",
  "DOG X-BURGUER",
  "COMBO HAMBÚRGUER + 1 GUARANA LITRO",
  "COMBO BURGUER BACON + 1 GUARANA LITRO",
  "COMBO JW + 1 GUARANA LITRO",
  "PROMOÇÃO RELAMPAGO + 1 GUARANA LITRO",
  "Mega Burgão Tamanho Família (srve 4 pessoas }",
  "MEGA BURGÃO JW EGG",
  "MEGA HAMBURGUER",
  "MEGA BURGÃO JW",
  "MEGA BURGÃO CALABRESA",
  "MEGA BURGÃO DE FRANGO",
  "MEGA BURGÃO CHEDDAR",
  "MEGA BURGÃO PRENSADÃO",
  "MEGA BURGÃO GIGANTE JW",
  "BATATA FRITA 220 GM",
  "BATATA FRITA 400G + REQUEIJÃO CREMOSO CHEDDAR+ CALABRESA",
  "SUCO DE GOIABA COM LEITE 500ML",
  "COCA COLA LATA",
  "GUARANA ANTARCTICA 1 LITRO",
];

const sql = (value) => `'${String(value ?? "").replaceAll("'", "''")}'`;
const nullable = (value) => value == null ? "NULL" : String(value);
const values = (product, sortOrder) => [
  sql(product.category),
  sql(product.name),
  sql(product.description),
  product.priceCents,
  nullable(product.oldPriceCents),
  sql(product.imageUrl),
  product.featured,
  product.oldPriceCents ? 1 : 0,
  1,
  sortOrder,
].join(", ");

const lines = [
  "-- Sincroniza o cardápio completo da JW Hamburgueria sem apagar pedidos ou configurações.",
  "-- Fonte validada em 22/09/2026: https://jwhamburgueria.japedido.com.br",
  "",
];

for (let index = 0; index < seededNamesById.length; index++) {
  const name = seededNamesById[index];
  const product = products.find((item) => item.name === name);
  if (!product) throw new Error(`Produto base não encontrado: ${name}`);
  lines.push(
    `UPDATE products SET category=${sql(product.category)}, name=${sql(product.name)}, description=${sql(product.description)}, price_cents=${product.priceCents}, old_price_cents=${nullable(product.oldPriceCents)}, image_url=${sql(product.imageUrl)}, is_featured=${product.featured}, is_promo=${product.oldPriceCents ? 1 : 0}, is_available=1, sort_order=${index}, updated_at=CURRENT_TIMESTAMP WHERE id=${index + 1};`,
  );
}

lines.push("");
for (let index = 0; index < products.length; index++) {
  const product = products[index];
  lines.push(
    "INSERT INTO products (category,name,description,price_cents,old_price_cents,image_url,is_featured,is_promo,is_available,sort_order) " +
    `SELECT ${values(product, index)} WHERE NOT EXISTS (SELECT 1 FROM products WHERE lower(name)=lower(${sql(product.name)}));`,
  );
}

lines.push("", "PRAGMA optimize;", "");
fs.writeFileSync(path.resolve(outputPath), lines.join("\n"), "utf8");
console.log(JSON.stringify({ categories: categories.length, products: products.length, output: path.resolve(outputPath) }));
