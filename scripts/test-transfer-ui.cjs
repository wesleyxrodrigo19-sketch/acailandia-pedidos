const fs=require('fs');
const assert=require('assert');
const {chromium}=require('playwright');
(async()=>{
  const source=fs.readFileSync('src/prime-operations-upgrade.js','utf8');
  const code=source.slice(source.indexOf('function primeOpsTableItemsMarkup('),source.indexOf('function tablePaymentParts('));
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
  const page=await browser.newPage();
  await page.setContent('<main></main>');
  await page.evaluate(code=>{
    window.state={admin:{orders:[{id:'A',branch_id:'acailandia',channel:'counter',table_number:1,status:'novo',payment_status:'aberto'},{id:'B',branch_id:'acailandia',channel:'counter',table_number:2,status:'novo',payment_status:'aberto'},{id:'C',branch_id:'acailandia',channel:'counter',table_number:3,status:'concluido',payment_status:'pago'}]}};
    window.esc=x=>String(x);window.money=x=>'R$ '+(x/100).toFixed(2);window.orderItemChoices=()=>[];window.toast=()=>{};
    window.api=async(url,opts)=>{window.request={url,body:JSON.parse(opts.body)}};
    window.eval(code);window.item={id:1,product_name:'Milk',quantity:1,unit_price_cents:1400};
    document.querySelector('main').innerHTML=primeOpsTableItemsMarkup({items:[item]});
    primeOpsOpenTableItemAction('A',item,'transfer',async()=>{});
  },code);
  assert.equal(await page.locator('[data-owner-item-action="transfer"]').count(),1);
  assert.equal(await page.locator('select[name="destination_order_id"] option').count(),2);
  await page.selectOption('select[name="destination_order_id"]','B');
  await page.getByRole('button',{name:'Salvar'}).click();
  await page.waitForFunction(()=>window.request);
  assert.deepEqual(await page.evaluate(()=>window.request),{url:'/api/admin/orders/A/table-items/1',body:{action:'transfer',destination_order_id:'B'}});
  await browser.close();console.log('UI: destino aberto e envio da transferência validados');
})().catch(error=>{console.error(error);process.exit(1)});
