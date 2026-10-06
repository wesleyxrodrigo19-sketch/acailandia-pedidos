/* Texto mais claro para pagamento dividido no fechamento de comandas. */
queueMicrotask(()=>{const baseOpenPaymentSettlement=openPaymentSettlement;openPaymentSettlement=id=>{baseOpenPaymentSettlement(id);queueMicrotask(()=>{const label=document.querySelector("#split-payment-toggle strong");if(label)label.textContent="Selecionar mais de uma forma de pagamento"})}});
