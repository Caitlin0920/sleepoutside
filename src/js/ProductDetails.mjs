import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document.getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
    //commnets' eventlistener        
    document.getElementById("commentBtn")
      .addEventListener("click", this.createComments.bind(this));
  }
  addToCart() {
    let cart = getLocalStorage("so-cart");
    if (cart == null) {
      cart = [];
    }
    // check for existing item in cart
    const existingItem = cart.find((item) => item.Id === this.product.Id);
    if (existingItem) {
      existingItem.Quantity++;
    }
    else {
      this.product.Quantity = 1
      cart.push(this.product);
    }
    setLocalStorage("so-cart", cart);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
  createComments() {
    this.product.Comments = document.getElementById("comment").value;
    let commentPlace = document.getElementById("comments");
    commentPlace.insertAdjacentHTML(
      "afterBegin",
      commentDetailsTemplate(document.getElementById("comment").value)
    );
  }
}
function productDetailsTemplate(product) {
  return `<section class="product-detail">
                <h3>${product.Name}</h3>

                <h2 class="divider">${product.NameWithoutBrand}</h2>

                <img
                class="divider"
                src="${product.Images.PrimaryLarge}"
                alt="${product.NameWIthoutBrand}"
                />

                <p class="product-card__price">$${product.FinalPrice.toFixed(2)} <s>$${product.SuggestedRetailPrice.toFixed(2)}</s></p>

                <p class="product__color">${product.Colors[0].ColorName}</p>

                <p class="product__description">
                ${product.DescriptionHtmlSimple}
                </p>

                <div class="product-detail__add">
                <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
                </div>
            </section>
            <div class="product-detail">
              <h2>Comment</h2>
              <textarea id="comment" rows="5" cols="60"></textarea>
              <button id="commentBtn">Add Comment</button>
              <div id="comments"></div>
            <div>`;
}

function commentDetailsTemplate(comment) {
  console.log(comment)
  const currentTime = new Date;
  const template = `<p><strong>${comment}</strong></p>
                    <p>${currentTime}</p>
                    <hr>`;
  return template
}
