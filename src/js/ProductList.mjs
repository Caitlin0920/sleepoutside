import ProductData from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// Create a template function that will simply return a template literal string for each of the templates needed
function productCardTemplate(product) {
    return `<li class="product-card">
                <a href="product_pages/index.html?product=${product.Id}">
                    <img src="${product.Image}" alt="Image of ${product.Name}">
                    <h3 class="card__brand">${product.Brand.Name}</h3>
                    <h2 class="card__name">${product.Name}</h2>
                    <p class="product-card__price">$${product.FinalPrice}</p>
                </a>
            </li>`
}

// The purpose of this script will be to generate a list of product cards in HTML from an array.
export default class ProductList {
    constructor(category, dataSource, listElement) {
        // We passed in this information to make our class as reusable as possible.
        // Being able to define these things when we use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;

    }
    // use the dataSource to get the list of products to work with. We could do that in the constructor 
    // or in an init() method. One advantage of the init method is that it will allow us to use async/await 
    // when calling the promise in getData().
    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData();


        // render the list - to be completed
        this.renderList(list);
    }
    renderList(list) {

        // Render for main activity step 5
        // renderListWithTemplate(productCardTemplate, this.listElement, list)
        // const htmlStrings = list.map(productCardTemplate)
        // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));

        // render stretch activity
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }



    // let newArray = [];
    // let newArray = list.filter(this.dataSource, i => i <= 3)

    // newArray.push(list[0])
    // newArray.push(list[1])
    // newArray.push(list[2])
    // newArray.push(list[3])
    // return list;
    // console.log(newArray)


}

