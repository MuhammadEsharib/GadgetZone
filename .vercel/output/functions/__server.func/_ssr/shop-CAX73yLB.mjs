import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as categories, n as Navbar, s as products, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { K as Funnel, S as RotateCcw, Z as CircleCheck, h as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { t as LiveVisitors } from "./LiveVisitors-BGuUhSx6.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
import { o as SkeletonProductGrid } from "./SkeletonCard-C6Aiiu2v.mjs";
import { n as ProductCard, r as ProductModal, t as Overlay } from "./ProductCard-Dk1ZAr7F.mjs";
import { n as Route$3 } from "./router-ZOAslcwr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-CAX73yLB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Shop() {
	const { search: searchParam, category: categoryParam } = Route$3.useSearch();
	const routeNavigate = Route$3.useNavigate();
	const navigate = useNavigate();
	const { cartCount, addToCart } = useCart();
	const [toast, setToast] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [searchVal, setSearchVal] = (0, import_react.useState)(searchParam || "");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(categoryParam || "");
	const [minPrice, setMinPrice] = (0, import_react.useState)("");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)("");
	const [sortBy, setSortBy] = (0, import_react.useState)("featured");
	const [isMobileFilterOpen, setIsMobileFilterOpen] = (0, import_react.useState)(false);
	const notify = (0, import_react.useCallback)((message) => setToast(message), []);
	(0, import_react.useEffect)(() => {
		const frame = requestAnimationFrame(() => setIsLoading(false));
		return () => cancelAnimationFrame(frame);
	}, []);
	(0, import_react.useEffect)(() => {
		setSearchVal(searchParam || "");
	}, [searchParam]);
	(0, import_react.useEffect)(() => {
		setSelectedCategory(categoryParam || "");
	}, [categoryParam]);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = setTimeout(() => setToast(null), 2200);
		return () => clearTimeout(id);
	}, [toast]);
	const handleAddToCart = (product, qty = 1) => {
		addToCart(product.id, qty);
		notify("Added to cart");
	};
	const handleBuy = (product) => {
		if (product) addToCart(product.id, 1);
		setSelected(null);
		navigate({ to: "/checkout" });
	};
	const updateUrlParams = (updatedCategory, updatedSearch) => {
		routeNavigate({
			to: "/shop",
			search: {
				category: updatedCategory || void 0,
				search: updatedSearch || void 0
			}
		});
	};
	const handleCategorySelect = (catName) => {
		const newCat = selectedCategory === catName ? "" : catName;
		setSelectedCategory(newCat);
		updateUrlParams(newCat, searchVal);
	};
	const handleSearchChange = (val) => {
		setSearchVal(val);
		updateUrlParams(selectedCategory, val);
	};
	const handleResetFilters = () => {
		setSearchVal("");
		setSelectedCategory("");
		setMinPrice("");
		setMaxPrice("");
		setSortBy("featured");
		updateUrlParams("", "");
	};
	const filteredProducts = products.filter((product) => {
		const matchesSearch = !searchVal || product.name.toLowerCase().includes(searchVal.toLowerCase()) || product.description.toLowerCase().includes(searchVal.toLowerCase());
		const matchesCategory = !selectedCategory || product.name.toLowerCase().includes(selectedCategory.replace("Smart Watches", "Watch").replace("Earbuds", "Earbuds").replace("Speakers", "Speaker").replace("Power Banks", "Power").replace("Mobile Accessories", "Charger").toLowerCase());
		const words = {
			Earbuds: ["earbuds"],
			"Smart Watches": ["watch", "fitness"],
			Headphones: ["headset", "earbuds"],
			Speakers: ["speaker"],
			"Power Banks": ["power bank"],
			"Mobile Accessories": [
				"charger",
				"cable",
				"power bank"
			]
		}[selectedCategory];
		const matchesCategoryMapping = !selectedCategory || words && words.some((word) => product.name.toLowerCase().includes(word));
		const finalCategoryMatch = matchesCategory || matchesCategoryMapping;
		const price = product.price;
		const matchesMin = !minPrice || price >= Number(minPrice);
		const matchesMax = !maxPrice || price <= Number(maxPrice);
		return matchesSearch && finalCategoryMatch && matchesMin && matchesMax;
	}).sort((a, b) => {
		if (sortBy === "price-low") return a.price - b.price;
		if (sortBy === "price-high") return b.price - a.price;
		if (sortBy === "rating") return b.rating - a.rating;
		return 0;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pt-24 sm:pt-28 md:pt-32" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-10 text-center lg:text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-extrabold text-royal-deep sm:text-5xl",
						children: "Explore Gadgets"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground max-w-xl",
						children: "Find the perfect smartwatch, audio device, or accessory tailored to fit your lifestyle."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-28 space-y-8 rounded-2xl border border-border/80 bg-card p-6 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border/60 pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2 font-display text-base font-bold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4.5 w-4.5 text-royal" }), " Filters"]
									}), (searchVal || selectedCategory || minPrice || maxPrice || sortBy !== "featured") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleResetFilters,
										className: "flex items-center gap-1 text-xs font-bold text-royal hover:text-royal-deep transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3 w-3" }), " Reset"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Refine Search"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Search products...",
										value: searchVal,
										onChange: (e) => handleSearchChange(e.target.value),
										className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-royal focus:outline-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Categories"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: categories.map((c) => {
											const isSelected = selectedCategory === c.name;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => handleCategorySelect(c.name),
												className: `flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${isSelected ? "bg-royal/10 text-royal" : "hover:bg-sky-soft text-foreground/80 hover:text-foreground"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-[10px] ${isSelected ? "text-royal/80" : "text-muted-foreground"}`,
													children: c.count
												})]
											}, c.name);
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Price (Rs.)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												placeholder: "Min",
												value: minPrice,
												onChange: (e) => setMinPrice(e.target.value),
												className: "w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-center focus:border-royal focus:outline-none"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "self-center text-muted-foreground text-xs",
												children: "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												placeholder: "Max",
												value: maxPrice,
												onChange: (e) => setMaxPrice(e.target.value),
												className: "w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-center focus:border-royal focus:outline-none"
											})
										]
									})]
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-3 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-semibold text-muted-foreground",
								children: [
									"Showing ",
									filteredProducts.length,
									" ",
									filteredProducts.length === 1 ? "product" : "products"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setIsMobileFilterOpen(true),
									className: "flex items-center gap-1.5 rounded-lg border border-border/80 bg-card px-3.5 py-1.5 text-sm font-bold text-foreground/80 hover:bg-sky-soft hover:text-foreground lg:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }), " Filters"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: sortBy,
									onChange: (e) => setSortBy(e.target.value),
									className: "rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground/80 focus:border-royal focus:outline-none cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "featured",
											children: "Featured"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "price-low",
											children: "Price: Low to High"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "price-high",
											children: "Price: High to Low"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "rating",
											children: "Top Rated"
										})
									]
								})]
							})]
						}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonProductGrid, { count: 6 }) : filteredProducts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in",
							children: filteredProducts.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
								product: p,
								index: idx,
								onOpen: () => setSelected(p),
								onAdd: () => handleAddToCart(p, 1),
								onBuy: handleBuy
							}, p.id))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card py-20 px-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-16 w-16 place-items-center rounded-2xl bg-sky-soft text-royal mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-7 w-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-foreground",
									children: "No Products Found"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground max-w-sm",
									children: "We couldn't find any gadgets matching your filter criteria. Try resetting or adjustments."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleResetFilters,
									className: "mt-6 rounded-full bg-royal px-6 py-2.5 text-xs font-bold text-primary-foreground hover:bg-royal-deep transition-all",
									children: "Reset All Filters"
								})
							]
						})]
					})]
				})]
			}),
			isMobileFilterOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				onClose: () => setIsMobileFilterOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-6 max-h-[85vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-base font-bold text-foreground",
								children: "Filters"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									handleResetFilters();
									setIsMobileFilterOpen(false);
								},
								className: "text-xs font-bold text-royal",
								children: "Reset All"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Search"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search products...",
								value: searchVal,
								onChange: (e) => handleSearchChange(e.target.value),
								className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-royal focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Categories"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2",
								children: categories.map((c) => {
									const isSelected = selectedCategory === c.name;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleCategorySelect(c.name),
										className: `rounded-lg border px-3 py-2 text-center text-xs font-bold transition-all ${isSelected ? "border-royal bg-royal/10 text-royal" : "border-border bg-card text-foreground/80 hover:bg-sky-soft"}`,
										children: c.name
									}, c.name);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: "Price Range"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									placeholder: "Min Price",
									value: minPrice,
									onChange: (e) => setMinPrice(e.target.value),
									className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-royal focus:outline-none"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									placeholder: "Max Price",
									value: maxPrice,
									onChange: (e) => setMaxPrice(e.target.value),
									className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-xs focus:border-royal focus:outline-none"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsMobileFilterOpen(false),
							className: "mt-4 w-full rounded-full bg-royal py-3 text-sm font-bold text-primary-foreground hover:bg-royal-deep transition-all",
							children: "Apply Filters"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveVisitors, {}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductModal, {
				product: selected,
				onClose: () => setSelected(null),
				onAdd: (qty) => handleAddToCart(selected, qty),
				onBuy: () => handleBuy(selected)
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-gold" }), toast]
			})
		]
	});
}
//#endregion
export { Shop as component };
