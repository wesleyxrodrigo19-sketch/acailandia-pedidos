const fs=require('fs'),assert=require('assert'),{chromium}=require('playwright');
(async()=>{
  const source=fs.readFileSync('src/table-operations.js','utf8'),start=source.indexOf('async function openTableBillSplit('),end=source.indexOf('\n}',start)+2,code=source.slice(start,end);
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}),page=await browser.newPage({viewport:{width:1440,height:760}});
  await page.setContent('<div id="layer"></div>');
  await page.addStyleTag({content:fs.readFileSync('src/product-flavors.css','utf8')});
  await page.evaluate(code=>{
    window.state={admin:{orders:[{id:'T',table_number:3}],tables:null}};window.$=s=>document.querySelector(s);window.esc=x=>String(x);window.money=x=>'R$ '+(x/100).toFixed(2).replace('.',',');window.cashierCents=v=>Math.round(Number(String(v||'').replace('.','').replace(',','.'))*100)||0;
    window.layer=(content,cls)=>document.querySelector('#layer').innerHTML='<div id="overlay"><section class="'+cls+'">'+content+'</section></div>';window.closeLayer=()=>document.querySelector('#layer').innerHTML='';window.toast=x=>window.lastToast=x;window.loadAdminOrders=async()=>{};window.renderAdmin=()=>{};window.confirm=()=>true;
    window.bill={items:[{id:1,product_name:'Açaí',quantity:1,available_quantity:1,unit_price_cents:3000},{id:2,product_name:'Água',quantity:1,available_quantity:1,unit_price_cents:300}],splits:[],total_cents:3300,due_cents:3300,paid_cents:0};
    window.api=async(url,opts)=>{if(opts?.method==='POST'){window.sent=JSON.parse(opts.body);return {payment_status:'pago'}}return {tables:[]}};
    window.eval(code);openTableBillSplit('T',bill);
  },code);
  assert.equal(await page.getByText('Pix auto').count(),0);assert.equal(await page.getByText('Nome do cliente').count(),0);
  await page.locator('[data-table-bill-check="1"]').check();await page.locator('[data-table-bill-method="pix"]').click();
  assert.equal(await page.getByRole('textbox',{name:'Valor do pagamento'}).inputValue(),'30,00');await page.getByRole('textbox',{name:'Valor do pagamento'}).fill('10,00');await page.getByRole('button',{name:'Registrar',exact:true}).click();
  assert.equal(await page.locator('[data-table-bill-check="1"]').isDisabled(),true);await page.locator('[data-table-bill-method="dinheiro"]').click();
  assert.equal(await page.getByRole('textbox',{name:'Valor do pagamento'}).inputValue(),'20,00');await page.locator('input[name="received"]').fill('50,00');assert.equal(await page.locator('[data-entry-change]').innerText(),'R$ 30,00');await page.getByRole('button',{name:'Registrar',exact:true}).click();
  await page.locator('#table-bill-confirm').click();await page.waitForFunction(()=>window.sent);const sent=await page.evaluate(()=>window.sent);assert.deepEqual(sent.payments,[{method:'pix',amount_cents:1000},{method:'dinheiro',amount_cents:2000}]);assert.equal(sent.cash_received_cents,5000);assert.equal(sent.items[0].order_item_id,1);
  await browser.close();console.log('OK: tela compacta, Pix + dinheiro, restante e troco');
})().catch(e=>{console.error(e);process.exit(1)});
