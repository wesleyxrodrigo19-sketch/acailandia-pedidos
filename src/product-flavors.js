/* Sabores configuráveis por produto, sempre sem acréscimo de preço. */
function flavorListForProduct(product){return Array.isArray(product?.flavors)?product.flavors.filter(Boolean):[]}
const PRODUCT_ICECREAM_FLAVORS=new Set(["Brigadeiro","Flocos","Chocomenta","Passas","Toffe","Salada de frutas","Nata goiaba","Sonho de Valsa","Chocolate belga","Unicórnio"]);
function centralFlavorRowsForProduct(product){
  const rows=(state.catalog.acai_complements||[]).filter(row=>row.group_id==="flavor"&&row.is_active!==false),name=String(product?.name||""),isIceCream=/sorvete/i.test(name),isMilkshake=/milk\s?-?shake|^milk\b/i.test(name);
  if(isIceCream)return rows.filter(row=>PRODUCT_ICECREAM_FLAVORS.has(row.name));
  if(isMilkshake)return rows.filter(row=>!PRODUCT_ICECREAM_FLAVORS.has(row.name));
  const selected=new Set((product?.selected_complement_ids||[]).map(Number));
  return rows.filter(row=>selected.has(Number(row.id)));
}
function productCanEditFlavors(product){return flavorListForProduct(product).length>0||Boolean(product?.enable_flavors)||centralFlavorRowsForProduct(product).length>0}
function openProductFlavorEditor(product,enableAfterSave=false){
  const flavors=flavorListForProduct(product);
  layer(`<div class="drawer-header"><button class="icon-btn" data-close aria-label="Fechar">×</button><div><h2>Sabores de ${esc(product.name)}</h2><span class="muted">Todos os sabores mantêm o mesmo preço do produto.</span></div></div><form class="drawer-content flavor-editor" id="product-flavors-form"><div class="field"><label>Sabores disponíveis</label><textarea name="flavors" rows="12" placeholder="Um sabor por linha">${esc(flavors.join("\n"))}</textarea><small>Digite um sabor por linha. A escolha não acrescenta nenhum valor ao pedido.</small></div></form><div class="drawer-footer"><button class="primary-btn full" id="save-product-flavors">Salvar sabores</button></div>`,`drawer`);
  document.querySelector("[data-close]").onclick=closeLayer;
  $("#save-product-flavors").onclick=async()=>{const button=$("#save-product-flavors"),values=$("#product-flavors-form").elements.flavors.value.split(/\r?\n/).map(value=>value.trim()).filter((value,index,list)=>value&&list.findIndex(item=>item.toLocaleLowerCase("pt-BR")===value.toLocaleLowerCase("pt-BR"))===index).slice(0,40);if(!values.length)return toast("Cadastre pelo menos um sabor.");button.disabled=true;try{await api(`/api/admin/products/${product.id}`,{method:"PATCH",body:JSON.stringify({flavors_json:values,enable_flavors:enableAfterSave?true:product.enable_flavors})});state.catalog=await api("/api/admin/products");closeLayer();renderAdmin();toast(enableAfterSave?"Sabores cadastrados e ativados":"Sabores atualizados")}catch(error){toast(error.message);button.disabled=false}}
}

function openCentralProductFlavorEditor(product){
  const options=centralFlavorRowsForProduct(product),selected=new Set((product.selected_complement_ids||[]).map(Number));
  if(!options.length)return openProductFlavorEditor(product,true);
  layer(`<div class="drawer-header"><button class="icon-btn" data-close aria-label="Fechar">×</button><div><h2>Sabores de ${esc(product.name)}</h2><span class="muted">Marque os sabores disponíveis para este produto.</span></div></div><form class="drawer-content flavor-editor" id="product-flavors-form"><div class="product-flavor-catalog">${options.map(row=>`<label class="check-row product-catalog-option"><input type="checkbox" name="product_flavor_ids" value="${Number(row.id)}" ${selected.has(Number(row.id))?"checked":""}><span><strong>${esc(row.name)}</strong></span></label>`).join("")}</div></form><div class="drawer-footer"><button class="primary-btn full" id="save-product-flavors">Salvar sabores</button></div>`,`drawer`);
  document.querySelector("[data-close]").onclick=closeLayer;
  $("#save-product-flavors").onclick=async()=>{
    const button=$("#save-product-flavors"),chosen=[...document.querySelectorAll('[name="product_flavor_ids"]:checked')].map(input=>Number(input.value));
    if(!chosen.length)return toast("Mantenha pelo menos um sabor disponível.");
    const allFlavors=new Set((state.catalog.acai_complements||[]).filter(row=>row.group_id==="flavor").map(row=>Number(row.id))),otherIds=(product.selected_complement_ids||[]).map(Number).filter(id=>!allFlavors.has(id));
    button.disabled=true;
    try{await api(`/api/admin/products/${product.id}`,{method:"PATCH",body:JSON.stringify({selected_complement_ids_json:[...new Set([...otherIds,...chosen])]})});state.catalog=await api("/api/admin/products");closeLayer();renderAdmin();toast("Sabores atualizados")}
    catch(error){toast(error.message);button.disabled=false}
  };
}

function enhanceProductFlavorControls(){
  const rows=[...document.querySelectorAll(".product-admin-row")];
  rows.forEach((row,index)=>{const product=state.catalog.products[index],actions=row.querySelector(".product-choice-actions");if(!product||!actions||actions.querySelector("[data-product-flavors]")||!productCanEditFlavors(product))return;const centralOnly=centralFlavorRowsForProduct(product).length>0&&!product.enable_flavors&&!flavorListForProduct(product).length;actions.insertAdjacentHTML("beforeend",`${centralOnly?"":`<button class="secondary-btn compact ${product.enable_flavors?"choice-on":""}" data-product-flavors="toggle" data-product-id="${product.id}">${product.enable_flavors?"✓ Sabores":"Ligar sabores"}</button>`}<button class="secondary-btn compact" data-product-flavors="edit" data-product-id="${product.id}">Editar sabores</button>`)});
  document.querySelectorAll('[data-product-flavors="toggle"]').forEach(button=>button.onclick=async()=>{const product=state.catalog.products.find(item=>item.id===Number(button.dataset.productId));if(!product)return;if(!product.enable_flavors&&!flavorListForProduct(product).length)return openProductFlavorEditor(product,true);button.disabled=true;try{await api(`/api/admin/products/${product.id}`,{method:"PATCH",body:JSON.stringify({enable_flavors:!product.enable_flavors})});product.enable_flavors=!product.enable_flavors;renderAdmin();toast(product.enable_flavors?"Sabores ativados":"Sabores desativados")}catch(error){toast(error.message);button.disabled=false}});
  document.querySelectorAll('[data-product-flavors="edit"]').forEach(button=>button.onclick=()=>{const product=state.catalog.products.find(item=>item.id===Number(button.dataset.productId));if(product){if(centralFlavorRowsForProduct(product).length)openCentralProductFlavorEditor(product);else openProductFlavorEditor(product,false)}});
}

const productFlavorsRenderAdmin=renderAdmin;
renderAdmin=function(){productFlavorsRenderAdmin();if(state.admin.view==="products")enhanceProductFlavorControls()};

const productFlavorsOpenProductEditor=openProductEditor;
openProductEditor=function(id){productFlavorsOpenProductEditor(id);if(!id)return;const product=state.catalog.products.find(item=>item.id===Number(id)),footer=document.querySelector(".admin-product-drawer .drawer-footer");if(!product||!footer)return;footer.classList.add("product-editor-actions");footer.insertAdjacentHTML("afterbegin",`<button type="button" class="danger-btn" id="delete-product">Excluir produto</button>`);$("#delete-product").onclick=async()=>{if(!confirm(`Excluir ${product.name}? O produto sairá do cardápio e do balcão.`))return;const button=$("#delete-product");button.disabled=true;try{await api(`/api/admin/products/${product.id}`,{method:"DELETE"});state.catalog=await api("/api/admin/products");closeLayer();renderAdmin();toast("Produto excluído")}catch(error){toast(error.message);button.disabled=false}}};
