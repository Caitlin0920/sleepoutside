import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
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

export default class CheckoutProcess {
	constructor(key) {
		this.key = key;
		this.list = [];
		this.totalItems = this.list.length;
		this.itemTotal = 0;
		this.shipping = 0;
		this.tax = 0;
		this.orderTotal = 0;
	}

	init() {
		this.list = getLocalStorage(this.key);
		if (this.list != null) {
			this.totalItems = this.list.length;
			this.orderSummary()
		}
	}

	orderSummary() {
		this.itemTotal = 0;
		for (let i = 0; i < this.totalItems; i++) {
			this.itemTotal += this.list[i].FinalPrice * this.list[i].Quantity;
		}

		document.getElementById("subtotal").innerHTML = "$" + this.itemTotal.toFixed(2);
	}

	calculateTotal() {
		this.shipping = 10 + (this.totalItems - 1) * 2;
		this.tax = Math.round(this.itemTotal * 0.06 * 100) / 100;
		this.orderTotal = this.itemTotal + this.shipping + this.tax;

		document.getElementById("shipping").innerHTML = "$" + this.shipping.toFixed(2);
		document.getElementById("tax").innerHTML = "$" + this.tax.toFixed(2);
		document.getElementById("total").innerHTML = "$" + this.orderTotal.toFixed(2);
	}

	async checkout() {
		const formElement = document.forms["checkout"];
		const date = new Date;
		
		this.list = getLocalStorage("so-cart");
		this.totalItems = this.list.length;
		this.orderSummary();
		this.calculateTotal();
		
		// build the data object from the calculated fields, the items in the cart, and the information entered into the form
		const order = formDataToJSON(formElement);
		order.orderDate = date.toISOString();
		order.items = packageItems(this.list, this.totalItems);
		order.orderTotal = this.orderTotal;
		order.shipping = this.shipping;
		order.tax = this.tax;

		console.log(order)

		// call the checkout method in our ExternalServices module and send it to our data object.
		try {
			const res = await services.checkout(order);
			console.log(res);
			setLocalStorage("so-cart", null);
			location.assign("/checkout/success.html");
		} catch (err) {
			console.log(err);
			removeAllAlerts();
			for (let message in err.message) {
				console.log(err.message[message])
				alertMessage(err.message[message]);
			  }
			console.log(err);
		}
	}
}