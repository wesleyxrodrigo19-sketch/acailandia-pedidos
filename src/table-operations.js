/* Mesas no padrão operacional: abrir comanda, editar e liberar após o pagamento. */
if(document.head&&typeof document.createElement==='function'&&!document.getElementById('table-operations-style')){const style=document.createElement('style');style.id='table-operations-style';style.textContent='.table-card-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px}.table-card-actions button{flex:1;min-width:max-content}';document.head.appendChild(style)}
const tableOperationsBaseBoard=tablesBoardMarkup;
tablesBoardMarkup=function(data,{admin=false}={}){
  if(!admin)return tableOperationsBaseBoard(data,{admin});
  const tables=data?.tables||[];
  return `<div class="tables-summary"><div><strong>${data?.available_count||0}</strong><span>Disponíveis</span></div><div><strong>${data?.occupied_count||0}</strong><span>Ocupadas</span></div><div><strong>${data?.table_count||0}</strong><span>Total de mesas</span></div></div>${tables.length?`<div class="tables-grid">${tables.map(table=>`<article class="table-card ${table.occupied?'occupied':'available'}"><span class="table-dot"></span><strong>Mesa ${table.number}</strong><span>${table.occupied?tableStatusLabel(table.status):'Disponível'}</span>${table.occupied?`<small>${esc(table.customer_name||table.order_id)}</small>`:''}<div class="table-card-actions"><button type="button" class="secondary-btn compact" data-table-open="${Number(table.number)}" ${table.occupied?`data-order-id="${esc(table.order_id)}"`:''}>Abrir/Editar</button><button type="button" class="primary-btn compact" data-table-close="${table.occupied?esc(table.order_id):''}" ${table.occupied?'':'disabled'}>Fechar mesa</button></div></article>`).join('')}</div>`:`<div class="empty table-empty">O proprietário ainda não configurou a quantidade de mesas.</div>`}`;
};

const tableOperationsBaseOrderEditor=openOrderEditor;
openOrderEditor=async function(id){
  const order=state.admin.orders.find(item=>item.id===id);if(!order)return;
  if(!state.catalog)state.catalog=await api('/api/admin/products');
  const originalItems=order.items;
  order.items=(originalItems||[]).filter(item=>item.product_id);
  try{return await tableOperationsBaseOrderEditor(id)}finally{order.items=originalItems}
};

const tableOperationsBaseOrderDetails=openOrderDetails;
openOrderDetails=function(orderId){
  tableOperationsBaseOrderDetails(orderId);
  const order=state.admin.orders.find(item=>item.id===orderId),edit=$('#detail-edit-order'),release=$('#detail-release-table');
  if(order?.channel!=='counter'||!order.table_number||order.status==='cancelado')return;
  const actions=document.querySelector('.order-detail-actions');if(!actions)return;
  let closeTable=release||$('#detail-release-table');
  if(!closeTable){closeTable=document.createElement('button');closeTable.id='detail-release-table';closeTable.type='button';closeTable.className='secondary-btn';actions.append(closeTable)}
  closeTable.textContent=order.payment_status==='aberto'?'Pagar e fechar mesa':'Fechar mesa';
  closeTable.onclick=async()=>{
    if(order.payment_status==='aberto'){
    openPaymentSettlement(orderId);
    const confirm=$('#confirm-payment');if(!confirm)return;
    const confirmPayment=confirm.onclick;confirm.textContent='Confirmar pagamento e fechar mesa';
    confirm.onclick=async event=>{
      await confirmPayment.call(confirm,event);
      const updated=state.admin.orders.find(item=>item.id===orderId);if(updated?.payment_status!=='pago')return;
      try{await api(`/api/admin/orders/${encodeURIComponent(orderId)}`,{method:'PATCH',body:JSON.stringify({status:'concluido'})});await loadAdminOrders();state.admin.tables=await api('/api/admin/tables');closeLayer();renderAdmin();toast('Pagamento confirmado e mesa liberada')}
      catch(error){toast(`Pagamento registrado, mas a mesa não foi liberada: ${error.message}`)}
    };
      return;
    }
    if(!confirm(`Fechar a mesa ${order.table_number}? A comanda será concluída e a mesa ficará disponível.`))return;
    try{await api(`/api/admin/orders/${encodeURIComponent(orderId)}`,{method:'PATCH',body:JSON.stringify({status:'concluido'})});await loadAdminOrders();state.admin.tables=await api('/api/admin/tables');closeLayer();renderAdmin();toast(`Mesa ${order.table_number} liberada`)}catch(error){toast(error.message)}
  };
};

async function tableOperationsOpenAvailable(tableNumber){
  const selected=String(tableNumber),[catalog,tables]=await Promise.all([api('/api/admin/products'),api('/api/admin/tables')]);
  const table=tables.tables?.find(item=>String(item.number)===selected);
  if(!table||table.occupied)throw new Error('Esta mesa não está mais disponível. Atualize a tela de mesas.');
  state.catalog=catalog;state.admin.tables=tables;state.admin.posCart=[];state.admin.selectedTableNumber=selected;state.admin.editOrderId=null;state.admin.editExistingSelfService=[];state.admin.view='pos';renderAdmin();
  const form=$('#pos-form');if(!form)return;
  form.elements.order_type.value='dine_in';form.elements.table_number.value=selected;
  form.elements.order_type.dispatchEvent(new Event('change',{bubbles:true}));form.elements.table_number.dispatchEvent(new Event('change',{bubbles:true}));
}

document.addEventListener('click',async event=>{
  const open=event.target.closest('[data-table-open]'),close=event.target.closest('[data-table-close]');
  if(!open&&!close)return;
  event.preventDefault();event.stopPropagation();
  if(open){
    const orderId=open.dataset.orderId;
    if(orderId){try{await loadAdminOrders();await openOrderEditor(orderId)}catch(error){toast(error.message)}return}
    try{await tableOperationsOpenAvailable(open.dataset.tableOpen)}catch(error){toast(error.message)}
    return;
  }
  if(close){
    const id=close.dataset.tableClose;
    try{
      if(!state.admin.orders.some(order=>order.id===id))await loadAdminOrders();
      const order=state.admin.orders.find(item=>item.id===id);
      if(!order)return toast('A comanda não está mais ativa. Atualize as mesas.');
      if(order.payment_status!=='pago'){openOrderDetails(id);return}
      if(!confirm(`Fechar a mesa ${order.table_number}? A comanda será concluída e a mesa ficará disponível.`))return;
      await api(`/api/admin/orders/${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify({status:'concluido'})});
      state.admin.tables=await api('/api/admin/tables');await loadAdminOrders();renderAdmin();toast(`Mesa ${order.table_number} liberada`);
    }catch(error){toast(error.message)}
  }
},true);
