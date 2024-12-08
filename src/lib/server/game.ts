import type { Cookies } from "@sveltejs/kit";
import * as api from "./api";

export const getCurrentGame = (cookies: Cookies) => {
    return api.get("/game/current-game", false, cookies);
};
