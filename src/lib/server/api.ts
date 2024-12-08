// Referenced from @algebra2boy - Yongye Tan and sveltekit/realworld

import { error, type Cookies, type NumericRange } from "@sveltejs/kit";
import { API_URL } from "$env/static/private";
import type { HttpRequestFetch, HttpPayload } from "$lib/models/request";
import { refreshAccessToken } from "./auth";

/**
 * Sends an HTTP request to the specified path with the given method, data, and token.
 *
 * @param {HttpRequestFetch} params - The parameters for the HTTP request.
 * @param {string} params.method - The HTTP method to use (e.g., 'GET', 'POST').
 * @param {string} params.path - The path to send the request to.
 * @param {HttpPayload | undefined} [params.data] - The data to send with the request, if any.
 * @param {string | undefined} [params.token] - The authorization token to include in the request headers, if any.
 * @returns {Promise<any>} A promise that resolves to the response data or an error object with the status code.
 * @throws Will throw an error if the request fails with a server error (status code 500-599).
 */
async function send({ method, path, data, cookies, refresh }: HttpRequestFetch): Promise<any> {
    const options: RequestInit = {};

    // Specifying the HTTP request options and method
    options.method = method;
    options.headers = {};

    // Check if there is data and set appropriate headers and body
    if (data) {
        if (data instanceof FormData) {
            options.body = data;
        } else if (data instanceof URLSearchParams) {
            options.headers["Content-Type"] = "application/x-www-form-urlencoded";
            options.body = data.toString();
        } else {
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(data);
        }
    }

    const accessToken = cookies?.get("access_token");
    if (accessToken) {
        options.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    // console.log("[Request Header]", options);

    // Start fetching the endpoint and convert the response body to json
    let responseStatus = 500;
    try {
        const response = await fetch(`${API_URL}${path}`, options);
        const json = await response.json();

        // console.log("[Server Response]", response);
        // console.log("[Server JSON]", json);

        responseStatus = response.status;

        // Successful response status
        if (response.ok || response.status === 201) {
            return json;
        }

        // Refresh token and refetch if unauthorized
        if (refresh && response.status === 401) {
            await refreshAccessToken(cookies!);
            return send({ method, path, data, cookies, refresh: false });
        }

        // Client errors ranging from 400 to 499
        if (response.status >= 400 || response.status <= 499) {
            return { error: json, status: response.status };
        }
    } catch {
        // Unexpected server errors ranging from 500 to 599
        error(responseStatus as NumericRange<500, 599>);
    }
}

/**
 * Sends a GET request to the specified path.
 *
 * @param path - The endpoint path to send the GET request to.
 * @param refresh - Optional. Whether to refresh the access token if unauthorized.
 * @param cookies - Optional. The cookies to include in the request headers.
 * @returns A promise that resolves with the response of the GET request.
 */
export function get(path: string, refresh?: boolean, cookies?: Cookies) {
    return send({ method: "GET", path, refresh, cookies });
}

/**
 * Sends a POST request to the specified path with the given data and cookies.
 *
 * @param path - The endpoint path to which the POST request is sent.
 * @param data - Optional payload to be sent with the POST request.
 * @param refresh - Optional. Whether to refresh the access token if unauthorized.
 * @param cookies - Optional cookies to be included in the request headers.
 * @returns A promise that resolves with the response of the POST request.
 */
export function post(path: string, data?: HttpPayload, refresh?: boolean, cookies?: Cookies) {
    return send({ method: "POST", path, data, refresh, cookies });
}

/**
 * Sends a DELETE request to the specified path.
 *
 * @param path - The endpoint path to send the DELETE request to.
 * @param refresh - Optional. Whether to refresh the access token if unauthorized.
 * @param cookies - Optional. The cookies to include in the request headers.
 * @returns A promise that resolves with the response of the DELETE request.
 */
export function del(path: string, refresh?: boolean, cookies?: Cookies) {
    return send({ method: "DELETE", path, refresh, cookies });
}

/**
 * Sends a PUT request to the specified path with the provided data and cookies.
 *
 * @param path - The endpoint path to send the PUT request to.
 * @param data - Optional payload to include in the PUT request.
 * @param refresh - Optional. Whether to refresh the access token if unauthorized.
 * @param cookies - Optional cookies to include in the request headers.
 * @returns A promise that resolves with the response of the PUT request.
 */
export function put(path: string, data?: HttpPayload, refresh?: boolean, cookies?: Cookies) {
    return send({ method: "PUT", path, data, refresh, cookies });
}
