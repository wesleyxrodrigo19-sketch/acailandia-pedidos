const fs = require("node:fs");
const assert = require("node:assert/strict");
const selfServiceScaleSource=fs.readFileSync(`${__dirname}/../src/self-service-confirmation.js`,"utf8");
assert.match(selfServiceScaleSource,/setInterval\(\(\)=>updateReading\(\),250\)/);
assert.match(selfServiceScaleSource,/clearInterval\(pollId\)/);

global.location = { pathname:"/test" };
global.__documentListeners=[];
global.__layer={innerHTML:""};global.__overlay={};global.__tableOpenForm={};
global.document = { querySelector:selector=>selector==="#toast"?{textContent:"",classList:{add(){},remove(){}}}:selector==="#layer"?global.__layer:selector==="#overlay"?global.__overlay:selector==="#table-open-form"?global.__tableOpenForm:null, querySelectorAll:()=>[], addEventListener:(type,handler,options)=>global.__documentListeners.push({type,handler,options}), body:{} };
global.window = global;
global.localStorage = { getItem:()=>null, setItem:()=>{}, removeItem:()=>{} };
global.fetch = () => new Promise(()=>{});
global.matchMedia = () => ({ matches:false });

let source = ["app.js","whatsapp-pix.js","customer-recovery.js","admin-operations.js","admin-dashboard.js","promotions.js","customer-cart-flow.js","customer-cart-resilience.js","admin-order-sound.js","payment-copy.js","integrations.js","cashier-payment.js","cash-register.js","admin-fast-navigation.js","acai-builder.js","prime-operations-upgrade.js","operational-request-fixes.js","complement-management.js","product-flavors.js","fiscal-integration.js","self-service-confirmation.js","table-operations.js"]
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
assert.equal(typeof openCart,"function");
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
const adminTableMarkup=tablesBoardMarkup({table_count:2,available_count:1,occupied_count:1,tables:[{number:1,occupied:true,status:"novo",order_id:"123A",customer_name:"Cliente"},{number:2,occupied:false}]},{admin:true});
assert(adminTableMarkup.includes('data-table-add-items="123A"'));
assert(adminTableMarkup.includes('Adicionar item'));
assert(adminTableMarkup.includes('data-table-open="1" data-order-id="123A"'));
assert(adminTableMarkup.includes('data-table-close="123A"'));
assert(adminTableMarkup.includes("Editar comanda"));
assert(adminTableMarkup.includes('data-table-pay="123A"'));
assert(adminTableMarkup.includes("Pagamento"));
state.admin.selectedTableNumber="2";
const availableTableMarkup=tablesBoardMarkup({table_count:2,available_count:1,occupied_count:1,tables:[{number:1,occupied:true,status:"novo",order_id:"123A",customer_name:"Cliente"},{number:2,occupied:false}]},{admin:true});
assert(availableTableMarkup.includes('data-table-open="2"'));
assert(!availableTableMarkup.includes('class="table-tile-free">Disponível'));
state.admin.selectedTableNumber=null;
assert(source.includes("tableItemPickerMarkup"));
assert(source.includes('data-table-picker-category'));
assert(source.includes('name="people_count"'));
assert(source.includes('name="customer_name"'));
assert(source.includes('name="table_note"'));
assert(source.includes("state.admin.pendingTableOpen="));
assert(source.includes("if(draft){const created=await api('/api/admin/orders'"));
assert(source.includes('id="table-picker-search"'));
assert(source.includes('table-picker-save'));
assert(source.includes("/api/admin/orders/")&&source.includes("/items"));
assert(source.includes("Pagar e fechar mesa"));
assert(adminNavButtons().includes('data-admin-view="counter-orders"'));
assert(counterOrdersView().includes("Self-service/Balcão"));
state.catalog.products=[{id:20,name:"Copo trufado 300 ml",description:"Sabor",category:"Copos trufados",price_cents:3190,is_available:true,is_promo:false,enable_acai_complements:false,enable_acai_extras:false,enable_flavors:true,flavors:["Sensação"],complements:[],selected_complement_ids:[]}];
state.catalog.acai_complements=[{id:1,name:"Sensação",group_id:"flavor",price_cents:0,is_active:1}];
assert(productsView().includes('data-product-choice="complements"'));
assert(productsView().includes('data-product-choice="extras"'));
assert(fs.readFileSync(__dirname+"/../src/product-flavors.js","utf8").includes('data-product-flavors="edit"'));
assert(productEditor(state.catalog.products[0]).includes('name="enable_flavors"'));
assert(productEditor(state.catalog.products[0]).includes('value="1"'));
state.admin.orders=[{id:"COUNTER-PAID",channel:"counter",payment_status:"pago",status:"novo",total_cents:3190,items:[]},{id:"COUNTER-PENDING",channel:"counter",payment_status:"aberto",status:"novo",total_cents:2490,items:[]},{id:"COUNTER-CANCELLED",channel:"counter",payment_status:"aberto",status:"cancelado",total_cents:990,items:[]}];
state.admin.counterOrderFilter="all";
assert(counterOrdersView().includes("COUNTER-PAID"));
assert(counterOrdersView().includes("COUNTER-PENDING"));
state.admin.counterOrderFilter="paid";
assert(counterOrdersView().includes("COUNTER-PAID"));
assert(!counterOrdersView().includes("COUNTER-PENDING"));
assert(!counterOrdersView().includes("COUNTER-CANCELLED"));
state.admin.counterOrderFilter="pending";
assert(!counterOrdersView().includes("COUNTER-PAID"));
assert(counterOrdersView().includes("COUNTER-PENDING"));
assert(!counterOrdersView().includes("COUNTER-CANCELLED"));
const workerSource=fs.readFileSync(__dirname+"/../src/worker-template.js","utf8");
assert(workerSource.includes('url.pathname==="/api/admin/cashier-access"&&request.method==="PATCH"'));
assert(workerSource.includes('await sha256(pin)'));
assert(workerSource.includes('selected_complement_ids_json'));
assert(posView().includes("Açaí Self-service por peso"));
state.cashier.view="counter-orders";state.cashier.orderFilter="all";state.cashier.orders=[{id:"COUNTER-TEST",channel:"counter",status:"novo",payment_status:"aberto",total_cents:1200,created_at:new Date().toISOString(),items:[]},{id:"ONLINE-TEST",channel:"online",status:"novo",payment_status:"aberto",total_cents:900,created_at:new Date().toISOString(),items:[]}];
const cashierCounterMarkup=cashierCounterOrdersView();
assert(cashierCounterMarkup.includes('class="counter-orders-tabs"'));
assert(cashierCounterMarkup.includes('class="counter-orders-grid"'));
assert(cashierCounterMarkup.includes("COUNTER-TEST"));
assert(!cashierCounterMarkup.includes("ONLINE-TEST"));
const cashierCounterCss=fs.readFileSync(__dirname+"/../src/cashier-ui-fixes.css","utf8");
assert(cashierCounterCss.includes(".counter-orders-tabs button.active"));
const integrationSource=fs.readFileSync(__dirname+"/../src/integrations.js","utf8");
assert(integrationSource.includes("diagnostico-balanca-acailandia.zip"));
assert(integrationSource.includes("4800 bps, 8N1, sem fluxo de hardware"));
const diagnosticArchive=fs.readFileSync(__dirname+"/../media/diagnostico-balanca-acailandia.zip");
assert.deepEqual(diagnosticArchive.subarray(0,2),Buffer.from("PK"));
const diagnosticScript=fs.readFileSync(__dirname+"/../agents/acailandia/diagnostico/Diagnostico-Balanca-Acailandia.ps1","utf8");
assert(diagnosticScript.includes("$ExpectedBaud = 4800"));
assert(diagnosticScript.includes("$serial.Write([byte[]]@(5), 0, 1)"));
const scaleAgent=fs.readFileSync(__dirname+"/../agents/acailandia/acailandia-agente-balanca.py","utf8");
assert(scaleAgent.includes("PADRAO_QUADRO_PESO = re.compile") && scaleAgent.includes(String.fromCharCode(92)+"x02([0-9]{2}"));
assert(scaleAgent.includes('getattr(config, "VELOCIDADE", 4800)'));
assert(scaleAgent.includes('"x-scale-key": TOKEN'));
const prix3FramePattern=new RegExp("\\x02([0-9]{2}\\.[0-9]{3})\\r");
assert(prix3FramePattern.test(String.fromCharCode(2)+"00.182\\r"));
assert(!prix3FramePattern.test("RAW: 000182"));
console.log("Dashboard smoke test passed");`;

source += "\nglobalThis.__appState=state;globalThis.__api=api;globalThis.__navigateAdmin=primeOpsNavigateAdmin;globalThis.__clearApiCache=()=>{apiGetCache.clear();apiGetPending.clear()};globalThis.__setAdminRenderer=fn=>renderAdmin=fn;globalThis.__setOrderEditor=fn=>openOrderEditor=fn;globalThis.__setOrderDetails=fn=>openOrderDetails=fn;globalThis.__setOrderLoader=fn=>loadAdminOrders=fn;";
eval(source);
// Exercise the final capture-phase menu guard the same way a real menu click
// reaches it. Every screen must load its own backing data before navigation.
global.__fetchCount={};
global.fetch=async input=>{
  const url=new URL(String(input),"https://test.local"),path=url.pathname;
  global.__fetchCount[path]=(global.__fetchCount[path]||0)+1;
  const payload=path.endsWith("/orders")?{orders:[]}:
    path.endsWith("/products")?{products:[],categories:[],settings:global.__appState.catalog.settings}:
    path.endsWith("/tables")?{table_count:1,available_count:1,occupied_count:0,tables:[{number:1,occupied:false}]}:
    path.endsWith("/revenue")?{from:"",to:"",total_cents:0,order_count:0,average_cents:0,by_payment:{},by_channel:{}}:
    path.endsWith("/print-status")?{}:
    path.endsWith("/order-management")?{orders:[],products:[],neighborhoods:[],summary:{},visits:{period:0,by_day:[]}}:
    path.endsWith("/neighborhood-fees")?{fees:[]}:
    path.endsWith("/audit")?{entries:[]}:
    path.endsWith("/cash-register")?{branches:{acailandia:{active:null,history:[]}}}:
    path.endsWith("/employees")?{employees:[]}:
    path.endsWith("/employee-purchases")?{rows:[],summary:{}}:
    path.endsWith("/abandoned-carts")?{carts:[]}:
    path.endsWith("/integrations/status")?{scale:{configured:false,grams:0,captured_at:"",token_created_at:""}}:
    path.endsWith("/fiscal/setup")?{config:{},products:[],documents:[],readiness:{}}:{};
  return {ok:true,json:async()=>payload};
};
global.__appState.admin.logged=true;
global.__setAdminRenderer(()=>{});
const navigationGuard=global.__documentListeners.filter(item=>item.type==="click"&&item.options===true&&String(item.handler).includes("[data-admin-view]")).at(-1);
assert(navigationGuard,"capture-phase navigation guard was not registered");
async function verifyNavigation(view){
  const event={target:{closest:selector=>selector==='[data-admin-view]'?{dataset:{adminView:view}}:null},preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}};
  await navigationGuard.handler(event);
  assert.equal(global.__appState.admin.view,view,`menu did not open ${view}`);
}
(async()=>{
  for(const view of ["orders","counter-orders","pos","availability","tables","revenue","products","settings","management","neighborhoods","audit","cash-register","employees","abandoned","integrations","complements","fiscal"]){
    await verifyNavigation(view);
  }
  const tableHandler=global.__documentListeners.filter(item=>item.type==="click"&&item.options===true&&String(item.handler).includes("[data-table-open]")).at(-1);
  assert(tableHandler,"table controls must register a capture-phase click handler");
  const clickTarget=dataset=>({closest:selector=>selector==="[data-table-open]"?{dataset}:null});
  await tableHandler.handler({target:clickTarget({tableOpen:"1"}),preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}});
  assert.equal(global.__appState.admin.view,"fiscal","opening a table must stay on the table screen, not switch to the counter");
  assert.equal(global.__appState.admin.selectedTableNumber,"1","available table was not selected");
assert(global.__layer.innerHTML.includes("table-opening-modal"),"available table did not open the table setup dialog");
assert(global.__layer.innerHTML.includes("Quantidade de pessoas"),"table setup dialog is missing guest count");
  let editedOrder="";global.__setOrderEditor(id=>{editedOrder=id});
  global.__setOrderLoader(async()=>{global.__appState.admin.orders=[{id:"CAIXA-01",channel:"counter",status:"novo",payment_status:"aberto",table_number:1,items:[]}]});
  await tableHandler.handler({target:clickTarget({tableOpen:"1",orderId:"CAIXA-01"}),preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}});
  assert.equal(editedOrder,"CAIXA-01","occupied table did not open its order editor");
  let detailsOrder="";global.__setOrderDetails(id=>{detailsOrder=id});
  const closeTarget={closest:selector=>selector==="[data-table-close]"?{dataset:{tableClose:"CAIXA-01"}}:null};
  await tableHandler.handler({target:closeTarget,preventDefault(){},stopPropagation(){},stopImmediatePropagation(){}});
  assert.equal(detailsOrder,"CAIXA-01","unpaid table close did not open its payment/details flow");
  assert.equal(global.__appState.admin.cashRegister.active,null,"cash screen did not unwrap the Açailandia branch response");
  const productFetches=global.__fetchCount["/api/admin/products"]||0;
  await verifyNavigation("products");
  assert.equal(global.__fetchCount["/api/admin/products"]||0,productFetches,"recent catalog response was fetched again on a quick screen switch");
  await global.__api("/api/admin/store-availability",{method:"PATCH",body:"{}"});
  await global.__api("/api/admin/products");
  assert.equal(global.__fetchCount["/api/admin/products"]||0,productFetches+1,"a successful update did not invalidate cached GET responses");
  // A route with an existing snapshot must paint synchronously even if its
  // background refresh is deliberately held open by a slow network.
  global.__clearApiCache();
  global.__renderCount=0;
  global.__setAdminRenderer(()=>{global.__renderCount++});
  let releaseSlowFetch;
  global.fetch=()=>new Promise(resolve=>{releaseSlowFetch=()=>resolve({ok:true,json:async()=>({products:[],categories:[],settings:global.__appState.catalog.settings})})});
  const slowNavigation=global.__navigateAdmin("products");
  assert.equal(global.__renderCount,1,"cached screen did not render before its network refresh completed");
  releaseSlowFetch();
  await slowNavigation;
  assert.equal(global.__renderCount,1,"background refresh unnecessarily rebuilt the screen and could discard user input");
  console.log("Admin navigation smoke test passed (17 screens)");
  process.exit(0);
})().catch(error=>{console.error(error);process.exit(1)});
assert(!fs.readFileSync(`${__dirname}/../src/worker-template.js`,"utf8").includes('Pagamento: ${paymentLabel(order.payment_method)} •'));
assert(fs.readFileSync(`${__dirname}/../src/worker-template.js`,"utf8").includes('featured_product_limit'));
const workerSource=fs.readFileSync(`${__dirname}/../src/worker-template.js`,"utf8");
assert(workerSource.includes('`Tipo do pedido: ${typeLabel}`'));
assert(!workerSource.includes('SETOR: GERAL'));

