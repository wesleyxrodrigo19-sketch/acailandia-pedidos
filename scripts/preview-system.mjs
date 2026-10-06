import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { initialProducts, defaultSettings } from "../worker/data.js";

const root = new URL("../", import.meta.url);
const [html, css, whatsappCss, recoveryCss, operationsCss, app, whatsapp, recovery, operations] = await Promise.all([
  readFile(new URL("src/app.html", root), "utf8"),
  readFile(new URL("src/styles.css", root), "utf8"),
  readFile(new URL("src/whatsapp-pix.css", root), "utf8"),
  readFile(new URL("src/customer-recovery.css", root), "utf8"),
  readFile(new URL("src/admin-operations.css", root), "utf8"),
  readFile(new URL("src/app.js", root), "utf8"),
  readFile(new URL("src/whatsapp-pix.js", root), "utf8"),
  readFile(new URL("src/customer-recovery.js", root), "utf8"),
  readFile(new URL("src/admin-operations.js", root), "utf8"),
]);
const products = initialProducts.map((p, index) => ({
  id:index+1, category:p[2], name:p[0], description:p[1],
  price_cents:Math.round(p[3]*100), old_price_cents:null, image_url:p[4],
  is_featured:Boolean(p[5]), is_promo:false, is_available:true, sort_order:index
}));
const settings = {
  store_name:defaultSettings.store_name, is_open:defaultSettings.store_open==="1",
  closing_time:defaultSettings.closing_time,
  minimum_order_cents:Math.round(Number(defaultSettings.minimum_order)*100),
  delivery_fee_cents:Math.round(Number(defaultSettings.delivery_fee)*100),
  delivery_eta:defaultSettings.delivery_eta, pickup_eta:defaultSettings.pickup_eta,
  phone:defaultSettings.phone, address:defaultSettings.address,
  waiter_fee_enabled:true, waiter_fee_percent:10, auto_print_enabled:true, table_count:12,print_copies:1,
  delivery_neighborhood_fees:[{city:"Petrolina",neighborhood:"São Gonçalo",fee_cents:500},{city:"Juazeiro",neighborhood:"Centro",fee_cents:1300}],business_hours:[]
};
const tableBoard={table_count:12,occupied_count:2,available_count:10,tables:Array.from({length:12},(_,index)=>({number:index+1,occupied:index===1||index===6,status:index===1?"preparando":"pronto",order_id:index===1?"PED-LOCAL-01":"PED-LOCAL-02",customer_name:index===1?"Mesa da família":"Mesa 7"}))};
const demoOrders=[{id:"558A",channel:"counter",customer_name:"Cliente teste",phone:"87999999999",order_type:"delivery",address:"Rua Teste, 10 - São Gonçalo, Petrolina",city:"Petrolina",neighborhood:"São Gonçalo",street:"Rua Teste",house_number:"10",block:"",reference_point:"Praça",complement:"",maps_url:"",payment_method:"dinheiro",payment_status:"aberto",notes:"",status:"novo",subtotal_cents:2300,delivery_fee_cents:500,waiter_fee_cents:0,total_cents:2800,created_at:new Date().toISOString().replace("T"," ").slice(0,19),items:[{id:1,order_id:"558A",product_id:2,product_name:"Hot Dog Especial",quantity:1,unit_price_cents:2300,complements_json:"[]",notes:""}]}];
function send(res, body, type="application/json; charset=utf-8", status=200){
  res.writeHead(status,{"content-type":type,"cache-control":"no-store"});
  res.end(type.startsWith("application/json")?JSON.stringify(body):body);
}
createServer((req,res)=>{
  const url=new URL(req.url,"http://127.0.0.1");
  if(url.pathname==="/app.css") return send(res,[css,whatsappCss,recoveryCss,operationsCss].join("\n"),"text/css; charset=utf-8");
  if(url.pathname==="/app.js") return send(res,[app,whatsapp,recovery,operations].join("\n"),"text/javascript; charset=utf-8");
  if(url.pathname==="/api/catalog") return send(res,{settings,products});
  if(url.pathname==="/api/tables") return send(res,tableBoard);
  if(url.pathname==="/api/admin/orders") return send(res,{orders:demoOrders});
  if(url.pathname==="/api/admin/products") return send(res,{settings,products,categories:[...new Set(products.map(product=>product.category))]});
  if(url.pathname==="/api/admin/tables") return send(res,tableBoard);
  if(url.pathname==="/api/admin/print-status") return send(res,{enabled:true,configured:true,reception_printer:"Impressora teste",kitchen_printer:"",print_copies:1,pending:0,printed:0});
  if(url.pathname==="/api/admin/audit") return send(res,{entries:[{id:1,action_type:"order_created",entity_type:"order",entity_id:"558A",summary:"Pedido 558A criado",created_at:new Date().toISOString().replace("T"," ").slice(0,19)}]});
  if(url.pathname.startsWith("/api/admin/")) return send(res,{ok:true});
  if(["/","/painel","/pedido","/mesas"].includes(url.pathname)) return send(res,html,"text/html; charset=utf-8");
  send(res,"Não encontrado","text/plain; charset=utf-8",404);
}).listen(4174,"127.0.0.1",()=>console.log("Local: http://127.0.0.1:4174"));
