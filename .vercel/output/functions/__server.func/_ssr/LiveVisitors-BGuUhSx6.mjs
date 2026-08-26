import { i as __toESM } from "../_runtime.mjs";
import { f as require_jsx_runtime, p as require_react } from "../_libs/@clerk/react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LiveVisitors-BGuUhSx6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function LiveVisitors() {
	const [count, setCount] = (0, import_react.useState)(87);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => {
			setCount(Math.floor(50 + Math.random() * 101));
		}, 3500);
		return () => clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed bottom-5 left-5 z-40 hidden items-center gap-2.5 rounded-full border border-border/70 bg-background/90 px-4 py-2.5 shadow-[var(--shadow-card)] backdrop-blur sm:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative flex h-2.5 w-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-royal/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2.5 w-2.5 rounded-full bg-royal" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs font-semibold text-foreground/80",
			children: [count, " people are viewing this store right now"]
		})]
	});
}
//#endregion
export { LiveVisitors as t };
