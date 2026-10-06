/* Painel diário, gestão histórica, bairros e navegação recolhível. */
state.admin.management=null;
state.admin.visits={today:0,total:0};
state.admin.neighborhoodFees=state.admin.neighborhoodFees||null;
state.admin.sidebarCollapsed=localStorage.getItem("jw_admin_sidebar_collapsed")==="1";
state.admin.sidebarOpen=false;

function brazilDateKey(value=new Date()){
  const date=value instanceof Date?value:new Date(String(value||"").replace(" ","T")+(String(value||"").includes("Z")?"":"Z"));
  const parts=Object.fromEntries(new Intl.DateTimeFormat("pt-BR",{timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(date).map(part=>[part.type,part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function recordMenuVisit(){
  if(location.pathname!=="/")return;
  try{
    let visitorKey=localStorage.getItem("jw_menu_visitor");
    if(!visitorKey){visitorKey=crypto.randomUUID();localStorage.setItem("jw_menu_visitor",visitorKey)}
    const branchId=currentBranch(),visitedOn=brazilDateKey(),marker=`jw_menu_visit_${branchId}_${visitedOn}`;
    if(localStorage.getItem(marker))return;
    api("/api/analytics/visit",{method:"POST",body:JSON.stringify({visitor_key:visitorKey,visited_on:visitedOn,branch_id:branchId})}).then(result=>{if(result?.counted)localStorage.setItem(marker,"1")}).catch(()=>{});
  }catch{}
}
recordMenuVisit();

loadAdminOrders=async function(){
  const data=await api("/api/admin/orders");
  state.admin.orders=data.orders||[];
  state.admin.visits=data.visits||{today:0,total:0};
};

function todayOperationalOrders(){
  const today=brazilDateKey();
  return (state.admin.orders||[]).filter(order=>order.status!=="cancelado"&&(!order.created_at||brazilDateKey(order.created_at)===today));
}

orderStats=function(){
  const orders=todayOperationalOrders();
  return {count:orders.length,revenue:orders.reduce((sum,order)=>sum+Number(order.total_cents||0),0),online:orders.filter(order=>order.channel==="online").length,counter:orders.filter(order=>order.channel==="counter").length};
};

function visitsForOwnerBranch(branch){const visits=state.admin.visits||{};return Number((branch==="all"?visits:visits.branches?.[branch])?.today||0)}

ordersView=function(){
  const branch=state.admin.branchFilter||"all",orders=(branch==="all"?todayOperationalOrders():todayOperationalOrders().filter(order=>order.branch_id===branch)),stats=ownerBranchStats(orders),groups=[
    {title:"Novos",statuses:["novo"],className:"new-column"},{title:"Em produção",statuses:["confirmado","preparando"],className:"production-column"},{title:"Prontos",statuses:["pronto"],className:"ready-column"},{title:"Saiu para entrega",statuses:["saiu_entrega"],className:"delivery-column",delivery:true},{title:"Finalizados",statuses:["concluido","cancelado"],className:"finished-column"}
  ],filtered=state.admin.orderFilter==="all"?orders:orders.filter(order=>order.channel===state.admin.orderFilter);
  return `${ownerBranchSummaryCards()}<div class="stat-grid daily-stats"><div class="stat stat-orders"><div class="stat-label">Pedidos hoje</div><div class="stat-value">${stats.count}</div></div><div class="stat stat-revenue"><div class="stat-label">Vendas hoje</div><div class="stat-value">${money(stats.revenue)}</div></div><div class="stat stat-online"><div class="stat-label">Pedidos pelo site</div><div class="stat-value">${orders.filter(order=>order.channel==="online").length}</div></div><div class="stat stat-counter"><div class="stat-label">Balcão</div><div class="stat-value">${orders.filter(order=>order.channel==="counter").length}</div></div><div class="stat stat-visits"><div class="stat-label">Acessos ao cardápio</div><div class="stat-value">${visitsForOwnerBranch(branch)}</div><small>${branch==="all"?"Duas unidades":esc(ownerBranchName(branch))}</small></div></div><div class="view-toolbar owner-filter-toolbar"><div class="filter-tabs"><button class="${branch==="all"?"active":""}" data-owner-branch="all">Todas</button>${OWNER_BRANCHES.map(item=>`<button class="${branch===item.id?"active":""}" data-owner-branch="${item.id}">${esc(item.name)}</button>`).join("")}</div><div class="filter-tabs"><button class="${state.admin.orderFilter==="all"?"active":""}" data-order-filter="all">Todos</button><button class="${state.admin.orderFilter==="online"?"active":""}" data-order-filter="online">Delivery / site</button><button class="${state.admin.orderFilter==="counter"?"active":""}" data-order-filter="counter">Local / balcão</button></div></div><div class="order-board vivid-board">${groups.map(group=>{const list=filtered.filter(order=>group.statuses.includes(order.status)&&(!group.delivery||order.order_type==="delivery"));return `<section class="order-column ${group.className}"><h2 class="column-title">${group.title}<span class="column-count">${list.length}</span></h2><div class="column-body">${list.length?list.map(orderCard).join(""):'<div class="empty">Nenhum pedido nesta unidade.</div>'}</div></section>`}).join("")}</div>`;
};

state.admin.managementBranches=state.admin.managementBranches||null;
state.admin.managementBranchFilter=state.admin.managementBranchFilter||"all";
async function loadOrderManagement(from,to){const query=new URLSearchParams();if(from)query.set("from",from);if(to)query.set("to",to);const request=value=>api(`/api/admin/order-management?${value}`),sao=new URLSearchParams(query),dom=new URLSearchParams(query);sao.set("branch","sao-goncalo");dom.set("branch","dom-avelar");const [all,saoGoncalo,domAvelar]=await Promise.all([request(query),request(sao),request(dom)]);state.admin.management=all;state.admin.managementBranches={"sao-goncalo":saoGoncalo,"dom-avelar":domAvelar}}
function managementDate(value){return new Date(String(value||"").replace(" ","T")+"Z").toLocaleString("pt-BR",{dateStyle:"short",timeStyle:"short"})}
function orderManagementView(){
  const selected=state.admin.managementBranchFilter||"all",allReport=state.admin.management||{orders:[],products:[],neighborhoods:[],summary:{},visits:{}},report=selected==="all"?allReport:(state.admin.managementBranches?.[selected]||allReport);
  const summary=report.summary||{},orders=report.orders||[];
  const branchCards=OWNER_BRANCHES.map(branch=>{const item=state.admin.managementBranches?.[branch.id]?.summary||{};return `<article class="owner-revenue-card ${branch.id}"><span>${esc(branch.name)}</span><strong>${money(item.revenue_cents||0)}</strong><small>${Number(item.total_orders||0)} pedido(s) • ${Number(item.cancelled_orders||0)} cancelado(s)</small></article>`}).join("");
  return `<div class="report-filter panel"><div class="field"><label>Data inicial</label><input type="date" id="management-from" value="${esc(allReport.from||"")}"></div><div class="field"><label>Data final</label><input type="date" id="management-to" value="${esc(allReport.to||"")}"></div><button class="primary-btn" id="apply-management-period">Aplicar período</button></div><section class="owner-revenue-compare"><div class="panel-head"><div><h2>Resultado por estabelecimento</h2><span class="muted">Faturamento e pedidos separados no período selecionado.</span></div></div><div class="owner-revenue-cards">${branchCards}</div></section><div class="view-toolbar owner-filter-toolbar"><div class="filter-tabs"><button class="${selected==="all"?"active":""}" data-management-branch="all">Todas</button>${OWNER_BRANCHES.map(branch=>`<button class="${selected===branch.id?"active":""}" data-management-branch="${branch.id}">${esc(branch.name)}</button>`).join("")}</div><span class="muted">${selected==="all"?"Visão consolidada das duas unidades.":`Exibindo somente ${esc(ownerBranchName(selected))}.`}</span></div><div class="management-summary">
    <div class="stat stat-orders"><div class="stat-label">Pedidos registrados</div><div class="stat-value">${Number(summary.total_orders||0)}</div></div>
    <div class="stat stat-revenue"><div class="stat-label">Faturamento sem cancelados</div><div class="stat-value">${money(summary.revenue_cents||0)}</div></div>
    <div class="stat stat-cancelled"><div class="stat-label">Pedidos cancelados</div><div class="stat-value">${Number(summary.cancelled_orders||0)}</div></div>
    <div class="stat stat-visits"><div class="stat-label">${selected==="all"?"Visitas no período":"Unidade filtrada"}</div><div class="stat-value">${selected==="all"?Number(report.visits?.period||0):esc(ownerBranchName(selected))}</div><small>${esc(allReport.from||"")} até ${esc(allReport.to||"")}</small></div>
  </div>
  <div class="management-insights">
    <section class="panel ranking-panel"><div class="panel-head"><div><h2>Produtos mais vendidos</h2><span class="muted">Pedidos cancelados não entram no ranking.</span></div></div><div class="ranking-list">${report.products?.length?report.products.map((item,index)=>`<div><b>${index+1}</b><span><strong>${esc(item.product_name)}</strong><small>${Number(item.quantity||0)} unidade(s)</small></span><strong>${money(item.total_cents||0)}</strong></div>`).join(""):'<div class="empty">Ainda não há vendas.</div>'}</div></section>
    <section class="panel ranking-panel"><div class="panel-head"><div><h2>Bairros mais atendidos</h2><span class="muted">Entregas concluídas e em andamento.</span></div></div><div class="ranking-list">${report.neighborhoods?.length?report.neighborhoods.map((item,index)=>`<div><b>${index+1}</b><span><strong>${esc(item.neighborhood)}</strong><small>${esc(item.city||"")} • ${Number(item.order_count||0)} pedido(s)</small></span><strong>${money(item.total_cents||0)}</strong></div>`).join(""):'<div class="empty">Ainda não há entregas.</div>'}</div></section>
    <section class="panel visit-history-panel"><div class="panel-head"><div><h2>Visitas por dia</h2><span class="muted">Contagem única por aparelho, somente do horário de abertura até meia-noite.</span></div><strong>${Number(report.visits?.period||0)} no período</strong></div><div class="visit-history-list">${report.visits?.by_day?.length?report.visits.by_day.map(day=>`<div><span>${new Date(`${day.visited_on}T12:00:00`).toLocaleDateString("pt-BR")}</span><strong>${Number(day.visits||0)} visita(s)</strong></div>`).join(""):'<div class="empty">Nenhuma visita válida no período.</div>'}</div></section>
  </div>
  <section class="panel management-table-panel"><div class="panel-head"><div><h2>Pedidos ${selected==="all"?"das duas unidades":`de ${esc(ownerBranchName(selected))}`}</h2><span class="muted">Histórico completo, inclusive cancelados e dias anteriores.</span></div><input id="management-search" class="management-search" placeholder="Buscar pedido, cliente ou bairro"></div><div class="management-table-wrap"><table class="management-table"><thead><tr><th>Data</th><th>Unidade</th><th>Pedido</th><th>Cliente</th><th>Origem</th><th>Bairro</th><th>Status</th><th>Pagamento</th><th>Total</th></tr></thead><tbody>${orders.map(order=>`<tr data-management-row data-search="${esc(`${order.id} ${order.customer_name||""} ${order.neighborhood||""} ${order.city||""}`.toLowerCase())}"><td>${managementDate(order.created_at)}</td><td><span class="owner-branch-tag ${esc(order.branch_id||"dom-avelar")}">${esc(ownerBranchName(order.branch_id))}</span></td><td><strong>${esc(order.id)}</strong></td><td>${esc(order.customer_name||"Cliente")}</td><td>${order.channel==="online"?"Site":"Balcão"}<small>${esc(orderTypeLabel(order.order_type))}</small></td><td>${esc(order.neighborhood||"—")}${order.city?`<small>${esc(order.city)}</small>`:""}</td><td><span class="management-status ${esc(order.status)}">${esc(statusLabel(order.status))}</span></td><td>${esc(paymentLabel(order.payment_method))}<small>${order.payment_status==="aberto"?"Em aberto":"Pago"}</small></td><td><strong>${money(order.total_cents||0)}</strong></td></tr>`).join("")||'<tr><td colspan="9" class="empty">Nenhum pedido registrado.</td></tr>'}</tbody></table></div></section>`;
}

const dashboardRevenueView=revenueView;
revenueView=function(){
  const html=dashboardRevenueView(),report=state.admin.revenue;
  if(!report)return html;
  return html.replace('</div><div class="revenue-grid">',`<div class="stat stat-visits"><div class="stat-label">Visitas no período</div><div class="stat-value">${Number(report.visit_count||0)}</div><small>Da abertura até meia-noite</small></div></div><div class="revenue-grid">`);
};

async function loadBranchNeighborhoodFees(){
  const data=await api("/api/admin/neighborhood-fees");
  state.admin.neighborhoodFees=data.fees||[];
}

function branchNeighborhoodRows(){
  const grouped=new Map();
  for(const fee of state.admin.neighborhoodFees||[]){
    const key=`${fee.city}\u0000${fee.neighborhood}`;
    if(!grouped.has(key))grouped.set(key,{city:fee.city,neighborhood:fee.neighborhood,sao:700,dom:500});
    const row=grouped.get(key);
    if(fee.branch_id==="sao-goncalo")row.sao=Number(fee.fee_cents||0);
    if(fee.branch_id==="dom-avelar")row.dom=Number(fee.fee_cents||0);
  }
  return [...grouped.values()].sort((a,b)=>a.city.localeCompare(b.city,"pt-BR")||a.neighborhood.localeCompare(b.neighborhood,"pt-BR"));
}

function branchFeeValue(cents){return (Math.max(0,Number(cents)||0)/100).toFixed(2).replace(".",",")}

function neighborhoodsView(){
  const rows=branchNeighborhoodRows();
  return `<form id="neighborhoods-form" class="settings-stack"><section class="panel branch-fees-panel"><div class="panel-head"><div><h2>Bairros e taxas de entrega</h2><span class="muted">${rows.length} bairros de Petrolina e Juazeiro. Cada coluna vale somente para a unidade indicada.</span></div></div><div class="branch-fee-help"><strong>Valores iniciais cadastrados:</strong> São Gonçalo R$ 7,00 e Dom Avelar R$ 5,00. Você pode alterar cada preço nesta tela.</div><div class="branch-fee-table"><div class="branch-fee-row branch-fee-heading"><span>Cidade</span><span>Bairro</span><span>São Gonçalo (R$)</span><span>Dom Avelar (R$)</span></div>${rows.map(row=>`<div class="branch-fee-row" data-branch-fee-row data-city="${esc(row.city)}" data-neighborhood="${esc(row.neighborhood)}"><strong>${esc(row.city)}</strong><span>${esc(row.neighborhood)}</span><label><span class="sr-only">Taxa São Gonçalo para ${esc(row.neighborhood)}</span><input data-sao-fee inputmode="decimal" value="${branchFeeValue(row.sao)}"></label><label><span class="sr-only">Taxa Dom Avelar para ${esc(row.neighborhood)}</span><input data-dom-fee inputmode="decimal" value="${branchFeeValue(row.dom)}"></label></div>`).join("")||'<div class="empty">Carregando bairros cadastrados…</div>'}</div></section><div class="settings-save"><button class="primary-btn">Salvar taxas das duas unidades</button></div></form>`;
}

function bindNeighborhoods(){
  const form=$("#neighborhoods-form");if(!form)return;
  const cents=value=>Math.max(0,Math.min(100000,Math.round(Number(String(value||"").replace(",","."))*100)||0));
  form.onsubmit=async event=>{event.preventDefault();const button=form.querySelector("button.primary-btn"),fees=[...form.querySelectorAll("[data-branch-fee-row]")].map(row=>({city:row.dataset.city,neighborhood:row.dataset.neighborhood,sao_goncalo_fee_cents:cents(row.querySelector("[data-sao-fee]").value),dom_avelar_fee_cents:cents(row.querySelector("[data-dom-fee]").value)}));button.disabled=true;try{await api("/api/admin/neighborhood-fees",{method:"PUT",body:JSON.stringify({fees})});await loadBranchNeighborhoodFees();renderAdmin();toast("Taxas atualizadas para São Gonçalo e Dom Avelar")}catch(error){toast(error.message);button.disabled=false}};
}

const dashboardSettingsView=settingsView;
settingsView=function(){
  return dashboardSettingsView().replace(/<section class="panel"><div class="panel-head"><div><h2>Taxas de entrega por bairro<\/h2>[\s\S]*?<\/section>(?=<section class="panel"><div class="panel-head"><div><h2>Taxa de garçom<\/h2>)/,"");
};

bindSettings=function(){
  $("#store-open").onclick=()=>$("#store-open").classList.toggle("on");
  $("#generate-print-key").onclick=()=>{const bytes=crypto.getRandomValues(new Uint8Array(18));$("[name=print_bridge_key]").value=Array.from(bytes,byte=>byte.toString(16).padStart(2,"0")).join("")};
  $("#download-bridge").onclick=downloadPrintBridge;
};

setupTableSettings=function(){
  const form=$("#settings-form"),settings=state.catalog.settings;if(!form)return;
  if(!form.querySelector("[name=table_count]"))form.insertAdjacentHTML("afterbegin",`<section class="panel table-settings"><div class="panel-head"><div><h2>Mesas e Destaques</h2><span class="muted">Defina as mesas e quantos produtos mais pedidos aparecem em Destaques.</span></div><a class="secondary-btn" href="/mesas" target="_blank" rel="noopener noreferrer">Abrir telão</a></div><div class="settings-grid"><div class="field"><label>Quantidade de mesas</label><input type="number" name="table_count" min="0" max="200" value="${Number(settings.table_count||0)}"></div><div class="field"><label>Produtos em Destaques</label><input type="number" name="featured_product_limit" min="1" max="30" value="${Number(settings.featured_product_limit||15)}"><small>Exibe automaticamente os produtos mais pedidos.</small></div></div></section>`);
  form.onsubmit=async event=>{event.preventDefault();const data=new FormData(form),button=form.querySelector("button.primary-btn"),payload={is_open:$("#store-open").classList.contains("on"),closing_time:data.get("closing_time"),minimum_order_cents:Math.max(0,Math.round(Number(String(data.get("minimum_order")).replace(",","."))*100)||0),delivery_eta:data.get("delivery_eta"),pickup_eta:data.get("pickup_eta"),phone:data.get("phone"),address:data.get("address"),table_count:Math.max(0,Math.min(200,Number(data.get("table_count"))||0)),featured_product_limit:Math.max(1,Math.min(30,Number(data.get("featured_product_limit"))||15)),waiter_fee_enabled:form.elements.waiter_fee_enabled.checked,waiter_fee_percent:Number(data.get("waiter_fee_percent")),auto_print_enabled:form.elements.auto_print_enabled.checked,reception_printer:data.get("reception_printer"),kitchen_printer:data.get("kitchen_printer"),print_bridge_key:data.get("print_bridge_key"),print_copies:Math.max(1,Math.min(5,Number(data.get("print_copies"))||1))};button.disabled=true;try{await api("/api/admin/settings",{method:"PATCH",body:JSON.stringify(payload)});state.catalog=await api("/api/admin/products");state.admin.printStatus=await api("/api/admin/print-status");renderAdmin();toast("Configurações salvas")}catch(error){toast(error.message);button.disabled=false}};
};

const dashboardAdminNavButtons=adminNavButtons;
adminNavButtons=function(){
  const management=`<button class="${state.admin.view==="management"?"active":""}" data-admin-view="management"><span class="admin-nav-icon">▦</span><span class="nav-full">Gestão de pedidos</span><span class="nav-short">Gestão</span></button>`;
  const neighborhoods=`<button class="${state.admin.view==="neighborhoods"?"active":""}" data-admin-view="neighborhoods"><span class="admin-nav-icon">⌖</span><span class="nav-full">Bairros e taxas</span><span class="nav-short">Bairros</span></button>`;
  return dashboardAdminNavButtons().replace(/(<button[^>]+data-admin-view="orders"[\s\S]*?<\/button>)/,"$1"+management).replace(/(<button[^>]+data-admin-view="settings")/,neighborhoods+"$1");
};

const dashboardAdminLayout=adminLayout;
adminLayout=function(content,title){
  return dashboardAdminLayout(content,title)
    .replace('<div class="admin-shell">',`<div class="admin-shell ${state.admin.sidebarCollapsed?"sidebar-collapsed":""} ${state.admin.sidebarOpen?"sidebar-open":""}">`)
    .replace('<nav class="admin-nav">','<button class="sidebar-mobile-close" id="sidebar-mobile-close" type="button"><span>☰</span> Ocultar menu</button><nav class="admin-nav">')
    .replace('<header class="admin-topbar"><h1>','<header class="admin-topbar"><div class="admin-title-group"><button class="sidebar-toggle" id="sidebar-toggle" type="button" aria-label="Abrir ou ocultar menu" aria-expanded="true"><span></span><span></span><span></span></button><h1>')
    .replace('</h1><div class="admin-top-actions">','</h1></div><div class="admin-top-actions">');
};

const dashboardRenderAdmin=renderAdmin;
renderAdmin=function(){
  if(state.admin.view==="management"){$("#app").innerHTML=adminLayout(orderManagementView(),"Gestão de Pedidos");bindAdmin();return}
  if(state.admin.view==="neighborhoods"){$("#app").innerHTML=adminLayout(neighborhoodsView(),"Bairros e taxas");bindAdmin();bindNeighborhoods();return}
  dashboardRenderAdmin();
};

const dashboardBindAdmin=bindAdmin;
bindAdmin=function(){
  dashboardBindAdmin();
  const toggleMenu=()=>{if(matchMedia("(max-width:850px)").matches)state.admin.sidebarOpen=!state.admin.sidebarOpen;else{state.admin.sidebarCollapsed=!state.admin.sidebarCollapsed;localStorage.setItem("jw_admin_sidebar_collapsed",state.admin.sidebarCollapsed?"1":"0")}renderAdmin()};
  const toggle=$("#sidebar-toggle"),mobileClose=$("#sidebar-mobile-close");if(toggle)toggle.onclick=toggleMenu;if(mobileClose)mobileClose.onclick=toggleMenu;
  document.querySelectorAll("[data-admin-view]").forEach(button=>button.addEventListener("click",()=>{state.admin.sidebarOpen=false}));
  document.querySelectorAll('[data-admin-view="management"]').forEach(button=>button.onclick=async()=>{state.admin.view="management";await loadOrderManagement();renderAdmin()});
  document.querySelectorAll('[data-admin-view="neighborhoods"]').forEach(button=>button.onclick=async()=>{state.admin.view="neighborhoods";await loadBranchNeighborhoodFees();renderAdmin()});
  if(state.admin.view==="management"){
    $("#management-search").oninput=event=>{const query=event.target.value.trim().toLowerCase();document.querySelectorAll("[data-management-row]").forEach(row=>row.classList.toggle("hidden",!row.dataset.search.includes(query)))};
    document.querySelectorAll("[data-management-branch]").forEach(button=>button.onclick=()=>{state.admin.managementBranchFilter=button.dataset.managementBranch;renderAdmin()});
    $("#apply-management-period").onclick=async()=>{const button=$("#apply-management-period");button.disabled=true;await loadOrderManagement($("#management-from").value,$("#management-to").value);renderAdmin()};
  }
};

/* Loja fechada: cardápio continua visível, mas somente para consulta. */
function closedCatalogNotice(){
  return `<section class="closed-catalog-notice compact"><span class="closed-pill">Fechado</span><strong>Cardápio somente para consulta</strong></section>`;
}

renderCustomer=function(){
  document.title="Bliss Açaiteria — Cardápio";
  document.body.classList.add("customer-page");
  const closed=!state.catalog.settings.is_open;
  let html=customerApp();
  if(closed)html=html.replace('<div class="customer-shell">','<div class="customer-shell store-closed-mode">').replace('<main class="catalog-content">',`${closedCatalogNotice()}<main class="catalog-content">`);
  $("#app").innerHTML=html;applyBlissBrand();bindCustomer();
  if(closed){
    state.cart=[];updateCartBadges();
    document.querySelectorAll("[data-product]").forEach(button=>{button.disabled=true;button.setAttribute("aria-disabled","true");button.title="Estabelecimento fechado — produto disponível somente para consulta"});
    const cart=$(".cart-top");if(cart){cart.disabled=true;cart.innerHTML="Pedidos fechados"}
    const info=$("#closed-catalog-info");if(info)info.onclick=openInfo;
  }
};

const dashboardOpenProduct=openProduct;
openProduct=function(id,cart=state.cart,onAdded=null){
  if(cart===state.cart&&!state.catalog?.settings?.is_open)return toast("O estabelecimento está fechado. O cardápio está disponível somente para consulta.");
  return dashboardOpenProduct(id,cart,onAdded);
};

const truffledBottleOpenProduct=openProduct;
openProduct=function(id,cart=state.cart,onAdded=null){
  const productId=Number(id),isTruffledBottle=[1,2].includes(productId),isMilkshake=[10,11].includes(productId),flavorIncludedInBasePrice=[1,2,10,11].includes(productId);
  if(!isTruffledBottle&&!isMilkshake)return truffledBottleOpenProduct(id,cart,onAdded);
  if(cart===state.cart&&!state.catalog?.settings?.is_open)return toast("O estabelecimento está fechado. O cardápio está disponível somente para consulta.");
  const product=state.catalog.products.find(item=>Number(item.id)===Number(id));if(!product||!product.is_available)return;
  state.detail=product;state.detailQty=1;
  const options=(product.complements||[]).map(option=>({...option,quantity:0}));
  const choices=options.map((option,index)=>`<button type="button" class="flavor-choice" data-flavor-index="${index}"><span><strong>${esc(option.name)}</strong>${flavorIncludedInBasePrice?"":`<small>${money(option.price_cents)}</small>`}</span><b>Selecionar</b></button>`).join("");
  const heading=isTruffledBottle?"GARRAFINHA TRUFADA":"MILK SHAKE";
  const priceHint=`O sabor é obrigatório e já está incluído no preço fixo de ${money(product.price_cents)}.`;
  layer(`<div class="drawer-header"><button class="icon-btn" data-close aria-label="Voltar">←</button><h2>${heading}</h2></div><img class="detail-hero" src="${esc(product.image_url)}" alt="${esc(product.name)}"><div class="detail-body"><h2>${esc(product.name)}</h2><div class="muted">${esc(product.description)}</div><div class="detail-price">${money(product.price_cents)}</div><section class="complements-panel flavor-picker"><div class="panel-head"><div><strong>Escolha o sabor</strong><div class="muted">Obrigatório • escolha 1 sabor<br>${priceHint}</div></div></div><div class="flavor-options">${choices}</div></section><div class="note-box"><label for="detail-note">Observações</label><textarea id="detail-note" maxlength="300" placeholder="Ex.: sem tampa, pouco creme..."></textarea></div></div><div class="detail-action"><div class="stepper"><button data-q="-1">−</button><span id="detail-qty">1</span><button data-q="1">+</button></div><button class="primary-btn" id="detail-add" disabled>Adicionar • <span id="detail-total">${money(product.price_cents)}</span></button></div>`,"product-detail");
  const unit=()=>flavorIncludedInBasePrice?Number(product.price_cents):Number(product.price_cents)+options.reduce((sum,option)=>sum+Number(option.price_cents||0)*option.quantity,0),refresh=()=>{$("#detail-qty").textContent=state.detailQty;$("#detail-total").textContent=money(unit()*state.detailQty)};
  document.querySelector("[data-close]").onclick=closeLayer;
  document.querySelectorAll("[data-q]").forEach(button=>button.onclick=()=>{state.detailQty=Math.max(1,Math.min(20,state.detailQty+Number(button.dataset.q)));refresh()});
  document.querySelectorAll("[data-flavor-index]").forEach(button=>button.onclick=()=>{const index=Number(button.dataset.flavorIndex);options.forEach(option=>option.quantity=0);options[index].quantity=1;document.querySelectorAll("[data-flavor-index]").forEach(choice=>{const selected=Number(choice.dataset.flavorIndex)===index;choice.classList.toggle("selected",selected);choice.querySelector("b").textContent=selected?"Escolhido":"Selecionar"});$("#detail-add").disabled=false;refresh()});
  $("#detail-add").onclick=()=>{if(!options.some(option=>option.quantity))return toast("Escolha um sabor para continuar");addItem(product,state.detailQty,cart,options.filter(option=>option.quantity).map(({name,price_cents,quantity})=>({name,price_cents,quantity})),$("#detail-note").value.trim());updateCartBadges();closeLayer();if(onAdded)onAdded();toast("Produto adicionado")};
};

/* Pré-integração PedeAI: dados privados aparecem somente no painel autenticado. */
const pedeaiSettingsView=settingsView;
settingsView=function(){
  const settings=state.catalog.settings||{},webhook=`${location.origin}/api/integrations/pedeai/webhook`;
  const section=`<section class="panel pedeai-panel"><div class="panel-head"><div><h2>Configuração PedeAI</h2><span class="muted">Prepare os dados da integração. O recebimento fica desligado até a homologação.</span></div><span class="connection-pill ${settings.pedeai_api_token_configured&&settings.pedeai_store_id?"ready":""}">${settings.pedeai_enabled?"Recebimento ativado":"Pré-configuração"}</span></div><div class="pedeai-notice"><strong>Etapa atual: preparação</strong><span>Preencha os dados enviados pelo PedeAI, salve e só ative o recebimento depois dos testes de homologação.</span></div><div class="settings-grid"><div class="field"><label>Ambiente</label><select name="pedeai_environment"><option value="sandbox" ${settings.pedeai_environment!=="production"?"selected":""}>Sandbox / homologação</option><option value="production" ${settings.pedeai_environment==="production"?"selected":""}>Produção</option></select></div><div class="field"><label>ID da loja no PedeAI</label><input name="pedeai_store_id" maxlength="160" value="${esc(settings.pedeai_store_id||"")}" placeholder="Informado pelo PedeAI"></div><div class="field"><label>Client ID / App ID</label><input name="pedeai_client_id" maxlength="160" value="${esc(settings.pedeai_client_id||"")}" placeholder="Informado pelo PedeAI"></div><div class="field"><label>URL base da API</label><input name="pedeai_api_base_url" type="url" maxlength="300" value="${esc(settings.pedeai_api_base_url||"")}" placeholder="https://... fornecida pelo PedeAI"></div><div class="field"><label>Token de acesso</label><input name="pedeai_api_token" type="password" autocomplete="new-password" placeholder="${settings.pedeai_api_token_configured?"Token salvo - preencha apenas para trocar":"Cole o token fornecido pelo PedeAI"}"><small>O valor não é exibido novamente no painel.</small></div><div class="field"><label>Segredo do webhook</label><input name="pedeai_webhook_secret" type="password" autocomplete="new-password" placeholder="${settings.pedeai_webhook_secret_configured?"Segredo salvo - preencha apenas para trocar":"Informe se o PedeAI fornecer um segredo"}"><small>Usado para validar os envios do PedeAI.</small></div><div class="field wide"><label>URL de recebimento a informar ao PedeAI</label><div class="field-action"><input readonly value="${esc(webhook)}"><button class="secondary-btn" type="button" data-copy-pedeai-webhook>Copiar</button></div><small>Este endereço já está reservado no sistema para a integração.</small></div></div><label class="check-row pedeai-enable"><input type="checkbox" name="pedeai_enabled" ${settings.pedeai_enabled?"checked":""}><span><strong>Ativar recebimento de pedidos PedeAI</strong><small>Marque somente quando o PedeAI confirmar a homologação. Pedidos recebidos aparecerão como Delivery (PedeAI).</small></span></label></section>`;
  return pedeaiSettingsView().replace('<div class="settings-save">',section+'<div class="settings-save">');
};

const pedeaiSetupSettings=setupTableSettings;
setupTableSettings=function(){
  pedeaiSetupSettings();
  const form=$("#settings-form");if(!form)return;
  const copy=form.querySelector("[data-copy-pedeai-webhook]");if(copy)copy.onclick=async()=>{try{await navigator.clipboard.writeText(`${location.origin}/api/integrations/pedeai/webhook`);toast("URL do webhook copiada")}catch{toast("Copie a URL exibida no campo")}};
  form.onsubmit=async event=>{event.preventDefault();const data=new FormData(form),button=form.querySelector("button.primary-btn"),payload={is_open:$("#store-open").classList.contains("on"),closing_time:data.get("closing_time"),minimum_order_cents:Math.max(0,Math.round(Number(String(data.get("minimum_order")).replace(",","."))*100)||0),delivery_eta:data.get("delivery_eta"),pickup_eta:data.get("pickup_eta"),phone:data.get("phone"),address:data.get("address"),table_count:Math.max(0,Math.min(200,Number(data.get("table_count"))||0)),featured_product_limit:Math.max(1,Math.min(30,Number(data.get("featured_product_limit"))||15)),employee_discount_percent:Math.max(0,Math.min(100,Number(data.get("employee_discount_percent"))||0)),delivery_neighborhood_fees:collectOwnerDeliveryRules(),delivery_surcharge_enabled:form.elements.delivery_surcharge_enabled.checked,delivery_surcharge_percent:Number(data.get("delivery_surcharge_percent")),delivery_surcharge_label:data.get("delivery_surcharge_label"),waiter_fee_enabled:form.elements.waiter_fee_enabled.checked,waiter_fee_percent:Number(data.get("waiter_fee_percent")),auto_print_enabled:form.elements.auto_print_enabled.checked,reception_printer:data.get("reception_printer"),kitchen_printer:data.get("kitchen_printer"),print_bridge_key:data.get("print_bridge_key"),print_copies:Math.max(1,Math.min(5,Number(data.get("print_copies"))||1)),pedeai_enabled:form.elements.pedeai_enabled.checked,pedeai_environment:data.get("pedeai_environment"),pedeai_store_id:data.get("pedeai_store_id"),pedeai_client_id:data.get("pedeai_client_id"),pedeai_api_base_url:data.get("pedeai_api_base_url"),pedeai_api_token:data.get("pedeai_api_token"),pedeai_webhook_secret:data.get("pedeai_webhook_secret")};button.disabled=true;try{await api("/api/admin/settings",{method:"PATCH",body:JSON.stringify(payload)});state.catalog=await api("/api/admin/products");state.admin.printStatus=await api("/api/admin/print-status");toast("Configurações salvas");renderAdmin()}catch(error){toast(error.message);button.disabled=false}};
};

const pedeaiOrderCard=orderCard;
orderCard=function(order){
  const html=pedeaiOrderCard(order);
  return order.channel==="pedeai"?html.replace(/DELIVERY • SITE/g,"DELIVERY • PEDEAI"):html;
};

/* Bairro pesquisável com alternativa para digitação manual. */
const OTHER_NEIGHBORHOOD="Outro bairro (digitar)";
function searchableNeighborhoodNames(city){
  const configured=(state.catalog?.settings?.delivery_neighborhood_fees||[]).filter(rule=>rule.city===city).map(rule=>rule.neighborhood);
  return [...new Set([...configured,...(DELIVERY_NEIGHBORHOODS[city]||[])])].sort((a,b)=>a.localeCompare(b,"pt-BR"));
}
function searchableNeighborhoodMarkup(city,prefix="neighborhood"){
  return `<div class="neighborhood-combobox"><input id="${prefix}-search" autocomplete="off" placeholder="Digite para pesquisar o bairro" data-delivery-required required aria-autocomplete="list" aria-controls="${prefix}-suggestions" aria-expanded="false"><div class="neighborhood-suggestions hidden" id="${prefix}-suggestions" role="listbox"></div></div><input type="hidden" name="neighborhood" id="${prefix}-value"><div class="other-neighborhood-field hidden" id="${prefix}-other-field"><label>Digite o nome do bairro *</label><input id="${prefix}-other" maxlength="100" placeholder="Nome completo do bairro"></div><small class="neighborhood-search-help">Digite algumas letras: por exemplo, “São” mostra todos os bairros correspondentes na lista abaixo.</small>`;
}
function bindNeighborhoodSearch(prefix,cityElement,onChange,isRequired,allowOther=true){
  const search=$(`#${prefix}-search`),value=$(`#${prefix}-value`),suggestions=$(`#${prefix}-suggestions`),otherField=$(`#${prefix}-other-field`),other=$(`#${prefix}-other`);
  const names=()=>[...searchableNeighborhoodNames(cityElement.value),...(allowOther?[OTHER_NEIGHBORHOOD]:[])];
  const normalize=text=>String(text||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
  const placeList=()=>{if(!window.matchMedia?.("(max-width:720px)").matches)return;const rect=search.getBoundingClientRect(),viewport=window.visualViewport?.height||window.innerHeight,maxHeight=Math.min(210,Math.max(120,viewport-rect.bottom-14)),above=viewport-rect.bottom<120;Object.assign(suggestions.style,{position:"fixed",left:`${rect.left}px`,width:`${rect.width}px`,top:above?`${Math.max(8,rect.top-210-6)}px`:`${rect.bottom+6}px`,maxHeight:`${above?Math.min(210,Math.max(120,rect.top-14)):maxHeight}px`})};
  const close=()=>{suggestions.classList.add("hidden");search.setAttribute("aria-expanded","false")};
  const select=name=>{search.value=name;search.setCustomValidity("");const isOther=name===OTHER_NEIGHBORHOOD;otherField.classList.toggle("hidden",!isOther);other.required=isOther&&Boolean(isRequired());value.value=isOther?other.value.trim():name;close();onChange()};
  const render=()=>{const query=normalize(search.value),matches=names().filter(name=>normalize(name).includes(query)),empty=allowOther?'Nenhum bairro encontrado. Escolha “Outro bairro”.':'Nenhum bairro encontrado. Tente pesquisar pelo nome cadastrado.';suggestions.innerHTML=matches.length?matches.map(name=>`<button type="button" role="option" data-neighborhood-option="${esc(name)}">${esc(name)}</button>`).join(""):`<div class="neighborhood-empty">${empty}</div>`;suggestions.classList.remove("hidden");placeList();search.setAttribute("aria-expanded","true");suggestions.querySelectorAll("[data-neighborhood-option]").forEach(button=>button.onmousedown=event=>{event.preventDefault();select(button.dataset.neighborhoodOption)})};
  search.onfocus=render;search.oninput=()=>{value.value="";search.setCustomValidity(search.value.trim()?"Selecione um bairro da lista.":"");otherField.classList.add("hidden");other.required=false;render();onChange()};search.onblur=()=>setTimeout(close,120);other.oninput=()=>{value.value=other.value.trim();onChange()};
  window.visualViewport?.addEventListener("resize",placeList);window.visualViewport?.addEventListener("scroll",placeList);
  value.value="";otherField.classList.add("hidden");
}

const dashboardOpenCheckout=openCheckout;
openCheckout=function(){
  if(!state.catalog.settings.is_open)return toast("O estabelecimento está fechado e não está recebendo pedidos agora.");
  dashboardOpenCheckout();
  const segmented=$(".segmented");if(segmented)segmented.innerHTML='<button type="button" data-type="delivery">Entrega/Delivery</button><button type="button" data-type="pickup">Retirada no local</button><button type="button" data-type="dine_in">Consumir no local</button>';
  const city=$("[name=city]"),oldNeighborhood=$("[name=neighborhood]");if(!city||!oldNeighborhood)return;
  const field=oldNeighborhood.closest(".field");field.innerHTML=`<label>Bairro *</label><div id="searchable-neighborhood">${searchableNeighborhoodMarkup(city.value)}</div>`;
  const payment=$("[name=payment_method]"),paymentField=payment?.closest(".field");
  if(paymentField&&!$("#checkout-needs-change"))paymentField.insertAdjacentHTML("afterend",`<label class="check-row" id="checkout-change-option"><input type="checkbox" id="checkout-needs-change"><span><strong>Preciso de troco</strong><small>Marque somente se você pagará em dinheiro e precisa receber troco.</small></span></label><div class="field hidden" id="checkout-cash-received-field"><label>Valor em dinheiro que vai pagar</label><input id="checkout-cash-received" inputmode="decimal" placeholder="Ex.: 50,00"><small id="checkout-cash-change">Informe o valor para calcular o troco.</small></div>`);
  const needsChange=$("#checkout-needs-change"),cashReceived=$("#checkout-cash-received"),cashReceivedField=$("#checkout-cash-received-field"),cashChange=$("#checkout-cash-change"),parseCash=value=>Math.max(0,Math.round(Number(String(value||"").replace(/[^0-9,.-]/g,"").replace(/\./g,"").replace(",","."))*100)||0),refreshCashChange=()=>{const cash=payment?.value==="dinheiro",needs=cash&&needsChange?.checked;$("#checkout-change-option")?.classList.toggle("hidden",!cash);cashReceivedField?.classList.toggle("hidden",!needs);if(!cash&&needsChange)needsChange.checked=false;if(cashReceived){cashReceived.required=Boolean(needs);const received=parseCash(cashReceived.value),difference=received-checkoutTotal();cashReceived.setCustomValidity(needs&&cashReceived.value.trim()&&difference<0?"O valor precisa ser igual ou maior que o total do pedido.":"");if(cashChange)cashChange.textContent=needs?(cashReceived.value.trim()?`Troco: ${money(Math.max(0,difference))}`:"Informe o valor para calcular o troco."):""}};
  const refreshCheckout=()=>{updateCheckoutFee();refreshCashChange()};
  const bindSearch=()=>bindNeighborhoodSearch("neighborhood",city,refreshCheckout,()=>state.checkoutType==="delivery",false);
  const rebuild=()=>{const wrapper=$("#searchable-neighborhood");wrapper.innerHTML=searchableNeighborhoodMarkup(city.value);bindSearch()};
  city.onchange=rebuild;bindSearch();
  const setOrderType=type=>{state.checkoutType=type;document.querySelectorAll("[data-type]").forEach(button=>button.classList.toggle("active",button.dataset.type===type));const delivery=type==="delivery";$("#address-field").classList.toggle("hidden",!delivery);setDeliveryRequired(delivery);$("#checkout-fee-row").classList.toggle("hidden",!delivery);const other=$("#neighborhood-other");if(other)other.required=delivery&&$("#neighborhood-search")?.value===OTHER_NEIGHBORHOOD;refreshCheckout()};
  payment.onchange=refreshCashChange;needsChange.onchange=refreshCashChange;cashReceived.oninput=refreshCashChange;document.querySelectorAll("[data-type]").forEach(button=>button.onclick=()=>setOrderType(button.dataset.type));setOrderType("delivery");
};

const typeAwareOrderCard=orderCard;
orderCard=function(order){
  const oldType=order.order_type==="delivery"?"Entrega":"Retirada";
  let html=typeAwareOrderCard(order).replace(`<div class="order-meta">${oldType}`,`<div class="order-meta">${esc(orderTypeLabel(order.order_type))}`);
  if(order.channel==="online"&&order.order_type!=="delivery")html=html.replace(/DELIVERY • SITE/g,"SITE");
  return html;
};

const typeAwareOrderDetails=openOrderDetails;
openOrderDetails=function(id){
  typeAwareOrderDetails(id);
  const order=state.admin.orders.find(item=>item.id===id),labels=[...document.querySelectorAll(".order-detail-content .detail-grid span")];
  const label=labels.find(item=>item.textContent.trim()==="Tipo do pedido");if(order&&label?.nextElementSibling)label.nextElementSibling.textContent=orderTypeLabel(order.order_type);
  const source=document.querySelector(".order-detail-content .source-tag");if(order?.channel==="online"&&order.order_type!=="delivery"&&source)source.textContent="SITE";
};

const typeAwareCustomerMessage=customerOrderMessage;
customerOrderMessage=function(order){
  let message=typeAwareCustomerMessage(order).replace(`PEDIDO: ${order.id}`,`PEDIDO: ${order.id}\nTIPO: ${orderTypeLabel(order.order_type).toUpperCase()}`);
  if(order.order_type==="dine_in")message=message.replace("PREVISÃO DE RETIRADA:","PREVISÃO DE PREPARO:");
  return message;
};

/* Desconto de funcionário: configurado pelo proprietário e aplicado somente pelo caixa. */
const employeeDiscountSettingsView=settingsView;
settingsView=function(){
  const settings=state.catalog?.settings||{},value=Math.max(0,Math.min(100,Number(settings.employee_discount_percent||0)));
  const section=`<section class="panel"><div class="panel-head"><div><h2>Desconto para funcionários</h2><span class="muted">O caixa poderá marcar “Cliente é funcionário” ao receber o pagamento. Por padrão, essa opção fica desmarcada.</span></div></div><div class="settings-grid"><div class="field"><label>Desconto padrão do funcionário (%)</label><input name="employee_discount_percent" type="number" min="0" max="100" step="0,01" inputmode="decimal" value="${value}"><small>Ex.: informe 10 para conceder 10% de desconto.</small></div></div></section>`;
  return employeeDiscountSettingsView().replace('<div class="settings-save">',section+'<div class="settings-save">');
};

const typeAwareOwnerStatusMessage=ownerStatusMessage;
ownerStatusMessage=function(order){
  const message=typeAwareOwnerStatusMessage(order);
  return order.order_type==="dine_in"?message.replace("pronto para retirada","pronto para consumir no local"):message;
};
