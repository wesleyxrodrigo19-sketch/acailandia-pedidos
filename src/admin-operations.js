/* Operação do proprietário: entrega completa, exclusão protegida, auditoria e vias de impressão. */
state.admin.audit=[];

function ownerDeliveryFee(city,neighborhood){
  const settings=state.catalog?.settings||{},rule=(settings.delivery_neighborhood_fees||[]).find(item=>item.city===city&&normalizedNeighborhood(item.neighborhood)===normalizedNeighborhood(neighborhood));
  const base=Number(rule?.fee_cents||0);
  return base&&settings.delivery_surcharge_enabled?Math.round(base*(1+Math.max(0,Number(settings.delivery_surcharge_percent||0))/100)):base;
}

function ownerAddressFields(){
  return `<fieldset class="delivery-fields hidden" id="pos-delivery-fields"><legend>Endereço de entrega</legend>
    <div class="compact-field"><div class="field"><label>Cidade *</label><select name="city"><option value="">Selecione a cidade</option><option value="Petrolina">Petrolina</option><option value="Juazeiro">Juazeiro</option></select></div><div class="field"><label>Bairro *</label><div id="pos-searchable-neighborhood">${searchableNeighborhoodMarkup("","pos-neighborhood")}</div></div></div>
    <div class="field"><label>Rua / Avenida *</label><input name="street" maxlength="160" placeholder="Nome da rua ou avenida"></div>
    <div class="compact-field"><div class="field"><label>Número *</label><input name="house_number" maxlength="20" placeholder="Ex.: 60A"></div><div class="field"><label>Bloco <span class="optional">(opcional)</span></label><input name="block" maxlength="40" placeholder="Ex.: B"></div></div>
    <div class="field"><label>Ponto de referência <span class="optional">(opcional)</span></label><input name="reference_point" maxlength="160" placeholder="Ex.: próximo à praça"></div>
    <div class="field"><label>Complemento <span class="optional">(opcional)</span></label><input name="complement" maxlength="120" placeholder="Casa, apartamento, fundos..."></div>
    <small class="owner-location-note">O pedido feito no estabelecimento não exige localização do Google Maps.</small>
  </fieldset>`;
}

posGrandTotal=function(){
  const form=$("#pos-form"),subtotal=cartTotal(state.admin.posCart);
  if(!form||form.elements.order_type.value!=="delivery")return subtotal;
  return subtotal+ownerDeliveryFee(form.elements.city.value,form.elements.neighborhood.value);
};

posView=function(){
  const products=state.catalog.products.filter(product=>product.is_available),tables=state.admin.tables?.tables||[],available=tables.filter(table=>!table.occupied),hasItems=state.admin.posCart.length>0;
  const pricePerKg=Math.max(1,Number(state.catalog.settings.self_service_price_per_kg_cents||3000));
  return `<div class="pos-layout"><section class="pos-catalog"><div class="panel-head" style="padding:0 0 14px;border:0"><div><strong>Cardápio rápido</strong><div class="muted">Toque nos produtos para adicionar</div></div><input class="admin-price-input" id="pos-search" placeholder="Buscar produto"></div><section class="self-service-card"><div><span class="self-service-kicker">VENDA POR PESO</span><h2>Self-service</h2><p>Coloque o açaí na Prix 3 e use a leitura automática.</p></div><div class="self-service-price"><strong>${money(pricePerKg)}</strong><span>por kg</span></div><button type="button" class="primary-btn" id="add-self-service">Ler balança e adicionar</button></section><div class="pos-products" id="pos-products">${products.map(product=>`<button class="pos-product" data-pos-add="${product.id}"><img src="${esc(product.image_url)}" alt=""><strong>${esc(product.name)}</strong><span>${money(product.price_cents)}</span></button>`).join("")}</div></section>
  <aside class="panel pos-cart"><div class="panel-head"><h2>Novo pedido</h2><div class="pos-cart-head-actions"><strong id="pos-count">${cartCount(state.admin.posCart)} itens</strong><button type="button" class="text-danger-btn" id="pos-clear-cart" ${hasItems?"":"disabled"}>Limpar</button></div></div><div class="pos-cart-body" id="pos-cart-body">${hasItems?cartItemsMarkup(state.admin.posCart):'<div class="empty">Adicione produtos ao pedido.</div>'}</div>
  <form class="pos-form" id="pos-form"><div class="field"><label>Cliente</label><input name="customer_name" maxlength="80" placeholder="Ex.: João"></div><div class="field"><label>WhatsApp do cliente</label><input name="phone" inputmode="tel" maxlength="15" placeholder="(87) 99999-9999"></div>
  <div class="field"><label>Tipo do pedido</label><select name="order_type"><option value="pickup">Retirada</option><option value="dine_in">Consumir no local</option><option value="delivery">Entrega/Delivery</option></select></div>
  <div class="field" id="pos-table-field"><label>Mesa *</label><select name="table_number" ${available.length?"":"disabled"}><option value="">${available.length?"Selecione uma mesa disponível":"Não há mesas disponíveis"}</option>${available.map(table=>`<option value="${table.number}">Mesa ${table.number}</option>`).join("")}</select><small>${state.admin.tables?.table_count?`${available.length} mesa(s) disponível(is)`:'Configure a quantidade de mesas em Configurações.'}</small></div>
  ${ownerAddressFields()}
  <div class="compact-field"><div class="field"><label>Situação do pagamento</label><select name="payment_status"><option value="aberto" selected>Em aberto</option><option value="pago">Pago</option></select></div><div class="field"><label>Forma de pagamento</label><select name="payment_method"><option value="dinheiro">Dinheiro</option><option value="pix">Pix</option><option value="credito">Cartão de crédito</option><option value="debito">Cartão de débito</option></select></div></div>
  <div class="field"><label>Observações para a cozinha</label><input name="notes" maxlength="500" placeholder="Sem cebola, ponto da carne..."></div></form>
  <div class="pos-footer"><div class="subtotal-line"><span>Subtotal</span><span>${money(cartTotal(state.admin.posCart))}</span></div><div class="subtotal-line hidden" id="pos-delivery-fee-row"><span>Taxa de entrega</span><span id="pos-delivery-fee">${money(0)}</span></div><div class="cart-total"><span>Total</span><span id="pos-total">${money(cartTotal(state.admin.posCart))}</span></div><button class="primary-btn full" id="pos-finish" ${hasItems?"":"disabled"}>Registrar pedido</button></div></aside></div>`;
};

bindPos=function(){
  document.querySelectorAll("[data-pos-add]").forEach(button=>button.onclick=()=>openProduct(Number(button.dataset.posAdd),state.admin.posCart,()=>renderAdmin()));
  document.querySelectorAll("[data-cart-q]").forEach(button=>button.onclick=()=>{updateQty(button.dataset.key,Number(button.dataset.cartQ),state.admin.posCart);renderAdmin()});
  $("#pos-clear-cart").onclick=()=>{state.admin.posCart=[];renderAdmin();toast("Sacola limpa")};
  $("#add-self-service").onclick=addSelfServiceFromScale;
  document.querySelectorAll("[data-self-service-remove]").forEach(button=>button.onclick=()=>{state.admin.posCart=state.admin.posCart.filter(item=>!item.selfService);renderAdmin()});
  $("#pos-search").oninput=event=>{const query=event.target.value.toLowerCase();document.querySelectorAll("[data-pos-add]").forEach(button=>{const product=state.catalog.products.find(item=>item.id===Number(button.dataset.posAdd));button.classList.toggle("hidden",!product.name.toLowerCase().includes(query))})};
  const form=$("#pos-form"),type=form.elements.order_type,tableField=$("#pos-table-field"),table=form.elements.table_number,deliveryFields=$("#pos-delivery-fields"),city=form.elements.city,finish=$("#pos-finish"),phone=form.elements.phone;
  phone.oninput=()=>formatWhatsApp(phone);
  const refresh=()=>{const neighborhood=form.elements.neighborhood,delivery=type.value==="delivery",dineIn=type.value==="dine_in",fee=delivery?ownerDeliveryFee(city.value,neighborhood.value):0;tableField.classList.toggle("hidden",!dineIn);table.required=dineIn;deliveryFields.classList.toggle("hidden",!delivery);for(const name of ["city","street","house_number"])form.elements[name].required=delivery;$("#pos-neighborhood-search").required=delivery;$("#pos-delivery-fee-row").classList.toggle("hidden",!delivery);$("#pos-delivery-fee").textContent=money(fee);$("#pos-total").textContent=money(cartTotal(state.admin.posCart)+fee);finish.disabled=!state.admin.posCart.length||(dineIn&&!table.value)||(delivery&&(!city.value||!neighborhood.value))};
  const bindOwnerNeighborhood=()=>bindNeighborhoodSearch("pos-neighborhood",city,refresh,()=>type.value==="delivery");
  type.onchange=refresh;table.onchange=refresh;city.onchange=()=>{$("#pos-searchable-neighborhood").innerHTML=searchableNeighborhoodMarkup(city.value,"pos-neighborhood");bindOwnerNeighborhood()};bindOwnerNeighborhood();refresh();finish.onclick=finishPos;
};

finishPos=async function(){
  const form=$("#pos-form");if(!form.reportValidity())return;
  const data=new FormData(form),delivery=data.get("order_type")==="delivery",dineIn=data.get("order_type")==="dine_in",button=$("#pos-finish");
  if(dineIn&&!data.get("table_number"))return toast("Selecione uma mesa disponível.");
  const phone=String(data.get("phone")||"").replace(/\D/g,"");
  if(phone&&phone.length!==11)return toast("Informe um WhatsApp válido com DDD.");
  button.disabled=true;
  try{
    const weighted=state.admin.posCart.find(item=>item.selfService),regular=state.admin.posCart.filter(item=>!item.selfService);
    const order=await api("/api/admin/orders",{method:"POST",body:JSON.stringify({customer_name:data.get("customer_name"),phone,table_number:dineIn?data.get("table_number"):null,order_type:data.get("order_type"),city:data.get("city"),neighborhood:data.get("neighborhood"),street:data.get("street"),house_number:data.get("house_number"),block:data.get("block"),reference_point:data.get("reference_point"),complement:data.get("complement"),payment_status:data.get("payment_status"),payment_method:data.get("payment_method"),notes:data.get("notes"),items:regular.map(item=>({product_id:item.product.id,quantity:item.quantity,complements:item.complements||[],notes:item.notes||""})),self_service:weighted?{grams:weighted.grams,captured_at:weighted.capturedAt}:null})});
    state.admin.posCart=[];toast(`Pedido ${order.id} registrado${order.table_number?` na mesa ${order.table_number}`:""}`);state.admin.view="orders";await loadAdminOrders();renderAdmin();
  }catch(error){toast(error.message);button.disabled=false}
};

async function addSelfServiceFromScale(){
  const button=$("#add-self-service");button.disabled=true;button.textContent="Lendo balança...";
  try{
    const reading=await api("/api/admin/scale/current"),grams=Number(reading.grams||0),capturedAt=String(reading.captured_at||""),capturedMs=Date.parse(`${capturedAt}Z`),age=Date.now()-capturedMs;
    if(!grams)return toast("A balança ainda não enviou um peso. Coloque o produto e aguarde a estabilização.");
    if(!capturedAt||!Number.isFinite(capturedMs)||age<0||age>120000)return toast("A leitura da balança está antiga. Pese novamente o self-service.");
    const pricePerKg=Math.max(1,Number(state.catalog.settings.self_service_price_per_kg_cents||3000)),total=Math.round(grams*pricePerKg/1000),item={selfService:true,grams,capturedAt,quantity:1,key:"self-service",unit_price_cents:total,product:{id:"self-service",name:`Self-service ${(grams/1000).toLocaleString("pt-BR",{minimumFractionDigits:3,maximumFractionDigits:3})} kg`,price_cents:total,image_url:JW_LOGO},notes:`${grams} g • ${money(pricePerKg)}/kg • Prix 3 Toledo`};
    state.admin.posCart=state.admin.posCart.filter(entry=>!entry.selfService);state.admin.posCart.unshift(item);renderAdmin();toast(`Self-service adicionado: ${money(total)}`);
  }catch(error){toast(error.message)}finally{if(button&&document.body.contains(button)){button.disabled=false;button.textContent="Ler balança e adicionar"}}
}

const operationsCartItemsMarkup=cartItemsMarkup;
cartItemsMarkup=function(cart=state.cart){return cart.map(item=>item.selfService?`<div class="cart-item self-service-cart-item"><img src="${JW_LOGO}" alt="Logo Bliss Açaiteria"><div><div class="cart-name">${esc(item.product.name)}</div><div class="cart-note">${esc(item.notes)}</div><div class="muted">${money(item.unit_price_cents)}</div></div><button type="button" class="text-danger-btn" data-self-service-remove>Remover</button></div>`:operationsCartItemsMarkup([item])).join("")};

const operationsShowSuccess=showSuccess;
showSuccess=function(order){operationsShowSuccess(order);document.querySelectorAll(".pix-payment").forEach(element=>element.remove())};

function auditActionLabel(value){return ({order_created:"Pedido criado",order_edited:"Pedido editado",order_status_changed:"Status alterado",order_cancelled:"Pedido cancelado",order_deleted:"Pedido excluído",payment_received:"Pagamento recebido",payment_reopened:"Pagamento reaberto",order_reprinted:"Comanda reimpressa",settings_updated:"Configuração alterada",availability_changed:"Funcionamento alterado",product_created:"Produto cadastrado",product_updated:"Produto alterado"})[value]||value}
function auditIcon(value){return value.includes("deleted")||value.includes("cancelled")?"×":value.includes("payment")?"$":value.includes("created")?"+":"•"}
async function loadAudit(){state.admin.audit=(await api("/api/admin/audit")).entries}
function auditView(){const entries=state.admin.audit||[];return `<div class="view-toolbar audit-toolbar"><div><h2>Auditoria do sistema</h2><p class="muted">Registro permanente das principais ações realizadas no painel.</p></div><button class="secondary-btn" id="refresh-audit">Atualizar</button></div><div class="audit-list">${entries.length?entries.map(entry=>`<article class="audit-row"><span class="audit-icon ${esc(entry.action_type)}">${auditIcon(entry.action_type)}</span><div><strong>${esc(entry.summary)}</strong><span>${esc(auditActionLabel(entry.action_type))}${entry.entity_id?` • ${esc(entry.entity_id)}`:""}</span></div><time>${new Date(String(entry.created_at).replace(" ","T")+"Z").toLocaleString("pt-BR")}</time></article>`).join(""):'<div class="empty panel">Nenhum evento de auditoria registrado.</div>'}</div>`}

const operationsAdminNav=adminNavButtons;
adminNavButtons=function(){const auditButton=`<button class="${state.admin.view==="audit"?"active":""}" data-admin-view="audit"><span class="admin-nav-icon">◉</span><span class="nav-full">Auditoria</span><span class="nav-short">Auditoria</span></button>`;return operationsAdminNav().replace(/(<button[^>]+data-admin-view="settings")/,auditButton+"$1")};
const operationsRenderAdmin=renderAdmin;
renderAdmin=function(){if(state.admin.view!=="audit")return operationsRenderAdmin();$("#app").innerHTML=adminLayout(auditView(),"Auditoria");bindAdmin()};
const operationsBindAdmin=bindAdmin;
bindAdmin=function(){operationsBindAdmin();document.querySelectorAll('[data-admin-view="audit"]').forEach(button=>button.onclick=async()=>{state.admin.view="audit";await loadAudit();renderAdmin()});if(state.admin.view==="audit")$("#refresh-audit").onclick=async()=>{await loadAudit();renderAdmin()};document.querySelectorAll("[data-delete-order]").forEach(button=>button.onclick=event=>{event.preventDefault();event.stopPropagation();openDeleteOrder(button.dataset.deleteOrder)})};

function openDeleteOrder(id){const order=state.admin.orders.find(item=>item.id===id);if(!order)return;layer(`<div class="drawer-header"><button class="icon-btn" data-close>×</button><h2>Excluir pedido</h2></div><form class="drawer-content" id="delete-order-form"><div class="delete-warning"><strong>Atenção: esta ação é definitiva</strong><span>O pedido ${esc(id)} sairá do histórico e do faturamento. O evento continuará registrado na Auditoria.</span></div><div class="field"><label>Senha de exclusão</label><input type="password" name="password" autocomplete="off" required placeholder="Digite a senha de exclusão"></div></form><div class="drawer-footer"><button class="danger-btn full" id="confirm-delete-order">Excluir pedido definitivamente</button></div>`,"drawer admin-order-drawer");document.querySelector("[data-close]").onclick=closeLayer;$("#confirm-delete-order").onclick=()=>deleteOrder(id)}
async function deleteOrder(id){const form=$("#delete-order-form");if(!form.reportValidity())return;const button=$("#confirm-delete-order");button.disabled=true;try{await api(`/api/admin/orders/${encodeURIComponent(id)}`,{method:"DELETE",body:JSON.stringify({password:new FormData(form).get("password")})});await loadAdminOrders();closeLayer();renderAdmin();toast(`Pedido ${id} excluído e registrado na auditoria`)}catch(error){toast(error.message);button.disabled=false}}

const operationsOrderCard=orderCard;
orderCard=function(order){return operationsOrderCard(order).replace('</div><span class="order-card-hint">',`<button class="danger-btn compact" data-delete-order="${esc(order.id)}">Excluir</button></div><span class="order-card-hint">`)};
const operationsOpenDetails=openOrderDetails;
openOrderDetails=function(id){operationsOpenDetails(id);document.querySelectorAll(".pix-payment").forEach(element=>element.remove());const actions=document.querySelector(".order-detail-actions");if(actions)actions.insertAdjacentHTML("beforeend",`<button class="danger-btn" data-delete-order="${esc(id)}">Excluir pedido</button>`);document.querySelectorAll("[data-delete-order]").forEach(button=>button.onclick=()=>openDeleteOrder(button.dataset.deleteOrder))};

const operationsSettingsView=settingsView;
settingsView=function(){return operationsSettingsView().replace('<div class="field key-field">',`<div class="field"><label>Quantidade de vias por comanda</label><input type="number" name="print_copies" min="1" max="5" value="${Math.max(1,Number(state.catalog.settings.print_copies||1))}"><small>Padrão: 1 via. Escolha até 5 vias por impressora configurada.</small></div><div class="field key-field">`).replace("com uma via para o caixa e outra para a cozinha.","nas impressoras configuradas, respeitando a quantidade de vias.").replace("Instale as duas impressoras no Windows e faça uma página de teste.","Instale no Windows cada impressora que será usada e faça uma página de teste.").replace("Copie os nomes exatos delas para os campos acima.","Copie o nome exato da impressora para o campo correspondente; a cozinha pode ficar vazia.")};

function collectOwnerDeliveryRules(){return [...document.querySelectorAll(".delivery-fee-rule")].map(row=>{const city=row.querySelector("[data-delivery-city]")?.value||"Petrolina",stored=row.querySelector("[data-delivery-neighborhood]").value||"",neighborhood=stored.includes("|")?stored.split("|").slice(1).join("|"):stored;return {city,neighborhood:neighborhood.trim(),fee_cents:Math.max(0,Math.round(Number(row.querySelector("[data-delivery-fee]").value.replace(",","."))*100)||0)}}).filter(rule=>rule.neighborhood)}
setupTableSettings=function(){const form=$("#settings-form"),settings=state.catalog.settings;if(!form)return;if(!form.querySelector("[name=table_count]"))form.insertAdjacentHTML("afterbegin",`<section class="panel table-settings"><div class="panel-head"><div><h2>Mesas e self-service</h2><span class="muted">Configure o salão e o preço usado na venda automática por peso.</span></div><a class="secondary-btn" href="/mesas" target="_blank" rel="noopener noreferrer">Abrir telão</a></div><div class="settings-grid"><div class="field"><label>Quantidade de mesas</label><input type="number" name="table_count" min="0" max="200" value="${Number(settings.table_count||0)}"></div><div class="field"><label>Self-service — preço por kg (R$)</label><input type="text" inputmode="decimal" name="self_service_price_per_kg" value="${(Number(settings.self_service_price_per_kg_cents||3000)/100).toFixed(2).replace(".",",")}"><small>Valor atual usado com a balança Prix 3 Toledo.</small></div></div></section>`);form.addEventListener("submit",async event=>{event.preventDefault();event.stopImmediatePropagation();const data=new FormData(form),payload={is_open:$("#store-open").classList.contains("on"),closing_time:data.get("closing_time"),minimum_order_cents:Math.max(0,Math.round(Number(String(data.get("minimum_order")).replace(",","."))*100)||0),delivery_eta:data.get("delivery_eta"),pickup_eta:data.get("pickup_eta"),phone:data.get("phone"),address:data.get("address"),table_count:Math.max(0,Math.min(200,Number(data.get("table_count"))||0)),self_service_price_per_kg_cents:Math.max(1,Math.round(Number(String(data.get("self_service_price_per_kg")).replace(",","."))*100)||3000),delivery_neighborhood_fees:collectOwnerDeliveryRules(),delivery_surcharge_enabled:form.elements.delivery_surcharge_enabled.checked,delivery_surcharge_percent:Number(data.get("delivery_surcharge_percent")),delivery_surcharge_label:data.get("delivery_surcharge_label"),waiter_fee_enabled:form.elements.waiter_fee_enabled.checked,waiter_fee_percent:Number(data.get("waiter_fee_percent")),auto_print_enabled:form.elements.auto_print_enabled.checked,reception_printer:data.get("reception_printer"),kitchen_printer:data.get("kitchen_printer"),print_bridge_key:data.get("print_bridge_key"),print_copies:Math.max(1,Math.min(5,Number(data.get("print_copies"))||1))};try{await api("/api/admin/settings",{method:"PATCH",body:JSON.stringify(payload)});state.catalog=await api("/api/admin/products");state.admin.printStatus=await api("/api/admin/print-status");toast("Configurações salvas");renderAdmin()}catch(error){toast(error.message)}},true)};
