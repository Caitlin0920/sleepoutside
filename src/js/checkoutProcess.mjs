import { getLocalStorage } from "./utils.mjs";

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
}