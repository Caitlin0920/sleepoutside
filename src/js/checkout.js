import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const zip = document.getElementById("zip");
const cart = getLocalStorage("so-cart");

if(zip != null && cart != null){
  const myCheckout = new CheckoutProcess("so-cart");
  myCheckout.init();

  zip.addEventListener("change", myCheckout.calculateTotal.bind(myCheckout));

  // listening for click on the button
  document.getElementById("order-button").addEventListener("click", (event) => {
    event.preventDefault();
    const checkValidation = document.forms[0].checkValidity();
    document.forms[0].reportValidity();
    console.log(document.forms[0].checkValidity())
    if(checkValidation){
      myCheckout.checkout();
    }
  });
}else if(cart === null){
  location.assign("/cart/index.html");
}


