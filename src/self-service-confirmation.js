/* Açaí por peso é um produto interno do balcão: confirme a leitura antes de incluir. */
const selfServiceConfirmationPosView=posView;
posView=function(){return selfServiceConfirmationPosView().replace("<h2>Self-service</h2>","<h2>Açaí Self-service</h2>").replace("Ler balança e adicionar","Selecionar Açaí Self-service")};

addSelfServiceFromScale=async function(){
  const button=$("#add-self-service");button.disabled=true;button.textContent="Lendo balança...";
  try{
    const reading=await api("/api/admin/scale/current"),grams=Number(reading.grams||0),capturedAt=String(reading.captured_at||""),capturedMs=Date.parse(`${capturedAt}Z`),age=Date.now()-capturedMs;
    if(!grams)return toast("A balança ainda não enviou um peso. Coloque o açaí e aguarde a estabilização.");
    if(!capturedAt||!Number.isFinite(capturedMs)||age<0||age>120000)return toast("A leitura da balança está antiga. Pese novamente o açaí self-service.");
    const pricePerKg=Math.max(1,Number(state.catalog.settings.self_service_price_per_kg_cents||3000)),total=Math.round(grams*pricePerKg/1000),weight=(grams/1000).toLocaleString("pt-BR",{minimumFractionDigits:3,maximumFractionDigits:3});
    layer(`<div class="drawer-header"><button class="icon-btn" data-close>×</button><div><h2>Açaí Self-service</h2><span class="muted">Confirme a pesagem antes de adicionar.</span></div></div><div class="drawer-content self-service-confirm"><div class="self-service-confirm-weight"><span>PESO NA BALANÇA</span><strong>${weight} kg</strong><small>${grams} g • Prix 3 Toledo</small></div><div class="self-service-confirm-total"><span>${money(pricePerKg)} por kg</span><strong>${money(total)}</strong></div></div><div class="drawer-footer"><button class="secondary-btn" data-close>Cancelar</button><button class="primary-btn" id="confirm-self-service">Confirmar e adicionar</button></div>`,`drawer self-service-confirm-drawer`);
    document.querySelectorAll("[data-close]").forEach(close=>close.onclick=closeLayer);
    $("#confirm-self-service").onclick=()=>{const item={selfService:true,grams,capturedAt,quantity:1,key:"self-service",unit_price_cents:total,product:{id:"self-service",name:"Açaí Self-service",price_cents:total,image_url:JW_LOGO},notes:`${grams} g • ${money(pricePerKg)}/kg • Prix 3 Toledo`};state.admin.posCart=state.admin.posCart.filter(entry=>!entry.selfService);state.admin.posCart.unshift(item);closeLayer();renderAdmin();toast(`Açaí Self-service adicionado: ${money(total)}`)};
  }catch(error){toast(error.message)}finally{if(button&&document.body.contains(button)){button.disabled=false;button.textContent="Selecionar Açaí Self-service"}}
};
