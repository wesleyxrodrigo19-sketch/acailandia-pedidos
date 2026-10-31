/* Operação Açailandia: caixa diário e equipe. Mantido separado do catálogo. */
const primeOpsMoneyInput=value=>Math.max(0,Math.round(Number(String(value||'').replace(/[^0-9,.-]/g,'').replace(/\./g,'').replace(',','.'))*100)||0);
const primeOpsDate=value=>value?new Date(`${String(value).replace(' ','T')}Z`).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'}):'—';
async function primeOpsLoadCash(){const data=await api('/api/admin/cash-register?branch=acailandia');const branch=data.branches?.acailandia||{};state.admin.cashRegister={...branch,branches:data.branches||{acailandia:branch},establishment:{name:'Açailandia PE — São Gonçalo'}}}
async function primeOpsLoadEmployees(){state.admin.employees=(await api('/api/admin/employees')).employees||[]}
function primeOpsCashView(){const d=state.admin.cashRegister||{},active=d.active,history=d.history||[];return `<section class="panel"><div class="panel-head"><div><h2>${active?'Caixa aberto':'Caixa fechado'}</h2><span class="muted">${active?`Aberto em ${primeOpsDate(active.opened_at)}. O valor esperado considera vendas em dinheiro, troco, entradas e sangrias.`:'Informe o fundo de troco para iniciar o dia.'}</span></div><span class="connection-pill ${active?'ready':''}">${active?'Em operação':'Aguardando abertura'}</span></div>${active?`<div class="stat-grid prime-ops-stats"><div class="stat"><div class="stat-label">Fundo inicial</div><div class="stat-value">${money(active.opening_cash_cents)}</div></div><div class="stat"><div class="stat-label">Vendas em dinheiro</div><div class="stat-value">${money(active.cash_sales_cents)}</div></div><div class="stat"><div class="stat-label">Troco</div><div class="stat-value">${money(active.change_cents)}</div></div><div class="stat"><div class="stat-label">Fiado em dinheiro</div><div class="stat-value">${money(active.fiado_cents)}</div></div><div class="stat"><div class="stat-label">Entradas</div><div class="stat-value">${money(active.cash_in_cents)}</div></div><div class="stat"><div class="stat-label">Sangrias</div><div class="stat-value">${money(active.cash_out_cents)}</div></div><div class="stat accent"><div class="stat-label">Esperado no caixa</div><div class="stat-value">${money(active.expected_cash_cents)}</div></div></div><div class="settings-grid prime-ops-entry"><div class="field"><label>Entrada de dinheiro</label><input id="prime-cash-in" inputmode="decimal" placeholder="0,00"></div><div class="field"><label>Motivo da entrada</label><input id="prime-cash-in-reason" maxlength="160" placeholder="Ex.: reforço de troco"></div><div class="field"><label>Sangria / retirada</label><input id="prime-cash-out" inputmode="decimal" placeholder="0,00"></div><div class="field"><label>Motivo da sangria</label><input id="prime-cash-out-reason" maxlength="160" placeholder="Ex.: despesa ou retirada"></div></div><div class="order-actions"><button class="secondary-btn" data-prime-cash-entry="in">Registrar entrada</button><button class="danger-btn" data-prime-cash-entry="out">Registrar sangria</button></div><div class="settings-grid"><div class="field"><label>Valor contado para fechar</label><input id="prime-cash-close" inputmode="decimal" placeholder="${(active.expected_cash_cents/100).toFixed(2).replace('.',',')}"></div><div class="field"><label>Observação do fechamento</label><textarea id="prime-cash-notes" maxlength="500" placeholder="Ex.: diferença conferida, retirada para depósito..."></textarea></div></div><button class="primary-btn" data-prime-cash-close>Fechar caixa e registrar conferência</button>`:`<div class="settings-grid one-line"><div class="field"><label>Fundo inicial em dinheiro</label><input id="prime-cash-open" inputmode="decimal" placeholder="Ex.: 100,00"></div></div><button class="primary-btn" data-prime-cash-open>Abrir caixa</button>`}</section><section class="panel"><div class="panel-head"><div><h2>Últimos fechamentos</h2><span class="muted">Conferência dos últimos sete turnos.</span></div></div><div class="management-table-wrap"><table class="management-table"><thead><tr><th>Abertura</th><th>Inicial</th><th>Fiado</th><th>Esperado</th><th>Informado</th><th>Diferença</th><th>Observação</th></tr></thead><tbody>${history.map(row=>`<tr><td>${primeOpsDate(row.opened_at)}</td><td>${money(row.opening_cash_cents)}</td><td>${money(row.fiado_cents)}</td><td>${money(row.expected_cash_cents)}</td><td>${row.reported_closing_cents==null?'—':money(row.reported_closing_cents)}</td><td>${row.difference_cents==null?'—':money(row.difference_cents)}</td><td>${esc(row.closing_notes||'—')}</td></tr>`).join('')||'<tr><td colspan="7">Nenhum fechamento registrado.</td></tr>'}</tbody></table></div></section>`}
function primeOpsEmployeesView(){const rows=state.admin.employees||[];return `<section class="panel"><div class="panel-head"><div><h2>Funcionários</h2><span class="muted">Cadastre a equipe para manter a operação organizada. Produtos e preços não são afetados.</span></div></div><div class="settings-grid"><div class="field"><label>Novo funcionário</label><input id="prime-employee-name" maxlength="100" placeholder="Nome completo"></div></div><button class="primary-btn" data-prime-employee-add>Adicionar funcionário</button><div class="management-table-wrap"><table class="management-table"><thead><tr><th>Nome</th><th>Situação</th><th>Ação</th></tr></thead><tbody>${rows.map(row=>`<tr><td><input data-prime-employee-name="${row.id}" maxlength="100" value="${esc(row.name)}"></td><td>${row.is_active?'Ativo':'Inativo'}</td><td><button class="secondary-btn compact" data-prime-employee-save="${row.id}" data-prime-employee-active="${row.is_active?0:1}">${row.is_active?'Desativar':'Ativar'}</button></td></tr>`).join('')||'<tr><td colspan="3">Nenhum funcionário cadastrado.</td></tr>'}</tbody></table></div></section>`}
const primeOpsAdminNav=adminNavButtons;
adminNavButtons=()=>{const base=primeOpsAdminNav();if(base.includes('data-admin-view="cash-register"')||base.includes('data-admin-view="employees"'))return base;return base.replace(/(<button[^>]+data-admin-view="settings")/,`<button class="${state.admin.view==='cash-register'?'active':''}" data-admin-view="cash-register"><span class="admin-nav-icon">▣</span><span class="nav-full">Caixa</span><span class="nav-short">Caixa</span></button><button class="${state.admin.view==='employees'?'active':''}" data-admin-view="employees"><span class="nav-full">Funcionários</span><span class="nav-short">Equipe</span></button>$1`)};
let primeOpsWarmStarted=false;
const primeOpsRenderAdmin=renderAdmin;
renderAdmin=function(){if(state.admin.logged)primeOpsWarmAdminCache();if(state.admin.view==='cash-register'){$('#app').innerHTML=adminLayout(primeOpsCashView(),'Caixa diário');primeOpsBindCash();return}if(state.admin.view==='employees'){$('#app').innerHTML=adminLayout(primeOpsEmployeesView(),'Funcionários');primeOpsBindEmployees();return}return primeOpsRenderAdmin()};
const primeOpsBindAdmin=bindAdmin;
bindAdmin=function(){primeOpsBindAdmin();document.querySelectorAll('[data-admin-view="cash-register"]').forEach(button=>button.onclick=async()=>{state.admin.view='cash-register';await primeOpsLoadCash();renderAdmin()});document.querySelectorAll('[data-admin-view="employees"]').forEach(button=>button.onclick=async()=>{state.admin.view='employees';await primeOpsLoadEmployees();renderAdmin()})};
function primeOpsBindCash(){document.querySelectorAll('[data-admin-action]').forEach(button=>button.onclick=async()=>{if(button.dataset.adminAction==='logout'){await api('/api/admin/logout',{method:'POST'});location.reload()}else location.href='/'});const send=async body=>{await api('/api/admin/cash-register',{method:'POST',body:JSON.stringify(body)});await primeOpsLoadCash();renderAdmin()};const open=$('[data-prime-cash-open]');if(open)open.onclick=async()=>{try{await send({action:'open',opening_cash_cents:primeOpsMoneyInput($('#prime-cash-open').value)});toast('Caixa aberto')}catch(error){toast(error.message)}};document.querySelectorAll('[data-prime-cash-entry]').forEach(button=>button.onclick=async()=>{const type=button.dataset.primeCashEntry,value=primeOpsMoneyInput($(`#prime-cash-${type}`).value),reason=$(`#prime-cash-${type}-reason`).value;if(!value)return toast('Informe um valor maior que zero.');try{await send({action:'entry',entry_type:type,amount_cents:value,reason});toast(type==='in'?'Entrada registrada':'Sangria registrada')}catch(error){toast(error.message)}});const close=$('[data-prime-cash-close]');if(close)close.onclick=async()=>{const value=$('#prime-cash-close').value;if(!String(value).trim())return toast('Informe o valor contado no caixa.');try{await send({action:'close',reported_closing_cents:primeOpsMoneyInput(value),closing_notes:$('#prime-cash-notes').value});toast('Caixa fechado e conferido')}catch(error){toast(error.message)}}}
function primeOpsBindEmployees(){document.querySelectorAll('[data-admin-action]').forEach(button=>button.onclick=async()=>{if(button.dataset.adminAction==='logout'){await api('/api/admin/logout',{method:'POST'});location.reload()}else location.href='/'});const add=$('[data-prime-employee-add]');if(add)add.onclick=async()=>{const name=$('#prime-employee-name').value.trim();if(!name)return toast('Informe o nome do funcionário.');try{await api('/api/admin/employees',{method:'POST',body:JSON.stringify({name})});await primeOpsLoadEmployees();renderAdmin();toast('Funcionário adicionado')}catch(error){toast(error.message)}};document.querySelectorAll('[data-prime-employee-save]').forEach(button=>button.onclick=async()=>{const id=button.dataset.primeEmployeeSave,name=$(`[data-prime-employee-name="${id}"]`).value;try{await api(`/api/admin/employees/${id}`,{method:'PATCH',body:JSON.stringify({name,is_active:button.dataset.primeEmployeeActive==='1'})});await primeOpsLoadEmployees();renderAdmin();toast('Cadastro atualizado')}catch(error){toast(error.message)}})}

// Proteção final para o menu. Este handler roda em capture antes dos handlers
// individuais; por isso precisa carregar explicitamente os dados de cada tela.
let primeAdminNavigationRequest=0;
const primeAdminViewTitles={orders:'Pedidos',management:'Gestão de Pedidos','counter-orders':'Self-service/Balcão',pos:'Novo pedido no balcão',availability:'Abrir ou fechar a loja',tables:'Controle de mesas',revenue:'Faturamento',products:'Produtos',settings:'Configurações',complements:'Complementos',abandoned:'Carrinhos abandonados',audit:'Auditoria',neighborhoods:'Bairros e taxas',integrations:'Integrações',fiscal:'Fiscal NFC-e','cash-register':'Caixa diário',employees:'Funcionários'};
function primeOpsRenderNavigationState(view,error){
  const title=primeAdminViewTitles[view]||'Painel';
  const message=error?`<p class="muted">${esc(error.message||'Não foi possível carregar esta tela.')}</p><button type="button" class="primary-btn" id="admin-navigation-retry">Tentar novamente</button>`:`<p class="muted">Carregando os dados desta tela…</p>`;
  const app=$('#app');if(!app)return;
  app.innerHTML=adminLayout(`<section class="panel" role="status" aria-live="polite" style="min-height:190px;display:grid;place-items:center;text-align:center"><div><strong>${error?'Não foi possível abrir esta tela':`Abrindo ${esc(title)}`}</strong>${message}</div></section>`,title);
  const retry=$('#admin-navigation-retry');
  if(retry)retry.onclick=()=>primeOpsNavigateAdmin(view);
}
async function primeOpsNavigateAdmin(view){
  const request=++primeAdminNavigationRequest;
  state.admin.view=view;state.admin.sidebarOpen=false;
  const hasSnapshot=primeOpsHasAdminSnapshot(view);
  // Reuse the last screen immediately. Refresh it in the background so a
  // normal menu click never has to wait for the network before responding.
  if(hasSnapshot){
    try{renderAdmin()}catch{primeOpsRenderNavigationState(view,null)}
  }else primeOpsRenderNavigationState(view,null);
  try{
    await primeOpsLoadAdminView(view);
    if(request!==primeAdminNavigationRequest)return;
    // A first visit still needs its initial render; a cached screen is left
    // untouched while refreshing so an in-progress form or order is not lost.
    if(!hasSnapshot||view==='tables')renderAdmin();
  }catch(error){
    if(request!==primeAdminNavigationRequest)return;
    if(!hasSnapshot)primeOpsRenderNavigationState(view,error);
  }
}
function primeOpsHasAdminSnapshot(view){
  if(view==='orders'||view==='counter-orders')return Array.isArray(state.admin.orders);
  if(view==='pos')return Boolean(state.catalog?.products&&state.admin.tables);
  if(['products','settings','availability','complements'].includes(view))return Boolean(state.catalog?.products);
  if(view==='neighborhoods')return Array.isArray(state.admin.neighborhoodFees);
  if(view==='tables')return Boolean(state.admin.tables);
  if(view==='revenue')return Boolean(state.admin.revenue);
  if(view==='management')return Boolean(state.admin.management);
  if(view==='audit')return Array.isArray(state.admin.audit);
  if(view==='cash-register')return Boolean(state.admin.cashRegister);
  if(view==='employees')return Boolean(state.admin.employeePurchases&&Array.isArray(state.admin.employees));
  if(view==='abandoned')return Array.isArray(state.admin.abandoned);
  if(view==='integrations')return Boolean(state.admin.integrationStatus&&state.admin.printStatus);
  if(view==='fiscal')return Boolean(state.admin.fiscal);
  return false;
}
async function primeOpsLoadAdminView(view){
  if(view==='orders') await loadAdminOrders();
  else if(view==='counter-orders') await loadAdminOrders();
  else if(view==='pos'){
    const [catalog,tables]=await Promise.all([api('/api/admin/products'),api('/api/admin/tables').catch(()=>state.admin.tables||null)]);
    state.catalog=catalog;if(tables)state.admin.tables=tables;
  }
  else if(['products','settings','availability','neighborhoods','complements'].includes(view)){
    state.catalog=await api('/api/admin/products');
    if(view==='settings')state.admin.printStatus=await api('/api/admin/print-status').catch(()=>state.admin.printStatus||{});
    if(view==='neighborhoods')await loadBranchNeighborhoodFees();
  }
  else if(view==='tables'){
    const [,tables]=await Promise.all([loadAdminOrders(),api('/api/admin/tables')]);
    state.admin.tables=tables;
  }
  else if(view==='revenue')await loadRevenue();
  else if(view==='management')await loadOrderManagement();
  else if(view==='audit')await loadAudit();
  else if(view==='cash-register')await primeOpsLoadCash();
  else if(view==='employees')await loadEmployeeManagement();
  else if(view==='abandoned')await loadAbandoned();
  else if(view==='integrations'){
    const [catalog,printStatus,integrationStatus]=await Promise.all([
      api('/api/admin/products'),api('/api/admin/print-status'),
      api('/api/admin/integrations/status').catch(()=>({scale:{configured:false,grams:0,captured_at:'',token_created_at:''}}))
    ]);
    state.catalog=catalog;state.admin.printStatus=printStatus;state.admin.integrationStatus=integrationStatus;
  }
  else if(view==='fiscal')await loadFiscalSetup();
  else throw new Error('Esta tela não está disponível no painel.');
}
// Antecipe as consultas das telas de gestão depois que a sessão estiver pronta.
// Assim, ao abrir o menu, a maioria das telas usa respostas já recebidas.
function primeOpsWarmAdminCache(){
  if(primeOpsWarmStarted)return;primeOpsWarmStarted=true;
  const from=new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString().slice(0,10),to=new Date().toISOString().slice(0,10);
  const paths=[
    ['/api/admin/products',data=>{state.catalog=data}],
    ['/api/admin/tables',data=>{state.admin.tables=data}],
    ['/api/admin/print-status',data=>{state.admin.printStatus=data}],
    ['/api/admin/revenue?',data=>{state.admin.revenue=data}],
    ['/api/admin/order-management?branch=acailandia',data=>{state.admin.management=data;state.admin.managementBranches={acailandia:data}}],
    ['/api/admin/audit',data=>{state.admin.audit=data.entries||[]}],
    ['/api/admin/cash-register?branch=acailandia',data=>{const branch=data.branches?.acailandia||{};state.admin.cashRegister={...branch,branches:data.branches||{acailandia:branch},establishment:{name:'Açailandia PE — São Gonçalo'}}}],
    ['/api/admin/employees',data=>{state.admin.employees=data.employees||[]}],
    [`/api/admin/employee-purchases?from=${from}&to=${to}`,data=>{state.admin.employeePurchases=data}],
    ['/api/admin/abandoned-carts',data=>{state.admin.abandoned=data.carts||[]}],
    ['/api/admin/integrations/status',data=>{state.admin.integrationStatus=data}],
    ['/api/admin/fiscal/setup',data=>{state.admin.fiscal=data}],
    ['/api/admin/neighborhood-fees',data=>{state.admin.neighborhoodFees=data.fees||[]}]
  ];
  Promise.all(paths.map(([path,apply])=>api(path).then(apply).catch(()=>null)));
}
const primeOpsStartAdmin=startAdmin;
startAdmin=async function(){await primeOpsStartAdmin();if(state.admin.logged)primeOpsWarmAdminCache()};
const primeOpsAdminLogin=adminLogin;
adminLogin=async function(event){await primeOpsAdminLogin(event);if(state.admin.logged)primeOpsWarmAdminCache()};
if(!window.__primeAdminNavigationGuard){window.__primeAdminNavigationGuard=true;document.addEventListener('click',event=>{const button=event.target.closest('[data-admin-view]');if(!button||!state.admin.logged)return;event.preventDefault();event.stopImmediatePropagation();return primeOpsNavigateAdmin(button.dataset.adminView)},true)}

// Caixa operacional completo: unidade e funcionário ficam registrados no turno,
// e a conferência é exibida antes da confirmação do fechamento.
primeOpsCashView=function(){const d=state.admin.cashRegister||{},active=d.active,history=d.history||[],employees=d.employees||[],establishment=d.establishment||{name:'PRIME AÇAÍ'};const metric=(label,value,accent='')=>`<div class="stat ${accent}"><div class="stat-label">${label}</div><div class="stat-value">${money(value||0)}</div></div>`;const employeeField=employees.length?`<div class="field"><label>Funcionário responsável</label><select id="prime-cash-employee"><option value="">Selecione o funcionário</option>${employees.map(employee=>`<option value="${employee.id}">${esc(employee.name)}</option>`).join('')}</select></div>`:`<div class="field"><label>Funcionário responsável</label><input id="prime-cash-employee-name" maxlength="100" placeholder="Digite o nome do responsável"></div>`;return `<section class="panel prime-cash-panel"><div class="panel-head"><div><h2>${active?'Caixa aberto':'Caixa fechado'}</h2><span class="muted">${active?`${esc(active.establishment_name||establishment.name)} • ${esc(active.employee_name||'Responsável não informado')} • aberto em ${primeOpsDate(active.opened_at)}`:'Abra o caixa antes de registrar vendas ou movimentações.'}</span></div><span class="connection-pill ${active?'ready':''}">${active?'Em operação':'Fechado'}</span></div>${active?`<div class="stat-grid prime-ops-stats">${metric('Valor inicial',active.opening_cash_cents)}${metric('Vendas em dinheiro',active.cash_sales_cents)}${metric('Trocos',active.change_cents)}${metric('Entradas',active.cash_in_cents)}${metric('Sangrias',active.cash_out_cents)}${metric('Valor esperado',active.expected_cash_cents,'accent')}</div><div class="settings-grid prime-ops-entry"><div class="field"><label>Entrada adicional</label><input id="prime-cash-in" inputmode="decimal" placeholder="0,00"></div><div class="field"><label>Observação da entrada</label><input id="prime-cash-in-reason" maxlength="160" placeholder="Ex.: reforço de troco"></div><div class="field"><label>Sangria</label><input id="prime-cash-out" inputmode="decimal" placeholder="0,00"></div><div class="field"><label>Observação da sangria</label><input id="prime-cash-out-reason" maxlength="160" placeholder="Ex.: retirada para depósito"></div></div><div class="order-actions"><button class="secondary-btn" data-prime-cash-entry="in">Registrar entrada</button><button class="danger-btn" data-prime-cash-entry="out">Registrar sangria</button></div><div class="prime-cash-close-box"><h3>Conferência do fechamento</h3><div class="settings-grid"><div class="field"><label>Valor contado em dinheiro</label><input id="prime-cash-close-value" inputmode="decimal" placeholder="${(active.expected_cash_cents/100).toFixed(2).replace('.',',')}"></div><div class="field"><label>Observação do fechamento (opcional)</label><textarea id="prime-cash-notes" maxlength="500" placeholder="Informe qualquer ocorrência"></textarea></div></div><div class="prime-cash-review"><div><span>Inicial</span><strong>${money(active.opening_cash_cents)}</strong></div><div><span>Vendas em dinheiro</span><strong>${money(active.cash_sales_cents)}</strong></div><div><span>Entradas</span><strong>${money(active.cash_in_cents)}</strong></div><div><span>Trocos</span><strong>− ${money(active.change_cents)}</strong></div><div><span>Sangrias</span><strong>− ${money(active.cash_out_cents)}</strong></div><div class="total"><span>Esperado</span><strong>${money(active.expected_cash_cents)}</strong></div><div class="total"><span>Informado</span><strong id="prime-cash-reported">—</strong></div><div class="difference"><span>Diferença</span><strong id="prime-cash-difference">—</strong></div></div><button class="primary-btn" data-prime-cash-close>Confirmar e fechar caixa</button></div>`:`<div class="settings-grid"><div class="field"><label>Estabelecimento</label><input value="${esc(establishment.name)}" disabled></div>${employeeField}<div class="field"><label>Valor inicial em dinheiro</label><input id="prime-cash-open" inputmode="decimal" placeholder="Ex.: 100,00"></div></div><button class="primary-btn" data-prime-cash-open>Abrir caixa</button>`}</section><section class="panel"><div class="panel-head"><div><h2>Histórico dos últimos 7 dias</h2><span class="muted">Turnos abertos e fechados, com a conferência completa.</span></div></div><div class="management-table-wrap"><table class="management-table prime-cash-history"><thead><tr><th>Data</th><th>Estabelecimento</th><th>Funcionário</th><th>Abertura</th><th>Fechamento</th><th>Inicial</th><th>Vendas dinheiro</th><th>Entradas</th><th>Trocos</th><th>Sangrias</th><th>Esperado</th><th>Informado</th><th>Diferença</th><th>Observação</th></tr></thead><tbody>${history.map(row=>`<tr><td>${primeOpsDate(row.opened_at).split(' ')[0]}</td><td>${esc(row.establishment_name||'PRIME AÇAÍ')}</td><td>${esc(row.employee_name||'—')}</td><td>${primeOpsDate(row.opened_at)}</td><td>${primeOpsDate(row.closed_at)}</td><td>${money(row.opening_cash_cents)}</td><td>${money(row.cash_sales_cents)}</td><td>${money(row.cash_in_cents)}</td><td>${money(row.change_cents)}</td><td>${money(row.cash_out_cents)}</td><td>${money(row.expected_cash_cents)}</td><td>${row.reported_closing_cents==null?'—':money(row.reported_closing_cents)}</td><td class="${Number(row.difference_cents)>0?'cash-surplus':Number(row.difference_cents)<0?'cash-shortage':'cash-balanced'}">${row.difference_cents==null?'—':money(row.difference_cents)}</td><td>${esc(row.closing_notes||'—')}</td></tr>`).join('')||'<tr><td colspan="14">Nenhum turno registrado nos últimos 7 dias.</td></tr>'}</tbody></table></div></section>`};

primeOpsBindCash=function(){document.querySelectorAll('[data-admin-action]').forEach(button=>button.onclick=async()=>{if(button.dataset.adminAction==='logout'){await api('/api/admin/logout',{method:'POST'});location.reload()}else location.href='/'});const send=async body=>{await api('/api/admin/cash-register',{method:'POST',body:JSON.stringify(body)});await primeOpsLoadCash();renderAdmin()};const open=$('[data-prime-cash-open]');if(open)open.onclick=async()=>{const employeeSelect=$('#prime-cash-employee'),employeeName=$('#prime-cash-employee-name');if(employeeSelect&&!employeeSelect.value)return toast('Selecione o funcionário responsável.');if(employeeName&&!employeeName.value.trim())return toast('Informe o funcionário responsável.');try{await send({action:'open',opening_cash_cents:primeOpsMoneyInput($('#prime-cash-open').value),employee_id:employeeSelect?Number(employeeSelect.value):0,employee_name:employeeName?.value.trim()||''});toast('Caixa aberto com sucesso')}catch(error){toast(error.message)}};document.querySelectorAll('[data-prime-cash-entry]').forEach(button=>button.onclick=async()=>{const type=button.dataset.primeCashEntry,value=primeOpsMoneyInput($(`#prime-cash-${type}`).value),reason=$(`#prime-cash-${type}-reason`).value.trim();if(!value)return toast('Informe um valor maior que zero.');try{await send({action:'entry',entry_type:type,amount_cents:value,reason});toast(type==='in'?'Entrada registrada':'Sangria registrada')}catch(error){toast(error.message)}});const closeValue=$('#prime-cash-close-value'),difference=$('#prime-cash-difference'),reported=$('#prime-cash-reported'),expected=Number(state.admin.cashRegister?.active?.expected_cash_cents||0);const refresh=()=>{if(!closeValue||!closeValue.value.trim()){if(reported)reported.textContent='—';if(difference){difference.textContent='—';difference.className=''}return}const value=primeOpsMoneyInput(closeValue.value),delta=value-expected;reported.textContent=money(value);difference.textContent=`${delta>0?'Sobra ':delta<0?'Falta ':'Conferido '}${money(Math.abs(delta))}`;difference.className=delta>0?'cash-surplus':delta<0?'cash-shortage':'cash-balanced'};if(closeValue){closeValue.oninput=refresh;refresh()}const close=$('[data-prime-cash-close]');if(close)close.onclick=async()=>{if(!closeValue.value.trim())return toast('Informe o valor contado no caixa.');refresh();if(!confirm(`Confirma o fechamento?\n\nValor esperado: ${money(expected)}\nValor informado: ${money(primeOpsMoneyInput(closeValue.value))}\n${difference.textContent}`))return;try{await send({action:'close',reported_closing_cents:primeOpsMoneyInput(closeValue.value),closing_notes:$('#prime-cash-notes').value});toast('Caixa fechado e conferido')}catch(error){toast(error.message)}}};

function primeOpsTableItemsMarkup(order){
  return (order.items||[]).map(item=>`<div class="owner-table-item"><span>${Number(item.quantity||1)}× ${esc(item.product_name)}${item.table_label?`<small class="owner-table-item-label">${esc(item.table_label)}</small>`:''}</span><strong>${money(Number(item.quantity||1)*Number(item.unit_price_cents||0))}</strong><details class="owner-table-item-menu"><summary aria-label="Opções de ${esc(item.product_name)}">⋮</summary><div>${[['edit','Editar item'],['identify','Nomear item'],['details','Detalhes do item'],['delete','Excluir item']].map(([action,label])=>`<button type="button" data-owner-item-action="${action}" data-owner-item-id="${Number(item.id)}">${label}</button>`).join('')}</div></details></div>`).join('')||'<p class="muted">Nenhum item nesta comanda.</p>';
}
function primeOpsOpenTableItemAction(orderId,item,action,onSaved){
  const choices=orderItemChoices(item),isDetails=action==='details';
  const titles={identify:'Nomear item',edit:'Editar item',details:'Detalhes do item'};
  const content=action==='identify'?`<p>Identifique uma unidade para esta conta. O nome original do produto não será alterado.</p><label class="field"><span>Nome ou identificação</span><input name="label" maxlength="80" value="${esc(item.table_label||'')}" placeholder="Ex.: João ou camisa azul"></label>${Number(item.quantity)>1?'<p class="muted">A identificação será aplicada a uma unidade.</p>':''}`:action==='edit'?`<label class="field"><span>Quantidade</span><input name="quantity" type="number" min="1" max="${item.table_label?'1':'20'}" value="${Number(item.quantity)}" required></label><label class="field"><span>Observação</span><textarea name="notes" maxlength="300" rows="3">${esc(item.notes||'')}</textarea></label>`:`<p><strong>${esc(item.product_name)}</strong>${item.table_label?` · ${esc(item.table_label)}`:''}</p><p>Quantidade: ${Number(item.quantity)} · Valor unitário: ${money(Number(item.unit_price_cents||0))}</p>${choices.length?`<div>${choices.map(choice=>`<p>${esc(choice)}</p>`).join('')}</div>`:'<p class="muted">Nenhum complemento ou observação.</p>'}`;
  const scrim=document.createElement('div');scrim.className='owner-payment-entry-scrim';
  scrim.innerHTML=`<form class="owner-payment-entry owner-table-item-entry" role="dialog" aria-modal="true"><header><h3>${titles[action]}</h3><button type="button" class="icon-btn" data-item-cancel aria-label="Fechar">×</button></header>${content}${isDetails?'<button type="button" class="secondary-btn" data-item-cancel>Voltar</button>':'<button type="submit" class="primary-btn">Salvar</button>'}</form>`;
  (document.querySelector('.owner-rv-payment-drawer, .table-bill-split')||document.body).append(scrim);
  scrim.querySelectorAll('[data-item-cancel]').forEach(button=>button.onclick=()=>scrim.remove());
  if(isDetails)return;
  scrim.querySelector('form').onsubmit=async event=>{
    event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
    const data=new FormData(form),button=form.querySelector('[type="submit"]');button.disabled=true;
    try{
      await api(`/api/admin/orders/${encodeURIComponent(orderId)}/table-items/${Number(item.id)}`,{method:'PATCH',body:JSON.stringify(action==='identify'?{action,label:data.get('label')}:{action,quantity:Number(data.get('quantity')),notes:data.get('notes')})});
      scrim.remove();await onSaved(action);toast(action==='identify'?'Identificação atualizada':'Item atualizado');
    }catch(error){toast(error.message);button.disabled=false}
  };
}
function primeOpsOpenTablePayment(orderId){
  const order=state.admin.orders.find(item=>String(item.id)===String(orderId));
  if(!order)return;
  const settings=state.catalog?.settings||{};
  if(order.payment_status!=='aberto'){
    primeOpsBaseTablePayment(orderId);
    return;
  }
  const subtotal=Math.max(0,Number(order.subtotal_cents||0)),delivery=Math.max(0,Number(order.delivery_fee_cents||0)),baseTotal=subtotal+delivery;
  const people=Number((order.notes||'').match(/Pessoas:\s*(\d+)/)?.[1]||1);
  const attendant=(order.notes||'').match(/Atendente:\s*([^•]+)/)?.[1]?.trim()||'Não informado';
  const methods=[['dinheiro','▣','Dinheiro','Ctrl + 1'],['credito','▰','Crédito','Ctrl + 2'],['debito','▰','Débito','Ctrl + 3'],['pix','☑','Pix','Ctrl + 4']];
  const methodLabels=Object.fromEntries(methods.map(([value,,label])=>[value,label]));
  const payments=[];
  let divisions=people;
  const parseCents=value=>Math.max(0,Math.round(Number(String(value||'').replace(/[^0-9,.-]/g,'').replace(/\./g,'').replace(',','.'))*100)||0);
  const formatInput=cents=>(Math.max(0,cents)/100).toFixed(2).replace('.',',');
  const items=primeOpsTableItemsMarkup(order);
  layer(`<div class="drawer-header owner-rv-payment-head"><button type="button" class="icon-btn" data-close aria-label="Fechar">×</button><div><span class="eyebrow">RECEBIMENTO</span><h2>Fechar conta</h2><span class="muted">Pedido #${esc(order.id)} · Mesa ${String(order.table_number).padStart(2,'0')}</span></div></div><section class="owner-rv-info-grid"><div><span>Cliente</span><strong>${esc(order.customer_name||'Não informado')}</strong></div><div><span>Pessoas</span><strong>${people} ${people===1?'pessoa':'pessoas'}</strong></div><div><span>Atendente</span><strong>${esc(attendant)}</strong></div><div><span>Mesa</span><strong>${String(order.table_number).padStart(2,'0')}</strong></div></section><div class="drawer-content owner-rv-payment" id="owner-table-payment-content"><section class="owner-rv-order-items"><h3>Itens da comanda</h3>${items||'<p class="muted">Nenhum item nesta comanda.</p>'}</section><div class="owner-rv-account"><div class="owner-rv-total-card"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="owner-rv-total-card owner-rv-discount-card"><span>Desconto</span><strong id="owner-table-discount">${money(0)}</strong><div class="owner-rv-discount-controls"><select id="owner-table-discount-mode" aria-label="Tipo de desconto"><option value="">Sem desconto</option><option value="amount">R$</option><option value="percent">%</option></select><input id="owner-table-discount-value" inputmode="decimal" placeholder="0,00" aria-label="Valor do desconto"></div></div><div class="owner-rv-total-card owner-rv-total-grand"><span>Total</span><strong id="owner-table-total">${money(baseTotal)}</strong></div><div class="owner-rv-total-card owner-rv-paid"><span>Total pago</span><strong id="owner-table-paid">${money(0)}</strong></div><div class="owner-rv-total-card owner-rv-due"><span>Falta pagar</span><strong id="owner-table-due">${money(baseTotal)}</strong></div></div><section class="owner-rv-method-section"><h3>Forma de pagamento</h3><div class="owner-rv-methods" role="group" aria-label="Forma de pagamento">${methods.map(([value,icon,label,shortcut])=>`<button type="button" class="owner-rv-method" data-owner-table-method="${value}"><span>${icon}</span><b>${label}</b><small>${shortcut}</small></button>`).join('')}<button type="button" class="owner-rv-method owner-rv-method-disabled" disabled><span>✥</span><b>Pix auto</b><small>Não configurado</small></button></div></section><section class="owner-rv-recorded"><h3>Pagamentos registrados</h3><div id="owner-table-recorded"><p class="muted">Nenhum pagamento registrado.</p></div></section><label class="check-row owner-rv-employee ${Number(settings.employee_discount_percent||0)?'':'hidden'}"><input type="checkbox" id="owner-table-employee"><span><strong>Desconto de funcionário</strong><small>${Number(settings.employee_discount_percent||0)}% configurado nas opções do painel.</small></span></label></div><div class="owner-rv-division"><strong>Divisão por pessoa</strong><div><button type="button" data-owner-table-division="-1" aria-label="Diminuir divisões">−</button><strong id="owner-table-division-count">${divisions}</strong><button type="button" data-owner-table-division="1" aria-label="Aumentar divisões">＋</button><b id="owner-table-division-total">${money(Math.ceil(baseTotal/divisions))}</b></div></div><div class="drawer-footer owner-rv-payment-footer"><button type="button" class="secondary-btn" data-close>Voltar</button><button type="button" class="primary-btn" id="owner-table-confirm" disabled>Finalizar · ${money(baseTotal)}</button></div>`,`drawer admin-order-drawer owner-rv-payment-drawer`);
  layer(`<div class="drawer-header owner-rv-payment-head"><button type="button" class="icon-btn" data-close aria-label="Fechar">×</button><div><span class="eyebrow">RECEBIMENTO</span><h2>Fechar conta</h2><span class="muted">Pedido #${esc(order.id)} · Mesa ${String(order.table_number).padStart(2,'0')}</span></div></div><section class="owner-rv-info-grid"><div><span>Cliente</span><strong>${esc(order.customer_name||'Não informado')}</strong></div><div><span>Pessoas</span><strong>${people} ${people===1?'pessoa':'pessoas'}</strong></div><div><span>Atendente</span><strong>${esc(attendant)}</strong></div><div><span>Mesa</span><strong>${String(order.table_number).padStart(2,'0')}</strong></div></section><div class="drawer-content owner-rv-payment" id="owner-table-payment-content"><section class="owner-rv-order-items"><h3>Itens da comanda</h3>${items||'<p class="muted">Nenhum item nesta comanda.</p>'}</section><div class="owner-rv-account"><div class="owner-rv-total-card"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="owner-rv-total-card owner-rv-discount-card"><span>Desconto</span><strong id="owner-table-discount">${money(0)}</strong><div class="owner-rv-discount-controls"><select id="owner-table-discount-mode" aria-label="Tipo de desconto"><option value="">Sem desconto</option><option value="amount">R$</option><option value="percent">%</option></select><input id="owner-table-discount-value" inputmode="decimal" placeholder="0,00" aria-label="Valor do desconto"></div></div><div class="owner-rv-total-card owner-rv-total-grand"><span>Total</span><strong id="owner-table-total">${money(baseTotal)}</strong></div><div class="owner-rv-total-card owner-rv-paid"><span>Total pago</span><strong id="owner-table-paid">${money(0)}</strong></div><div class="owner-rv-total-card owner-rv-due"><span>Falta pagar</span><strong id="owner-table-due">${money(baseTotal)}</strong></div></div><section class="owner-rv-method-section"><h3>Forma de pagamento</h3><div class="owner-rv-methods" role="group" aria-label="Forma de pagamento">${methods.map(([value,icon,label,shortcut])=>`<button type="button" class="owner-rv-method" data-owner-table-method="${value}"><span>${icon}</span><b>${label}</b><small>${shortcut}</small></button>`).join('')}<button type="button" class="owner-rv-method owner-rv-method-disabled" disabled><span>✥</span><b>Pix auto</b><small>Não configurado</small></button></div></section><section class="owner-rv-recorded"><h3>Pagamentos registrados</h3><div id="owner-table-recorded"><p class="muted">Nenhum pagamento registrado.</p></div></section><label class="check-row owner-rv-employee ${Number(settings.employee_discount_percent||0)?'':'hidden'}"><input type="checkbox" id="owner-table-employee"><span><strong>Desconto de funcionário</strong><small>${Number(settings.employee_discount_percent||0)}% configurado nas opções do painel.</small></span></label></div><div class="owner-rv-division" id="owner-table-division"><strong>Divisão por pessoa</strong><div><button type="button" data-owner-table-division="-1" aria-label="Diminuir divisões">−</button><strong id="owner-table-division-count">${divisions}</strong><button type="button" data-owner-table-division="1" aria-label="Aumentar divisões">＋</button><b id="owner-table-division-total">${money(Math.ceil(baseTotal/divisions))}</b></div></div><div class="drawer-footer owner-rv-payment-footer"><button type="button" class="secondary-btn" data-close>Voltar</button><button type="button" class="secondary-btn" id="owner-table-divide">Dividir conta</button><button type="button" class="primary-btn" id="owner-table-confirm" disabled>Finalizar · ${money(baseTotal)}</button></div>`,`drawer admin-order-drawer owner-rv-payment-drawer`);
  document.querySelectorAll('.owner-rv-payment-drawer [data-close]').forEach(button=>button.onclick=closeLayer);
  const discountMode=$('#owner-table-discount-mode'),discountValue=$('#owner-table-discount-value'),employee=$('#owner-table-employee');
  const discount=()=>employee?.checked?Math.min(baseTotal,Math.round(baseTotal*Math.max(0,Math.min(100,Number(settings.employee_discount_percent||0)))/100)):discountMode.value==='percent'?Math.min(baseTotal,Math.round(baseTotal*Math.max(0,Math.min(100,parseCents(discountValue.value)/100))/100)):discountMode.value==='amount'?Math.min(baseTotal,parseCents(discountValue.value)):0;
  const paid=()=>payments.reduce((sum,payment)=>sum+payment.amount_cents,0);
  const afterItemSaved=async action=>{
    await loadAdminOrders();
    const updated=state.admin.orders.find(item=>String(item.id)===String(orderId));
    if(!updated)throw new Error('Comanda não encontrada. Atualize as mesas.');
    if(action==='identify')document.querySelector('#owner-table-payment-content .owner-rv-order-items').innerHTML=`<h3>Itens da comanda</h3>${primeOpsTableItemsMarkup(updated)}`;
    else {renderAdmin();primeOpsOpenTablePayment(orderId)}
  };
  $('#owner-table-payment-content').addEventListener('click',async event=>{
    const button=event.target.closest('[data-owner-item-action]');if(!button)return;
    const action=button.dataset.ownerItemAction,item=(state.admin.orders.find(entry=>String(entry.id)===String(orderId))?.items||[]).find(entry=>Number(entry.id)===Number(button.dataset.ownerItemId));
    if(!item)return toast('Item não encontrado. Atualize a comanda.');
    button.closest('details').open=false;
    if((action==='edit'||action==='delete')&&(payments.length||discount()>0||employee?.checked))return toast('Remova os pagamentos e descontos registrados antes de alterar os itens.');
    if(action==='delete'){
      if(!confirm(`Excluir ${item.product_name} da comanda?`))return;
      button.disabled=true;
      try{await api(`/api/admin/orders/${encodeURIComponent(orderId)}/table-items/${Number(item.id)}`,{method:'PATCH',body:JSON.stringify({action:'delete'})});await afterItemSaved(action);toast('Item excluído')}
      catch(error){toast(error.message);button.disabled=false}
      return;
    }
    primeOpsOpenTableItemAction(orderId,item,action,afterItemSaved);
  });
  const renderPayments=()=>{$('#owner-table-recorded').innerHTML=payments.length?payments.map(payment=>`<div class="owner-rv-recorded-row"><span>${esc(methodLabels[payment.method])}${payment.received_cents>payment.amount_cents?` <small>(troco ${money(payment.received_cents-payment.amount_cents)})</small>`:''}</span><strong>${money(payment.amount_cents)}</strong><button type="button" class="icon-btn" data-owner-table-remove="${payment.method}" aria-label="Remover ${esc(methodLabels[payment.method])}">×</button></div>`).join(''):'<p class="muted">Nenhum pagamento registrado.</p>';document.querySelectorAll('[data-owner-table-remove]').forEach(button=>button.onclick=()=>{const index=payments.findIndex(payment=>payment.method===button.dataset.ownerTableRemove);if(index>=0)payments.splice(index,1);refresh()})};
  let fiadoOn=false;
  const refresh=()=>{const total=Math.max(0,baseTotal-discount()),sum=paid(),due=total-sum;$('#owner-table-discount').textContent=money(discount());$('#owner-table-total').textContent=money(total);$('#owner-table-paid').textContent=money(sum);$('#owner-table-due').textContent=money(Math.max(0,due));const fiadoNow=fiadoOn&&sum<total;$('#owner-table-confirm').disabled=total<=0||(sum!==total&&!fiadoNow);$('#owner-table-confirm').textContent=fiadoNow?`Finalizar com fiado de ${money(due)}`:`Finalizar · ${money(total)}`;const fiadoButton=$('#owner-table-fiado');if(fiadoButton){fiadoButton.classList.toggle('active',fiadoNow);fiadoButton.querySelector('small').textContent=fiadoNow?`Restante ${money(due)}`:'Deixar restante'}$('#owner-table-division-count').textContent=String(divisions);$('#owner-table-division-total').textContent=money(Math.ceil(total/divisions));if(employee?.checked){discountMode.value='';discountValue.value='';discountMode.disabled=true;discountValue.disabled=true}else{discountMode.disabled=false;discountValue.disabled=false}renderPayments()};
  const openEntry=method=>{const total=Math.max(0,baseTotal-discount()),existing=payments.find(payment=>payment.method===method),remaining=total-(paid()-(existing?.amount_cents||0));if(remaining<=0)return toast('A conta já está totalmente distribuída.');const scrim=document.createElement('div');scrim.className='owner-payment-entry-scrim';scrim.innerHTML=`<section class="owner-payment-entry" role="dialog" aria-modal="true" aria-labelledby="owner-table-entry-title"><header><h3 id="owner-table-entry-title">Registrar pagamento</h3><button type="button" class="icon-btn" data-owner-entry-close aria-label="Fechar">×</button></header><p>Valor pago em <strong>${esc(methodLabels[method])}</strong></p><label class="owner-payment-entry-value"><span>R$</span><input id="owner-table-entry-amount" inputmode="decimal" value="${formatInput(existing?.amount_cents||remaining)}" aria-label="Valor do pagamento"></label>${method==='dinheiro'?'<label class="field owner-payment-entry-cash"><span>Valor entregue pelo cliente <small>(opcional)</small></span><input id="owner-table-entry-received" inputmode="decimal" placeholder="Em branco, valor exato"><small>Troco: <strong id="owner-table-entry-change">R$ 0,00</strong></small></label>':''}<footer><button type="button" class="secondary-btn" data-owner-entry-close>Voltar</button><button type="button" class="primary-btn" id="owner-table-entry-save">Registrar</button></footer></section>`;document.querySelector('.owner-rv-payment-drawer').append(scrim);const amount=$('#owner-table-entry-amount'),received=$('#owner-table-entry-received'),change=$('#owner-table-entry-change');const updateChange=()=>{if(change)change.textContent=money(Math.max(0,parseCents(received.value)-parseCents(amount.value)))};if(received)received.oninput=updateChange;amount.oninput=updateChange;scrim.querySelectorAll('[data-owner-entry-close]').forEach(button=>button.onclick=()=>scrim.remove());$('#owner-table-entry-save').onclick=()=>{let cents=parseCents(amount.value);if(!cents||cents>remaining)return toast('Informe um valor válido, até o saldo restante.');const cashReceived=method==='dinheiro'&&String(received.value||'').trim()?parseCents(received.value):cents;if(cashReceived<cents)cents=cashReceived;if(!cents)return toast('Informe um valor válido, até o saldo restante.');const existingIndex=payments.findIndex(payment=>payment.method===method),payment={method,amount_cents:cents,received_cents:method==='dinheiro'?cashReceived:cents};if(existingIndex>=0)payments[existingIndex]=payment;else payments.push(payment);scrim.remove();refresh()};};
  document.querySelectorAll('[data-owner-table-method]').forEach(button=>button.onclick=()=>openEntry(button.dataset.ownerTableMethod));
  document.querySelector('.owner-rv-methods')?.insertAdjacentHTML('beforeend','<button type="button" class="owner-rv-method" id="owner-table-fiado"><span>＄</span><b>Fiado</b><small>Deixar restante</small></button>');
  $('#owner-table-fiado').onclick=()=>{if(discount()>0||employee?.checked)return toast('Remova o desconto para lançar fiado.');fiadoOn=!fiadoOn;refresh()};
  discountMode.onchange=()=>refresh();discountValue.oninput=()=>refresh();if(employee)employee.onchange=()=>refresh();
  document.querySelectorAll('[data-owner-table-division]').forEach(button=>button.onclick=()=>{divisions=Math.max(1,Math.min(50,divisions+Number(button.dataset.ownerTableDivision)));refresh()});
  $('#owner-table-divide').onclick=()=>{
    if(payments.length||discount()>0||employee?.checked)return toast('Remova os pagamentos e descontos registrados antes de dividir a conta.');
    closeLayer();
    openTableBillSplit(orderId).catch(error=>toast(error.message));
  };
  refresh();
  $('#owner-table-confirm').onclick=async()=>{const button=$('#owner-table-confirm'),total=Math.max(0,baseTotal-discount());if(fiadoOn&&paid()<total){if(discount()>0)return toast('Remova o desconto para lançar fiado.');button.disabled=true;try{const first=payments.find(payment=>payment.method==='dinheiro')||payments[0];await api(`/api/admin/orders/${encodeURIComponent(orderId)}/fiado`,{method:'POST',body:JSON.stringify({payment_method:first?.method||'dinheiro',payments:payments.map(({method,amount_cents})=>({method,amount_cents})),customer_name:order.customer_name||'',phone:order.phone||''})});await loadAdminOrders();if(state.admin.tables)state.admin.tables=await api('/api/admin/tables');closeLayer();renderAdmin();toast(`Pagamento confirmado · fiado de ${money(total-paid())}`)}catch(error){toast(error.message);button.disabled=false}return}if(paid()!==total)return toast('Registre os pagamentos até completar o total.');button.disabled=true;try{const selectedDiscount=discount(),mode=employee?.checked?'':discountMode.value,result=await api(`/api/admin/orders/${encodeURIComponent(orderId)}/payment`,{method:'PATCH',body:JSON.stringify({payment_status:'pago',payment_method:payments.length>1?'misto':payments[0].method,apply_waiter_fee:false,employee_discount:Boolean(employee?.checked),discount_mode:mode,discount_percent:mode==='percent'?parseCents(discountValue.value)/100:0,discount_amount_cents:mode==='amount'?parseCents(discountValue.value):0,cash_received_cents:payments.some(payment=>payment.method==='dinheiro')?payments.filter(payment=>payment.method==='dinheiro').reduce((sum,payment)=>sum+payment.received_cents,0):null,payments:payments.map(({method,amount_cents})=>({method,amount_cents}))})});await loadAdminOrders();if(state.admin.tables)state.admin.tables=await api('/api/admin/tables');closeLayer();renderAdmin();toast(result.change_for_cents?`Pagamento confirmado · troco ${money(result.change_for_cents)}`:'Pagamento confirmado')}catch(error){toast(error.message);button.disabled=false}};
}
const primeOpsBaseTablePayment=openPaymentSettlement;
openPaymentSettlement=async function(orderId){
  const order=state.admin.orders.find(item=>String(item.id)===String(orderId));
  if(!order?.table_number)return primeOpsBaseTablePayment(orderId);
  if(order.payment_status==='aberto'){
    try{
      const bill=await api(`/api/admin/orders/${encodeURIComponent(orderId)}/bill-splits`);
      if(Number(bill.paid_cents)>0)return openTableBillSplit(orderId,bill);
    }catch(error){toast(error.message);return}
  }
  return primeOpsOpenTablePayment(orderId);
};

/* Botao "Imprimir conta" (cupom do cliente) nas telas de pagamento da mesa. */
function primeOpsDecoratePrintReceipt(){
  document.querySelectorAll('.owner-rv-payment-head,.table-bill-split-head').forEach(head=>{
    if(head.querySelector('[data-print-receipt]'))return;
    const orderId=head.querySelector('.muted')?.textContent.match(/#(\S+)/)?.[1];
    if(!orderId)return;
    const target=head.querySelector('.icon-btn');
    const html=`<button type="button" class="secondary-btn compact owner-print-receipt-btn" data-print-receipt="${esc(orderId)}">🖨 Imprimir conta</button>`;
    if(head.classList.contains('table-bill-split-head')&&target)target.insertAdjacentHTML('beforebegin',html);else head.insertAdjacentHTML('beforeend',html);
  });
}
{
  let scheduled=false;
  new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;primeOpsDecoratePrintReceipt()})}).observe(document.body,{childList:true,subtree:true});
}
document.addEventListener('click',async event=>{
  const button=event.target.closest('[data-print-receipt]');
  if(!button)return;
  event.preventDefault();event.stopPropagation();
  button.disabled=true;
  try{await api(`/api/admin/orders/${encodeURIComponent(button.dataset.printReceipt)}/print-receipt`,{method:'POST'});toast('Conta enviada para a impressora')}
  catch(error){toast(error.message)}
  button.disabled=false;
},true);

/* Botao WhatsApp nos cards de pedido e mensagem personalizada nas configuracoes. */
const PRIME_OPS_WHATSAPP_ICON='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
function primeOpsWhatsAppSettings(){return state.cashier?.catalog?.settings||state.catalog?.settings||{}}
function primeOpsWhatsAppMessage(order){
  const settings=primeOpsWhatsAppSettings(),template=String(settings.whatsapp_message||'').trim()||'Olá, {nome}! Aqui é da {loja}. Sobre o seu pedido {pedido}:';
  const values={nome:order.customer_name||'cliente',pedido:order.id,total:money(order.total_cents),loja:settings.store_name||'Açailandia PE'};
  return template.replace(/\{(nome|pedido|total|loja)\}/gi,(_,key)=>values[key.toLowerCase()]);
}
function primeOpsDecorateWhatsApp(){
  document.querySelectorAll('.order-card .order-actions').forEach(actions=>{
    if(actions.querySelector('[data-order-whatsapp]'))return;
    const card=actions.closest('.order-card'),id=card.dataset.orderDetails||card.querySelector('.order-id')?.textContent.trim();
    if(!id)return;
    actions.insertAdjacentHTML('afterbegin',`<button type="button" class="secondary-btn compact order-whatsapp-btn" data-order-whatsapp="${esc(id)}" title="Enviar mensagem no WhatsApp" aria-label="Enviar mensagem no WhatsApp">${PRIME_OPS_WHATSAPP_ICON}</button>`);
  });
}
const primeOpsWhatsAppRenderAdmin=renderAdmin;
renderAdmin=function(){const result=primeOpsWhatsAppRenderAdmin.apply(this,arguments);primeOpsDecorateWhatsApp();return result};
const primeOpsWhatsAppRenderCashier=renderCashierPanel;
renderCashierPanel=function(){const result=primeOpsWhatsAppRenderCashier.apply(this,arguments);primeOpsDecorateWhatsApp();return result};
{
  let scheduled=false;
  new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;primeOpsDecorateWhatsApp()})}).observe(document.body,{childList:true,subtree:true});
}
const primeOpsWhatsAppSettingsView=settingsView;
settingsView=function(){
  const message=String(state.catalog?.settings?.whatsapp_message||'');
  const section=`<section class="panel"><div class="panel-head"><div><h2>Mensagem do WhatsApp</h2><p>Texto enviado ao cliente quando você clica no botão do WhatsApp no pedido.</p></div></div><div class="field"><label for="whatsapp-message">Mensagem personalizada</label><textarea id="whatsapp-message" rows="4" maxlength="1000" placeholder="Olá, {nome}! Seu pedido {pedido} está a caminho.">${esc(message)}</textarea><small>Use {nome}, {pedido}, {total} e {loja} para preencher automaticamente.</small></div><button type="button" class="primary-btn" id="whatsapp-message-save">Salvar mensagem</button></section><section class="panel"><div class="panel-head"><div><h2>Mensagem do Fiado</h2><p>Texto enviado ao cliente quando você clica no botão do WhatsApp na tela de Fiado.</p></div></div><div class="field"><label for="fiado-message">Mensagem personalizada do fiado</label><textarea id="fiado-message" rows="4" maxlength="1000" placeholder="Olá, {nome}! Você tem {valor} pendente do pedido {pedido}.">${esc(String(state.catalog?.settings?.fiado_message||''))}</textarea><small>Use {nome}, {pedido}, {valor} e {loja} para preencher automaticamente.</small></div><button type="button" class="primary-btn" id="fiado-message-save">Salvar mensagem do fiado</button></section>`;
  return primeOpsWhatsAppSettingsView().replace('<div class="settings-save">',section+'<div class="settings-save">');
};
document.addEventListener('click',async event=>{
  const save=event.target.closest('#whatsapp-message-save');
  if(save){
    event.preventDefault();save.disabled=true;
    try{
      const result=await api('/api/admin/whatsapp-message',{method:'PATCH',body:JSON.stringify({whatsapp_message:document.querySelector('#whatsapp-message').value})});
      if(state.catalog?.settings)state.catalog.settings.whatsapp_message=result.whatsapp_message;
      toast('Mensagem do WhatsApp salva');
    }catch(error){toast(error.message)}
    save.disabled=false;return;
  }
  const saveFiado=event.target.closest('#fiado-message-save');
  if(saveFiado){
    event.preventDefault();saveFiado.disabled=true;
    try{
      const result=await api('/api/admin/fiado-message',{method:'PATCH',body:JSON.stringify({fiado_message:document.querySelector('#fiado-message').value})});
      if(state.catalog?.settings)state.catalog.settings.fiado_message=result.fiado_message;
      toast('Mensagem do fiado salva');
    }catch(error){toast(error.message)}
    saveFiado.disabled=false;return;
  }
  const button=event.target.closest('[data-order-whatsapp]');
  if(!button)return;
  event.preventDefault();event.stopPropagation();
  const order=[...(state.admin?.orders||[]),...(state.cashier?.orders||[])].find(entry=>String(entry.id)===String(button.dataset.orderWhatsapp));
  const digits=String(order?.phone||'').replace(/\D/g,'');
  if(digits.length<10)return toast('Este pedido não tem WhatsApp do cliente.');
  window.open(`https://wa.me/${phoneForWhatsApp(order.phone)}?text=${encodeURIComponent(primeOpsWhatsAppMessage(order))}`,'_blank','noopener');
},true);

/* Menu de tres pontos nos itens do painel "Detalhes da comanda" (proprietario e caixa). */
function primeOpsDecorateTableDetail(){
  const content=document.querySelector('.table-detail-content'),pay=content?.querySelector('[data-table-pay]');
  if(!content||!pay)return;
  const orderId=pay.dataset.tablePay,items=state.admin.orders?.find(entry=>String(entry.id)===String(orderId))?.items||[];
  content.querySelectorAll('.table-detail-item').forEach((row,index)=>{
    const item=items[index];
    if(!item||row.querySelector('.owner-table-item-menu, .table-item-menu'))return;
    row.classList.add('table-detail-item-with-menu');
    if(item.table_label)row.querySelector('span')?.insertAdjacentHTML('beforeend',`<small class="owner-table-item-label">${esc(item.table_label)}</small>`);
    row.insertAdjacentHTML('beforeend',`<details class="owner-table-item-menu"><summary aria-label="Opções de ${esc(item.product_name)}">⋮</summary><div>${[['edit','Editar item'],['identify','Nomear item'],['details','Detalhes do item'],['delete','Excluir item']].map(([action,label])=>`<button type="button" data-detail-item-action="${action}" data-detail-order-id="${esc(orderId)}" data-detail-item-id="${Number(item.id)}">${label}</button>`).join('')}</div></details>`);
  });
}
const primeOpsDetailRenderAdmin=renderAdmin;
renderAdmin=function(){const result=primeOpsDetailRenderAdmin.apply(this,arguments);primeOpsDecorateTableDetail();return result};
const primeOpsDetailRenderCashier=renderCashierPanel;
renderCashierPanel=function(){const result=primeOpsDetailRenderCashier.apply(this,arguments);primeOpsDecorateTableDetail();return result};
document.addEventListener('toggle',event=>{const menu=event.target;if(!menu.matches?.('.table-detail-item-with-menu .owner-table-item-menu')||!menu.open)return;const box=menu.querySelector('summary').getBoundingClientRect(),list=menu.querySelector('div'),height=list.offsetHeight||150;list.style.left=Math.max(8,box.right-180)+'px';list.style.top=(box.bottom+height+8>innerHeight?Math.max(8,box.top-height-4):box.bottom+4)+'px'},true);
document.addEventListener('click',async event=>{
  const button=event.target.closest('[data-detail-item-action]');
  if(!button){document.querySelectorAll('.table-detail-content details.owner-table-item-menu[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false});return}
  event.preventDefault();event.stopPropagation();
  const orderId=button.dataset.detailOrderId,action=button.dataset.detailItemAction;
  button.closest('details').open=false;
  try{
    const reload=async()=>{await loadAdminOrders();state.admin.tables=await api('/api/admin/tables');renderAdmin()};
    const order=state.admin.orders.find(entry=>String(entry.id)===String(orderId)),item=(order?.items||[]).find(entry=>Number(entry.id)===Number(button.dataset.detailItemId));
    if(!item)return toast('Item não encontrado. Atualize a comanda.');
    if(action==='delete'){
      if(!confirm(`Excluir ${item.product_name} da comanda?`))return;
      await api(`/api/admin/orders/${encodeURIComponent(orderId)}/table-items/${Number(item.id)}`,{method:'PATCH',body:JSON.stringify({action:'delete'})});
      await reload();toast('Item excluído');return;
    }
    primeOpsOpenTableItemAction(orderId,item,action,reload);
  }catch(error){toast(error.message)}
},true);

/* Fiado: pendencias de clientes, cobranca por WhatsApp e impacto no fechamento do caixa. */
function fiadoInCashier(){return /^\/caixa(?:\/|$)/.test(location.pathname)}
function fiadoCents(value){return Math.max(0,Math.round(Number(String(value||'').replace(/[^0-9,.-]/g,'').replace(/\./g,'').replace(',','.'))*100)||0)}
function fiadoDate(value){return value?new Date(String(value).replace(' ','T')+'Z').toLocaleDateString('pt-BR'):'—'}
function fiadoRemaining(row){return Math.max(0,Number(row.amount_cents||0)-Number(row.paid_cents||0))}
async function loadFiado(){state.fiado=await api('/api/admin/fiado')}
function fiadoMessage(row){
  const settings=primeOpsWhatsAppSettings(),store=settings.store_name||'Açailandia PE',template=String(settings.fiado_message||'').trim()||'Olá, {nome}! Aqui é da {loja}. Identificamos uma pendência de {valor} referente ao pedido {pedido}. Podemos combinar o pagamento? Obrigado!';
  const values={nome:row.customer_name||'cliente',pedido:row.order_id,valor:money(fiadoRemaining(row)),loja:store};
  return template.replace(/\{(nome|pedido|valor|total|loja)\}/gi,(_,key)=>values[key.toLowerCase()==='total'?'valor':key.toLowerCase()]);
}
function fiadoView(){
  const rows=state.fiado?.rows||[],open=rows.filter(row=>row.status==='aberto'),total=open.reduce((sum,row)=>sum+fiadoRemaining(row),0);
  return `<section class="panel"><div class="panel-head"><div><h2>Fiado</h2><span class="muted">Clientes que fecharam o pedido com valor menor. Cobre pelo WhatsApp e registre o recebimento quando o cliente pagar.</span></div></div><div class="stat-grid"><div class="stat accent"><div class="stat-label">Total a receber</div><div class="stat-value">${money(total)}</div></div><div class="stat"><div class="stat-label">Pendências em aberto</div><div class="stat-value">${open.length}</div></div></div><div class="management-table-wrap"><table class="management-table fiado-table"><thead><tr><th>Data</th><th>Cliente</th><th>Pedido</th><th>Forma</th><th>Valor</th><th>Pago</th><th>Restante</th><th>Situação</th><th>Ações</th></tr></thead><tbody>${rows.map(row=>`<tr class="${row.status==='aberto'?'':'complement-paused'}"><td>${fiadoDate(row.created_at)}</td><td><strong>${esc(row.customer_name||'Cliente')}</strong><br><small class="muted">${esc(row.phone||'Sem WhatsApp')}</small></td><td>${esc(row.order_id)}</td><td>${esc(row.original_method||'')}</td><td>${money(row.amount_cents)}</td><td>${money(row.paid_cents)}</td><td>${money(fiadoRemaining(row))}</td><td><span class="connection-pill ${row.status==='pago'?'ready':''}">${row.status==='pago'?'Quitado':'Em aberto'}</span></td><td><div class="complement-actions">${row.status==='aberto'?`<button type="button" class="secondary-btn compact order-whatsapp-btn" data-fiado-whatsapp="${row.id}" title="Cobrar pelo WhatsApp" aria-label="Cobrar pelo WhatsApp">${PRIME_OPS_WHATSAPP_ICON}</button><button type="button" class="primary-btn compact" data-fiado-pay="${row.id}">Receber</button>`:''}</div></td></tr>`).join('')||'<tr><td colspan="9">Nenhum fiado registrado.</td></tr>'}</tbody></table></div></section>`;
}
function fiadoRerender(){fiadoInCashier()?renderCashierPanel():renderAdmin()}
function openFiadoPayment(row){
  layer(`<div class="drawer-header"><button class="icon-btn" data-close aria-label="Fechar">×</button><div><h2>Receber fiado</h2><span class="muted">${esc(row.customer_name||'Cliente')} — pedido ${esc(row.order_id)}</span></div></div><div class="drawer-content"><div class="field"><label>Valor recebido (R$)</label><input id="fiado-pay-value" inputmode="decimal" value="${(fiadoRemaining(row)/100).toFixed(2).replace('.',',')}"><small>Restante: ${money(fiadoRemaining(row))}</small></div><div class="field"><label>Forma de pagamento</label><select id="fiado-pay-method"><option value="dinheiro">Dinheiro</option><option value="pix">PIX</option><option value="credito">Cartão de crédito</option><option value="debito">Cartão de débito</option></select></div></div><div class="drawer-footer"><button class="primary-btn full" id="fiado-pay-confirm">Confirmar recebimento</button></div>`,'drawer');
  document.querySelector('[data-close]').onclick=closeLayer;
  $('#fiado-pay-confirm').onclick=async()=>{
    const button=$('#fiado-pay-confirm');button.disabled=true;
    try{await api(`/api/admin/fiado/${row.id}/pay`,{method:'POST',body:JSON.stringify({amount_cents:fiadoCents($('#fiado-pay-value').value),payment_method:$('#fiado-pay-method').value})});await loadFiado();closeLayer();fiadoRerender();toast('Recebimento registrado')}
    catch(error){toast(error.message);button.disabled=false}
  };
}
function bindFiado(){
  document.querySelectorAll('[data-fiado-pay]').forEach(button=>button.onclick=()=>{const row=(state.fiado?.rows||[]).find(item=>String(item.id)===button.dataset.fiadoPay);if(row)openFiadoPayment(row)});
  document.querySelectorAll('[data-fiado-whatsapp]').forEach(button=>button.onclick=()=>{const row=(state.fiado?.rows||[]).find(item=>String(item.id)===button.dataset.fiadoWhatsapp);if(!row)return;if(String(row.phone||'').replace(/\D/g,'').length<10)return toast('Este fiado não tem WhatsApp do cliente.');window.open(`https://wa.me/${phoneForWhatsApp(row.phone)}?text=${encodeURIComponent(fiadoMessage(row))}`,'_blank','noopener')});
}
function primeOpsViewButton(attr,view,active,icon,full,short){return `<button class="${active===view?'active':''}" data-${attr}-view="${view}"><span class="admin-nav-icon">${icon}</span><span class="nav-full">${full}</span><span class="nav-short">${short}</span></button>`}
const primeFiadoAdminNav=adminNavButtons;
adminNavButtons=function(){return primeFiadoAdminNav().replace(/(<button[^>]+data-admin-view="settings")/,primeOpsViewButton('admin','fiado',state.admin.view,'＄','Fiado','Fiado')+'$1')};
const primeFiadoRenderAdmin=renderAdmin;
renderAdmin=function(){if(fiadoInCashier())return state.cashier.view==='fiado'||state.cashier.view==='complements'?renderCashierPanel():primeFiadoRenderAdmin.apply(this,arguments);if(state.admin.view!=='fiado')return primeFiadoRenderAdmin.apply(this,arguments);$('#app').innerHTML=adminLayout(fiadoView(),'Fiado');bindAdmin();bindFiado()};
const primeFiadoBindAdmin=bindAdmin;
bindAdmin=function(){primeFiadoBindAdmin();document.querySelectorAll('[data-admin-view="fiado"]').forEach(button=>button.onclick=async()=>{try{await loadFiado();state.admin.view='fiado';renderAdmin()}catch(error){toast(error.message)}})};

/* Caixa: menus Complementos e Fiado. */
const primeFiadoCashierNav=cashierNav;
cashierNav=function(){const extra=primeOpsViewButton('cashier','complements',state.cashier.view,'✦','Complementos','Compl.')+primeOpsViewButton('cashier','fiado',state.cashier.view,'＄','Fiado','Fiado'),base=primeFiadoCashierNav();return /data-cashier-view="cash-register"/.test(base)?base.replace(/(<button[^>]+data-cashier-view="cash-register")/,extra+'$1'):base+extra};
const primeFiadoRenderCashier=renderCashierPanel;
renderCashierPanel=function(){
  const view=state.cashier.view;
  if(view!=='fiado'&&view!=='complements')return primeFiadoRenderCashier.apply(this,arguments);
  $('#app').innerHTML=cashierLayout(view==='fiado'?fiadoView():complementsManagementView(),view==='fiado'?'Fiado':'Complementos');
  applyBlissBrand();bindCashierV2();
  if(view==='fiado')bindFiado();else bindComplementsManagement();
};
const primeFiadoBindCashier=bindCashierV2;
bindCashierV2=function(){
  primeFiadoBindCashier();
  document.querySelectorAll('[data-cashier-view="fiado"]').forEach(button=>button.onclick=async()=>{try{await loadFiado();state.cashier.view='fiado';renderCashierPanel()}catch(error){toast(error.message)}});
  document.querySelectorAll('[data-cashier-view="complements"]').forEach(button=>button.onclick=async()=>{try{state.catalog=await api('/api/admin/products');state.cashier.view='complements';renderCashierPanel()}catch(error){toast(error.message)}});
};

/* Botao "Fiado" nos pedidos em aberto e na tela de pagamento da comanda. */
function primeOpsFindOrder(id){return [...(state.admin?.orders||[]),...(state.cashier?.orders||[])].find(entry=>String(entry.id)===String(id))}
function primeFiadoDecorate(){
  document.querySelectorAll('.order-card .order-actions').forEach(actions=>{
    if(actions.querySelector('[data-order-fiado]'))return;
    const card=actions.closest('.order-card'),id=card.dataset.orderDetails||card.querySelector('.order-id')?.textContent.trim(),order=primeOpsFindOrder(id);
    if(!order||order.payment_status!=='aberto'||order.status==='cancelado')return;
    actions.insertAdjacentHTML('beforeend',`<button type="button" class="secondary-btn compact order-fiado-btn" data-order-fiado="${esc(id)}">Fiado</button>`);
  });
  document.querySelectorAll('.owner-rv-payment-head').forEach(head=>{
    if(head.querySelector('[data-order-fiado]'))return;
    const id=head.querySelector('.muted')?.textContent.match(/#(\S+)/)?.[1];
    if(id)head.insertAdjacentHTML('beforeend',`<button type="button" class="secondary-btn compact order-fiado-btn" data-order-fiado="${esc(id)}">Fiado</button>`);
  });
}
{
  let scheduled=false;
  new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;primeFiadoDecorate()})}).observe(document.body,{childList:true,subtree:true});
}
function openOrderFiado(orderId){
  const order=primeOpsFindOrder(orderId);if(!order)return toast('Pedido não encontrado.');
  const total=Math.max(0,Number(order.total_cents||0));
  layer(`<div class="drawer-header"><button class="icon-btn" data-close aria-label="Fechar">×</button><div><h2>Fechar com fiado</h2><span class="muted">Pedido ${esc(order.id)} — total ${money(total)}</span></div></div><div class="drawer-content"><div class="field"><label>Forma de pagamento do pedido</label><select id="fiado-method"><option value="dinheiro">Dinheiro</option><option value="pix">PIX</option><option value="credito">Cartão de crédito</option><option value="debito">Cartão de débito</option></select></div><div class="field"><label>Valor recebido agora (R$)</label><input id="fiado-received" inputmode="decimal" value="0,00"><small id="fiado-owed"></small></div><div class="field"><label>Cliente</label><input id="fiado-name" maxlength="100" value="${esc(order.customer_name||'')}"></div><div class="field"><label>WhatsApp do cliente</label><input id="fiado-phone" inputmode="tel" maxlength="30" value="${esc(order.phone||'')}"></div><div class="field"><label>Observação</label><input id="fiado-notes" maxlength="300"></div></div><div class="drawer-footer"><button class="primary-btn full" id="fiado-confirm">Fechar pedido e registrar fiado</button></div>`,'drawer');
  document.querySelector('[data-close]').onclick=closeLayer;
  const owed=()=>Math.max(0,total-fiadoCents($('#fiado-received').value)),sync=()=>{$('#fiado-owed').textContent=`Cliente fica devendo: ${money(owed())}`};
  $('#fiado-received').oninput=sync;sync();
  $('#fiado-confirm').onclick=async()=>{
    const button=$('#fiado-confirm'),received=fiadoCents($('#fiado-received').value);
    if(received>=total)return toast('O valor recebido deve ser menor que o total do pedido.');
    button.disabled=true;
    try{
      await api(`/api/admin/orders/${encodeURIComponent(order.id)}/fiado`,{method:'POST',body:JSON.stringify({payment_method:$('#fiado-method').value,received_cents:received,customer_name:$('#fiado-name').value.trim(),phone:$('#fiado-phone').value.trim(),notes:$('#fiado-notes').value.trim()})});
      closeLayer();
      await Promise.allSettled([loadAdminOrders(),fiadoInCashier()?refreshCashier():Promise.resolve(),api('/api/admin/tables').then(tables=>{state.admin.tables=tables})]);
      fiadoRerender();toast('Pedido fechado e fiado registrado');
    }catch(error){toast(error.message);button.disabled=false}
  };
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-order-fiado]');if(!button)return;event.preventDefault();event.stopPropagation();openOrderFiado(button.dataset.orderFiado)},true);

// Abre sempre o cardápio público no domínio oficial, em nova aba.
document.addEventListener("click",event=>{
  const link=event.target.closest?.('[data-admin-action="open-store"],.admin-side-footer a');
  if(!link||(link.tagName==="A"&&!/card[áa]pio/i.test(link.textContent)))return;
  event.preventDefault();event.stopImmediatePropagation();
  const base=location.hostname.startsWith("xn--")?"https://acailandia.wpnz.com.br":location.origin;
  window.open(`${base}/`,"_blank","noopener");
},true);
// Milk shake: busca de sabores e até 3 sabores extras (+R$ 2,00 cada).
const MILKSHAKE_EXTRA_CENTS=200,MILKSHAKE_EXTRA_LIMIT=3;
const milkshakeBuilderOpenProduct=openProduct;
openProduct=function(id,cart=state.cart,onAdded=null){
  const product=state.catalog?.products?.find(item=>item.id===id);
  if(product?.is_available&&/milk\s?-?shake|^milk\b/i.test(String(product.name||""))&&productFlavorOptions(product).length)return openMilkshakeBuilder(product,cart,onAdded);
  return milkshakeBuilderOpenProduct(id,cart,onAdded);
};
function openMilkshakeBuilder(product,cart,onAdded){
  const flavors=productFlavorOptions(product),fold=value=>String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR");
  let main="",extras=[];
  const list=(kind,attr)=>flavors.map(flavor=>`<button type="button" class="rv-choice-row" data-${attr}="${esc(flavor)}" data-search="${esc(fold(flavor))}"><span>${esc(flavor)}</span><i>＋</i></button>`).join("");
  layer(`<div class="drawer-header rv-builder-header"><h2>${esc(product.name)}</h2><button class="icon-btn" data-milk-close aria-label="Fechar">×</button></div><div class="rv-builder-price">${money(product.price_cents)}</div><div class="drawer-content rv-builder"><section class="rv-choice-section"><header><strong>Sabor</strong><div><span>Escolha 1 opção</span><b id="milk-main-count">0/1</b><em>OBRIGATÓRIO</em></div></header><input type="search" class="milk-flavor-search" data-milk-search="main" placeholder="Pesquisar sabor..." autocomplete="off"><div class="milk-flavor-list">${list("main","milk-main")}</div></section><section class="rv-choice-section"><header><strong>Sabores extras</strong><div><span>+${money(MILKSHAKE_EXTRA_CENTS)} cada · até ${MILKSHAKE_EXTRA_LIMIT}</span><b id="milk-extra-count">0/${MILKSHAKE_EXTRA_LIMIT}</b></div></header><input type="search" class="milk-flavor-search" data-milk-search="extra" placeholder="Pesquisar sabor extra..." autocomplete="off"><div class="milk-flavor-list">${list("extra","milk-extra")}</div></section><div class="note-box"><label for="milkshake-note">Observações</label><textarea id="milkshake-note" maxlength="300" placeholder="Alguma observação?"></textarea></div></div><div class="detail-action rv-builder-action"><div class="acai-builder-selection" id="milk-summary">Escolha o sabor</div><button class="primary-btn" id="milkshake-add">Adicionar <strong id="milk-total">${money(product.price_cents)}</strong></button></div>`,"drawer acai-builder-drawer");
  document.querySelector("[data-milk-close]").onclick=closeLayer;
  const refresh=()=>{
    document.querySelectorAll("[data-milk-main]").forEach(row=>{const on=row.dataset.milkMain===main;row.classList.toggle("selected",on);row.querySelector("i").textContent=on?"✓":"＋"});
    document.querySelectorAll("[data-milk-extra]").forEach(row=>{const on=extras.includes(row.dataset.milkExtra);row.classList.toggle("selected",on);row.querySelector("i").textContent=on?"✓":"＋"});
    $("#milk-main-count").textContent=`${main?1:0}/1`;$("#milk-extra-count").textContent=`${extras.length}/${MILKSHAKE_EXTRA_LIMIT}`;
    $("#milk-summary").textContent=main?`Sabor: ${main}${extras.length?` + ${extras.join(", ")}`:""}`:"Escolha o sabor";
    $("#milk-total").textContent=money(product.price_cents+extras.length*MILKSHAKE_EXTRA_CENTS);
  };
  document.querySelectorAll("[data-milk-main]").forEach(row=>row.onclick=()=>{main=row.dataset.milkMain;extras=extras.filter(name=>name!==main);refresh()});
  document.querySelectorAll("[data-milk-extra]").forEach(row=>row.onclick=()=>{const name=row.dataset.milkExtra;if(extras.includes(name))extras=extras.filter(item=>item!==name);else if(extras.length>=MILKSHAKE_EXTRA_LIMIT)return toast(`Limite de ${MILKSHAKE_EXTRA_LIMIT} extras.`);else extras.push(name);refresh()});
  document.querySelectorAll("[data-milk-search]").forEach(input=>input.oninput=()=>{const term=fold(input.value.trim()),attr=input.dataset.milkSearch==="main"?"[data-milk-main]":"[data-milk-extra]";document.querySelectorAll(attr).forEach(row=>row.hidden=Boolean(term)&&!row.dataset.search.includes(term))});
  $("#milkshake-add").onclick=()=>{if(!main)return toast("Escolha o sabor.");addItem(product,1,cart,[{name:main,price_cents:0,quantity:1,group_id:"flavor"},...extras.map(name=>({name,price_cents:MILKSHAKE_EXTRA_CENTS,quantity:1,group_id:"flavor_extra"}))],$("#milkshake-note").value.trim());updateCartBadges();closeLayer();if(onAdded)onAdded();toast("Produto adicionado")};
}
/* Mesas no padrão da RV: mais espaço, sem total em aberto e com nome editável. */
function primeOpsTableName(number){return String((state.admin.tables?.tables||[]).find(table=>String(table.number)===String(number))?.table_name||'').trim()}
function primeOpsDecorateTables(){
  if(!document.querySelector('.tables-admin'))return;
  document.querySelector('.table-open-total')?.remove();
  document.querySelectorAll('.table-tile-store').forEach(node=>node.remove());
  document.querySelectorAll('.table-tile[data-table-select]').forEach(tile=>{
    const name=primeOpsTableName(tile.dataset.tableSelect),title=tile.querySelector('.table-tile-title');
    if(name&&title&&!title.dataset.named){title.textContent=`${title.textContent} (${name.toUpperCase()})`;title.dataset.named='1'}
  });
  const pay=document.querySelector('.table-detail-content [data-table-pay]'),stack=document.querySelector('.table-detail-actions-stack');
  if(!pay||!stack||stack.querySelector('[data-table-rename]'))return;
  const orderId=pay.dataset.tablePay,number=document.querySelector('.table-tile.selected')?.dataset.tableSelect||state.admin.selectedTableNumber,name=primeOpsTableName(number),heading=document.querySelector('.table-detail-panel .panel-head h2');
  if(name&&heading&&!heading.dataset.named){heading.textContent=`${heading.textContent} (${name.toUpperCase()})`;heading.dataset.named='1'}
  stack.insertAdjacentHTML('afterbegin',`<button type="button" class="secondary-btn" data-table-rename="${esc(orderId)}">✎ ${name?'Alterar nome da mesa':'Nomear mesa'}</button>`);
}
const primeOpsTablesRenderAdmin=renderAdmin;
renderAdmin=function(){const result=primeOpsTablesRenderAdmin.apply(this,arguments);primeOpsDecorateTables();return result};
const primeOpsTablesRenderCashier=renderCashierPanel;
renderCashierPanel=function(){const result=primeOpsTablesRenderCashier.apply(this,arguments);primeOpsDecorateTables();return result};
document.addEventListener('click',async event=>{
  const button=event.target.closest('[data-table-rename]');
  if(!button)return;
  event.preventDefault();event.stopPropagation();
  const current=primeOpsTableName(document.querySelector('.table-tile.selected')?.dataset.tableSelect||state.admin.selectedTableNumber),value=prompt('Nome da mesa (ex.: 3 SOFÁ). Deixe vazio para voltar ao nome padrão.',current);
  if(value===null)return;
  button.disabled=true;
  try{
    await api(`/api/admin/orders/${encodeURIComponent(button.dataset.tableRename)}/table-name`,{method:'PATCH',body:JSON.stringify({table_name:value.trim()})});
    state.admin.tables=await api('/api/admin/tables');await loadAdminOrders();renderAdmin();toast('Nome da mesa atualizado');
  }catch(error){toast(error.message);button.disabled=false}
},true);

/* Tela de itens da mesa: campos para nome do cliente e nome da mesa. */
function primeOpsDecoratePickerMeta(){
  const cart=document.querySelector('.table-picker-cart');
  if(!cart||cart.querySelector('#picker-meta'))return;
  const draft=document.querySelector('.table-picker-head h2')?.textContent.trim()==='Novo pedido'?state.admin.pendingTableOpen:null;
  const order=draft||(state.admin.orders||[]).find(item=>String(item.table_number)===String(state.admin.selectedTableNumber)&&!['concluido','cancelado'].includes(item.status));
  if(!order)return;
  const customer=/^Mesa \d+$/i.test(String(order.customer_name||'').trim())?'':String(order.customer_name||''),tableName=String(order.table_name||'');
  cart.querySelector('h3')?.insertAdjacentHTML('afterend','<div id="picker-meta" class="picker-meta"><label>Nome do cliente<input id="picker-customer" maxlength="100" placeholder="Ex.: João" value="'+esc(customer)+'"></label><label>Nome da mesa<input id="picker-table-name" maxlength="20" placeholder="Ex.: 3 SOFÁ" value="'+esc(tableName)+'"></label></div>');
  const customerInput=cart.querySelector('#picker-customer'),nameInput=cart.querySelector('#picker-table-name');
  const sync=()=>{
    const customerValue=customerInput.value.trim(),nameValue=nameInput.value.trim();
    if(draft){if(customerValue)draft.customer_name=customerValue;draft.table_name=nameValue;return}
    order.table_name=nameValue||null;if(customerValue)order.customer_name=customerValue;
  };
  customerInput.oninput=sync;nameInput.oninput=sync;
  if(!draft){
    const save=async()=>{
      try{await api('/api/admin/orders/'+encodeURIComponent(order.id)+'/table-name',{method:'PATCH',body:JSON.stringify({table_name:nameInput.value.trim(),customer_name:customerInput.value.trim()})});state.admin.tables=await api('/api/admin/tables')}catch(error){toast(error.message)}
    };
    customerInput.onchange=save;nameInput.onchange=save;
  }
}
{
  let pickerScheduled=false;
  new MutationObserver(()=>{if(pickerScheduled)return;pickerScheduled=true;requestAnimationFrame(()=>{pickerScheduled=false;primeOpsDecoratePickerMeta()})}).observe(document.body,{childList:true,subtree:true});
}
