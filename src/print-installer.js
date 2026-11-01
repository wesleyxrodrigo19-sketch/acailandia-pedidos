(()=>{
downloadPrintBridge=async function(){
  try{
    const res=await fetch("/api/admin/print-bridge-installer.bat");
    if(!res.ok){const data=await res.json().catch(()=>({}));throw new Error(data.error||"Salve as configurações primeiro.")}
    const url=URL.createObjectURL(await res.blob());
    const a=document.createElement("a");
    a.href=url;a.download="Instalar-Impressora-Acailandia.bat";a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    toast("Instalador baixado. Execute-o uma vez no computador do caixa.");
  }catch(e){toast(e.message)}
};
const GUIDE_LAST="Execute o instalador uma vez no computador do caixa. Depois disso o conector inicia sozinho, oculto, sempre que o Windows ligar.";
function relabel(){
  for(const id of ["download-bridge","download-integration-bridge"]){
    const b=document.getElementById(id);
    if(b&&!b.dataset.installer){b.dataset.installer="1";b.textContent="Baixar instalador automático (Windows)"}
  }
  document.querySelectorAll(".print-guide ol li").forEach(li=>{
    if(!li.dataset.installer&&/^Abra o arquivo/i.test(li.textContent.trim())){li.dataset.installer="1";li.textContent=GUIDE_LAST}
  });
}
new MutationObserver(relabel).observe(document.body,{childList:true,subtree:true});
relabel();
})();
