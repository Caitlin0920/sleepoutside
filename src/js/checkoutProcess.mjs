import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
	const formData = new FormData(formElement),
		convertedJSON = {};

	formData.forEach(function (value, key) {
		convertedJSON[key] = value;
	});

	return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items, count) {
	// convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
	let simplified = [];
	let item;
	for (let i = 0; i < count; i++) {
		item = items[i];
		simplified.push({
			id: item.Id,
			name: item.Name,
			price: item.FinalPrice,
			quantity: item.Quantity
		});
	}
	return simplified;
}

export default class checkoutProcess {
	constructor(key, outputSelector) {
		this.key = key;
		this.outputSelector = outputSelector;
		this.list = [];
		this.totalItems = this.list.length;
		this.itemTotal = 0;
		this.shipping = 0;
		this.tax = 0;
		this.orderTotal = 0;

		this.init();
	}

	init() {
		this.list = getLocalStorage(this.key);
		this.totalItems = this.list.length;
		this.orderSummary();

		document.getElementById("submit").addEventListener("click", this.checkout)
	}

	orderSummary() {
		for (let i = 0; i < this.totalItems; i++) {
			this.itemTotal += this.list[i].FinalPrice;
		}

		document.getElementById("subtotal").innerHTML = this.itemTotal.toFixed(2);

		document.getElementById("zip").addEventListener("change", () => {
			this.shipping = 10 + (this.totalItems - 1) * 2;
			this.tax = Math.round(this.itemTotal * 0.06 * 100) / 100;
			this.orderTotal = this.itemTotal + this.shipping + this.tax;

			document.getElementById("shipping").innerHTML = this.shipping.toFixed(2);
			document.getElementById("tax").innerHTML = this.tax.toFixed(2);
			document.getElementById("total").innerHTML = this.orderTotal.toFixed(2);
		})
	}

	async checkout() {
		event.preventDefault()
		const formElement = document.forms["checkout"];
		
		// build the data object from the calculated fields, the items in the cart, and the information entered into the form
		// const order = formDataToJSON(formElement);
		// order.orderDate = new Date;
		// order.items = packageItems(this.list, this.totalItems);
		// order.orderTotal = this.orderTotal;
		// order.shipping = this.shipping;
		// order.tax = this.tax;
		const order = {
			orderDate: "2021-01-27T18:18:26.095Z",
			fname: "John",
			lname: "Doe",
			street: "123 Main",
			city: "Rexburg",
			state: "ID",
			zip: "83440",
			cardNumber: "1234123412341234",
			expiration: "8/21",
			code: "123",
			items: [{
			  id: "20CXG",
			  name: "The North Face Pivoter 27 L Backpack",
			  price: 39.99,
			  quantity: 1
			}, {
			  id: "14GVF",
			  name: "Marmot 5°F Rampart Down Sleeping Bag - 650 Fill, Mummy (For Men and Women)",
			  price: 229.99,
			  quantity: 1
			}],
			orderTotal: "298.18",
			shipping: 12,
			tax: "16.20"
		}

		console.log(order)

		// call the checkout method in our ExternalServices module and send it our data object.
		try {
			const res = await services.checkout(order);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	}
}