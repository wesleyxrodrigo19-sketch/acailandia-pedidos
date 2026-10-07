/* Resposta imediata ao trocar de área do painel: evita a impressão de clique perdido. */
let adminNavigationRequest=0;

function adminLoadingScreen(view){
  const names={orders:"Pedidos",pos:"Balcão",products:"Produtos",revenue:"Faturamento",tables:"Mesas",settings:"Configurações",availability:"Funcionamento",management:"Gestão de pedidos",neighborhoods:"Bairros e taxas",audit:"Auditoria","cash-register":"Caixa",employees:"Funcionários"};
  return `<div class="panel admin-loading" role="status"><span class="admin-loading-spinner" aria-hidden="true"></span><div><strong>Abrindo ${esc(names[view]||"tela")}</strong><p class="muted">Carregando somente os dados necessários…</p></div></div>`;
}

async function openAdminViewFast(view){
  const request=++adminNavigationRequest;
  state.admin.view=view;
  state.admin.sidebarOpen=false;
  $("#app").innerHTML=adminLayout(adminLoadingScreen(view),"Painel da Açailandia");
  try{
    if(view==="orders") await loadAdminOrders();
    else if(view==="pos") await Promise.all([state.catalog?Promise.resolve():api("/api/admin/products").then(data=>{state.catalog=data}),state.admin.tables?Promise.resolve():api("/api/admin/tables").then(data=>{state.admin.tables=data})]);
    else if(view==="products") { if(!state.catalog)state.catalog=await api("/api/admin/products"); }
    else if(view==="revenue") await loadRevenue();
    else if(view==="tables") state.admin.tables=await api("/api/admin/tables");
    else if(view==="settings") { const [catalog,printStatus]=await Promise.all([api("/api/admin/products"),api("/api/admin/print-status")]);state.catalog=catalog;state.admin.printStatus=printStatus; }
    else if(view==="availability") state.catalog=await api("/api/admin/products");
    else if(view==="management") await loadOrderManagement();
    else if(view==="neighborhoods") await loadBranchNeighborhoodFees();
    else if(view==="audit") await loadAudit();
    else if(view==="cash-register") await loadCashRegister(true);
    else if(view==="employees") await loadEmployeeManagement();
    if(request===adminNavigationRequest)renderAdmin();
  }catch(error){
    if(request!==adminNavigationRequest)return;
    $("#app").innerHTML=adminLayout(`<div class="panel empty"><strong>Não foi possível abrir esta tela.</strong><p class="muted">${esc(error.message||"Tente novamente.")}</p><button class="primary-btn" id="retry-admin-view">Tentar novamente</button></div>`,"Painel da Açailandia");
    $("#retry-admin-view").onclick=()=>openAdminViewFast(view);
  }
}

const bindAdminFastNavigation=bindAdmin;
bindAdmin=function(){
  bindAdminFastNavigation();
  document.querySelectorAll("[data-admin-view]").forEach(button=>button.onclick=event=>{event.preventDefault();openAdminViewFast(button.dataset.adminView)});
};
