import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as dist_exports, n as Navbar, o as formatPrice, s as products, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { B as Info, E as Phone, F as Mail, J as CreditCard, P as MapPin, Q as ChevronRight, Z as CircleCheck, _ as ShoppingBag, at as ArrowLeft, i as User, o as Truck } from "../_libs/lucide-react.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
import { n as postData, t as ApiError } from "./api-Dp3V1yym.mjs";
import { n as zt } from "../_libs/react-hot-toast.mjs";
import { t as S } from "../_libs/marsidev__react-turnstile.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BqtKsc5-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function CheckoutButton(props) {
	const { userId } = (0, dist_exports.useAuth)();
	const subtotal = props.items.reduce((sum, item) => sum + item.price * item.qty, 0);
	const calculatedTotal = subtotal + (subtotal > 5e3 ? 0 : 299);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [waLink, setWaLink] = (0, import_react.useState)("");
	const placeOrder = async () => {
		if (loading || locked) return;
		if (!props.turnstileToken) return setError("Please complete the captcha.");
		setLoading(true);
		setLocked(true);
		setError("");
		const toastId = zt.loading("Placing your order...");
		window.setTimeout(() => setLocked(false), 1e4);
		try {
			const result = await postData("/api/checkout", {
				...props,
				total: calculatedTotal,
				userId
			});
			zt.success("Order placed successfully.", { id: toastId });
			setWaLink(result.waLink);
			props.onSuccess(result.orderNumber, result.waLink);
		} catch (caught) {
			const message = caught instanceof ApiError && caught.status === 429 ? "Slow down. Try again in 10 minutes." : caught instanceof Error ? caught.message : "Unable to place your order.";
			zt.error(message, { id: toastId });
			setError(message);
			setLocked(false);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: placeOrder,
				disabled: loading || locked,
				className: "w-full rounded-full bg-royal px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-royal-deep disabled:cursor-not-allowed disabled:opacity-60",
				children: loading ? "Placing order..." : `Place Order (Rs. ${calculatedTotal.toLocaleString()})`
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs font-bold text-destructive",
				children: error
			}),
			waLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: waLink,
				target: "_blank",
				rel: "noreferrer",
				className: "block text-center text-xs font-bold text-emerald-600 underline-offset-2 hover:underline",
				children: "Open WhatsApp order"
			})
		]
	});
}
function CheckoutPage() {
	const { items, removeFromCart } = useCart();
	const [toast, setToast] = (0, import_react.useState)(null);
	const [step, setStep] = (0, import_react.useState)("shipping");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("Karachi");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("cod");
	const [orderNumber, setOrderNumber] = (0, import_react.useState)("");
	const [waLink, setWaLink] = (0, import_react.useState)("");
	const [turnstileToken, setTurnstileToken] = (0, import_react.useState)("");
	const [selectedCheckoutIds, setSelectedCheckoutIds] = (0, import_react.useState)(null);
	const [formError, setFormError] = (0, import_react.useState)("");
	const checkoutItems = items.filter((item) => !selectedCheckoutIds || selectedCheckoutIds.includes(item.id)).map((item) => {
		const product = products.find((p) => p.id === item.id);
		return product ? {
			product,
			qty: item.qty
		} : null;
	}).filter(Boolean);
	const subtotal = checkoutItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
	const shipping = subtotal > 5e3 || subtotal === 0 ? 0 : 299;
	const total = subtotal + shipping;
	(0, import_react.useEffect)(() => {
		const storedUser = localStorage.getItem("mockUser");
		if (storedUser) try {
			const u = JSON.parse(storedUser);
			if (u.name) setName(u.name);
			if (u.email) setEmail(u.email);
		} catch (e) {
			console.error(e);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const selectedRaw = localStorage.getItem("gz_checkout_items");
		if (selectedRaw) {
			try {
				const selectedIds = JSON.parse(selectedRaw);
				if (Array.isArray(selectedIds) && selectedIds.every((id) => Number.isInteger(id))) setSelectedCheckoutIds(selectedIds);
			} catch {
				console.error("Error reading checkout selection");
			}
			localStorage.removeItem("gz_checkout_items");
		}
		if (!toast) return;
		const id = setTimeout(() => setToast(null), 2200);
		return () => clearTimeout(id);
	}, [toast]);
	const notify = (0, import_react.useCallback)((message) => setToast(message), []);
	const handleNextStep = (e) => {
		e.preventDefault();
		setFormError("");
		if (step === "shipping") {
			if (!name || !email || !phone || !address) {
				setFormError("Please fill out all shipping fields.");
				return;
			}
			if (!email.includes("@")) {
				setFormError("Please enter a valid email address.");
				return;
			}
			if (phone.length < 10) {
				setFormError("Please enter a valid phone number.");
				return;
			}
			setStep("payment");
		}
	};
	const handleOrderSuccess = (confirmedOrderNumber, confirmedWaLink) => {
		setOrderNumber(confirmedOrderNumber);
		setWaLink(confirmedWaLink);
		try {
			const existingRaw = localStorage.getItem("gz_orders");
			const orderHistory = existingRaw ? JSON.parse(existingRaw) : [];
			const newOrder = {
				id: confirmedOrderNumber,
				date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
					month: "short",
					day: "2-digit",
					year: "numeric"
				}),
				product: checkoutItems.map((i) => `${i.product.name} (x${i.qty})`).join(", "),
				price: formatPrice(total),
				status: "Pending Processing",
				items: checkoutItems.map((i) => ({
					name: i.product.name,
					price: i.product.price,
					qty: i.qty
				})),
				shippingAddress: {
					name,
					address,
					city,
					phone
				},
				paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "bank" ? "Bank Transfer" : "EasyPaisa"
			};
			orderHistory.unshift(newOrder);
			localStorage.setItem("gz_orders", JSON.stringify(orderHistory));
		} catch (e) {
			console.error("Error saving order history", e);
		}
		setStep("success");
		checkoutItems.forEach(({ product }) => removeFromCart(product.id));
	};
	if (step === "success") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount: 0,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pt-24 sm:pt-32" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-2xl px-4 pb-24 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm space-y-6 animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/10 text-emerald-500",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-12 w-12" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-500",
									children: "Order Placed Successfully"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl font-extrabold text-foreground",
									children: "Thank You for Your Purchase!"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										"Your order ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-royal",
											children: orderNumber
										}),
										" has been logged and is being processed."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-y border-border/50 py-5 text-left space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Ship To:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: name
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Delivery Address:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-foreground text-right max-w-xs",
										children: [
											address,
											", ",
											city
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Payment Method:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "bank" ? "Bank Transfer" : "EasyPaisa / Mobile Wallet"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs border-t border-border/30 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground font-bold",
										children: "Total Charged:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold text-royal",
										children: formatPrice(total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: [
								"We have sent a confirmation email to",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground",
									children: email
								}),
								". Our courier partner will contact you at ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-foreground",
									children: phone
								}),
								" upon dispatch."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 flex flex-col sm:flex-row gap-3 justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/account",
								className: "inline-flex items-center justify-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-royal-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), " Track Order Status"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground hover:bg-sky-soft/40 transition-colors",
								children: "Continue Shopping"
							})]
						}),
						waLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: waLink,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center justify-center rounded-full border border-emerald-500/30 px-6 py-3 text-sm font-bold text-emerald-600 transition-colors hover:bg-emerald-500/10",
							children: "Confirm order on WhatsApp"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount: items.reduce((s, i) => s + i.qty, 0),
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pt-24 sm:pt-28 md:pt-32" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 flex items-center gap-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							className: "hover:text-royal transition-colors",
							children: "Cart"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground font-semibold",
							children: "Checkout"
						})
					]
				}), checkoutItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-20 bg-card border border-border/80 rounded-3xl p-8 max-w-md mx-auto space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-bold",
							children: "No active items for checkout"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Please add items to your cart first before proceeding to checkout."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "inline-block rounded-full bg-royal px-6 py-3 text-sm font-bold text-white hover:bg-royal-deep transition-colors",
							children: "Browse Shop"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-10 lg:grid-cols-12 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7 bg-card border border-border/80 rounded-3xl p-6 sm:p-8 space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-border/50 pb-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `text-sm font-bold flex items-center gap-2 ${step === "shipping" ? "text-royal" : "text-muted-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${step === "shipping" ? "bg-royal text-white" : "bg-sky-soft text-muted-foreground"}`,
											children: "1"
										}), "Shipping"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[1px] flex-1 bg-border mx-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `text-sm font-bold flex items-center gap-2 ${step === "payment" ? "text-royal" : "text-muted-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${step === "payment" ? "bg-royal text-white" : "bg-sky-soft text-muted-foreground"}`,
											children: "2"
										}), "Payment"]
									})
								]
							}),
							formError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-xs font-bold text-destructive",
								children: formError
							}),
							step === "shipping" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleNextStep,
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-bold text-foreground",
										children: "Shipping Information"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 gap-5 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-xs font-bold text-muted-foreground flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" }), " Full Name"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												value: name,
												onChange: (e) => setName(e.target.value),
												placeholder: "Usama Bin Abid",
												className: "w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-xs font-bold text-muted-foreground flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }), " Phone Number"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "tel",
												required: true,
												value: phone,
												onChange: (e) => setPhone(e.target.value),
												placeholder: "0342 0024369",
												className: "w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-xs font-bold text-muted-foreground flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }), " Email Address"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value),
											placeholder: "support@thegadgetzone.pk",
											className: "w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 gap-5 sm:grid-cols-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "sm:col-span-2 space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-xs font-bold text-muted-foreground flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), " Delivery Address"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												required: true,
												value: address,
												onChange: (e) => setAddress(e.target.value),
												placeholder: "Shop #B-172, Alhaseeb Residency, Scheme 33",
												className: "w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-xs font-bold text-muted-foreground",
												children: "City"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: city,
												onChange: (e) => setCity(e.target.value),
												className: "w-full rounded-xl border border-border/80 bg-background px-4 py-3 text-sm focus:border-royal focus:outline-none appearance-none",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Karachi",
														children: "Karachi"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Lahore",
														children: "Lahore"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Islamabad",
														children: "Islamabad"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Faisalabad",
														children: "Faisalabad"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Rawalpindi",
														children: "Rawalpindi"
													})
												]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "w-full mt-4 flex items-center justify-center gap-2 rounded-full bg-royal py-3.5 text-sm font-bold text-white transition-colors hover:bg-royal-deep",
										children: ["Continue to Payment ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
									})
								]
							}),
							step === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-bold text-foreground",
										children: "Select Payment Option"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setPaymentMethod("cod"),
												className: `w-full text-left p-4 border rounded-2xl flex items-start gap-4 transition-all ${paymentMethod === "cod" ? "border-royal bg-sky-soft/10" : "border-border"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `mt-1 grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${paymentMethod === "cod" ? "border-royal bg-royal" : "border-border"}`,
													children: paymentMethod === "cod" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-white" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
													className: "text-sm font-bold text-foreground flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-royal" }), " Cash on Delivery (COD)"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground mt-1",
													children: "Pay cash upon receiving shipment. Available nationwide in Pakistan."
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setPaymentMethod("bank"),
												className: `w-full text-left p-4 border rounded-2xl flex items-start gap-4 transition-all ${paymentMethod === "bank" ? "border-royal bg-sky-soft/10" : "border-border"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `mt-1 grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${paymentMethod === "bank" ? "border-royal bg-royal" : "border-border"}`,
													children: paymentMethod === "bank" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-white" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "w-full",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
															className: "text-sm font-bold text-foreground flex items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-royal" }), " Direct Bank Transfer"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-muted-foreground mt-1",
															children: "Transfer directly to our corporate bank account. Share screenshot on WhatsApp."
														}),
														paymentMethod === "bank" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "mt-4 p-4 rounded-xl bg-background border border-border/80 text-xs space-y-2 animate-fade-in",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "font-semibold text-royal",
																	children: "Mock Bank Details:"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Bank: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold",
																	children: "Meezan Bank Ltd"
																})] }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Account Title: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold",
																	children: "The Gadget Zone pk"
																})] }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Account Number: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold",
																	children: "0342-010582910"
																})] }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["IBAN: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold",
																	children: "PK88MEZN000342010582910"
																})] })
															]
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setPaymentMethod("easypaisa"),
												className: `w-full text-left p-4 border rounded-2xl flex items-start gap-4 transition-all ${paymentMethod === "easypaisa" ? "border-royal bg-sky-soft/10" : "border-border"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `mt-1 grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${paymentMethod === "easypaisa" ? "border-royal bg-royal" : "border-border"}`,
													children: paymentMethod === "easypaisa" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-white" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "w-full",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
															className: "text-sm font-bold text-foreground flex items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-royal" }), " EasyPaisa / JazzCash"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-muted-foreground mt-1",
															children: "Send instantly via EasyPaisa or JazzCash wallet."
														}),
														paymentMethod === "easypaisa" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "mt-4 p-4 rounded-xl bg-background border border-border/80 text-xs space-y-2 animate-fade-in",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "font-semibold text-royal",
																	children: "Mobile Wallet Info:"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["EasyPaisa Number: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold",
																	children: "0342-0024369"
																})] }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["JazzCash Number: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold",
																	children: "0332-2205842"
																})] }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Title: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold",
																	children: "Usama Bin Abid / Usama Ali"
																})] })
															]
														})
													]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(S, {
										siteKey: {
											"BASE_URL": "/",
											"DEV": false,
											"MODE": "production",
											"PROD": true,
											"SSR": true,
											"TSS_DEV_SERVER": "false",
											"TSS_DEV_SSR_STYLES_BASEPATH": "/",
											"TSS_DEV_SSR_STYLES_ENABLED": "true",
											"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
											"TSS_INLINE_CSS_ENABLED": "false",
											"TSS_ROUTER_BASEPATH": "",
											"TSS_SERVER_FN_BASE": "/_serverFn/",
											"VITE_CLERK_PUBLISHABLE_KEY": "pk_test_Y3JlYXRpdmUtb3gtMzYzMC5jbGVyay5hY2NvdW50cy5kZXYk",
											"VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL": "/",
											"VITE_CLERK_SIGN_IN_URL": "/sign-in",
											"VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL": "/",
											"VITE_CLERK_SIGN_UP_URL": "/sign-up",
											"VITE_TURNSTILE_SITE_KEY": "0x4AAAAAAEc0bywehnkUWxl8"
										}["VITE_TURNSTILE_SITE_KEY"],
										onSuccess: setTurnstileToken,
										onError: () => setFormError("Captcha failed to load. Please refresh and try again.")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-3 pt-4 sm:flex-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setStep("shipping"),
											className: "w-full flex-1 rounded-full border border-border px-5 py-3.5 text-sm font-bold text-foreground hover:bg-sky-soft/40 transition-colors flex items-center justify-center gap-1.5 sm:w-auto",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to Shipping"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutButton, {
											items: checkoutItems.map(({ product, qty }) => ({
												name: product.name,
												qty,
												price: product.price
											})),
											customerName: name,
											customerEmail: email,
											phone,
											address,
											city,
											paymentMethod,
											total,
											turnstileToken,
											onSuccess: handleOrderSuccess
										})]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-bold text-foreground border-b border-border/50 pb-3",
								children: "Items In Order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-[320px] overflow-y-auto pr-1 space-y-4",
								children: checkoutItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3 items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-12 w-12 rounded-xl bg-sky-soft/40 overflow-hidden shrink-0 border border-border/60",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: item.product.image,
												alt: item.product.name,
												className: "h-full w-full object-cover"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xs font-bold text-foreground truncate",
												children: item.product.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-muted-foreground mt-0.5",
												children: [
													"Qty: ",
													item.qty,
													" · ",
													formatPrice(item.product.price)
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold text-foreground shrink-0",
											children: formatPrice(item.product.price * item.qty)
										})
									]
								}, item.product.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border/50 pt-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Subtotal:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: formatPrice(subtotal)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Shipping:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: shipping === 0 ? "font-semibold text-emerald-500" : "font-bold text-foreground",
											children: shipping === 0 ? "FREE" : formatPrice(shipping)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-sm border-t border-border/30 pt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground font-bold",
											children: "Total:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-extrabold text-royal text-base",
											children: formatPrice(total)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-dashed border-border bg-sky-soft/20 p-4 text-[11px] leading-relaxed text-muted-foreground flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-royal shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "By placing this order, you agree to our 7-day checking warranty terms. No pre-payment is required for Cash on Delivery." })]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { CheckoutPage as component };
