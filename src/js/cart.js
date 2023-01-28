import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelector(".cart-footer").style.display = "block";

    const quantityBtns = document.querySelectorAll(".quantity-btn");
    quantityBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.target.dataset.action;
        const quantityEl = e.target.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantityEl.textContent);

        if (action === "increment") {
          quantity++;
        } else {
          if (quantity > 1) {
            quantity--;
          }
        }
        quantityEl.textContent = quantity;
        const priceValue = e.target.parentElement.parentElement.querySelector(".cart-card__price").textContent.slice(1);
        const priceNum = parseFloat(priceValue);
        const total = (priceNum * quantity).toFixed(2);

        document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
      });
    });
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

  <div>
    <p>Quantity: <span class="quantity">1</span></p>
    
    <button class="quantity-btn" data-action="increment">+</button>
    <button class="quantity-btn" data-action="decrement">-</button>
  </div>

  <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();


