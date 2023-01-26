import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart");
myCheckout.init();

document
  .getElementById("zip")
  .addEventListener("change", myCheckout.calculateTotal.bind(myCheckout));
// listening for click on the button
document.getElementById("order-button").addEventListener("click", (event) => {
  event.preventDefault();
  myCheckout.checkout();
});
