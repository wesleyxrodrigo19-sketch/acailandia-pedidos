// Complementos carregados depois do aplicativo principal.
// O pedido sempre é registrado no banco antes de qualquer abertura do WhatsApp.
const orderCardBeforeWhatsAppActive=orderCard;
orderCard=order=>{
  const html=orderCardBeforeWhatsAppActive(order);
  if(order.order_type!=="delivery"||!String(order.phone||"").replace(/\D/g,"").length)return html;
  const button=`<a class="whatsapp-order-btn compact" href="${esc(whatsappUrl(order.phone,ownerStatusMessage(order)))}" target="_blank" rel="noopener noreferrer"><span class="whatsapp-logo">☎</span> WhatsApp</a>`;
  return html.replace('<div class="order-actions">',`<div class="order-actions">${button}`);
};

const openOrderDetailsBeforeWhatsAppActive=openOrderDetails;
openOrderDetails=id=>{
  openOrderDetailsBeforeWhatsAppActive(id);
  const order=state.admin.orders.find(item=>item.id===id);
  const content=document.querySelector(".order-detail-content");
  const actions=document.querySelector(".order-detail-actions");
  if(!order||!content)return;
  if(order.payment_method==="pix")content.insertAdjacentHTML("beforeend",pixPaymentMarkup(order));
  if(order.order_type==="delivery"&&String(order.phone||"").replace(/\D/g,"").length&&actions){
    actions.insertAdjacentHTML("afterbegin",`<a class="whatsapp-btn" href="${esc(whatsappUrl(order.phone,ownerStatusMessage(order)))}" target="_blank" rel="noopener noreferrer"><span class="whatsapp-logo">☎</span><span><strong>Notificar cliente</strong><small>${esc(statusLabel(order.status))}</small></span></a>`);
  }
};

document.addEventListener("click",event=>{
  const copy=event.target.closest("[data-copy-pix]");
  if(copy)copyPix(copy.dataset.copyPix);
},true);

const posViewBeforeWhatsApp=posView;
posView=()=>posViewBeforeWhatsApp().replace('<div class="field" id="pos-table-field">','<div class="field"><label>WhatsApp do cliente</label><input name="phone" inputmode="tel" maxlength="15" placeholder="(87) 99999-9999"></div><div class="field" id="pos-table-field">');

finishPos=async()=>{
  const fd=new FormData($("#pos-form")),btn=$("#pos-finish");
  if(fd.get("order_type")==="pickup"&&!fd.get("table_number"))return toast("Selecione uma mesa disponível.");
  const phone=String(fd.get("phone")||"").replace(/\D/g,"");
  if(fd.get("order_type")==="delivery"&&phone.length!==11)return toast("Informe o WhatsApp do cliente para o pedido de entrega.");
  btn.disabled=true;
  try{
    const order=await api("/api/admin/orders",{method:"POST",body:JSON.stringify({customer_name:fd.get("customer_name"),phone,table_number:fd.get("table_number"),order_type:fd.get("order_type"),payment_method:fd.get("payment_method"),payment_status:"aberto",notes:fd.get("notes"),items:state.admin.posCart.map(i=>({product_id:i.product.id,quantity:i.quantity,complements:i.complements||[],notes:i.notes||""}))})});
    state.admin.posCart=[];state.admin.posWaiterFee=false;toast(`Comanda ${order.id} aberta${order.table_number?` na mesa ${order.table_number}`:""}`);state.admin.view="orders";await loadAdminOrders();renderAdmin();
  }catch(error){toast(error.message);btn.disabled=false}
};
