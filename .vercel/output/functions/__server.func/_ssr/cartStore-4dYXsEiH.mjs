import { i as __toESM } from "../_runtime.mjs";
import { p as require_react } from "../_libs/@clerk/react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cartStore-4dYXsEiH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var CART_UPDATE_EVENT = "tg_cart_update";
var readCart = () => {
	try {
		const raw = localStorage.getItem("cartItems");
		if (raw) return JSON.parse(raw);
	} catch (e) {
		console.error("Error reading cart", e);
	}
	return [];
};
var writeCart = (items) => {
	localStorage.setItem("cartItems", JSON.stringify(items));
	const count = items.reduce((s, i) => s + i.qty, 0);
	localStorage.setItem("cart", String(count));
	window.dispatchEvent(new Event(CART_UPDATE_EVENT));
};
function useCart() {
	const [items, setItems] = (0, import_react.useState)([]);
	const sync = (0, import_react.useCallback)(() => {
		setItems(readCart());
	}, []);
	(0, import_react.useEffect)(() => {
		sync();
		window.addEventListener(CART_UPDATE_EVENT, sync);
		window.addEventListener("storage", (e) => {
			if (e.key === "cartItems") sync();
		});
		return () => {
			window.removeEventListener(CART_UPDATE_EVENT, sync);
			window.removeEventListener("storage", sync);
		};
	}, [sync]);
	const addToCart = (0, import_react.useCallback)((id, qty = 1) => {
		const current = readCart();
		const existing = current.find((i) => i.id === id);
		if (existing) existing.qty += qty;
		else current.push({
			id,
			qty
		});
		writeCart(current);
	}, []);
	const updateQty = (0, import_react.useCallback)((id, qty) => {
		writeCart(readCart().map((i) => i.id === id ? {
			...i,
			qty
		} : i));
	}, []);
	const removeFromCart = (0, import_react.useCallback)((id) => {
		writeCart(readCart().filter((i) => i.id !== id));
	}, []);
	const clearCart = (0, import_react.useCallback)(() => {
		writeCart([]);
	}, []);
	return {
		items,
		cartCount: items.reduce((acc, item) => acc + item.qty, 0),
		addToCart,
		updateQty,
		removeFromCart,
		clearCart
	};
}
//#endregion
export { useCart as t };
