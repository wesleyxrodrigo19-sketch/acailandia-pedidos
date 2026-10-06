/* Mantém o carrinho da Prime Açaí no aparelho e reduz abandono por recarga ou fechamento acidental. */
const PRIME_CART_STORAGE="prime_acai_customer_cart_v1";
const PRIME_CART_MAX_AGE=8*24*60*60*1000;
let primeCartRestored=false;

function primeCartSnapshot(){return {updated_at:Date.now(),items:state.cart.map(item=>({product_id:item.product.id,quantity:item.quantity,complements:(item.complements||[]).map(option=>({name:option.name,quantity:option.quantity})),notes:item.notes||""}))}}
function persistPrimeCart(){try{if(!state.cart.length)return localStorage.removeItem(PRIME_CART_STORAGE);localStorage.setItem(PRIME_CART_STORAGE,JSON.stringify(primeCartSnapshot()))}catch{}}
function restorePrimeCart(){
  if(primeCartRestored||!state.catalog)return false;primeCartRestored=true;
  try{
    const saved=JSON.parse(localStorage.getItem(PRIME_CART_STORAGE)||"null");
    if(!saved?.items?.length||Date.now()-Number(saved.updated_at||0)>PRIME_CART_MAX_AGE){localStorage.removeItem(PRIME_CART_STORAGE);return false}
    const restored=[];
    saved.items.forEach(savedItem=>{const product=state.catalog.products.find(item=>String(item.id)===String(savedItem.product_id)&&item.is_available);if(!product)return;const complements=(savedItem.complements||[]).map(savedOption=>{const current=(product.complements||[]).find(option=>option.name===savedOption.name);return current?{...current,quantity:Math.max(1,Math.min(Number(current.max_quantity||20),Number(savedOption.quantity)||1))}:null}).filter(Boolean);addItem(product,Math.max(1,Math.min(20,Number(savedItem.quantity)||1)),restored,complements,String(savedItem.notes||""))});
    state.cart=restored;if(!restored.length)localStorage.removeItem(PRIME_CART_STORAGE);return Boolean(restored.length);
  }catch{localStorage.removeItem(PRIME_CART_STORAGE);return false}
}
function showPrimeRestoredCart(){
  if(!state.cart.length||!state.catalog?.settings?.is_open)return;document.querySelector(".restored-cart-notice")?.remove();
  document.body.insertAdjacentHTML("beforeend",`<button type="button" class="restored-cart-notice" aria-label="Abrir carrinho salvo"><span class="restored-cart-icon">🛒</span><span><strong>Seu carrinho está te esperando!</strong><small>${cartCount()} ${cartCount()===1?"item salvo":"itens salvos"}</small></span><b>Ver carrinho</b></button>`);
  const notice=document.querySelector(".restored-cart-notice");notice.onclick=()=>{notice.remove();openCart()};setTimeout(()=>notice?.classList.add("visible"),30);setTimeout(()=>notice?.remove(),10000);
}
const primeResilientCustomerApp=customerApp;
customerApp=function(){const restored=restorePrimeCart(),html=primeResilientCustomerApp();if(restored)setTimeout(showPrimeRestoredCart,250);return html};
const primeResilientUpdateCartBadges=updateCartBadges;
updateCartBadges=function(){primeResilientUpdateCartBadges();persistPrimeCart()};
