import type { PageServerLoad } from "./$types";
import { verifyEmail } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {
    const token = url.searchParams.get("token");
    if (!token) {
        redirect(302, "/login");
    }

    try {
        const response = await verifyEmail(token);
        if (response.status >= 400) {
            return { status: "error", message: response.error.detail };
        }
        return { status: "success" };
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { status: "error", message: e.message };
        }
        return { status: "error", message: "Unknown error" };
    }
};
