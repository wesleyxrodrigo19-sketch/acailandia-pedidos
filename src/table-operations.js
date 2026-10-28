/* Mesas e comandas no formato operacional pedido pela Açailandia. */
function tableOrderFor(table){return state.admin.orders.find(order=>String(order.id)===String(table.order_id))||state.admin.orders.find(order=>String(order.table_number)===String(table.number)&&order.channel==="counter"&&!['concluido','cancelado'].includes(order.status))}
function tableOrderTotal(order){return Number(order?.total_cents||0)}
function tableOrderStarted(order){if(!order?.created_at)return "Agora";const elapsed=Math.max(0,Math.floor((Date.now()-new Date(`${String(order.created_at).replace(' ','T')}Z`).getTime())/60000));return elapsed<1?"Agora":`${elapsed} min`}
function tableFilterButton(value,label,count,filter){return `<button type="button" class="table-filter ${filter===value?'active':''}" data-table-filter="${value}"><strong>${count}</strong><span>${label}</span></button>`}
const tableOperationsBaseBoard=tablesBoardMarkup;
function tablesBoardMarkup(data,{admin=false}={}){
  if(!admin)return tableOperationsBaseBoard(data,{admin});
  const tables=data?.tables||[],occupied=tables.filter(table=>table.occupied),available=tables.filter(table=>!table.occupied);
  const selectedNumber=String(state.admin.selectedTableNumber||occupied[0]?.number||available[0]?.number||""),selected=tables.find(table=>String(table.number)===selectedNumber),filter=state.admin.tableFilter||"all";
  const shownOccupied=filter==="available"?[]:occupied,shownAvailable=filter==="occupied"?[]:available,selectedOrder=selected?.occupied?tableOrderFor(selected):null;
  const orderItems=(selectedOrder?.items||[]).map(item=>`<div class="table-detail-item"><span>${Number(item.quantity||1)} × ${esc(item.product_name)}</span><strong>${money(Number(item.quantity||1)*Number(item.unit_price_cents||0))}</strong></div>`).join("");
  const tile=table=>{const order=table.occupied?tableOrderFor(table):null,active=String(table.number)===selectedNumber;return `<button type="button" class="table-tile ${table.occupied?'occupied':'available'} ${active?'selected':''}" data-table-select="${table.number}" aria-pressed="${active}" aria-label="${table.occupied?`Mesa ${table.number}, ${money(tableOrderTotal(order))}, aberta há ${tableOrderStarted(order)}`:`Mesa ${table.number}, disponível`}"><span class="table-tile-title">MESA ${String(table.number).padStart(2,'0')}</span>${table.occupied?`<strong class="table-tile-amount">${money(tableOrderTotal(order))}</strong><span class="table-tile-store">${esc(state.catalog?.settings?.store_name||'Açailandia PE')}</span><span class="table-tile-meta">◷ ${tableOrderStarted(order)} <span>1 comanda</span></span>`:`<span class="table-tile-free">Disponível</span>`}</button>`};
  const selectedPanel=!selected?`<div class="table-detail-empty">Selecione uma mesa para ver a comanda e as ações.</div>`:selected.occupied?`<div class="table-detail-content"><div class="table-detail-status"><strong>${esc(tableStatusLabel(selected.status))} · Pedido #${esc(selected.order_id)}</strong><span>Mesa aberta há ${tableOrderStarted(selectedOrder)}</span></div><div class="table-detail-customer"><span>Cliente</span><strong>${esc(selectedOrder?.customer_name||'Não informado')}</strong><span>Pagamento</span><strong>${selectedOrder?.payment_status==='aberto'?'Pendente':'Pago'}${selectedOrder?.payment_method?` · ${esc(paymentLabel(selectedOrder.payment_method))}`:''}</strong></div><div class="table-detail-items">${orderItems||'<p class="muted">Os itens desta comanda não foram carregados.</p>'}</div><div class="table-detail-total"><span>Subtotal / conta</span><strong>${money(tableOrderTotal(selectedOrder))}</strong></div><div class="table-detail-actions"><button type="button" class="secondary-btn" data-table-open="${selected.number}" data-order-id="${esc(selected.order_id)}">Editar comanda</button><button type="button" class="primary-btn" data-table-close="${esc(selected.order_id)}">${selectedOrder?.payment_status==='aberto'?'Receber e fechar conta':'Fechar conta'}</button></div></div>`:`<div class="table-detail-content"><div class="table-detail-status free"><strong>Mesa ${String(selected.number).padStart(2,'0')} disponível</strong><span>Pronta para abrir uma nova comanda.</span></div><div class="table-detail-actions"><button type="button" class="primary-btn" data-table-open="${selected.number}">Abrir comanda</button></div></div>`;
  return `<section class="tables-admin"><div class="tables-main panel"><div class="tables-main-heading"><div><span class="eyebrow">SALÃO · SÃO GONÇALO</span><h2>Mesas e Comandas</h2><p>Abra, edite e feche contas do atendimento presencial.</p></div><button type="button" class="secondary-btn" id="refresh-tables">Atualizar</button></div><div class="table-summary-tabs">${tableFilterButton('all','Todas',tables.length,filter)}${tableFilterButton('occupied','Abertas',occupied.length,filter)}${tableFilterButton('available','Fechadas',available.length,filter)}<span class="table-open-total"><strong>${money(occupied.reduce((sum,table)=>sum+tableOrderTotal(tableOrderFor(table)),0))}</strong><small>em comandas abertas</small></span></div>${shownOccupied.length?`<section class="table-section"><div class="table-section-title"><h3>Comandas abertas</h3><span>${shownOccupied.length} mesa(s)</span></div><div class="table-open-grid">${shownOccupied.map(tile).join('')}</div></section>`:''}${shownAvailable.length?`<section class="table-section table-available-section"><div class="table-section-title"><h3>Mesas fechadas / disponíveis</h3><span>${shownAvailable.length} mesa(s)</span></div><div class="table-available-grid">${shownAvailable.map(tile).join('')}</div></section>`:''}${!tables.length?'<div class="empty table-empty">Configure a quantidade de mesas em Configurações.</div>':''}</div><aside class="table-detail-panel panel"><div class="panel-head"><div><span class="eyebrow">DETALHES DA COMANDA</span><h2>${selected?`Mesa ${String(selected.number).padStart(2,'0')}`:'Selecione uma mesa'}</h2></div></div>${selectedPanel}</aside></section>`;
}
tablesView=function(){return tablesBoardMarkup(state.admin.tables,{admin:true})};

const tableOperationsBaseOrderEditor=openOrderEditor;
openOrderEditor=async function(id){
  const order=state.admin.orders.find(item=>item.id===id);if(!order)return;
  if(!state.catalog)state.catalog=await api('/api/admin/products');
  const originalItems=order.items;order.items=(originalItems||[]).filter(item=>item.product_id);
  try{return await tableOperationsBaseOrderEditor(id)}finally{order.items=originalItems}
};

const tableOperationsBaseOrderDetails=openOrderDetails;
openOrderDetails=function(orderId){
  tableOperationsBaseOrderDetails(orderId);
  const order=state.admin.orders.find(item=>item.id===orderId);if(order?.channel!=='counter'||!order.table_number||order.status==='cancelado')return;
  const actions=document.querySelector('.order-detail-actions');if(!actions)return;
  let closeTable=$('#detail-release-table');
  if(!closeTable){closeTable=document.createElement('button');closeTable.id='detail-release-table';closeTable.type='button';closeTable.className='secondary-btn';actions.append(closeTable)}
  closeTable.textContent=order.payment_status==='aberto'?'Pagar e fechar mesa':'Fechar mesa';
  closeTable.onclick=async()=>{
    if(order.payment_status==='aberto'){
      openPaymentSettlement(orderId);const confirmButton=$('#confirm-payment');if(!confirmButton)return;
      const confirmPayment=confirmButton.onclick;confirmButton.textContent='Confirmar pagamento e fechar mesa';
      confirmButton.onclick=async event=>{await confirmPayment.call(confirmButton,event);const updated=state.admin.orders.find(item=>item.id===orderId);if(updated?.payment_status!=='pago')return;try{await api(`/api/admin/orders/${encodeURIComponent(orderId)}`,{method:'PATCH',body:JSON.stringify({status:'concluido'})});await loadAdminOrders();state.admin.tables=await api('/api/admin/tables');closeLayer();renderAdmin();toast('Pagamento confirmado e mesa liberada')}catch(error){toast(`Pagamento registrado, mas a mesa não foi liberada: ${error.message}`)}};return;
    }
    if(!confirm(`Fechar a mesa ${order.table_number}? A comanda será concluída e a mesa ficará disponível.`))return;
    try{await api(`/api/admin/orders/${encodeURIComponent(orderId)}`,{method:'PATCH',body:JSON.stringify({status:'concluido'})});await loadAdminOrders();state.admin.tables=await api('/api/admin/tables');closeLayer();renderAdmin();toast(`Mesa ${order.table_number} liberada`)}catch(error){toast(error.message)}
  };
};

async function tableOperationsOpenAvailable(tableNumber){
  const selected=String(tableNumber),[catalog,tables]=await Promise.all([api('/api/admin/products'),api('/api/admin/tables')]);
  const table=tables.tables?.find(item=>String(item.number)===selected);if(!table||table.occupied)throw new Error('Esta mesa não está mais disponível. Atualize a tela de mesas.');
  state.catalog=catalog;state.admin.tables=tables;state.admin.posCart=[];state.admin.selectedTableNumber=selected;state.admin.editOrderId=null;state.admin.editExistingSelfService=[];state.admin.view='pos';renderAdmin();
  const form=$('#pos-form');if(!form)return;form.elements.order_type.value='dine_in';form.elements.table_number.value=selected;form.elements.order_type.dispatchEvent(new Event('change',{bubbles:true}));form.elements.table_number.dispatchEvent(new Event('change',{bubbles:true}));
}

document.addEventListener('click',async event=>{
  const select=event.target.closest('[data-table-select]'),filter=event.target.closest('[data-table-filter]'),refresh=event.target.closest('#refresh-tables'),open=event.target.closest('[data-table-open]'),close=event.target.closest('[data-table-close]');
  if(!select&&!filter&&!refresh&&!open&&!close)return;
  event.preventDefault();event.stopImmediatePropagation();
  if(select){state.admin.selectedTableNumber=String(select.dataset.tableSelect);renderAdmin();return}
  if(filter){state.admin.tableFilter=filter.dataset.tableFilter;renderAdmin();return}
  if(refresh){try{await Promise.all([loadAdminOrders(),api('/api/admin/tables').then(data=>state.admin.tables=data)]);renderAdmin()}catch(error){toast(error.message)}return}
  if(open){const orderId=open.dataset.orderId;if(orderId){try{await loadAdminOrders();await openOrderEditor(orderId)}catch(error){toast(error.message)}return}try{await tableOperationsOpenAvailable(open.dataset.tableOpen)}catch(error){toast(error.message)}return}
  if(close){const id=close.dataset.tableClose;try{if(!state.admin.orders.some(order=>order.id===id))await loadAdminOrders();const order=state.admin.orders.find(item=>item.id===id);if(!order)return toast('A comanda não está mais ativa. Atualize as mesas.');if(order.payment_status!=='pago'){openOrderDetails(id);return}if(!confirm(`Fechar a mesa ${order.table_number}? A comanda será concluída e a mesa ficará disponível.`))return;await api(`/api/admin/orders/${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify({status:'concluido'})});state.admin.tables=await api('/api/admin/tables');await loadAdminOrders();renderAdmin();toast(`Mesa ${order.table_number} liberada`)}catch(error){toast(error.message)}}
},true);
