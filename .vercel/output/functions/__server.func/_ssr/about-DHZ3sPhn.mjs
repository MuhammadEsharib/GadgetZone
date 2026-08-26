import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { n as Navbar, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { W as Headphones, Z as CircleCheck, o as Truck, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as LiveVisitors } from "./LiveVisitors-BGuUhSx6.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DHZ3sPhn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function About() {
	const { cartCount } = useCart();
	const [toast, setToast] = (0, import_react.useState)(null);
	const notify = (0, import_react.useCallback)((message) => setToast(message), []);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = setTimeout(() => setToast(null), 2200);
		return () => clearTimeout(id);
	}, [toast]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pt-24 sm:pt-28 md:pt-32" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-4xl space-y-16 px-4 pb-24 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "text-center space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-royal/10 border border-royal/20 px-3.5 py-1 text-[10px] font-bold text-royal uppercase tracking-wider",
								children: "Our Story"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl font-extrabold text-royal-deep sm:text-6xl tracking-tight",
								children: "We are The Gadget Zone"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base text-muted-foreground max-w-xl mx-auto leading-relaxed font-medium",
								children: "Based in Karachi, Pakistan, we curate premium smart technology and high-quality accessories designed to enhance your everyday lifestyle."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/60 pt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold text-foreground",
								children: "A Mission of Smart Living"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: "Founded in 2026, The Gadget Zone set out to bridge the gap between premium international smart gadgets and tech enthusiasts in Pakistan. We understand that tech is no longer just a hobby; it is a vital companion to daily productivity, fitness, and lifestyle optimization."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold text-foreground",
								children: "Rigorous Quality Standards"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted-foreground",
								children: "Unlike generic catalog stores, every earbud, smartwatch, speaker, or charger featured in our store is handpicked and thoroughly tested by our engineering squad. We verify real-world battery cycles, audio latency, snappiness, and durability before listing them on our platform."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-8 border-t border-border/60 pt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-bold text-foreground text-center",
							children: "Our Operating Pillars"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border/50",
							children: [
								{
									icon: ShieldCheck,
									title: "100% Original Products",
									desc: "We work directly with manufacturer partners to source authentic inventory. Zero replicas, clone models, or second-hand items. You receive exactly what is printed on the package."
								},
								{
									icon: Truck,
									title: "Swift Nationwide Delivery",
									desc: "Dispatched straight from our Karachi hub in Scheme 33, our delivery system works with premium courier networks to guarantee safe transit and quick arrivals to your door across Pakistan."
								},
								{
									icon: Headphones,
									title: "Reliable Post-Purchase Support",
									desc: "Have inquiries about setups or Bluetooth pairing? Our local support desk in Karachi is open for instant support. Give us a ring or reach out on WhatsApp for friendly diagnostic help."
								}
							].map((pillar, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row gap-4 sm:gap-8 py-6 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(pillar.icon, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-base font-bold text-foreground",
										children: pillar.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: pillar.desc
									})]
								})]
							}, idx))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl bg-sky-soft/40 border border-border/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold text-foreground",
								children: "Karachi Hub Frontline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground max-w-md leading-relaxed",
								children: "Our central office, inventory warehouse, and localized service desk are based in Gulzar-e-Hijri, Scheme 33. We welcome you to experience high-quality tech in-hand or consult about wholesale shipments."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "shrink-0 flex gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl font-extrabold text-royal font-display",
										children: "24k+"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-muted-foreground uppercase",
										children: "Gadgets Shipped"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "border-l border-border h-10 self-center" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-3xl font-extrabold text-royal font-display",
										children: "99.8%"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-muted-foreground uppercase",
										children: "Satisfaction Rate"
									})]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveVisitors, {}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-6 right-6 z-[70] flex items-center gap-2.5 rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-gold" }), toast]
			})
		]
	});
}
//#endregion
export { About as component };
