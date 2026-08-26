import { i as __toESM } from "../_runtime.mjs";
import { t as getStartContext } from "./async-local-storage-C5fJChCT.mjs";
import { n as getPublicEnvVariables, r as isClient } from "./env-DI7zWkSp.mjs";
import { f as require_jsx_runtime, n as getToken, p as require_react, r as InternalClerkProvider, t as dist_exports$1 } from "../_libs/@clerk/react+[...].mjs";
import { _ as Link, l as useLocation, p as ScriptOnce, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as htmlSafeJson } from "../_libs/clerk__shared.mjs";
import { a as UserProfile$1, i as SignUp$1, n as OrganizationProfile$1, r as SignIn$1, t as OrganizationList$1 } from "./uiComponents-D4xEMHL2.mjs";
import { A as Moon, D as Percent, E as Phone, L as LayoutGrid, N as Menu, P as MapPin, U as Heart, _ as ShoppingBag, g as ShoppingCart, i as User, k as Music2, n as X, p as Sparkles, t as Youtube, u as Sun, x as Search, z as Instagram } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ClerkProvider-DUDYndMc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var getGlobalStartContext = () => {
	const context = getStartContext().contextAfterGlobalMiddlewares;
	if (!context) throw new Error(`Global context not set yet, you are calling getGlobalStartContext() before the global middlewares are applied.`);
	return context;
};
var ClerkOptionsCtx = import_react.createContext(void 0);
ClerkOptionsCtx.displayName = "ClerkOptionsCtx";
var ClerkOptionsProvider = (props) => {
	const { children, options } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClerkOptionsCtx.Provider, {
		value: { value: options },
		children
	});
};
var useAwaitableNavigate = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const resolveFunctionsRef = import_react.useRef([]);
	const resolveAll = () => {
		resolveFunctionsRef.current.forEach((resolve) => resolve());
		resolveFunctionsRef.current.splice(0, resolveFunctionsRef.current.length);
	};
	const [_, startTransition] = (0, import_react.useTransition)();
	import_react.useEffect(() => {
		resolveAll();
	}, [location]);
	return (options) => {
		return new Promise((res) => {
			startTransition(() => {
				resolveFunctionsRef.current.push(res);
				res(navigate(options));
			});
		});
	};
};
var pickFromClerkInitState = (clerkInitState) => {
	const { __clerk_ssr_state, __publishableKey, __proxyUrl, __domain, __isSatellite, __signInUrl, __signUpUrl, __clerkJSUrl, __clerkJSVersion, __clerkUIUrl, __clerkUIVersion, __telemetryDisabled, __telemetryDebug, __unsafeDisableDevelopmentModeConsoleWarning, __signInForceRedirectUrl, __signUpForceRedirectUrl, __signInFallbackRedirectUrl, __signUpFallbackRedirectUrl, __keylessClaimUrl, __keylessApiKeysUrl, __prefetchUI } = clerkInitState || {};
	return {
		clerkSsrState: __clerk_ssr_state,
		publishableKey: __publishableKey,
		proxyUrl: __proxyUrl,
		domain: __domain,
		isSatellite: !!__isSatellite,
		signInUrl: __signInUrl,
		signUpUrl: __signUpUrl,
		__internal_clerkJSUrl: __clerkJSUrl,
		__internal_clerkJSVersion: __clerkJSVersion,
		__internal_clerkUIUrl: __clerkUIUrl,
		__internal_clerkUIVersion: __clerkUIVersion,
		prefetchUI: __prefetchUI,
		telemetry: {
			disabled: __telemetryDisabled,
			debug: __telemetryDebug
		},
		unsafe_disableDevelopmentModeConsoleWarning: __unsafeDisableDevelopmentModeConsoleWarning,
		signInForceRedirectUrl: __signInForceRedirectUrl,
		signUpForceRedirectUrl: __signUpForceRedirectUrl,
		signInFallbackRedirectUrl: __signInFallbackRedirectUrl,
		signUpFallbackRedirectUrl: __signUpFallbackRedirectUrl,
		__keylessClaimUrl,
		__keylessApiKeysUrl
	};
};
var mergeWithPublicEnvs = (restInitState) => {
	const envVars = getPublicEnvVariables();
	return {
		...restInitState,
		publishableKey: restInitState.publishableKey || envVars.publishableKey,
		domain: restInitState.domain || envVars.domain,
		isSatellite: restInitState.isSatellite || envVars.isSatellite,
		signInUrl: restInitState.signInUrl || envVars.signInUrl,
		signUpUrl: restInitState.signUpUrl || envVars.signUpUrl,
		__internal_clerkJSUrl: restInitState.__internal_clerkJSUrl || envVars.clerkJsUrl,
		__internal_clerkJSVersion: restInitState.__internal_clerkJSVersion || envVars.clerkJsVersion,
		__internal_clerkUIUrl: restInitState.__internal_clerkUIUrl || envVars.clerkUIUrl,
		__internal_clerkUIVersion: restInitState.__internal_clerkUIVersion || envVars.clerkUIVersion,
		signInForceRedirectUrl: restInitState.signInForceRedirectUrl,
		prefetchUI: restInitState.prefetchUI ?? envVars.prefetchUI,
		unsafe_disableDevelopmentModeConsoleWarning: restInitState.unsafe_disableDevelopmentModeConsoleWarning ?? envVars.unsafeDisableDevelopmentModeConsoleWarning
	};
};
/**
* Parses a URL string into TanStack Router navigation options.
* TanStack Router doesn't parse query strings from the `to` parameter,
* so we need to extract pathname, search params, and hash separately.
*/
function parseUrlForNavigation(to, baseUrl) {
	const url = new URL(to, baseUrl);
	const searchParams = Object.fromEntries(url.searchParams);
	return {
		to: url.pathname,
		search: Object.keys(searchParams).length > 0 ? searchParams : void 0,
		hash: url.hash ? url.hash.slice(1) : void 0
	};
}
var SDK_METADATA = {
	name: "@clerk/tanstack-react-start",
	version: "1.5.8"
};
var awaitableNavigateRef = { current: void 0 };
function ClerkProvider({ children, ...providerProps }) {
	const awaitableNavigate = useAwaitableNavigate();
	const clerkInitialState = getGlobalStartContext()?.clerkInitialState ?? {};
	(0, import_react.useEffect)(() => {
		awaitableNavigateRef.current = awaitableNavigate;
	}, [awaitableNavigate]);
	const { clerkSsrState, __keylessClaimUrl, __keylessApiKeysUrl, ...restInitState } = pickFromClerkInitState((isClient() ? window.__clerk_init_state : clerkInitialState)?.__internal_clerk_state);
	const mergedProps = {
		...mergeWithPublicEnvs(restInitState),
		...providerProps
	};
	const keylessProps = __keylessClaimUrl ? {
		__internal_keyless_claimKeylessApplicationUrl: __keylessClaimUrl,
		__internal_keyless_copyInstanceKeysUrl: __keylessApiKeysUrl
	} : {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptOnce, { children: `window.__clerk_init_state = ${htmlSafeJson(clerkInitialState)};` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClerkOptionsProvider, {
		options: mergedProps,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InternalClerkProvider, {
			initialState: clerkSsrState,
			sdkMetadata: SDK_METADATA,
			routerPush: (to) => {
				const { search, hash, ...rest } = parseUrlForNavigation(to, window.location.origin);
				return awaitableNavigateRef.current?.({
					...rest,
					search,
					hash,
					replace: false
				});
			},
			routerReplace: (to) => {
				const { search, hash, ...rest } = parseUrlForNavigation(to, window.location.origin);
				return awaitableNavigateRef.current?.({
					...rest,
					search,
					hash,
					replace: true
				});
			},
			...mergedProps,
			...keylessProps,
			children
		})
	})] });
}
ClerkProvider.displayName = "ClerkProvider";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-CRWS6sk9.js
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var dist_exports = /* @__PURE__ */ __exportAll({
	ClerkProvider: () => ClerkProvider,
	OrganizationList: () => OrganizationList$1,
	OrganizationProfile: () => OrganizationProfile$1,
	SignIn: () => SignIn$1,
	SignUp: () => SignUp$1,
	UserProfile: () => UserProfile$1,
	getToken: () => getToken
});
__reExport(dist_exports, dist_exports$1);
var logo_dark_default = "/assets/logo-dark-B7-hKmAl.png";
var p1_default = "/assets/p1-2fzgsuVR.jpg";
var p2_default = "/assets/p2-CdgS4TTB.jpg";
var p3_default = "/assets/p3-kKh1f3Hy.jpg";
var p4_default = "/assets/p4-YXYDXJV4.jpg";
var p5_default = "/assets/p5-CcUY7Qs4.jpg";
var p6_default = "/assets/p6-D9A18tCc.jpg";
var p7_default = "/assets/p7-COS4KVl3.jpg";
var p8_default = "/assets/p8-CVbgF08E.jpg";
var c1_default = "/assets/c1-nWbsBjSd.jpg";
var c2_default = "/assets/c2-4glzS1Gu.jpg";
var c3_default = "/assets/c3-BcGQoHtf.jpg";
var c4_default = "/assets/c4-BzU1cUPy.jpg";
var c5_default = "/assets/c5-rD7eh4Xc.jpg";
var c6_default = "/assets/c6-BKg9HO4p.jpg";
var products = [
	{
		id: 1,
		name: "Wireless Pro Earbuds",
		category: "Earbuds",
		rating: 4.8,
		price: 7999,
		oldPrice: 9999,
		discount: 20,
		image: p1_default,
		gallery: [
			p1_default,
			c1_default,
			p8_default
		],
		description: "True wireless earbuds with active noise cancellation, crystal-clear calls and up to 30 hours of playtime with the charging case."
	},
	{
		id: 2,
		name: "Smart Watch Series 9",
		category: "Smart Watches",
		rating: 4.7,
		price: 12499,
		oldPrice: 15999,
		discount: 22,
		image: p2_default,
		gallery: [
			p2_default,
			c2_default,
			p7_default
		],
		description: "A bright always-on display, heart-rate and sleep tracking, plus smart notifications right on your wrist."
	},
	{
		id: 3,
		name: "Premium Bluetooth Speaker",
		category: "Speakers",
		rating: 4.6,
		price: 8499,
		oldPrice: 10999,
		discount: 23,
		image: p3_default,
		gallery: [
			p3_default,
			c4_default,
			p8_default
		],
		description: "Room-filling 360° sound with deep bass, water resistance and 20 hours of battery for every gathering."
	},
	{
		id: 4,
		name: "Wireless Gaming Headset",
		category: "Headphones",
		rating: 4.9,
		price: 13999,
		oldPrice: 17999,
		discount: 22,
		image: p4_default,
		gallery: [
			p4_default,
			c3_default,
			p3_default
		],
		description: "Low-latency wireless audio, memory-foam ear cushions and a noise-cancelling boom mic built for long sessions."
	},
	{
		id: 5,
		name: "Fast USB-C Charger",
		category: "Mobile Accessories",
		rating: 4.5,
		price: 2499,
		image: p5_default,
		gallery: [
			p5_default,
			c6_default,
			p6_default
		],
		description: "Compact 65W GaN charger that powers your phone, tablet and laptop at full speed with built-in safety protection."
	},
	{
		id: 6,
		name: "Magnetic Power Bank",
		category: "Power Banks",
		rating: 4.6,
		price: 5999,
		oldPrice: 7499,
		discount: 20,
		image: p6_default,
		gallery: [
			p6_default,
			c5_default,
			p5_default
		],
		description: "Slim 10,000mAh magnetic power bank that snaps onto your phone and charges wirelessly on the go."
	},
	{
		id: 7,
		name: "Smart Fitness Watch",
		category: "Smart Watches",
		rating: 4.4,
		price: 6499,
		oldPrice: 8499,
		discount: 24,
		image: p7_default,
		gallery: [
			p7_default,
			c2_default,
			p2_default
		],
		description: "Track workouts, steps, SpO2 and sleep with a lightweight design and 10-day battery life."
	},
	{
		id: 8,
		name: "Portable Mini Speaker",
		category: "Speakers",
		rating: 4.3,
		price: 3499,
		oldPrice: 4499,
		discount: 22,
		image: p8_default,
		gallery: [
			p8_default,
			c4_default,
			p3_default
		],
		description: "Pocket-sized speaker with surprisingly big sound, built-in mic and all-day battery for travel."
	},
	{
		id: 9,
		name: "Ultra HD 4K TV",
		category: "TVs",
		rating: 4.7,
		price: 54999,
		oldPrice: 59999,
		discount: 8,
		image: p1_default,
		gallery: [
			p1_default,
			c1_default,
			p8_default
		],
		description: "Stunning 55-inch 4K Ultra HD TV with vibrant colors and smart features."
	},
	{
		id: 10,
		name: "Gaming Laptop Pro",
		category: "Laptops",
		rating: 4.8,
		price: 129999,
		oldPrice: 149999,
		discount: 13,
		image: p2_default,
		gallery: [
			p2_default,
			c2_default,
			p7_default
		],
		description: "High-performance gaming laptop with RTX graphics and fast SSD."
	},
	{
		id: 11,
		name: "Wireless Charger Pad",
		category: "Mobile Accessories",
		rating: 4.5,
		price: 1999,
		image: p5_default,
		gallery: [
			p5_default,
			c6_default,
			p6_default
		],
		description: "Sleek wireless charging pad compatible with all Qi devices."
	},
	{
		id: 12,
		name: "Bluetooth Noise Cancelling Earbuds",
		category: "Earbuds",
		rating: 4.9,
		price: 8999,
		oldPrice: 10999,
		discount: 18,
		image: p3_default,
		gallery: [
			p3_default,
			c4_default,
			p8_default
		],
		description: "Compact earbuds with active noise cancellation and long battery life."
	}
];
var categories = [
	{
		name: "Earbuds",
		image: c1_default,
		count: "24 products"
	},
	{
		name: "Smart Watches",
		image: c2_default,
		count: "18 products"
	},
	{
		name: "Headphones",
		image: c3_default,
		count: "21 products"
	},
	{
		name: "Speakers",
		image: c4_default,
		count: "16 products"
	},
	{
		name: "Power Banks",
		image: c5_default,
		count: "12 products"
	},
	{
		name: "Mobile Accessories",
		image: c6_default,
		count: "40 products"
	}
];
var formatPrice = (value) => `Rs. ${value.toLocaleString("en-US")}`;
var WISHLIST_UPDATE_EVENT = "tg_wishlist_update";
var readWishlist = () => {
	try {
		const raw = localStorage.getItem("wishlistItems");
		if (raw) return JSON.parse(raw);
	} catch (e) {
		console.error("Error reading wishlist", e);
	}
	return [];
};
var writeWishlist = (items) => {
	localStorage.setItem("wishlistItems", JSON.stringify(items));
	window.dispatchEvent(new Event(WISHLIST_UPDATE_EVENT));
};
function useWishlist() {
	const [items, setItems] = (0, import_react.useState)([]);
	const sync = (0, import_react.useCallback)(() => {
		setItems(readWishlist());
	}, []);
	(0, import_react.useEffect)(() => {
		sync();
		window.addEventListener(WISHLIST_UPDATE_EVENT, sync);
		window.addEventListener("storage", (e) => {
			if (e.key === "wishlistItems") sync();
		});
		return () => {
			window.removeEventListener(WISHLIST_UPDATE_EVENT, sync);
			window.removeEventListener("storage", sync);
		};
	}, [sync]);
	const addToWishlist = (0, import_react.useCallback)((id) => {
		const current = readWishlist();
		if (!current.includes(id)) {
			current.push(id);
			writeWishlist(current);
		}
	}, []);
	const removeFromWishlist = (0, import_react.useCallback)((id) => {
		writeWishlist(readWishlist().filter((item) => item !== id));
	}, []);
	const toggleWishlist = (0, import_react.useCallback)((id) => {
		const current = readWishlist();
		if (current.includes(id)) writeWishlist(current.filter((item) => item !== id));
		else {
			current.push(id);
			writeWishlist(current);
		}
	}, []);
	const isInWishlist = (0, import_react.useCallback)((id) => {
		return items.includes(id);
	}, [items]);
	const clearWishlist = (0, import_react.useCallback)(() => {
		writeWishlist([]);
	}, []);
	return {
		items,
		wishlistCount: items.length,
		addToWishlist,
		removeFromWishlist,
		toggleWishlist,
		isInWishlist,
		clearWishlist
	};
}
function useTheme() {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem("theme");
		const nextTheme = stored === "light" || stored === "dark" ? stored : "dark";
		setTheme(nextTheme);
		if (nextTheme === "dark") document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	}, []);
	const toggleTheme = () => {
		const nextTheme = theme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
		localStorage.setItem("theme", nextTheme);
		if (nextTheme === "dark") document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	};
	return {
		theme,
		toggleTheme
	};
}
var navLinks = [
	{
		name: "Home",
		to: "/"
	},
	{
		name: "Shop",
		to: "/shop"
	},
	{
		name: "Categories",
		to: "/categories"
	},
	{
		name: "Deals",
		to: "/deals"
	},
	{
		name: "FAQs",
		to: "/faq"
	},
	{
		name: "About Us",
		to: "/about"
	},
	{
		name: "Contact",
		to: "/contact"
	}
];
function Navbar({ cartCount, onNotify }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [categoryDropdownOpen, setCategoryDropdownOpen] = (0, import_react.useState)(false);
	const { wishlistCount } = useWishlist();
	const { theme, toggleTheme } = useTheme();
	const { isSignedIn } = (0, dist_exports.useAuth)();
	const searchInputRef = (0, import_react.useRef)(null);
	const dropdownRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const location = useLocation();
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) setScrolled(true);
			else setScrolled(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setCategoryDropdownOpen(false);
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	(0, import_react.useEffect)(() => {
		if (searchOpen) setTimeout(() => {
			searchInputRef.current?.focus();
		}, 80);
	}, [searchOpen]);
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setSearchOpen(false);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	const handleSearchSubmit = (e) => {
		e?.preventDefault();
		if (searchQuery.trim()) {
			setSearchOpen(false);
			navigate({
				to: "/shop",
				search: { search: searchQuery }
			});
			setSearchQuery("");
		}
	};
	const handleSearchResultClick = (type, value) => {
		setSearchOpen(false);
		setSearchQuery("");
		if (type === "category") navigate({
			to: "/shop",
			search: { category: value }
		});
		else if (type === "deal") navigate({ to: "/deals" });
		else navigate({
			to: "/shop",
			search: { search: value }
		});
	};
	const getSearchMatches = () => {
		if (!searchQuery.trim()) return {
			matchedProducts: [],
			matchedCategories: [],
			matchedDeals: []
		};
		const query = searchQuery.toLowerCase();
		const matchedProducts = products.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
		const matchedCategories = categories.filter((c) => c.name.toLowerCase().includes(query));
		const matchedDeals = products.filter((p) => p.discount && p.discount > 0 && p.name.toLowerCase().includes(query));
		return {
			matchedProducts: matchedProducts.slice(0, 3),
			matchedCategories: matchedCategories.slice(0, 3),
			matchedDeals: matchedDeals.slice(0, 3)
		};
	};
	const { matchedProducts, matchedCategories, matchedDeals } = getSearchMatches();
	const hasResults = matchedProducts.length > 0 || matchedCategories.length > 0 || matchedDeals.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? "pt-0 px-0" : "pt-4 px-4 sm:px-6"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mx-auto w-full transition-all duration-300 ${scrolled ? "max-w-none rounded-none border-b border-white/10 bg-[#051124]/95 px-6 py-3 shadow-md backdrop-blur-md" : "max-w-7xl rounded-2xl border border-white/10 bg-[#051124]/90 px-6 py-3 shadow-[0_10px_30px_rgba(5,17,36,0.3)] backdrop-blur-md"} flex items-center justify-between relative overflow-hidden`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 top-0 z-0 w-[9.5rem] rounded-r-[30px] bg-[#629dfa] pointer-events-none sm:w-[12rem]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "absolute left-0 top-0 bottom-0 z-10 flex items-center h-full pl-2 sm:pl-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo_dark_default,
						alt: "The Gadget Zone",
						className: "h-8 w-auto object-contain sm:h-10"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[8.5rem] shrink-0 sm:w-[11rem]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center justify-center gap-6 xl:flex 2xl:gap-8",
					children: navLinks.map((l) => {
						const isActive = location.pathname === l.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: l.to,
							className: `relative flex items-center gap-1 text-sm font-semibold transition-colors py-1 ${isActive ? "text-[#FFC400]" : "text-white/80 hover:text-white"}`,
							children: [l.name, isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-[-16px] left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#FFC400]" })]
						}, l.name);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center gap-1 sm:gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 sm:gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: "Search",
									onClick: () => setSearchOpen(true),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/wishlist",
									className: "relative hidden md:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconButton, {
										label: "Wishlist",
										onClick: () => {},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" }), wishlistCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-md",
											children: wishlistCount
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden md:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
										label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
										pressed: theme === "dark",
										onClick: toggleTheme,
										children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" })
									})
								}),
								isSignedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden items-center gap-2 pl-1.5 pr-0.5 md:flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(dist_exports.UserButton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/account",
										className: "text-xs font-bold text-white/95 hover:text-[#FFC400] transition-colors hidden xl:inline-block",
										children: "Dashboard"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/account",
									className: "relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
										label: "Account",
										onClick: () => {},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" })
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconButton, {
								label: "Cart",
								onClick: () => {},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5 text-white/95 hover:text-[#FFC400] transition-colors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#FFC400] px-1 text-[11px] font-bold text-slate-950 shadow-md",
									children: cartCount
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": open ? "Close navigation menu" : "Open navigation menu",
							"aria-expanded": open,
							"aria-controls": "mobile-navigation",
							onClick: () => setOpen((v) => !v),
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 xl:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			id: "mobile-navigation",
			"aria-label": "Mobile navigation",
			className: "mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#051124]/95 px-4 py-3 shadow-lg xl:hidden backdrop-blur-md space-y-1",
			children: [
				navLinks.map((l) => {
					const isActive = location.pathname === l.to;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						onClick: () => setOpen(false),
						className: `block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? "text-[#FFC400] bg-white/5" : "text-white/80 hover:bg-white/10 hover:text-white"}`,
						children: l.name
					}, l.name);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setOpen(false);
						setSearchOpen(true);
					},
					className: "w-full text-left rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4" }), " Search Products"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/wishlist",
					onClick: () => setOpen(false),
					className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4" }), " My Wishlist"]
					}), wishlistCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white",
						children: wishlistCount
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						toggleTheme();
						setOpen(false);
					},
					className: "w-full text-left rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white flex items-center gap-2",
					children: [
						theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }),
						"Theme: ",
						theme === "dark" ? "Light Mode" : "Dark Mode"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cart",
					onClick: () => setOpen(false),
					className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }), " My Cart"]
					}), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-[#FFC400] px-2 py-0.5 text-[10px] font-bold text-royal-deep",
						children: cartCount
					})]
				}),
				isSignedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					onClick: () => setOpen(false),
					className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " My Account (Dashboard)"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					onClick: () => setOpen(false),
					className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }), " Sign In / Create Account"]
					})
				})
			]
		})]
	}), searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/45 p-3 pt-[5vh] backdrop-blur-sm sm:p-4 sm:pt-[10vh]",
		onClick: () => setSearchOpen(false),
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Search products",
			className: "w-full max-w-2xl rounded-2xl border border-white/15 bg-[#051124] p-4 text-white shadow-2xl sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSearchOpen(false),
						className: "rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white",
						"aria-label": "Close search",
						title: "Close search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSearchSubmit,
					className: "flex items-center gap-3 border-b border-white/10 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-muted-foreground shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: searchInputRef,
							type: "text",
							placeholder: "Search products, deals, and categories...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
						}),
						searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSearchQuery(""),
							className: "text-white/60 hover:text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[50vh] overflow-y-auto space-y-6 pr-2",
					children: searchQuery.trim() ? hasResults ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							matchedCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "h-3 w-3 text-royal" }), " Categories"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
									children: matchedCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleSearchResultClick("category", c.name),
										className: "flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-left text-xs font-bold hover:bg-royal/20 transition-all",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-white/55",
											children: c.count
										})]
									}, c.name))
								})]
							}),
							matchedDeals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "h-3.5 w-3.5 text-gold" }), " Active Deals"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: matchedDeals.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleSearchResultClick("deal", d.name),
										className: "flex items-center justify-between w-full rounded-xl border border-white/5 bg-white/5 p-3 hover:bg-royal/20 transition-all text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: d.image,
												alt: "",
												className: "h-8 w-8 rounded-lg object-cover bg-white/10"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold block",
												children: d.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] text-[#FFC400] font-bold",
												children: [
													"Discount: ",
													d.discount,
													"% OFF"
												]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold text-white",
											children: formatPrice(d.price)
										})]
									}, d.id))
								})]
							}),
							matchedProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5 text-royal" }), " Products"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: matchedProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleSearchResultClick("product", p.name),
										className: "flex items-center justify-between w-full rounded-xl border border-white/5 bg-white/5 p-3 hover:bg-royal/20 transition-all text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: p.image,
												alt: "",
												className: "h-8 w-8 rounded-lg object-cover bg-white/10"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold block",
												children: p.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-white/55 line-clamp-1",
												children: p.description
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-extrabold text-white",
											children: formatPrice(p.price)
										})]
									}, p.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleSearchSubmit(),
								className: "w-full text-center py-2.5 text-xs font-bold text-royal hover:text-white transition-colors border-t border-white/15 pt-4",
								children: "Search all matching results in Shop →"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-12 text-center text-muted-foreground text-xs space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"No matches found for \"",
							searchQuery,
							"\""
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] opacity-75",
							children: "Verify spelling or search standard gadgets."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-royal" }), " Popular Searches"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									"Earbuds",
									"Watch",
									"Speaker",
									"Power Bank",
									"Charger"
								].map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setSearchQuery(tag);
										searchInputRef.current?.focus();
									},
									className: "rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-semibold hover:bg-royal/20 hover:border-royal/40 transition-all",
									children: tag
								}, tag))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "h-3.5 w-3.5 text-royal" }), " Explore Categories"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2",
								children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleSearchResultClick("category", c.name),
									className: "flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-left text-xs font-semibold hover:bg-white/10 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-white/55",
										children: c.count
									})]
								}, c.name))
							})]
						})]
					})
				})
			]
		})
	})] });
}
function IconButton({ children, label, pressed, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"aria-label": label,
		"aria-pressed": pressed,
		title: label,
		onClick,
		className: "relative grid h-10 w-10 place-items-center rounded-full text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white cursor-pointer",
		children
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative bg-royal-deep text-primary-foreground overflow-hidden border-t border-white/5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-16 -right-16 bg-royal/10 rounded-full blur-[100px] h-[300px] w-[300px] pointer-events-none z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-16 -left-16 bg-royal/10 rounded-full blur-[100px] h-[300px] w-[300px] pointer-events-none z-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[20%] left-[-10%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-royal/15 to-transparent rotate-[20deg] pointer-events-none hidden md:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[20%] left-[-5%] w-[120%] h-[1px] bg-gradient-to-r from-transparent via-royal/10 to-transparent rotate-[20deg] pointer-events-none hidden md:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[10%] bottom-[-50px] w-[180px] h-[180px] rounded-full border border-royal/10 pointer-events-none hidden md:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[12%] bottom-[-30px] w-[120px] h-[120px] rounded-full border border-royal/5 pointer-events-none hidden md:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[50%] top-[20%] -translate-x-1/2 w-[400px] h-[400px] rounded-full border border-royal/5 pointer-events-none hidden md:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[50%] top-[25%] -translate-x-1/2 w-[300px] h-[300px] rounded-full border border-dashed border-royal/5 pointer-events-none hidden md:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[40%] right-[25%] w-[100px] h-[100px] rounded-full border border-royal/5 pointer-events-none hidden lg:block animate-pulse [animation-duration:8s]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[5%] top-[10%] w-[350px] h-[350px] rounded-full border border-royal/10 pointer-events-none hidden md:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[8%] top-[12%] w-[300px] h-[300px] rounded-full border border-dashed border-royal/10 animate-[spin_120s_linear_infinite] pointer-events-none hidden lg:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[11%] top-[15%] w-[250px] h-[250px] rounded-full border border-dotted border-royal/15 animate-[spin_90s_linear_infinite_reverse] pointer-events-none hidden lg:block" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative overflow-hidden rounded-r-[24px] bg-[#629dfa] inline-flex items-center h-14 pl-2 pr-6 border-y border-r border-white/10 shadow-[0_4px_15px_rgba(98,157,250,0.15)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logo_dark_default,
								alt: "The Gadget Zone",
								loading: "lazy",
								className: "h-10 w-auto object-contain"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex gap-3",
						children: [
							Instagram,
							Music2,
							Youtube
						].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#top",
							"aria-label": "Social link",
							className: "grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-gold hover:text-royal-deep",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
						}, i))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-bold uppercase tracking-wider",
						children: "Quick Links"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2.5 text-sm text-primary-foreground/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "transition-colors hover:text-gold",
								children: "Home"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "transition-colors hover:text-gold",
								children: "Shop"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "transition-colors hover:text-gold",
								children: "Categories"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/about",
								className: "transition-colors hover:text-gold",
								children: "About Us"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/faq",
								className: "transition-colors hover:text-gold",
								children: "FAQs"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "transition-colors hover:text-gold",
								children: "Contact"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-bold uppercase tracking-wider",
						children: "Contact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2.5 text-sm text-primary-foreground/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 shrink-0 text-gold" }), " 0342 0024369"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 shrink-0 text-gold" }), " 0332 2205842"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Usama Bin Abid" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Thegadgetzone.pk" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-sm font-bold uppercase tracking-wider",
						children: "Visit Us"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 flex gap-2 text-sm leading-relaxed text-primary-foreground/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), "Shop #B-172, Alhaseeb Residency, Quetta Town, Sector 18-A, Gulzar-e-Hijri, Scheme 33, Karachi"]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60 z-10 bg-slate-950/10 backdrop-blur-sm",
				children: "© 2026 The Gadget Zone. All Rights Reserved."
			})
		]
	});
}
//#endregion
export { dist_exports as a, useWishlist as c, categories as i, ClerkProvider as l, Navbar as n, formatPrice as o, __exportAll as r, products as s, Footer as t };
