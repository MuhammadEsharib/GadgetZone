import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react, u as QueryClient } from "../_libs/@clerk/react+[...].mjs";
import { _ as Link, b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as createRootRouteWithContext, h as createFileRoute, m as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as ClerkProvider, r as __exportAll } from "./Footer-CRWS6sk9.mjs";
import { b as Send, n as X, nt as Bot, p as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Fe } from "../_libs/react-hot-toast.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-ZOAslcwr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var styles_default = "/assets/styles-Clu3f5zI.css";
function AIChatbot() {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([{
		id: "welcome",
		text: "Assalamu Alaikum! Welcome to The Gadget Zone AI Assistant. How can I help you upgrade your lifestyle with smarter tech today?",
		sender: "bot",
		timestamp: /* @__PURE__ */ new Date()
	}]);
	const [inputText, setInputText] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	const [leadState, setLeadState] = (0, import_react.useState)("none");
	const [tempLead, setTempLead] = (0, import_react.useState)({
		name: "",
		phone: ""
	});
	const messagesEndRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);
	const saveLead = (name, phone) => {
		try {
			const existingLeadsRaw = localStorage.getItem("gz_leads");
			const leads = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
			leads.push({
				name,
				phone,
				timestamp: (/* @__PURE__ */ new Date()).toLocaleString()
			});
			localStorage.setItem("gz_leads", JSON.stringify(leads));
			console.log("Logged lead:", {
				name,
				phone
			});
		} catch (e) {
			console.error("Failed to save lead:", e);
		}
	};
	const getAIResponse = (input) => {
		const text = input.toLowerCase().trim();
		if (leadState === "ask_name") {
			setTempLead((prev) => ({
				...prev,
				name: input
			}));
			return {
				reply: `Thanks, ${input}! Now, please provide your Phone Number so our support team can contact you.`,
				nextState: "ask_phone"
			};
		}
		if (leadState === "ask_phone") {
			const finalName = tempLead.name;
			saveLead(finalName, input);
			setTempLead({
				name: "",
				phone: ""
			});
			return {
				reply: `Perfect! Thank you, ${finalName}. I've logged your request. Our support team will contact you at ${input} shortly. Is there anything else I can help you with?`,
				nextState: "none"
			};
		}
		if (text.includes("price") || text.includes("how much") || text.includes("cost") || text.includes("rs") || text.includes("rate")) return { reply: "Our premium smartwatches start from Rs. 4,500, earbuds from Rs. 2,900, and gaming headsets from Rs. 3,500. We also offer special discounts of up to 40% on select trending items!" };
		if (text.includes("delivery") || text.includes("shipping") || text.includes("karachi") || text.includes("pakistan") || text.includes("days") || text.includes("cod")) return { reply: "We offer Cash on Delivery (COD) across Pakistan! Delivery inside Karachi takes 1-2 business days. For other cities (Lahore, Islamabad, etc.), it takes 3-4 business days. Delivery is FREE for orders above Rs. 5,000!" };
		if (text.includes("warranty") || text.includes("guarantee") || text.includes("original") || text.includes("authentic") || text.includes("copy")) return { reply: "All our products are 100% authentic and original brand items (no replicas). We provide a 7-day hassle-free checking warranty and a 6-month product warranty on all premium gadgets." };
		if (text.includes("return") || text.includes("refund") || text.includes("exchange") || text.includes("replace")) return { reply: "We offer a 7-day direct return and exchange policy! If you receive a damaged or incorrect device, just contact our support helpline for a quick exchange/refund." };
		if (text.includes("location") || text.includes("shop") || text.includes("where") || text.includes("address") || text.includes("outlet")) return { reply: "You can visit our outlet at: Shop #B-172, Alhaseeb Residency, Quetta Town, Sector 18-A, Gulzar-e-Hijri, Scheme 33, Karachi. We're open from 12 PM to 10 PM daily!" };
		if (text.includes("contact") || text.includes("phone") || text.includes("whatsapp") || text.includes("number") || text.includes("call")) return { reply: "You can call or WhatsApp our team directly at 0342-0024369 or 0332-2205842. We're here to help!" };
		if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("salam") || text.includes("aora") || text.includes("yo")) return { reply: "Assalamu Alaikum! Welcome back. How can I help you navigate our tech categories or products today?" };
		return {
			reply: "I'd be happy to have our support representative contact you directly to help you with that! Could you please tell me your Name first?",
			nextState: "ask_name"
		};
	};
	const handleSend = () => {
		if (!inputText.trim()) return;
		const userMessage = {
			id: `msg-${Date.now()}-user`,
			text: inputText,
			sender: "user",
			timestamp: /* @__PURE__ */ new Date()
		};
		setMessages((prev) => [...prev, userMessage]);
		setInputText("");
		setIsTyping(true);
		setTimeout(() => {
			const { reply, nextState } = getAIResponse(userMessage.text);
			if (nextState) setLeadState(nextState);
			const botMessage = {
				id: `msg-${Date.now()}-bot`,
				text: reply,
				sender: "bot",
				timestamp: /* @__PURE__ */ new Date()
			};
			setMessages((prev) => [...prev, botMessage]);
			setIsTyping(false);
		}, 1200);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setIsOpen((prev) => !prev),
		"aria-expanded": isOpen,
		"aria-controls": "zone-ai-assistant",
		className: "group fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-royal/30 bg-[#051124] text-white shadow-[0_8px_30px_rgba(98,157,250,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16",
		"aria-label": "Toggle AI Assistant",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-royal/20 animate-ping opacity-75 group-hover:bg-royal/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-1 rounded-full border border-dashed border-royal/40 animate-[spin_15s_linear_infinite]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-2 rounded-full bg-gradient-to-tr from-royal via-royal-deep to-[#629dfa] opacity-95 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-inner",
				children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6 transition-transform duration-300 rotate-90" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 24 24",
						className: "h-6 w-6 text-white animate-pulse",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M12 2v20M12 12h10M12 12H2M12 12l7-7M12 12L5 5M12 12l7 7M12 12l-7 7",
								strokeWidth: "0.75",
								strokeOpacity: "0.3",
								strokeDasharray: "2,2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M12 4C9.5 4 7.5 5.8 7.5 8c0 1 .5 2 1.2 2.7-.8.5-1.2 1.3-1.2 2.3 0 1.5 1.2 2.8 2.8 2.8.2 0 .4 0 .6-.1.2.6.8 1.1 1.6 1.1.5 0 1-.2 1.3-.6.5.4 1.2.6 1.8.6h.4",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M12 4c2.5 0 4.5 1.8 4.5 4c0 1-.5 2-1.2 2.7.8.5 1.2 1.3 1.2 2.3 0 1.5-1.2 2.8-2.8 2.8-.2 0-.4 0-.6-.1-.2.6-.8 1.1-1.6 1.1-.5 0-1-.2-1.3-.6-.5.4-1.2.6-1.8.6h-.4",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "12",
								cy: "4",
								r: "0.75",
								fill: "#FFC400",
								className: "animate-ping"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "7.5",
								cy: "8",
								r: "0.75",
								fill: "#FFC400"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "16.5",
								cy: "8",
								r: "0.75",
								fill: "#FFC400"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "6.3",
								cy: "13",
								r: "0.75",
								fill: "#629dfa"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "17.7",
								cy: "13",
								r: "0.75",
								fill: "#629dfa"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "9.5",
								cy: "17.6",
								r: "0.75",
								fill: "#FFC400"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "14.5",
								cy: "17.6",
								r: "0.75",
								fill: "#FFC400"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "12",
								cy: "12",
								r: "1",
								fill: "#fff"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "absolute -top-1.5 -right-1.5 h-3.5 w-3.5 text-[#FFC400] animate-bounce" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute right-18 scale-0 rounded bg-slate-950/90 border border-white/10 px-3 py-1.5 text-xs font-extrabold text-white transition-all duration-200 group-hover:scale-100 whitespace-nowrap shadow-md",
				children: "Chat with AI Assistant"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "zone-ai-assistant",
		role: "dialog",
		"aria-modal": "false",
		"aria-label": "Zone AI Assistant",
		"aria-hidden": !isOpen,
		className: `fixed bottom-20 right-4 z-50 flex h-[min(500px,calc(100dvh-6rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#051124]/95 text-white shadow-2xl backdrop-blur-md transition-all duration-500 sm:bottom-24 sm:right-6 sm:w-[380px] ${isOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-8 scale-95 pointer-events-none"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-gradient-to-r from-royal/50 to-royal-deep/50 px-5 py-4 border-b border-white/10 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-royal/20 border border-royal/30 text-[#FFC400]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 24 24",
								className: "h-5.5 w-5.5 text-white animate-pulse",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 2v20M12 12h10M12 12H2M12 12l7-7M12 12L5 5M12 12l7 7M12 12l-7 7",
										strokeWidth: "0.75",
										strokeOpacity: "0.3",
										strokeDasharray: "2,2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 4C9.5 4 7.5 5.8 7.5 8c0 1 .5 2 1.2 2.7-.8.5-1.2 1.3-1.2 2.3 0 1.5 1.2 2.8 2.8 2.8.2 0 .4 0 .6-.1.2.6.8 1.1 1.6 1.1.5 0 1-.2 1.3-.6.5.4 1.2.6 1.8.6h.4",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 4c2.5 0 4.5 1.8 4.5 4c0 1-.5 2-1.2 2.7.8.5 1.2 1.3 1.2 2.3 0 1.5-1.2 2.8-2.8 2.8-.2 0-.4 0-.6-.1-.2.6-.8 1.1-1.6 1.1-.5 0-1-.2-1.3-.6-.5.4-1.2.6-1.8.6h-.4",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "12",
										cy: "4",
										r: "0.75",
										fill: "#FFC400",
										className: "animate-ping"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "7.5",
										cy: "8",
										r: "0.75",
										fill: "#FFC400"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "16.5",
										cy: "8",
										r: "0.75",
										fill: "#FFC400"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "6.3",
										cy: "13",
										r: "0.75",
										fill: "#629dfa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "17.7",
										cy: "13",
										r: "0.75",
										fill: "#629dfa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "9.5",
										cy: "17.6",
										r: "0.75",
										fill: "#FFC400"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "14.5",
										cy: "17.6",
										r: "0.75",
										fill: "#FFC400"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "12",
										cy: "12",
										r: "1",
										fill: "#fff"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#051124]" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display font-bold text-sm",
							children: "Zone AI Assistant"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-[#FFC400]" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-white/50 font-semibold tracking-wide",
						children: "24/7 Smart Support"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIsOpen(false),
					"aria-label": "Close AI Assistant",
					title: "Close AI Assistant",
					className: "rounded-full h-8 w-8 grid place-items-center bg-white/5 hover:bg-white/10 transition-colors border border-white/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none",
				children: [
					messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex gap-2.5 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`,
						children: [msg.sender !== "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-royal/20 border border-royal/30 text-[#FFC400]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed ${msg.sender === "user" ? "bg-royal text-white rounded-tr-none shadow-md" : "bg-white/5 border border-white/5 text-white/90 rounded-tl-none"}`,
							children: msg.text
						})]
					}, msg.id)),
					isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2.5 max-w-[85%] mr-auto items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-royal/20 border border-royal/30 text-[#FFC400]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-white/50" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:0.2s]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:0.4s]" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 border-t border-white/10 bg-slate-950/20 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					"aria-label": "Message for Zone AI Assistant",
					type: "text",
					value: inputText,
					onChange: (e) => setInputText(e.target.value),
					onKeyDown: (e) => e.key === "Enter" && handleSend(),
					placeholder: leadState === "ask_name" ? "Enter your name..." : leadState === "ask_phone" ? "Enter your phone number..." : "Ask about price, delivery, warranty...",
					className: "flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-royal/50 transition-colors text-white placeholder-white/30"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSend,
					className: "rounded-xl bg-royal text-primary-foreground px-4 py-2.5 transition-colors hover:bg-royal-deep grid place-items-center shadow-md shadow-royal/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			})
		]
	})] });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$13 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "The Gadget Zone — Enhancing Your Life Style" },
			{
				name: "description",
				content: "Premium gadgets and smart technology in Karachi. Earbuds, smart watches, headphones and more."
			},
			{
				name: "author",
				content: "The Gadget Zone"
			},
			{
				property: "og:title",
				content: "The Gadget Zone — Enhancing Your Life Style"
			},
			{
				property: "og:description",
				content: "Premium gadgets and smart technology in Karachi."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            ` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("body", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClerkProvider, { children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fe, {
				position: "bottom-right",
				toastOptions: { duration: 4e3 }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] }) })]
	});
}
function RootComponent() {
	const { queryClient } = Route$13.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIChatbot, {})]
	});
}
var $$splitComponentImporter$12 = () => import("./routes-BUydPQgE.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "The Gadget Zone — Premium Gadgets & Smart Tech in Karachi" },
		{
			name: "description",
			content: "Shop earbuds, smart watches, headphones, speakers and power banks at The Gadget Zone. Enhancing your life style with smarter gadgets."
		},
		{
			property: "og:title",
			content: "The Gadget Zone — Premium Gadgets & Smart Tech"
		},
		{
			property: "og:description",
			content: "Discover the latest gadgets and smart technology designed to make everyday life easier."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./about-DHZ3sPhn.mjs");
var Route$11 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./account-C9nZz38C.mjs");
var Route$10 = createFileRoute("/account")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./cart-ClDljykZ.mjs");
var Route$9 = createFileRoute("/cart")({
	head: () => ({ meta: [{ title: "Your Cart — The Gadget Zone" }, {
		name: "description",
		content: "Review your cart items, check prices and complete your purchase at The Gadget Zone."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./categories-Ccv_c42d.mjs");
var Route$8 = createFileRoute("/categories")({
	head: () => ({ meta: [{ title: "Shop by Category — The Gadget Zone" }, {
		name: "description",
		content: "Browse all gadget categories at The Gadget Zone. Find earbuds, smart watches, headphones, speakers, power banks and more."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./checkout-BqtKsc5-.mjs");
var Route$7 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout — The Gadget Zone" }, {
		name: "description",
		content: "Secure checkout. Finalize your gadget order at The Gadget Zone."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./contact-C5u_dSuz.mjs");
var Route$6 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./deals-BNanSXKs.mjs");
var Route$5 = createFileRoute("/deals")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./faq-ByK1YEHS.mjs");
var Route$4 = createFileRoute("/faq")({
	head: () => ({ meta: [{ title: "FAQs — The Gadget Zone" }, {
		name: "description",
		content: "Find quick answers about ordering, delivery, payments, warranties, and support at The Gadget Zone."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./shop-CAX73yLB.mjs");
var shopSearchSchema = objectType({
	search: stringType().optional().catch(""),
	category: stringType().optional().catch("")
});
var Route$3 = createFileRoute("/shop")({
	validateSearch: (search) => shopSearchSchema.parse(search),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./wishlist-CtE871kD.mjs");
var Route$2 = createFileRoute("/wishlist")({
	head: () => ({ meta: [{ title: "Your Wishlist — The Gadget Zone" }, {
		name: "description",
		content: "View your saved items and favorite gadgets at The Gadget Zone."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./sign-in._-DIfGDrqJ.mjs");
var Route$1 = createFileRoute("/sign-in/$")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./sign-up._-Bf78as2X.mjs");
var Route = createFileRoute("/sign-up/$")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$12.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$13
	}),
	AboutRoute: Route$11.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$13
	}),
	AccountRoute: Route$10.update({
		id: "/account",
		path: "/account",
		getParentRoute: () => Route$13
	}),
	CartRoute: Route$9.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => Route$13
	}),
	CategoriesRoute: Route$8.update({
		id: "/categories",
		path: "/categories",
		getParentRoute: () => Route$13
	}),
	CheckoutRoute: Route$7.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$13
	}),
	ContactRoute: Route$6.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$13
	}),
	DealsRoute: Route$5.update({
		id: "/deals",
		path: "/deals",
		getParentRoute: () => Route$13
	}),
	FaqRoute: Route$4.update({
		id: "/faq",
		path: "/faq",
		getParentRoute: () => Route$13
	}),
	ShopRoute: Route$3.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$13
	}),
	WishlistRoute: Route$2.update({
		id: "/wishlist",
		path: "/wishlist",
		getParentRoute: () => Route$13
	}),
	SignInSplatRoute: Route$1.update({
		id: "/sign-in/$",
		path: "/sign-in/$",
		getParentRoute: () => Route$13
	}),
	SignUpSplatRoute: Route.update({
		id: "/sign-up/$",
		path: "/sign-up/$",
		getParentRoute: () => Route$13
	})
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route$3 as n, router_exports as t };
