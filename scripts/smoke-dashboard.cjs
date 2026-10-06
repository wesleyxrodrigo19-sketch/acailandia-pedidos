const fs = require("node:fs");
const assert = require("node:assert/strict");

global.location = { pathname:"/test" };
global.document = { querySelector:()=>null, querySelectorAll:()=>[], addEventListener:()=>{}, body:{} };
global.window = global;
global.localStorage = { getItem:()=>null, setItem:()=>{} };
global.fetch = () => new Promise(()=>{});
global.matchMedia = () => ({ matches:false });

const source = ["app.js","whatsapp-pix.js","customer-recovery.js","admin-operations.js","admin-dashboard.js","promotions.js"]
  .map(file => fs.readFileSync(`${__dirname}/../src/${file}`,"utf8"))
  .join("\n") + `
state.catalog={settings:{store_name:"JW",is_open:true,closing_time:"23:20",minimum_order_cents:1000,delivery_eta:"60",pickup_eta:"30",phone:"879",address:"Rua",table_count:10,featured_product_limit:15,delivery_neighborhood_fees:[],delivery_surcharge_enabled:false,delivery_surcharge_percent:0,delivery_surcharge_label:"Chuva",waiter_fee_enabled:true,waiter_fee_percent:10,auto_print_enabled:false,reception_printer:"Caixa",kitchen_printer:"",print_bridge_configured:true,print_copies:1,business_hours:[]},products:[],categories:[]};
state.admin.printStatus={};
const customerHeader=renderStoreHeader(state.catalog.settings);
assert(customerHeader.includes("Mais informações"));
assert(customerHeader.includes("store-service-pills"));
assert(searchableNeighborhoodMarkup("Petrolina").includes('Digite algumas letras'));
// A Prime cadastra bairros e taxas no painel; a lista fixa começa vazia.
assert.deepStrictEqual(searchableNeighborhoodNames("Petrolina"),[]);
assert(searchableNeighborhoodMarkup("Petrolina","pos-neighborhood").includes('pos-neighborhood-search'));
assert(!searchableNeighborhoodMarkup("Petrolina").includes('<datalist'));
assert(searchableNeighborhoodMarkup("Petrolina").includes('neighborhood-suggestions'));
const settingsMarkup=settingsView();
assert(!settingsMarkup.includes("Taxas de entrega por bairro"));
assert(settingsMarkup.includes("Taxa de garçom"));
const navigationMarkup=adminNavButtons();
assert(navigationMarkup.includes("Gestão de pedidos"));
assert(navigationMarkup.includes("Bairros e taxas"));
assert(neighborhoodsView().includes("Bairros e taxas de entrega"));
assert(closedCatalogNotice().includes("Fechado"));
assert(closedCatalogNotice().includes("Cardápio somente para consulta"));
assert(closedCatalogNotice().includes("compact"));
assert(!closedCatalogNotice().includes("Ver horários de funcionamento"));
assert(!closedCatalogNotice().includes("Voltar"));
assert(infoHoursMarkup(state.catalog.settings).includes("Horários não informados"));
state.admin.management={from:"2026-09-01",to:"2026-09-23",orders:[],products:[],neighborhoods:[],summary:{},visits:{period:12,by_day:[{visited_on:"2026-09-23",visits:4}]}};
assert(orderManagementView().includes("Visitas por dia"));
assert(orderManagementView().includes("12 no período"));
state.admin.revenue={from:"2026-09-01",to:"2026-09-23",total_cents:0,order_count:0,average_cents:0,waiter_fee_cents:0,visit_count:12,by_payment:{dinheiro:0,pix:0,credito:0,debito:0},by_channel:{online:0,counter:0}};
assert(revenueView().includes("Visitas no período"));
assert.equal(orderTypeLabel("pickup"),"Retirada");
assert.equal(orderTypeLabel("dine_in"),"Consumir no local");
assert.equal(orderTypeLabel("delivery"),"Entrega/Delivery");
assert(posView().includes('<option value="dine_in">Consumir no local</option>'));
assert(posView().includes('id="pos-clear-cart"'));
assert(openCart.toString().includes('id="clear-cart"'));
const infoFees=infoNeighborhoodsMarkup({delivery_neighborhood_fees:[{city:"Petrolina",neighborhood:"São Gonçalo",fee_cents:700}]});
assert(infoFees.includes('id="info-neighborhood-search"'));
assert(infoFees.includes('São Gonçalo'));
const noPromotionCatalog=customerApp();
assert(!noPromotionCatalog.includes('data-target="promocoes"'));
state.catalog.products=[{id:1,name:"Promo teste",description:"Teste",category:"Lanches",price_cents:1500,old_price_cents:2200,is_promo:true,is_available:true,is_featured:true,image_url:"/image.webp",complements:[]}];
const promotionCatalog=customerApp();
assert(promotionCatalog.includes('data-target="promocoes"'));
assert(promotionCatalog.includes('old-price'));
assert(productEditor(null).includes('Ativar promoção'));
assert(productEditor(null).includes('name="old_price"'));
assert(tablesBoardMarkup({table_count:1,available_count:0,occupied_count:1,tables:[{number:1,occupied:true,status:"novo",order_id:"123A"}]},{admin:true}).includes('data-table-order="123A"'));
console.log("Dashboard smoke test passed");`;

eval(source);
assert(!fs.readFileSync(`${__dirname}/../src/worker-template.js`,"utf8").includes('Pagamento: ${paymentLabel(order.payment_method)} •'));
assert(fs.readFileSync(`${__dirname}/../src/worker-template.js`,"utf8").includes('featured_product_limit'));
const workerSource=fs.readFileSync(`${__dirname}/../src/worker-template.js`,"utf8");
assert(workerSource.includes('`Tipo do pedido: ${typeLabel}`'));
assert(!workerSource.includes('SETOR: GERAL'));
