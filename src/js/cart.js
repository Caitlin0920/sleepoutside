import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    calculateTotal(cartItems);
    document.querySelector(".cart-footer").style.display = "block";
  } else {
    document.querySelector(".product-list").innerHTML = "Empty";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">${item.Quantity}</p>
  <p>$<span class="cart-card__price">${item.FinalPrice}</span></p>
</li>`;

  return newItem;
}

function calculateTotal(cartItems) {
  const qty = document.getElementsByClassName("cart-card__quantity");
  const itemPrice = document.getElementsByClassName("cart-card__price");
  let totalPrice = 0;
  const totalPriceTag = document.querySelector(".cart-total");

  for (let i = 0; i < cartItems.length; i++) {
    qty[i].setAttribute("id", `qty${i}`);
    itemPrice[i].setAttribute("id", `price${i}`);
    const itemQty = document.getElementById(`qty${i}`);
    const singleItemPrice = parseFloat(cartItems[i].FinalPrice);
    totalPrice += singleItemPrice;

    const itemTotalPriceTag = document.getElementById(`price${i}`);
    itemQty.addEventListener("change", () => {
      const itemTotalPrice = parseInt(itemQty.value) * singleItemPrice;
      itemTotalPriceTag.innerHTML = itemTotalPrice.toString();

      totalPrice = 0;
      for (let j = 0; j < cartItems.length; j++) {
        totalPrice += parseFloat(
          document.getElementById(`price${j}`).innerText
        );
        totalPriceTag.innerHTML = `Total: ${totalPrice.toString()}`;
      }
    });
  }
  totalPriceTag.innerHTML = `Total: ${totalPrice.toString()}`;
  totalPrice = 0;
}

renderCartContents();
