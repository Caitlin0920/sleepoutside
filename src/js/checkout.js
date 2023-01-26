import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart");
myCheckout.init();

document
  .getElementById("zip")
  .addEventListener("blur", myCheckout.orderSummary.bind(myCheckout));
// listening for click on the button
document.getElementById("order-button").addEventListener("click", (event) => {
  event.preventDefault();
  myCheckout.calculateTotal();
});
