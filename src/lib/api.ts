export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function postData<TResponse = Record<string, unknown>>(
  url: string,
  data: unknown,
): Promise<TResponse> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new ApiError("Network error. Check your connection and try again.", 0);
  }

  let result: { error?: string } & TResponse;
  try {
    result = await response.json();
  } catch {
    throw new ApiError("The server returned an invalid response.", response.status);
  }

  if (!response.ok) {
    throw new ApiError(result.error || "Something went wrong. Please try again.", response.status);
  }
  return result;
}
