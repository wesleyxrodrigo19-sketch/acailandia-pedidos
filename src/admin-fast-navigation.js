/* A tela atual permanece visível até a próxima estar pronta, sem transição de carregamento. */
let adminNavigationRequest=0;

async function openAdminViewFast(view){
  const request=++adminNavigationRequest;
  try{
    if(view==="orders") await loadAdminOrders();
    else if(view==="pos") {
      if(!state.catalog)state.catalog=await api("/api/catalog?branch=acailandia");
      // Mesas são auxiliares: uma indisponibilidade nelas não pode impedir o balcão de abrir.
      if(!state.admin.tables)api("/api/admin/tables").then(data=>{state.admin.tables=data}).catch(()=>{});
    }
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
    if(request===adminNavigationRequest){state.admin.view=view;state.admin.sidebarOpen=false;renderAdmin();}
  }catch(error){
    if(request!==adminNavigationRequest)return;
    toast(error.message||"Não foi possível abrir esta tela. Tente novamente.");
  }
}

const bindAdminFastNavigation=bindAdmin;
bindAdmin=function(){
  bindAdminFastNavigation();
  document.querySelectorAll("[data-admin-view]").forEach(button=>button.onclick=event=>{event.preventDefault();openAdminViewFast(button.dataset.adminView)});
};
