import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const zipElement = document.getElementById("zip");
const cart = getLocalStorage("so-cart");
if (zipElement != null && cart != null) {
  // On checkout/index.html and cart has items in it, do actual checkout
  const myCheckout = new CheckoutProcess("so-cart");
  myCheckout.init();

  zipElement.addEventListener(
    "change",
    myCheckout.calculateTotal.bind(myCheckout)
  );
  // listening for click on the button
  document.getElementById("order-button").addEventListener("click", (event) => {
    event.preventDefault();
    const myForm = document.forms[0];
    const check_status = myForm.checkValidity();
    myForm.reportValidity();
    if (check_status) {
      myCheckout.checkout();
    }
  });
} else if (zipElement != null && cart === null) {
  // On checkout/index.html but cart doesn't have items, redirect to main.
  location.href = "/cart/index.html";
}
