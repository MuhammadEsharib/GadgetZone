import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { a as dist_exports, n as Navbar, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { r as SignIn$1 } from "./uiComponents-D4xEMHL2.mjs";
import { I as LogOut, O as Package, Z as CircleCheck, _ as ShoppingBag, i as User, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as LiveVisitors } from "./LiveVisitors-BGuUhSx6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-C9nZz38C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function Account() {
	const [cart, setCart] = (0, import_react.useState)(0);
	const [toast, setToast] = (0, import_react.useState)(null);
	const { user: clerkUser, isLoaded: isUserLoaded } = (0, dist_exports.useUser)();
	const { isSignedIn, isLoaded: isAuthLoaded } = (0, dist_exports.useAuth)();
	const { signOut } = (0, dist_exports.useClerk)();
	const user = clerkUser ? {
		name: clerkUser.fullName || clerkUser.username || "Customer",
		email: clerkUser.primaryEmailAddress?.emailAddress || ""
	} : null;
	const [forgotMode, setForgotMode] = (0, import_react.useState)(false);
	const [forgotEmail, setForgotEmail] = (0, import_react.useState)("");
	const [forgotSent, setForgotSent] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const notify = (0, import_react.useCallback)((message) => setToast(message), []);
	(0, import_react.useEffect)(() => {
		const storedCart = Number(localStorage.getItem("cart"));
		if (Number.isFinite(storedCart) && storedCart >= 0) setCart(Math.floor(storedCart));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = setTimeout(() => setToast(null), 2200);
		return () => clearTimeout(id);
	}, [toast]);
	const handleSignOut = async () => {
		await signOut();
		notify("Signed out successfully.");
	};
	const [orders, setOrders] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem("gz_orders");
			if (raw) setOrders(JSON.parse(raw));
			else setOrders([{
				id: "GZ-9283",
				date: "Aug 15, 2026",
				product: "Wireless Pro Earbuds",
				price: "Rs. 7,999",
				status: "Delivered"
			}, {
				id: "GZ-8712",
				date: "Aug 02, 2026",
				product: "Smart Watch Series 9",
				price: "Rs. 12,499",
				status: "Delivered"
			}]);
		} catch {
			setOrders([]);
		}
	}, [clerkUser]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount: cart,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pt-24 sm:pt-28 md:pt-32" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8",
				children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-fade-in space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between border-b border-border/60 pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-3xl font-extrabold text-royal-deep",
							children: [
								"Welcome back, ",
								user.name,
								"!"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1",
							children: user.email
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleSignOut,
							className: "mt-4 self-start rounded-full border border-royal/30 px-5 py-2.5 text-xs font-bold text-royal transition-colors hover:bg-royal/10 md:mt-0 inline-flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign Out"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-8 lg:grid-cols-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-foreground",
									children: "Membership Profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-12 w-12 place-items-center rounded-full bg-sky-soft text-royal",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-6 w-6" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-bold text-foreground",
										children: user.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1 inline-flex items-center gap-1 rounded-full border border-royal/15 bg-royal/10 px-2.5 py-0.5 text-[10px] font-bold text-royal",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), " Pro Member"]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border/50 pt-4 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Account Type:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: "Customer"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Member Since:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground",
												children: "August 2026"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Tech Drops Access:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-emerald-500",
												children: "Enabled"
											})]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/80 bg-card p-6 shadow-sm lg:col-span-2 space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-lg font-bold text-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5 text-royal" }), " Order History"]
							}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-3 py-10 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-10 w-10 text-muted-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "No orders yet. Place your first order!"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center justify-between border border-border/60 rounded-xl p-4 hover:border-royal/20 transition-all bg-sky-hero/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-royal",
												children: order.id
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-muted-foreground",
												children: ["• ", order.date]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-sm font-bold text-foreground line-clamp-1",
											children: order.product
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-extrabold text-foreground",
											children: order.price
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold border ${order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/10" : order.status === "Pending Processing" ? "bg-amber-500/10 text-amber-500 border-amber-500/10" : "bg-blue-500/10 text-blue-500 border-blue-500/10"}`,
											children: order.status
										})]
									})]
								}, order.id))
							})]
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 border border-border/80 bg-card rounded-3xl overflow-hidden shadow-md max-w-5xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 bg-sky-hero text-primary-foreground p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl bg-opacity-70 rounded-2xl border border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-16 -top-16 w-48 h-48 rounded-full border border-white/5 pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-8 -top-8 w-32 h-32 rounded-full border border-dashed border-white/10 pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[10%] bottom-[10%] w-24 h-24 rounded-full border border-dotted border-white/5 pointer-events-none animate-pulse" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "z-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), " Secure Gate"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-12 lg:mt-0 z-10 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-3xl font-extrabold leading-tight",
									children: [
										"Enhance Your ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Lifestyle"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-primary-foreground/75 leading-relaxed font-medium",
									children: "Create a profile to unlock faster checkouts, track delivery orders, save favorite gadgets, and claim limited member-only deals."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-12 lg:mt-0 border-t border-white/10 pt-6 z-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-primary-foreground/50",
									children: "© 2026 The Gadget Zone Security Portal. All connections are encrypted."
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-7 p-4 sm:p-8 flex items-center justify-center bg-card min-h-[500px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignIn$1, {
							routing: "path",
							path: "/account",
							signUpUrl: "/sign-up"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveVisitors, {}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-sky-hero px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-gold" }), toast]
			})
		]
	});
}
//#endregion
export { Account as component };
