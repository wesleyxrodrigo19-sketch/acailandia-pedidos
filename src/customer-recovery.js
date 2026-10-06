/* Cabeçalho público inspirado na organização visual do cardápio original e recuperação de carrinhos. */
const JW_COVER="/media/acailandia-logo.svg";
state.admin.abandoned=[];
state.abandonedCart={id:null,timer:null,saving:false};

neighborhoodOptions=function(city){
  const configured=(state.catalog?.settings?.delivery_neighborhood_fees||[]).filter(rule=>rule.city===city).map(rule=>rule.neighborhood);
  const names=configured.length?configured:(DELIVERY_NEIGHBORHOODS[city]||[]);
  return `<option value="">Selecione o bairro</option>${names.map(name=>`<option value="${esc(name)}">${esc(name)}</option>`).join("")}`;
};

renderStoreHeader=function(settings){
  return `<section class="public-store-hero">
    <img class="store-cover" src="${JW_COVER}" alt="Açailandia PE" width="960" height="349" fetchpriority="high">
    <div class="store-profile-card xmenu-profile-card">
      <img class="store-profile-logo" src="${JW_LOGO}" alt="Logo Açailandia PE" width="120" height="120" fetchpriority="high">
      <div class="store-profile-copy">
        <h1>${esc(settings.store_name||"Açailandia PE")}</h1>
        <div class="store-summary-line">
          <span class="store-open-label ${settings.is_open?"":"closed"}">${settings.is_open?"Aberto":"Fechado"}</span>
          <i>•</i><span>📍 Petrolina · PE</span><i>•</i>
          <button type="button" class="store-more-info" data-action="info">Mais informações</button>
        </div>
        <div class="store-minimum">▣ <strong>Pedido mínimo ${money(settings.minimum_order_cents)}</strong></div>
        <div class="store-service-pills">
          <span>🛵 Entrega ~${esc(eta(settings.delivery_eta))}</span>
          <span>▰ Retirada ~${esc(eta(settings.pickup_eta))}</span>
        </div>
      </div>
    </div>
  </section>`;
};

function infoHoursMarkup(settings){
  const hours=settings.business_hours||[];
  return `<div class="public-info-list">${hours.length?hours.map(day=>`<div><span>${esc(day.label)}</span><strong>${day.enabled?`${esc(day.open)} – ${esc(day.close)}`:"Folga"}</strong></div>`).join(""):'<p class="muted">Horários não informados.</p>'}</div>`;
}
function infoNeighborhoodsMarkup(settings){
  const rules=infoNeighborhoodRules(settings);
  return `<div class="info-fee-heading"><strong>Bairros atendidos</strong><span>${rules.length} opções</span></div><div class="field info-neighborhood-search"><label for="info-neighborhood-search">Pesquisar bairro</label><input id="info-neighborhood-search" type="search" autocomplete="off" placeholder="Digite o nome do bairro"></div><div class="public-info-list fee-list" id="info-neighborhood-list">${infoNeighborhoodList(rules)}</div>${settings.delivery_surcharge_enabled?`<div class="fee-alert">${esc(settings.delivery_surcharge_label||"Acréscimo temporário")} • +${Number(settings.delivery_surcharge_percent||0)}%</div>`:""}`;
}
function infoNeighborhoodRules(settings){return [...(settings.delivery_neighborhood_fees||[])].sort((a,b)=>`${a.city||""} ${a.neighborhood||""}`.localeCompare(`${b.city||""} ${b.neighborhood||""}`,"pt-BR"));}
function infoNeighborhoodList(rules,query=""){
  const normalized=String(query).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
  const filtered=rules.filter(rule=>!normalized||`${rule.city||""} ${rule.neighborhood||""}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(normalized));
  return filtered.length?filtered.map(rule=>`<div><span><small>${esc(rule.city||"")}</small>${esc(rule.neighborhood)}</span><strong>${money(rule.fee_cents)}</strong></div>`).join(""):'<p class="muted">Nenhum bairro encontrado.</p>';
}
function bindInfoNeighborhoodSearch(settings){const input=$("#info-neighborhood-search"),list=$("#info-neighborhood-list");if(!input||!list)return;const rules=infoNeighborhoodRules(settings);input.oninput=()=>{list.innerHTML=infoNeighborhoodList(rules,input.value)};}
function infoStoreMarkup(settings){
  return `<div class="public-info-contact"><img src="${JW_LOGO}" alt=""><h3>Açailandia PE</h3><div class="public-info-list info-store-facts"><div><span><small>Localização</small>${esc(settings.address)}</span></div><div><span><small>Pedido mínimo</small>${money(settings.minimum_order_cents)}</span><strong>${settings.is_open?"Aberto":"Fechado"}</strong></div><div><span><small>Previsão de entrega</small>${esc(eta(settings.delivery_eta))}</span><span><small>Previsão de retirada</small>${esc(eta(settings.pickup_eta))}</span></div></div><a class="primary-btn full" href="tel:${String(settings.phone||"").replace(/\D/g,"")}">Ligar: ${esc(settings.phone)}</a></div>`;
}
openInfo=function(){
  const settings=state.catalog.settings;
  layer(`<div class="drawer-header info-drawer-title"><button class="icon-btn" data-close>←</button><div><h2>Mais informações</h2><span class="muted">Tudo sobre a Açailandia PE antes do pedido</span></div></div><div class="drawer-content public-info-drawer"><div class="info-store-mini"><img src="${JW_LOGO}" alt=""><div><strong>Açailandia PE</strong><span>Petrolina · PE</span></div></div><div class="info-tabs" role="tablist"><button class="active" data-info-tab="store">Loja</button><button data-info-tab="fees">Bairros e taxas</button><button data-info-tab="hours">Horários</button></div><div id="info-tab-content">${infoStoreMarkup(settings)}</div></div>`,`drawer info-public-drawer`);
  document.querySelector("[data-close]").onclick=closeLayer;
  document.querySelectorAll("[data-info-tab]").forEach(button=>button.onclick=()=>{
    document.querySelectorAll("[data-info-tab]").forEach(item=>item.classList.toggle("active",item===button));
    const tab=button.dataset.infoTab;
    $("#info-tab-content").innerHTML=tab==="fees"?infoNeighborhoodsMarkup(settings):tab==="hours"?infoHoursMarkup(settings):infoStoreMarkup(settings);
    if(tab==="fees")bindInfoNeighborhoodSearch(settings);
  });
};

function abandonedDraftId(){
  if(!state.abandonedCart.id) state.abandonedCart.id=crypto.randomUUID();
  return state.abandonedCart.id;
}
function abandonedPayload(){
  const form=$("#checkout-form");
  if(!form||!state.cart.length)return null;
  const fd=new FormData(form),phone=String(fd.get("phone")||"").replace(/\D/g,"");
  if(!String(fd.get("customer_name")||"").trim()||phone.length!==11)return null;
  return {id:abandonedDraftId(),customer_name:fd.get("customer_name"),phone,order_type:state.checkoutType,city:fd.get("city"),neighborhood:fd.get("neighborhood"),street:fd.get("street"),house_number:fd.get("house_number"),block:fd.get("block"),reference_point:fd.get("reference_point"),complement:fd.get("complement"),payment_method:fd.get("payment_method"),notes:fd.get("notes"),items:state.cart.map(item=>({product_id:item.product.id,quantity:item.quantity,complements:item.complements||[],notes:item.notes||""}))};
}
async function saveAbandonedCart(){
  const payload=abandonedPayload();
  if(!payload||state.abandonedCart.saving)return;
  state.abandonedCart.saving=true;
  try{await api("/api/abandoned-carts",{method:"POST",body:JSON.stringify(payload)})}catch{}finally{state.abandonedCart.saving=false}
}
function scheduleAbandonedCart(){
  clearTimeout(state.abandonedCart.timer);
  state.abandonedCart.timer=setTimeout(saveAbandonedCart,900);
}

const recoveryOpenCheckout=openCheckout;
openCheckout=function(){
  recoveryOpenCheckout();
  const form=$("#checkout-form");
  if(!form)return;
  form.insertAdjacentHTML("beforeend",`<div class="cart-recovery-notice"><span>🔒</span><p><strong>Ajuda para concluir o pedido</strong><small>Depois que você informar nome e WhatsApp, a acaiteria poderá visualizar este carrinho e falar com você caso o pedido não seja finalizado.</small></p></div>`);
  form.addEventListener("input",scheduleAbandonedCart);
  form.addEventListener("change",scheduleAbandonedCart);
};

const recoverySubmitOrder=submitOrder;
submitOrder=async function(){
  const form=$("#checkout-form");
  if(!form)return;
  const originalFetch=window.fetch,draftId=state.abandonedCart.id;
  window.fetch=async function(input,options={}){
    if(input==="/api/orders"&&options.method==="POST"&&draftId){
      try{const body=JSON.parse(options.body);body.abandoned_cart_id=draftId;options={...options,body:JSON.stringify(body)}}catch{}
    }
    return originalFetch.call(this,input,options);
  };
  try{await recoverySubmitOrder()}finally{
    window.fetch=originalFetch;
    if(!state.cart.length){clearTimeout(state.abandonedCart.timer);state.abandonedCart={id:null,timer:null,saving:false}}
  }
};

function abandonedAgo(value){
  const timestamp=new Date(String(value||"").replace(" ","T")+"Z").getTime(),minutes=Math.max(0,Math.round((Date.now()-timestamp)/60000));
  return minutes<1?"agora":minutes<60?`há ${minutes} min`:`há ${Math.floor(minutes/60)} h`;
}
function abandonedMessage(cart){
  const items=(cart.items||[]).map(item=>`${item.quantity}x ${String(item.product_name||"").toUpperCase()} - ${money(item.quantity*item.unit_price_cents)}`).join("\n");
  return `🍽️ *AÇAILANDIA PE* 🍽️\n\nOlá, ${cart.customer_name}! Vimos que seu pedido ficou no carrinho e estamos à disposição para ajudar a finalizar.\n\n${items}\n\nSubtotal: ${money(cart.subtotal_cents)}\nTaxa de entrega: ${money(cart.delivery_fee_cents)}\n*Total: ${money(cart.total_cents)}*\n\nPara concluir, acesse:\nhttps://açailandia.wpnz.com.br/`;
}
function whatsappMark(){return `<svg class="whatsapp-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2a9.84 9.84 0 0 0-8.45 14.86L2.05 22l5.28-1.5A9.94 9.94 0 1 0 12.04 2Zm0 17.88a8 8 0 0 1-4.08-1.11l-.29-.17-3.13.89.91-3.04-.19-.31a7.96 7.96 0 1 1 6.78 3.74Zm4.37-5.96c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.19a7.2 7.2 0 0 1-1.33-1.65c-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/></svg>`}
function abandonedView(){
  const carts=state.admin.abandoned||[];
  return `<div class="view-toolbar abandoned-toolbar"><div><h2>Carrinhos abandonados</h2><p class="muted">Clientes que informaram nome e WhatsApp, mas ainda não enviaram o pedido.</p></div><button class="secondary-btn" id="refresh-abandoned">Atualizar</button></div><div class="abandoned-grid">${carts.length?carts.map(cart=>`<article class="abandoned-card"><div class="abandoned-head"><div><strong>${esc(cart.customer_name)}</strong><span>${abandonedAgo(cart.updated_at)} • ${esc(orderTypeLabel(cart.order_type))}</span></div><span class="abandoned-total">${money(cart.total_cents)}</span></div><div class="abandoned-items">${(cart.items||[]).map(item=>`<div><span>${item.quantity}× ${esc(item.product_name)}</span><strong>${money(item.quantity*item.unit_price_cents)}</strong></div>`).join("")}</div>${cart.neighborhood?`<div class="abandoned-address">📍 ${esc(cart.neighborhood)}${cart.city?` • ${esc(cart.city)}`:""}</div>`:""}<div class="abandoned-actions"><a class="whatsapp-admin-btn" href="${esc(whatsappUrl(cart.phone,abandonedMessage(cart)))}" target="_blank" rel="noopener noreferrer">${whatsappMark()}<span>WhatsApp • enviar resumo</span></a><button class="secondary-btn" data-dismiss-abandoned="${esc(cart.id)}">Arquivar</button></div></article>`).join(""):`<div class="empty abandoned-empty"><strong>Nenhum carrinho aguardando contato</strong><span>Quando um cliente preencher nome e WhatsApp e sair sem finalizar, ele aparecerá aqui.</span></div>`}</div>`;
}
async function loadAbandoned(){state.admin.abandoned=(await api("/api/admin/abandoned-carts")).carts}

const recoveryAdminNavButtons=adminNavButtons;
adminNavButtons=function(){
  const button=`<button class="${state.admin.view==="abandoned"?"active":""}" data-admin-view="abandoned"><span class="admin-nav-icon">🛒</span><span class="nav-full">Carrinhos</span><span class="nav-short">Carrinhos</span></button>`;
  return recoveryAdminNavButtons().replace(/(<button[^>]+data-admin-view="settings")/,button+"$1");
};
const recoveryRenderAdmin=renderAdmin;
renderAdmin=function(){
  if(state.admin.view!=="abandoned")return recoveryRenderAdmin();
  $("#app").innerHTML=adminLayout(abandonedView(),"Carrinhos abandonados");
  bindAdmin();
};
const recoveryBindAdmin=bindAdmin;
bindAdmin=function(){
  recoveryBindAdmin();
  document.querySelectorAll('[data-admin-view="abandoned"]').forEach(button=>button.onclick=async()=>{state.admin.view="abandoned";await loadAbandoned();renderAdmin()});
  if(state.admin.view!=="abandoned")return;
  $("#refresh-abandoned").onclick=async()=>{await loadAbandoned();renderAdmin()};
  document.querySelectorAll("[data-dismiss-abandoned]").forEach(button=>button.onclick=async()=>{button.disabled=true;await api(`/api/admin/abandoned-carts/${encodeURIComponent(button.dataset.dismissAbandoned)}`,{method:"PATCH",body:JSON.stringify({status:"dismissed"})});await loadAbandoned();renderAdmin();toast("Carrinho arquivado")});
};
