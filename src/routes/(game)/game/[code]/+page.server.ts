import type { Actions, PageServerLoad } from "./$types";
import { WEBSOCKET_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import { loginAsGuest } from "$lib/server/auth";
import { getCurrentGame } from "$lib/server/game";

export const load: PageServerLoad = async ({ locals, cookies, params }) => {
    if (!locals.user) {
        redirect(302, "/login");
    }
    try {
        const data = await getCurrentGame(cookies);
        if (data.match_id !== params.code) {
            redirect(302, "/");
        }
    } catch (e) {
        console.error(e);
        redirect(302, "/");
    }

    return {
        gameId: params.code,
        websocketUrl: WEBSOCKET_URL,
        token: cookies.get("access_token")
    };
};

export const actions = {
    joinGameAsGuest: async ({ cookies }) => {
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
