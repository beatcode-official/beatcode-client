import type { Cookies } from "@sveltejs/kit";

export const setTokenCookie = (cookies: Cookies, token: string, key: string) => {
    cookies.set(key, token, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict"
    });
};
