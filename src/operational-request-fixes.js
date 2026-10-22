/* Ajustes operacionais rápidos: abre/fecha loja e troco no pedido online. */
const operationalAdminLayout=adminLayout;
adminLayout=function(content,title){
  const settings=state.catalog?.settings||{},open=Boolean(settings.is_open);
  return operationalAdminLayout(content,title).replace('<span class="live-pill">● Sistema online</span>',`<button type="button" class="quick-store-toggle ${open?"is-open":"is-closed"}" id="quick-store-toggle">${open?"Fechar loja":"Abrir loja"}</button><span class="live-pill">● Sistema online</span>`);
};

const operationalBindAdmin=bindAdmin;
bindAdmin=function(){
  operationalBindAdmin();
  const button=$("#quick-store-toggle");
  if(button)button.onclick=async()=>{const settings=state.catalog.settings||{},closing=Boolean(settings.is_open);button.disabled=true;try{await api("/api/admin/store-availability",{method:"PATCH",body:JSON.stringify({manual_closed:closing,manual_closed_reason:closing?"Fechado pelo atalho do painel":""})});state.catalog=await api("/api/admin/products");toast(closing?"Loja fechada para novos pedidos":"Loja aberta para pedidos");renderAdmin()}catch(error){toast(error.message);button.disabled=false}};
};

const operationalOpenCheckout=openCheckout;
openCheckout=function(){
  operationalOpenCheckout();
  const form=$("#checkout-form"),payment=form?.elements.payment_method;
  if(!form||!payment)return;
  payment.closest(".field").insertAdjacentHTML("afterend",`<label class="check-row" id="customer-change-toggle"><input type="checkbox" name="needs_change"><span><strong>Precisa de troco?</strong><small>Marque e informe com quanto vai pagar.</small></span></label><div class="field hidden" id="customer-change-fields"><label>Vai pagar com quanto?</label><input name="cash_received" inputmode="decimal" placeholder="Ex.: 50,00"><small id="customer-change-result">Troco: ${money(0)}</small></div>`);
  const checkbox=form.elements.needs_change,input=form.elements.cash_received;
  const refresh=()=>{const cashMode=payment.value==="dinheiro",received=Math.max(0,Math.round(Number(String(input.value||"").replace(",","."))*100)||0),total=checkoutTotal();$("#customer-change-toggle").classList.toggle("hidden",!cashMode);$("#customer-change-fields").classList.toggle("hidden",!cashMode||!checkbox.checked);$("#customer-change-result").textContent=`Troco: ${money(Math.max(0,received-total))}`};
  payment.addEventListener("change",refresh);checkbox.addEventListener("change",refresh);input.addEventListener("input",refresh);refresh();
};

submitOrder=async function(){
  const form=$("#checkout-form"),phone=form.elements.phone;
  const activeType=form.querySelector('[data-type].active')?.dataset.type;
  if(activeType)state.checkoutType=activeType;
  const isDelivery=state.checkoutType==='delivery';
  setDeliveryRequired(isDelivery);
  $('#address-field')?.classList.toggle('hidden',!isDelivery);
  $('#checkout-fee-row')?.classList.toggle('hidden',!isDelivery);
  updateCheckoutFee();
  formatWhatsApp(phone);
  const mapInput=form.elements.maps_url;mapInput.setCustomValidity(mapInput.value&&!safeMapsUrl(mapInput.value)?"Informe um link válido do Google Maps ou deixe em branco.":"");
  if(!form.reportValidity())return;
  const fd=new FormData(form),cashRequested=fd.get("payment_method")==="dinheiro"&&fd.get("needs_change"),cashReceived=cashRequested?Math.max(0,Math.round(Number(String(fd.get("cash_received")||"").replace(",","."))*100)||0):null,total=checkoutTotal();
  if(cashRequested&&cashReceived<total)return toast("O valor em dinheiro precisa ser igual ou maior que o total do pedido.");
  const payload={customer_name:fd.get("customer_name"),phone:fd.get("phone"),city:fd.get("city"),neighborhood:fd.get("neighborhood"),street:fd.get("street"),house_number:fd.get("house_number"),block:fd.get("block"),reference_point:fd.get("reference_point"),complement:fd.get("complement"),maps_url:fd.get("maps_url"),payment_method:fd.get("payment_method"),cash_received_cents:cashReceived,notes:fd.get("notes"),order_type:state.checkoutType,items:state.cart.map(item=>({product_id:item.product.id,product_name:item.product.name,unit_price_cents:itemUnitPrice(item),quantity:item.quantity,complements:item.complements||[],notes:item.notes||""}))},button=$("#send-order");
  button.disabled=true;button.textContent="Enviando...";
  try{const order=await api("/api/orders",{method:"POST",body:JSON.stringify(payload)}),completed={...payload,...order,created_at:new Date().toISOString().replace("T"," ").replace("Z","")};state.lastOrder=completed;state.cart=[];updateCartBadges();showSuccess(completed)}catch(error){toast(error.message);button.disabled=false;button.textContent="Enviar pedido"}
};

// Reforça a troca de modalidade no celular antes dos handlers do checkout.
const mobileSafeCheckout=openCheckout;
openCheckout=function(){
  mobileSafeCheckout();
  document.querySelectorAll('#checkout-form [data-type]').forEach(button=>button.addEventListener('click',()=>{
    const type=button.dataset.type,delivery=type==='delivery';
    state.checkoutType=type; state.checkoutFeeCents=0;
    document.querySelectorAll('#checkout-form [data-type]').forEach(item=>item.classList.toggle('active',item===button));
    $('#address-field')?.classList.toggle('hidden',!delivery);
    $('#checkout-fee-row')?.classList.toggle('hidden',!delivery);
    setDeliveryRequired(delivery); updateCheckoutFee();
  },true));
};
