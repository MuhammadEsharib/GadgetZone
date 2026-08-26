import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Navbar, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { $ as ChevronDown, M as MessageCircle, X as CircleQuestionMark, it as ArrowRight, o as Truck, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as LiveVisitors } from "./LiveVisitors-BGuUhSx6.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-ByK1YEHS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var faqGroups = [
	{
		title: "Orders and delivery",
		icon: Truck,
		questions: [
			{
				question: "How long does delivery take?",
				answer: "Orders usually arrive within 2 to 4 business days. Delivery times can vary slightly by location, and our team will share updates when your order is on the way."
			},
			{
				question: "Do you deliver across Pakistan?",
				answer: "Yes. We deliver nationwide from our Karachi hub. Enter your complete address and contact number at checkout so the courier can reach you without delays."
			},
			{
				question: "How can I track my order?",
				answer: "Once your order is dispatched, contact our support desk on 0342 0024369 for the latest courier update and delivery status."
			}
		]
	},
	{
		title: "Products and payments",
		icon: ShieldCheck,
		questions: [
			{
				question: "Are your products original?",
				answer: "We source authentic products and check each item before listing it. Product details, condition, and included accessories are shown on the product page."
			},
			{
				question: "What payment methods do you accept?",
				answer: "Payment options are confirmed by our team when your order is placed. For help choosing an option, contact us through WhatsApp or the contact form."
			},
			{
				question: "Do products include a warranty?",
				answer: "Warranty coverage depends on the product. Check the product details or ask our support team before ordering so we can confirm the exact coverage."
			}
		]
	},
	{
		title: "Returns and support",
		icon: CircleQuestionMark,
		questions: [
			{
				question: "What if my order arrives damaged?",
				answer: "Contact us as soon as possible with your order number and clear photos of the packaging and item. We will review the issue and guide you through the next step."
			},
			{
				question: "Can I get help setting up my gadget?",
				answer: "Yes. Our Karachi support desk can help with setup, pairing, and basic troubleshooting for the products we sell."
			},
			{
				question: "Can I change or cancel an order?",
				answer: "Please contact us quickly after placing the order. We can check whether it has been dispatched and tell you what options are still available."
			}
		]
	}
];
function FaqPage() {
	const { cartCount } = useCart();
	const [toast, setToast] = (0, import_react.useState)(null);
	const notify = (0, import_react.useCallback)((message) => setToast(message), []);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const timeout = setTimeout(() => setToast(null), 2400);
		return () => clearTimeout(timeout);
	}, [toast]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {
				cartCount,
				onNotify: notify
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative isolate overflow-hidden bg-royal-deep px-4 pb-14 pt-28 text-primary-foreground sm:px-6 sm:pt-32 lg:px-8 lg:pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(98,157,250,0.45),transparent_38%),linear-gradient(135deg,#0B2545,#134074_55%,#2F73D9)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full border border-white/10 sm:h-96 sm:w-96" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-4xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm text-white/65",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "transition-colors hover:text-white",
									children: "Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white",
									children: "FAQs"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC400]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-3.5 w-3.5" }), " Quick answers"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-5 font-display text-[clamp(2.5rem,7vw,4.75rem)] font-extrabold leading-[0.98]",
									children: "Questions, made simpler."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base",
									children: "Find straightforward answers about delivery, product quality, payments, and support before you place an order."
								})
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(13rem,0.7fr)_minmax(0,1.5fr)] lg:gap-20 lg:px-8 lg:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:sticky lg:top-28 lg:self-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.18em] text-royal",
							children: "Need to know?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-2xl font-extrabold text-royal-deep sm:text-3xl",
							children: "Everything important, in one place."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: "Open any question to see the details. If you need an answer tailored to your order, our local support team is only a message away."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-royal px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-royal-deep",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Contact support"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-10",
					children: [faqGroups.map(({ title, icon: Icon, questions }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-labelledby": `faq-${title}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid h-9 w-9 place-items-center rounded-xl bg-royal/10 text-royal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								id: `faq-${title}`,
								className: "font-display text-lg font-bold text-royal-deep",
								children: title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
							type: "single",
							collapsible: true,
							className: "border-t border-border/70",
							children: questions.map(({ question, answer }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
								value: `${title}-${index}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
									className: "py-5 text-left text-sm font-bold text-foreground hover:no-underline sm:text-base",
									children: question
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
									className: "max-w-2xl text-sm leading-relaxed text-muted-foreground",
									children: answer
								})]
							}, question))
						})]
					}, title)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 rounded-2xl border border-royal/15 bg-sky-soft/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-base font-bold text-royal-deep",
							children: "Still have a question?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "We are happy to help with a product or existing order."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "inline-flex shrink-0 items-center gap-2 text-sm font-bold text-royal transition-colors hover:text-royal-deep",
							children: ["Get in touch ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					})]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveVisitors, {}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-5 right-4 z-[70] rounded-full bg-royal-deep px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)] sm:right-6",
				children: toast
			})
		]
	});
}
//#endregion
export { FaqPage as component };
