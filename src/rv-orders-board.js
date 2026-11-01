(()=>{
const RV_NEXT={
  delivery:{novo:["confirmado","CONFIRMAR PEDIDO"],confirmado:["pronto","PEDIDO PRONTO"],preparando:["pronto","PEDIDO PRONTO"],pronto:["saiu_entrega","SAIU PARA ENTREGA"],saiu_entrega:["concluido","CONCLUÍDO"]},
  other:{novo:["confirmado","CONFIRMAR PEDIDO"],confirmado:["pronto","PEDIDO PRONTO"],preparando:["pronto","PEDIDO PRONTO"],pronto:["concluido","CONCLUÍDO"],saiu_entrega:["concluido","CONCLUÍDO"]}
};
const rvIcon=o=>o.order_type==="delivery"?"🛵":o.order_type==="dine_in"?"🍽":"🚶";
const rvStamp=o=>new Date(String(o.created_at||"").replace(" ","T")+"Z");
function rvElapsed(o){
  const min=Math.max(0,Math.floor((Date.now()-rvStamp(o).getTime())/60000));
  if(!Number.isFinite(min))return"";
  if(min<60)return`${min} min`;
  if(min<1440)return`${Math.floor(min/60)} h ${String(min%60).padStart(2,"0")} min`;
  return`${Math.floor(min/1440)} d`;
}
function rvStatusText(o){
  if(o.status==="pronto"&&o.order_type!=="delivery")return"Esperando retirada";
  if(o.status==="saiu_entrega")return"Saiu p/ entrega";
  return statusLabel(o.status);
}
function rvRow(o,selectedId){
  return`<button type="button" class="rv-row ${o.id===selectedId?"selected":""} st-${o.status}" data-rv-select="${esc(o.id)}"><span class="rv-avatar">${rvIcon(o)}</span><span class="rv-main"><strong>${esc(o.customer_name||"Cliente")} <small>#${esc(o.id)}</small></strong><span>${money(o.total_cents)}</span></span><span class="rv-side"><small>${rvElapsed(o)}</small><b class="rv-badge st-${o.status}">${rvStatusText(o)}</b></span></button>`;
}
function rvDetail(o){
  const time=rvStamp(o).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
  const next=(o.order_type==="delivery"?RV_NEXT.delivery:RV_NEXT.other)[o.status];
  const open=o.status!=="concluido"&&o.status!=="cancelado";
  return`<aside class="rv-detail"><header class="rv-detail-head"><span class="rv-avatar big">${rvIcon(o)}</span><div><strong>Pedido Nº ${esc(o.id)}</strong><span>Feito às ${time}${o.phone?` • ${esc(o.phone)}`:""}</span></div><div class="rv-detail-tools"><button type="button" class="rv-icon-btn" title="Imprimir comanda" data-rv-print="${esc(o.id)}">🖨</button><button type="button" class="rv-icon-btn" title="Imprimir conta do cliente" data-rv-receipt="${esc(o.id)}">🧾</button></div></header><div class="rv-status-bar st-${o.status}">${rvStatusText(o)} <small>há ${rvElapsed(o)}</small></div><div class="rv-detail-body"><div class="rv-chips"><span><small>Tipo</small><b>${orderTypeLabel(o.order_type)}</b></span><span><small>Canal</small><b>${o.channel==="online"?"Site":"Balcão"}</b></span></div>${cashierOrderCard(o)}</div>${next&&open?`<footer class="rv-detail-foot"><button type="button" class="rv-next-btn" data-rv-next="${esc(o.id)}" data-rv-status="${next[0]}">${next[1]}</button></footer>`:""}</aside>`;
}
cashierOrdersView=function(){
  const c=state.cashier,counter=c.view==="counter-orders",
    orders=(c.orders||[]).filter(o=>counter?o.channel==="counter":o.channel!=="counter").sort((a,b)=>String(b.created_at||"").localeCompare(String(a.created_at||""))),
    filter=c.orderFilter||"all",
    openList=orders.filter(o=>o.status!=="cancelado"&&o.status!=="concluido"),
    filtered=filter==="pending"?openList:filter==="paid"?orders.filter(o=>o.payment_status!=="aberto"&&o.status!=="cancelado"):filter==="cancelled"?orders.filter(o=>o.status==="cancelado"):orders,
    fresh=filtered.filter(o=>o.status==="novo"),
    others=filtered.filter(o=>o.status!=="novo");
  let selected=filtered.find(o=>o.id===c.selectedOrderId);
  if(!selected)selected=fresh[0]||others[0]||null;
  c.selectedOrderId=selected?selected.id:null;
  const tabs=[["all","Todos",orders.length],["pending","Em andamento",openList.length],["paid","Pagos",orders.filter(o=>o.payment_status!=="aberto"&&o.status!=="cancelado").length],["cancelled","Cancelados",orders.filter(o=>o.status==="cancelado").length]];
  return`<section class="rv-orders-wrap"><div class="rv-toolbar"><div class="counter-orders-tabs">${tabs.map(([v,l,n])=>`<button type="button" class="${filter===v?"active":""}" data-cashier-filter="${v}">${l}<span>${n}</span></button>`).join("")}</div><span class="muted">Atualiza a cada 15 s</span></div><div class="rv-orders"><section class="rv-col"><h3>Novos <span>${fresh.length}</span></h3><div class="rv-col-scroll">${fresh.length?fresh.map(o=>rvRow(o,c.selectedOrderId)).join(""):`<div class="rv-empty">Seus pedidos aparecerão aqui</div>`}</div></section><section class="rv-col"><h3>Em andamento e finalizados <span>${others.length}</span></h3><div class="rv-col-scroll">${others.length?others.map(o=>rvRow(o,c.selectedOrderId)).join(""):`<div class="rv-empty">Nenhum pedido nesta lista</div>`}</div></section>${selected?rvDetail(selected):`<aside class="rv-detail rv-detail-empty"><div class="rv-empty">Selecione um pedido para ver os detalhes</div></aside>`}</div></section>`;
};
const rvBaseRender=renderCashierPanel;
renderCashierPanel=function(){
  const keep=[...document.querySelectorAll(".rv-col-scroll,.rv-detail-body")].map(e=>e.scrollTop);
  const result=rvBaseRender.apply(this,arguments);
  document.querySelectorAll(".rv-col-scroll,.rv-detail-body").forEach((e,i)=>{e.scrollTop=keep[i]||0});
  return result;
};
document.addEventListener("click",async event=>{
  const row=event.target.closest("[data-rv-select]");
  if(row){state.cashier.selectedOrderId=row.dataset.rvSelect;renderCashierPanel();return}
  const next=event.target.closest("[data-rv-next]");
  if(next){
    next.disabled=true;
    try{
      await api(`/api/cashier/orders/${encodeURIComponent(next.dataset.rvNext)}`,{method:"PATCH",body:JSON.stringify({status:next.dataset.rvStatus})});
      await refreshCashier();renderCashierPanel();toast("Status atualizado");
    }catch(error){toast(error.message);next.disabled=false}
    return;
  }
  const print=event.target.closest("[data-rv-print],[data-rv-receipt]");
  if(print){
    const receipt=print.hasAttribute("data-rv-receipt"),id=receipt?print.dataset.rvReceipt:print.dataset.rvPrint;
    print.disabled=true;
    try{
      await api(`/api/admin/orders/${encodeURIComponent(id)}/${receipt?"print-receipt":"reprint"}`,{method:"POST"});
      toast(receipt?"Conta enviada para a impressora":"Comanda enviada para a impressora");
    }catch(error){toast(error.message)}
    print.disabled=false;
  }
});
})();
