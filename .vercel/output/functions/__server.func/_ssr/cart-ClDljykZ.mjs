import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Navbar, o as formatPrice, s as products, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { C as RefreshCcw, J as CreditCard, O as Package, Q as ChevronRight, U as Heart, Z as CircleCheck, at as ArrowLeft, c as Tag, d as Star, g as ShoppingCart, j as Minus, n as X, o as Truck, p as Sparkles, s as Trash2, w as Plus, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
import { a as SkeletonOrderSummary, n as SkeletonCartItem, t as LazyImage } from "./SkeletonCard-C6Aiiu2v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-ClDljykZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Toast({ message, onDone }) {
	(0, import_react.useEffect)(() => {
		const t = setTimeout(onDone, 4e3);
		return () => clearTimeout(t);
	}, [onDone]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-6 right-6 z-[80] flex max-w-[calc(100vw-2rem)] items-start gap-3 rounded-2xl border border-emerald-500/25 bg-card px-5 py-4 text-foreground shadow-[0_20px_60px_-15px_rgba(16,185,129,0.35)] animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-500",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-foreground",
				children: message
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: "Your order will arrive in 2-4 business days"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onDone,
				className: "ml-1 text-muted-foreground transition-colors hover:text-foreground",
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
			})
		]
	});
}
function ProductImages({ product }) {
	const [activeIdx, setActiveIdx] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-square w-full overflow-hidden rounded-2xl bg-sky-soft/40",
			children: [product.gallery.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `absolute inset-0 transition-opacity duration-500 ${i === activeIdx ? "opacity-100" : "opacity-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
					src: img,
					alt: i === 0 ? product.name : "",
					className: "h-full w-full object-cover"
				})
			}, img)), product.discount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "absolute left-3 top-3 z-10 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold text-royal-deep",
				children: [product.discount, "% OFF"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: product.gallery.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setActiveIdx(i),
				className: `relative aspect-square w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${activeIdx === i ? "border-royal shadow-[0_0_0_2px_rgba(30,90,210,0.15)]" : "border-border/40 hover:border-royal/50"}`,
				"aria-label": `Image ${i + 1}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
					src: img,
					alt: "",
					className: "h-full w-full object-cover"
				})
			}, i))
		})]
	});
}
function CartItemCard({ item, onQtyChange, onRemove, isSelected, onSelect }) {
	const { product, qty } = item;
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `group relative rounded-2xl border bg-card transition-all duration-300 ${isSelected ? "border-royal shadow-[var(--shadow-card)]" : "border-border/60 hover:border-royal/30"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4 p-4 sm:gap-5 sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onSelect(product.id),
						className: `mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${isSelected ? "border-royal bg-royal" : "border-border group-hover:border-royal/50"}`,
						"aria-label": "Select item",
						children: isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 10 10",
							className: "h-full w-full p-0.5 text-white",
							fill: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
								points: "1.5,5 4,7.5 8.5,2",
								stroke: "currentColor",
								strokeWidth: "1.8",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setExpanded(!expanded),
						className: "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sky-soft/50 sm:h-24 sm:w-24",
						"aria-label": "Expand product details",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyImage, {
							src: product.image,
							alt: product.name,
							className: "h-full w-full object-cover transition-transform duration-500 hover:scale-110"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col gap-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 rounded-full bg-sky-soft px-2 py-0.5 text-[10px] font-bold text-royal mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-2.5 w-2.5" }), product.category]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-sm font-bold leading-snug text-foreground sm:text-base line-clamp-2",
										children: product.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onRemove(product.id),
									className: "shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500",
									"aria-label": "Remove from cart",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex text-gold",
									children: [
										0,
										1,
										2,
										3,
										4
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
										className: "h-3 w-3",
										fill: "currentColor",
										strokeWidth: 0
									}, i))
								}), product.rating]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-auto flex flex-wrap items-center justify-between gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-base font-extrabold text-royal sm:text-lg",
											children: formatPrice(product.price * qty)
										}),
										qty > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: [
												"(",
												formatPrice(product.price),
												" each)"
											]
										}),
										product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground line-through",
											children: formatPrice(product.oldPrice * qty)
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 rounded-full border border-border/80 bg-background px-2 py-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => onQtyChange(product.id, Math.max(1, qty - 1)),
											disabled: qty <= 1,
											className: "grid h-6 w-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sky-soft hover:text-royal disabled:opacity-30",
											"aria-label": "Decrease quantity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-5 text-center text-xs font-bold tabular-nums",
											children: qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => onQtyChange(product.id, qty + 1),
											className: "grid h-6 w-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sky-soft hover:text-royal",
											"aria-label": "Increase quantity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
										})
									]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border/40 px-4 py-5 sm:px-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImages, { product }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-lg font-bold text-foreground",
									children: product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-muted-foreground",
									children: product.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-auto flex flex-wrap gap-2 text-xs",
									children: [
										product.discount && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-amber-50 px-3 py-1.5 font-bold text-amber-700 border border-amber-200",
											children: [
												"Save ",
												product.discount,
												"%"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-sky-soft px-3 py-1.5 font-semibold text-royal border border-royal/10",
											children: [product.rating, " Rating"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700 border border-emerald-100",
											children: "In Stock"
										})
									]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setExpanded(!expanded),
				className: "flex w-full items-center justify-center gap-1 border-t border-border/30 py-2 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-sky-soft/30 hover:text-royal rounded-b-2xl",
				children: [expanded ? "Hide details" : "View details & images", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-3.5 w-3.5 transition-transform duration-300 ${expanded ? "rotate-90" : ""}` })]
			})
		]
	});
}
function OrderSummary({ items, selectedIds, onPlaceOrder }) {
	const selectedItems = items.filter((i) => selectedIds.has(i.product.id));
	const subtotal = selectedItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
	const savedAmount = selectedItems.reduce((sum, i) => sum + (i.product.oldPrice ? (i.product.oldPrice - i.product.price) * i.qty : 0), 0);
	const shipping = subtotal > 5e3 ? 0 : 299;
	const total = subtotal + shipping;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sticky top-24 rounded-2xl border border-border/60 bg-card overflow-hidden shadow-[0_4px_32px_-12px_rgba(30,90,210,0.1)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-royal px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base font-bold text-white",
				children: "Order Summary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-white/70 mt-0.5",
				children: selectedItems.length === 0 ? "Select items to see your total" : `${selectedItems.length} item${selectedItems.length > 1 ? "s" : ""} selected`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Subtotal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: formatPrice(subtotal)
					})]
				}),
				savedAmount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-emerald-600",
						children: "You save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-emerald-600",
						children: ["-", formatPrice(savedAmount)]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Shipping"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: shipping === 0 ? "font-semibold text-emerald-600" : "font-semibold",
						children: shipping === 0 ? "FREE" : formatPrice(shipping)
					})]
				}),
				subtotal > 0 && subtotal < 5e3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-xl bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-700 border border-amber-100",
					children: [
						"Add ",
						formatPrice(5e3 - subtotal),
						" more for free shipping!"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border/40 pt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display font-bold text-foreground",
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-extrabold text-royal",
							children: formatPrice(total)
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onPlaceOrder,
					disabled: selectedItems.length === 0,
					id: "place-order-btn",
					className: "mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-royal py-3.5 text-sm font-bold text-white transition-all hover:bg-royal-deep hover:shadow-[0_8px_24px_-8px_rgba(30,90,210,0.5)] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.97]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Place Order"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					className: "flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-royal",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Continue Shopping"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 grid grid-cols-3 gap-2 border-t border-border/30 pt-4",
					children: [
						{
							icon: ShieldCheck,
							label: "Secure"
						},
						{
							icon: Truck,
							label: "Fast Ship"
						},
						{
							icon: RefreshCcw,
							label: "Returns"
						}
					].map(({ icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1 rounded-xl bg-sky-soft/40 p-2 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-royal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-semibold text-muted-foreground",
							children: label
						})]
					}, label))
				})
			]
		})]
	});
}
function EmptyCart() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-5 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid h-28 w-28 place-items-center rounded-full bg-sky-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-12 w-12 text-royal/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute -top-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-gold text-xs font-bold text-royal-deep",
					children: "0"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-bold text-foreground",
				children: "Your cart is empty"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-muted-foreground",
				children: "Looks like you haven't added anything yet."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3 justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					className: "inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-royal-deep",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), " Browse Products"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/categories",
					className: "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-royal/40 hover:bg-sky-soft",
					children: "Shop by Category"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-3xl mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider",
					children: "You might like"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: products.slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						className: "group rounded-xl border border-border/60 bg-card p-3 text-left transition-all hover:border-royal/30 hover:shadow-[var(--shadow-card)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-square overflow-hidden rounded-lg bg-sky-soft/40 mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image,
									alt: p.name,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold line-clamp-2 text-foreground",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold text-royal mt-0.5",
								children: formatPrice(p.price)
							})
						]
					}, p.id))
				})]
			})
		]
	});
}
function CartPage() {
	const navigate = useNavigate();
	const { items, cartCount: navCartCount, updateQty, removeFromCart, clearCart } = useCart();
	const [selectedIds, setSelectedIds] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [toast, setToast] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const cartItems = items.map((item) => {
		const product = products.find((p) => p.id === item.id);
		return product ? {
			product,
			qty: item.qty
		} : null;
	}).filter(Boolean);
	(0, import_react.useEffect)(() => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			let changed = false;
			for (const id of next) if (!items.find((i) => i.id === id)) {
				next.delete(id);
				changed = true;
			}
			return changed ? next : prev;
		});
	}, [items]);
	(0, import_react.useEffect)(() => {
		const frame = requestAnimationFrame(() => setIsLoading(false));
		return () => cancelAnimationFrame(frame);
	}, []);
	const handleQtyChange = (id, qty) => {
		updateQty(id, qty);
	};
	const handleRemove = (id) => {
		removeFromCart(id);
		setSelectedIds((prev) => {
			const next = new Set(prev);
			next.delete(id);
			return next;
		});
	};
	const handleSelect = (id) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};
	const toggleSelectAll = () => {
		if (selectedIds.size === cartItems.length) setSelectedIds(/* @__PURE__ */ new Set());
		else setSelectedIds(new Set(cartItems.map((i) => i.product.id)));
	};
	const handlePlaceOrder = (0, import_react.useCallback)(() => {
		const sel = cartItems.filter((i) => selectedIds.has(i.product.id));
		if (sel.length === 0) {
			setToast("Select at least one item to continue to checkout.");
			return;
		}
		localStorage.setItem("gz_checkout_items", JSON.stringify(sel.map((item) => item.product.id)));
		navigate({ to: "/checkout" });
	}, [
		cartItems,
		selectedIds,
		navigate
	]);
	const notify = (0, import_react.useCallback)((m) => setToast(m), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount: navCartCount,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-24 pb-10 sm:pt-28",
				style: { background: "linear-gradient(135deg, #0B2545 0%, #134074 40%, #2F73D9 100%)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-white/60 text-sm mb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-white transition-colors",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white",
								children: "Cart"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-extrabold text-white sm:text-4xl",
							children: "Shopping Cart"
						}), cartItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-white/70 text-sm",
							children: [
								cartItems.length,
								" item",
								cartItems.length > 1 ? "s" : "",
								" in your cart"
							]
						})] }), cartItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "flex items-center gap-1.5 text-sm font-bold text-white/80 hover:text-white transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Continue Shopping"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-4 py-10 sm:px-6",
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-[1fr_340px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-12 w-full rounded-xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonCartItem, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonCartItem, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonCartItem, {})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonOrderSummary, {})]
				}) : cartItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyCart, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-[1fr_340px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-xl border border-border/50 bg-card px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: toggleSelectAll,
									id: "select-all-btn",
									className: "flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-royal transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `grid h-5 w-5 place-items-center rounded-full border-2 transition-colors ${selectedIds.size === cartItems.length ? "border-royal bg-royal" : "border-border"}`,
											children: selectedIds.size === cartItems.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												viewBox: "0 0 10 10",
												className: "h-full w-full p-0.5 text-white",
												fill: "none",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
													points: "1.5,5 4,7.5 8.5,2",
													stroke: "currentColor",
													strokeWidth: "1.8",
													strokeLinecap: "round",
													strokeLinejoin: "round"
												})
											})
										}),
										"Select All (",
										cartItems.length,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [selectedIds.size, " selected"] }), selectedIds.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => Array.from(selectedIds).forEach(handleRemove),
										className: "flex items-center gap-1 text-red-500 font-semibold hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Remove selected"]
									})]
								})]
							}),
							cartItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartItemCard, {
								item,
								onQtyChange: handleQtyChange,
								onRemove: handleRemove,
								isSelected: selectedIds.has(item.product.id),
								onSelect: handleSelect
							}, item.product.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-dashed border-border/60 bg-sky-soft/20 px-4 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4 text-red-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Want to save items for later? Use the wishlist feature coming soon." })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3 rounded-xl border border-border/40 px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "We accept: Cash on Delivery · Bank Transfer · EasyPaisa · JazzCash"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderSummary, {
						items: cartItems,
						selectedIds,
						onPlaceOrder: handlePlaceOrder
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {
				message: toast,
				onDone: () => setToast(null)
			})
		]
	});
}
//#endregion
export { CartPage as component };
