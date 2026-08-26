import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { n as Navbar, t as Footer } from "./Footer-CRWS6sk9.mjs";
import { E as Phone, F as Mail, M as MessageCircle, P as MapPin, Y as Clock, Z as CircleCheck, b as Send } from "../_libs/lucide-react.mjs";
import { t as LiveVisitors } from "./LiveVisitors-BGuUhSx6.mjs";
import { t as useCart } from "./cartStore-4dYXsEiH.mjs";
import { n as postData } from "./api-Dp3V1yym.mjs";
import { n as zt } from "../_libs/react-hot-toast.mjs";
import { t as S } from "../_libs/marsidev__react-turnstile.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-C5u_dSuz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ContactForm({ onSuccess }) {
	const [fields, setFields] = (0, import_react.useState)({
		name: "",
		email: "",
		subject: "",
		message: "",
		website: ""
	});
	const [token, setToken] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const update = (key, value) => setFields((current) => ({
		...current,
		[key]: value
	}));
	const submit = async (event) => {
		event.preventDefault();
		if (fields.website) return;
		if (!token) return setStatus("Please complete the captcha.");
		setLoading(true);
		setStatus(null);
		const toastId = zt.loading("Sending your message...");
		try {
			await postData("/api/contact", {
				name: fields.name,
				email: fields.email,
				message: `Subject: ${fields.subject}\n\n${fields.message}`,
				turnstileToken: token,
				website: fields.website
			});
			zt.success("Message sent successfully.", { id: toastId });
			setFields({
				name: "",
				email: "",
				subject: "",
				message: "",
				website: ""
			});
			setToken("");
			onSuccess();
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unable to send your message.";
			zt.error(message, { id: toastId });
			setStatus(message);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				tabIndex: -1,
				autoComplete: "off",
				"aria-hidden": "true",
				value: fields.website,
				onChange: (event) => update("website", event.target.value),
				className: "absolute -left-[9999px] h-px w-px",
				name: "website"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-1.5 text-xs font-bold text-foreground/80",
					children: ["Full Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: fields.name,
						onChange: (event) => update("name", event.target.value),
						placeholder: "Your Name",
						className: "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-normal focus:border-royal focus:outline-none focus:ring-1 focus:ring-royal"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "space-y-1.5 text-xs font-bold text-foreground/80",
					children: ["Email Address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "email",
						value: fields.email,
						onChange: (event) => update("email", event.target.value),
						placeholder: "yourname@domain.com",
						className: "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-normal focus:border-royal focus:outline-none focus:ring-1 focus:ring-royal"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5 text-xs font-bold text-foreground/80",
				children: ["Subject", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: fields.subject,
					onChange: (event) => update("subject", event.target.value),
					placeholder: "How can we help you?",
					className: "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-normal focus:border-royal focus:outline-none focus:ring-1 focus:ring-royal"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5 text-xs font-bold text-foreground/80",
				children: ["Message Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					required: true,
					rows: 5,
					value: fields.message,
					onChange: (event) => update("message", event.target.value),
					placeholder: "Detail your inquiry here...",
					className: "w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-normal focus:border-royal focus:outline-none focus:ring-1 focus:ring-royal"
				})]
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
				onSuccess: setToken,
				onError: () => setStatus("Captcha failed to load. Please refresh and try again.")
			}),
			status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs font-bold text-destructive",
				children: status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "submit",
				disabled: loading,
				className: "flex items-center justify-center gap-2 rounded-full bg-royal px-6 py-3.5 text-xs font-bold text-primary-foreground transition-all hover:bg-royal-deep disabled:cursor-not-allowed disabled:opacity-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" }), loading ? "Sending..." : "Send Message"]
			})
		]
	});
}
function Contact() {
	const { cartCount } = useCart();
	const [toast, setToast] = (0, import_react.useState)(null);
	const [isSuccessOpen, setIsSuccessOpen] = (0, import_react.useState)(false);
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
				className: "mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-royal/10 border border-royal/20 px-3.5 py-1 text-[10px] font-bold text-royal uppercase tracking-wider",
							children: "Contact Desk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-4xl font-extrabold text-royal-deep sm:text-5xl",
							children: "Get in Touch"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground max-w-md mx-auto",
							children: "Have questions about a product, warranty, or delivery? Reach out and we'll reply shortly."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-5 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/80 bg-card p-6 shadow-sm space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold text-foreground",
									children: "Karachi Store Info"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
														children: "Phone Call"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm font-bold text-foreground",
														children: "0342 0024369"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: "Usama Bin Abid"
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
													children: "Email Support"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-bold text-foreground",
													children: "thegadgetzone70@gmail.com"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
													children: "Storefront Address"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-foreground leading-relaxed font-bold",
													children: "Shop #B-172, Alhaseeb Residency, Quetta Town, Sector 18-A, Gulzar-e-Hijri, Scheme 33, Karachi"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-soft text-royal border border-royal/10",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
														children: "Operating Hours"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-foreground",
														children: "Mon — Sat: 11:00 AM – 9:00 PM"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-muted-foreground",
														children: "Closed on Sundays"
													})
												]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://wa.me/923420024369",
									target: "_blank",
									rel: "noreferrer",
									className: "mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white py-3 text-xs font-bold transition-all shadow-[0_4px_15px_rgba(16,185,129,0.2)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4.5 w-4.5" }), " Chat on WhatsApp"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-sky-soft/40 border border-border/60 p-6 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-display text-sm font-bold text-foreground",
								children: "Visiting Us?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: "If you are arriving via the Karachi Lyari Expressway or Superhighway (M-9), take the Gulzar-e-Hijri exit. Alhaseeb Residency is located right in Quetta Town Sector 18-A. Customer parking is accessible directly in front of the storefront."
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold text-foreground mb-6",
							children: "Send a Message"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, { onSuccess: () => setIsSuccessOpen(true) })]
					})]
				})]
			}),
			isSuccessOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
				onClose: () => setIsSuccessOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md p-10 text-center mx-auto space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-9 w-9" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-extrabold text-foreground",
							children: "Message Sent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: "Thank you for contacting us. Your ticket has been logged. A support representative will follow up via email within 4 hours."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsSuccessOpen(false),
							className: "mt-4 w-full rounded-full bg-royal px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-royal-deep",
							children: "Close"
						})
					]
				})
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
function Overlay({ children, onClose }) {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => e.key === "Escape" && onClose();
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "relative my-auto w-full max-w-md rounded-3xl bg-card shadow-[0_30px_70px_-30px_rgba(5,17,36,0.3)] border border-border",
			children
		})
	});
}
//#endregion
export { Contact as component };
