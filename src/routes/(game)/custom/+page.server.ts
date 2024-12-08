import type { Actions, PageServerLoad } from "./$types";
import { fail, isHttpError, isRedirect, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { RoomSettingsSchema, JoinRoomSchema } from "$models/room";
import { WEBSOCKET_URL } from "$env/static/private";
import { createRoom } from "$lib/server/room";

export const load: PageServerLoad = async ({ cookies }) => {
    return {
        createRoomForm: await superValidate(zod(RoomSettingsSchema)),
        joinRoomForm: await superValidate(zod(JoinRoomSchema)),
        webSocketUrl: WEBSOCKET_URL,
        token: cookies.get("access_token")
    };
};

export const actions = {
    createRoom: async ({ request, locals, cookies }) => {
        const createRoomForm = await superValidate(request, zod(RoomSettingsSchema));

        if (!createRoomForm.valid) {
            return fail(400, { createRoomForm });
        }
        if (!locals.user) {
            redirect(303, "/login");
        }

        try {
            const data = await createRoom(createRoomForm.data, cookies);
            console.log(data);
            if (data.status >= 400) {
                return fail(data.status, { createRoomForm, error: data.error });
            }
            redirect(303, `/room/${data.room_code}`);
        } catch (e: unknown) {
            if (isRedirect(e)) throw e;
            if (isHttpError(e)) {
                console.error(e.body);
                return fail(e.status, {
                    createRoomForm,
                    message: "Something went wrong in the server"
                });
            }
            return fail(500, { createRoomForm, message: "An unexpected error occurred" });
        }
    },

    joinRoom: async ({ request }) => {
        const joinRoomForm = await superValidate(request, zod(JoinRoomSchema));

        if (!joinRoomForm.valid) {
            return fail(400, { joinRoomForm });
        }
        redirect(303, `/room/${joinRoomForm.data.room_code}`);
    }
} satisfies Actions;
