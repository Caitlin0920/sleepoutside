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

		document.getElementById("order-button").addEventListener("click", this.checkout)
	}

	orderSummary() {
		for (let i = 0; i < this.totalItems; i++) {
			this.itemTotal += this.list[i].FinalPrice;
		}

		document.getElementById("subtotal").innerHTML = "$" + this.itemTotal.toFixed(2);

		document.getElementById("zip").addEventListener("change", () => {
			this.shipping = 10 + (this.totalItems - 1) * 2;
			this.tax = Math.round(this.itemTotal * 0.06 * 100) / 100;
			this.orderTotal = this.itemTotal + this.shipping + this.tax;

			document.getElementById("shipping").innerHTML = "$" + this.shipping.toFixed(2);
			document.getElementById("tax").innerHTML = "$" + this.tax.toFixed(2);
			document.getElementById("total").innerHTML = "$" + this.orderTotal.toFixed(2);
		})
	}

	async checkout() {
		document.querySelector('#order-button').addEventListener('click', (e) => {
			e.preventDefault();
			const myForm = document.forms[0];
			const chk_status = myForm.checkValidity();
			myForm.reportValidity();
			if (chk_status)
				myCheckout.checkout();
		});
		const formElement = document.forms["checkout"];
		const date = new Date;

		// build the data object from the calculated fields, the items in the cart, and the information entered into the form
		const order = formDataToJSON(formElement);
		order.orderDate = date.toISOString();
		order.items = packageItems(this.list, this.totalItems);
		order.orderTotal = "298.18"; // this.orderTotal;
		order.shipping = 12; // this.shipping;
		order.tax = "16.20"; // this.tax;

		console.log(order)

		// call the checkout method in our ExternalServices module and send it our data object.
		try {
			const res = await services.checkout(order);
			console.log(res);
			setLocalStorage("so-cart", []);
			location.assign("/checkout/success.html");

		} catch (err) {
			// get rid of any preexisting alerts.
			removeAllAlerts();
			for (let message in err.message) {
				alertMessage(err.message[message]);

			}
			console.log(err);
		}
	}
}