// Check if event locals has name yet, if not generate a dialog before entering the game :)
import type { Actions, PageServerLoad } from "./$types";
import { WEBSOCKET_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import { loginAsGuest } from "$lib/server/auth";

export const load: PageServerLoad = async ({ cookies, params }) => {
    return {
        roomCode: params.code,
        websocketUrl: WEBSOCKET_URL,
        websiteUrl: "https://beatcode.dev",
        token: cookies.get("access_token")
    };
};

export const actions = {
    joinRoomAsGuest: async ({ cookies }) => {
        try {
            await loginAsGuest(cookies);
        } catch (e: unknown) {
            if (e instanceof Error) {
                return fail(500, { message: e.message });
            }
            return fail(500, { message: "Unknown error" });
        }
    }
} satisfies Actions;
