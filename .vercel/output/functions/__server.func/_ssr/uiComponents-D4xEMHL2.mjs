import { i as __toESM } from "../_runtime.mjs";
import { a as OrganizationList, c as SignUp, f as require_jsx_runtime, i as useRoutingProps, l as UserProfile, o as OrganizationProfile, p as require_react, s as SignIn } from "../_libs/@clerk/react+[...].mjs";
import { l as useLocation, y as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/uiComponents-D4xEMHL2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var usePathnameWithoutSplatRouteParams = () => {
	const { _splat } = useParams({ strict: false });
	const { pathname } = useLocation();
	const splatRouteParam = _splat || "";
	return (0, import_react.useRef)(`/${pathname.replace(splatRouteParam, "").replace(/\/$/, "").replace(/^\//, "").trim()}`).current;
};
var UserProfile$1 = Object.assign((props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserProfile, { ...useRoutingProps("UserProfile", props, { path: usePathnameWithoutSplatRouteParams() }) });
}, { ...UserProfile });
var OrganizationProfile$1 = Object.assign((props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationProfile, { ...useRoutingProps("OrganizationProfile", props, { path: usePathnameWithoutSplatRouteParams() }) });
}, { ...OrganizationProfile });
var OrganizationList$1 = Object.assign((props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganizationList, { ...useRoutingProps("OrganizationList", props, { path: usePathnameWithoutSplatRouteParams() }) });
}, { ...OrganizationList });
var SignIn$1 = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignIn, { ...useRoutingProps("SignIn", props, { path: usePathnameWithoutSplatRouteParams() }) });
};
var SignUp$1 = (props) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignUp, { ...useRoutingProps("SignUp", props, { path: usePathnameWithoutSplatRouteParams() }) });
};
//#endregion
export { UserProfile$1 as a, SignUp$1 as i, OrganizationProfile$1 as n, SignIn$1 as r, OrganizationList$1 as t };
