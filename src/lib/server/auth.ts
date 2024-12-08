import { error, type Cookies } from "@sveltejs/kit";
import * as api from "./api";
import { setTokenCookie } from "./utils";
import type { LoginData, RegisterData } from "$lib/models/auth";

export const login = async (data: LoginData, cookies: Cookies) => {
    const { username, password } = data;
    const payload = new URLSearchParams({ username, password });
    const response = await api.post("/users/login", payload);
    if (response.error) {
        return response;
    }
    const { access_token, refresh_token } = response;
    setTokenCookie(cookies, access_token, "access_token");
    setTokenCookie(cookies, refresh_token, "refresh_token");
    return { status: 200 };
};

export const loginAsGuest = async (cookies: Cookies) => {
    const response = await api.post("/users/guest");
    if (response.error) {
        return response;
    }
    const { access_token, refresh_token } = response;
    setTokenCookie(cookies, access_token, "access_token");
    setTokenCookie(cookies, refresh_token, "refresh_token");
    return { status: 200 };
};

export const register = async (data: RegisterData) => {
    const response = await api.post("/users/register", data);
    if (response.error) {
        return response;
    }
    return { status: 200 };
};

export const signOut = async (locals: App.Locals, cookies: Cookies) => {
    cookies.delete("access_token", { path: "/" });
    cookies.delete("refresh_token", { path: "/" });
    locals.user = undefined;
};

export const getMe = async (cookies: Cookies) => {
    return api.get("/users/me", true, cookies);
};

export const verifyEmail = async (token: string) => {
    const response = await api.get(`/users/verify-email/${token}`);
    return response;
};

export const refreshAccessToken = async (cookies: Cookies) => {
    const refreshToken = cookies.get("refresh_token");
    if (!refreshToken) {
        error(500, "No refresh token found");
    }

    const data = await api.post("/users/refresh", { refresh_token: refreshToken });
    if (data.error) {
        error(data.status, data.error.detail);
    }

    const { access_token, refresh_token } = data;
    setTokenCookie(cookies, access_token, "access_token");
    setTokenCookie(cookies, refresh_token, "refresh_token");
};
