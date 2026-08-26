import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
import { V as ImageOff } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SkeletonCard-C6Aiiu2v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
/**
* LazyImage — shows a shimmer skeleton while the image loads,
* then fades the image in with a smooth opacity transition.
*/
function LazyImage({ src, alt, className = "", skeletonClassName = "", ...props }) {
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const { onLoad, onError, ...imageProps } = props;
	(0, import_react.useEffect)(() => {
		setLoaded(false);
		setFailed(false);
	}, [src]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "relative block h-full w-full",
		children: [!loaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `skeleton absolute inset-0 ${skeletonClassName}`,
			"aria-hidden": "true"
		}), failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			role: "img",
			"aria-label": alt ? `${alt} image unavailable` : "Image unavailable",
			className: "absolute inset-0 grid place-items-center bg-sky-soft text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
				className: "h-8 w-8 opacity-60",
				"aria-hidden": "true"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			loading: "lazy",
			decoding: "async",
			onLoad: (event) => {
				setLoaded(true);
				onLoad?.(event);
			},
			onError: (event) => {
				setFailed(true);
				setLoaded(true);
				onError?.(event);
			},
			className: `${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`,
			...imageProps
		})]
	});
}
/**
* SkeletonCard & friends — shared shimmer placeholders
* Used on every route while data / images are loading.
*/
/** Single product card placeholder */
function SkeletonProductCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton aspect-square w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-4 w-3/4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-3 w-1/2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-5 w-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-5 w-12" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-8 flex-1 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-8 flex-1 rounded-full" })]
				})
			]
		})]
	});
}
/** 4-column product grid skeleton */
function SkeletonProductGrid({ count = 8 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkeletonProductCard, {}, i))
	});
}
/** Category card placeholder (image + title overlay) */
function SkeletonCategoryCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[4/3] overflow-hidden rounded-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-full w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute bottom-0 left-0 p-4 flex flex-col gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-4 w-28 bg-white/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-3 w-16 bg-white/20" })]
		})]
	});
}
/** Cart item placeholder */
function SkeletonCartItem() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-4 rounded-2xl border border-border/40 bg-card p-4 sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-5 w-5 rounded-full shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-20 w-20 shrink-0 rounded-xl sm:h-24 sm:w-24" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-4 w-3/4" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-3 w-1/2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mt-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-6 w-24" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-8 w-24 rounded-full" })]
					})
				]
			})
		]
	});
}
/** Order summary skeleton */
function SkeletonOrderSummary() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border/60 bg-card overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-16 w-full rounded-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-4 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-4 w-4/5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-4 w-3/5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-px w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-5 w-2/3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-12 w-full rounded-full mt-2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-4 w-32 mx-auto" })
			]
		})]
	});
}
/** Small icon-category tile skeleton */
function SkeletonCategoryTile() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-3 rounded-2xl border border-border/40 bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-12 w-12 rounded-2xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-4 w-20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-3 w-14" })
		]
	});
}
//#endregion
export { SkeletonOrderSummary as a, SkeletonCategoryTile as i, SkeletonCartItem as n, SkeletonProductGrid as o, SkeletonCategoryCard as r, LazyImage as t };
