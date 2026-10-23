Attempting to perform the InitializeDefaultDrives operation on the 'FileSystem' provider failed.
/* Mesas no padrão operacional: abrir comanda, editar e liberar após o pagamento. */
if(!document.getElementById('table-operations-style')){const style=document.createElement('style');style.id='table-operations-style';style.textContent='.table-card-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px}.table-card-actions button{flex:1;min-width:max-content}';document.head.appendChild(style)}
const tableOperationsBaseBoard=tablesBoardMarkup;
tablesBoardMarkup=function(data,{admin=false}={}){
  if(!admin)return tableOperationsBaseBoard(data,{admin});
  const tables=data?.tables||[];
  return `<div class="tables-summary"><div><strong>${data?.available_count||0}</strong><span>Disponíveis</span></div><div><strong>${data?.occupied_count||0}</strong><span>Ocupadas</span></div><div><strong>${data?.table_count||0}</strong><span>Total de mesas</span></div></div>${tables.length?`<div class="tables-grid">${tables.map(table=>`<article class="table-card ${table.occupied?'occupied':'available'}"><span class="table-dot"></span><strong>Mesa ${table.number}</strong><span>${table.occupied?tableStatusLabel(table.status):'Disponível'}</span>${table.occupied?`<small>${esc(table.customer_name||table.order_id)}</small><div class="table-card-actions"><button type="button" class="secondary-btn compact" data-table-edit-order="${esc(table.order_id)}">Abrir / editar</button><button type="button" class="primary-btn compact" data-table-close="${esc(table.order_id)}">Fechar mesa</button></div>`:`<div class="table-card-actions"><button type="button" class="primary-btn compact" data-table-open="${Number(table.number)}">Abrir mesa</button></div>`}</article>`).join('')}</div>`:`<div class="empty table-empty">O proprietário ainda não configurou a quantidade de mesas.</div>`}`;
};

document.addEventListener('click',async event=>{
  const open=event.target.closest('[data-table-open]'),edit=event.target.closest('[data-table-edit-order]'),close=event.target.closest('[data-table-close]');
  if(!open&&!edit&&!close)return;
  event.preventDefault();event.stopPropagation();
  if(open){
    const tableNumber=Number(open.dataset.tableOpen);
    state.admin.openTableNumber=tableNumber;state.admin.posCart=[];state.admin.view='pos';renderAdmin();
    const form=$('#pos-form');
    if(form){form.elements.order_type.value='dine_in';form.elements.table_number.value=String(tableNumber);form.elements.order_type.dispatchEvent(new Event('change',{bubbles:true}));form.elements.table_number.dispatchEvent(new Event('change',{bubbles:true}));form.scrollIntoView({behavior:'smooth',block:'center'})}
    return;
  }
  if(edit){try{if(!state.admin.orders.some(order=>order.id===edit.dataset.tableEditOrder))await loadAdminOrders();openOrderDetails(edit.dataset.tableEditOrder)}catch(error){toast(error.message)}return}
  if(close){
    const id=close.dataset.tableClose;
    try{
      if(!state.admin.orders.some(order=>order.id===id))await loadAdminOrders();
      const order=state.admin.orders.find(item=>item.id===id);
      if(!order)return toast('A comanda não está mais ativa. Atualize as mesas.');
      if(order.payment_status!=='pago'){toast('Feche a conta primeiro; depois confirme Fechar mesa para liberar.');openPaymentSettlement(id);return}
      if(!confirm(`Fechar a mesa ${order.table_number}? A comanda será concluída e a mesa ficará disponível.`))return;
      await api(`/api/admin/orders/${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify({status:'concluido'})});
      state.admin.tables=await api('/api/admin/tables');await loadAdminOrders();renderAdmin();toast(`Mesa ${order.table_number} liberada`);
    }catch(error){toast(error.message)}
  }
},true);

