const fs=require('fs'),assert=require('assert'),{chromium}=require('playwright');
(async()=>{
  const board=fs.readFileSync('src/table-operations.js','utf8'),start=board.indexOf('const tableOperationsBoardWithReprint='),end=board.indexOf('\ntablesView=function()',start);
  const actions=fs.readFileSync('src/prime-operations-upgrade.js','utf8').replace(/\r\n/g,'\n'),a=actions.indexOf("document.addEventListener('click',async event=>{\n  const button=event.target.closest('[data-print-receipt]')"),b=actions.indexOf('\n},true);',a)+9;
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'}),page=await browser.newPage();
  await page.setContent('<div id="app"></div>');
  await page.evaluate(([wrapper,handler])=>{window.state={admin:{selectedTableNumber:'4'}};window.esc=x=>String(x);window.tablesBoardMarkup=()=>'<aside><div class="panel-head"><div><h2>Mesa 04</h2></div></div><div class="table-detail-content"></div></aside>';window.api=async(url,opts)=>{window.sent={url,method:opts.method}};window.toast=x=>window.message=x;window.eval(wrapper);window.eval(handler);document.querySelector('#app').innerHTML=tablesBoardMarkup({tables:[{number:4,occupied:true,order_id:'415E'}]},{admin:true})},[board.slice(start,end),actions.slice(a,b)]);
  assert.equal(await page.getByRole('button',{name:'Reimprimir comanda da mesa 04'}).count(),1);
  await page.getByRole('button',{name:'Imprimir conta da mesa 04'}).click();await page.waitForFunction(()=>window.sent);
  assert.deepEqual(await page.evaluate(()=>window.sent),{url:'/api/admin/orders/415E/print-receipt',method:'POST'});
  await browser.close();console.log('OK: botão da mesa usa a impressão da conta');
})().catch(error=>{console.error(error);process.exit(1)});
