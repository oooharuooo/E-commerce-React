import {
	ADD_TO_CART,
	CLEAR_CART,
	COUNT_CART_TOTALS,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
	if (action.type === ADD_TO_CART) {
		const { id, color, amount, product } = action.payload;
		const tempItem = state.cart.find((i) => i.id === id + color);
		// If tempItem is true, iterate over it
		if (tempItem) {
			const tempCart = state.cart.map((cartItem) => {
				// check the Item if it equal to the id + color
				if (cartItem.id === id + color) {
					let newAmount = cartItem.amount + amount;
					// return maximum items user can add
					if (newAmount > cartItem.max) {
						newAmount = cartItem.max;
					}
					return { ...cartItem, amount: newAmount };
				} else {
					return cartItem;
				}
			});
			return { ...state, cart: tempCart };
		}
		// if the item is not in the cart, create a newItem Object
		else {
			const newItem = {
				id: id + color,
				name: product.name,
				color,
				amount,
				image: product.images[0].url,
				price: product.price,
				max: product.stock,
			};
			return { ...state, cart: [...state.cart, newItem] };
		}
	}
	// Remove Item
	if (action.type === REMOVE_CART_ITEM) {
		const tempCart = state.cart.filter((item) => item.id !== action.payload);
		return { ...state, cart: tempCart };
	}

	// Clear cart
	if (action.type === CLEAR_CART) {
		return { ...state, cart: [] };
	}

	// Toggle amount
	if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
		const { id, value } = action.payload;
		// eslint-disable-next-line
		const tempCart = state.cart.map((item) => {
			if (item.id === id) {
				if (value === "inc") {
					let newAmount = item.amount + 1;
					if (newAmount > item.max) {
						newAmount = item.max;
					}
					return { ...item, amount: newAmount };
				}
				if (value === "dec") {
					let newAmount = item.amount - 1;
					if (newAmount < 1) {
						newAmount = 1;
					}
					return { ...item, amount: newAmount };
				}
			} else {
				return item;
			}
		});
		return { ...state, cart: tempCart };
	}

	// Total Items
	if (action.type === COUNT_CART_TOTALS) {
		const { total_items, total_amount } = state.cart.reduce(
			(total, cartItem) => {
				const { amount, price } = cartItem;
				total.total_items += amount;
				total.total_amount += price * amount;
				return total;
			},
			{ total_items: 0, total_amount: 0 }
		);
		return { ...state, total_items, total_amount };
	}
	throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
