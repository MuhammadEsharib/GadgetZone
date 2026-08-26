//#region node_modules/.nitro/vite/services/ssr/assets/api-Dp3V1yym.js
var ApiError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
};
async function postData(url, data) {
	let response;
	try {
		response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		});
	} catch {
		throw new ApiError("Network error. Check your connection and try again.", 0);
	}
	let result;
	try {
		result = await response.json();
	} catch {
		throw new ApiError("The server returned an invalid response.", response.status);
	}
	if (!response.ok) throw new ApiError(result.error || "Something went wrong. Please try again.", response.status);
	return result;
}
//#endregion
export { postData as n, ApiError as t };
