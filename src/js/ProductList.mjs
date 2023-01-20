// This purpose of this script will be to
// generate a list of product cards in HTML from an array.
import {renderListWithTemplate} from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init(){
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    this.removeElement(list, 2);
    this.removeElement(list, 3);
    // render the list
    this.renderList(list);

    document.querySelector(".title").innerHTML = this.category.charAt(0).toUpperCase() + this.category.slice(1);;
  }
  renderList(list){
    renderListWithTemplate(productCardTemplate, this.listElement, list)
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
  }
  removeElement(list, index) {
    for (let i = 0; i < list.length; i++) {
      if (i === index) {
        list.splice(index, 1);
      }
    }
  }
}

function productCardTemplate(product){
  return `<li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
            <img
              src="${product.Images.PrimaryMedium}"
              alt="Image of ${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p></a>
          </li>`;
}

