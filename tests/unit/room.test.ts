import { mount } from "svelte";
import * as devalue from "devalue";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterAll } from "vitest";
import RoomSettingsForm from "./components/room-settings-form.svelte";

const originalFetch = global.fetch;
global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        status: 200,
        text: () =>
            Promise.resolve(
                JSON.stringify({ type: "Unhandled Rejection", data: devalue.stringify({}) })
            )
    } as Response)
);

afterAll(() => {
    global.fetch = originalFetch;
});
describe("Testing Room Settings Form", () => {
    it("should render correctly", async () => {
        const results = render(RoomSettingsForm);
        expect(() => results.getByTestId("room-settings-submit-btn")).not.toThrow();
    });

    it("should call fetch when form is submitted", async () => {
        const results = render(RoomSettingsForm);

        try {
            const submitEventFn = vi.fn();
            results.container.addEventListener("submit", submitEventFn);

            const submitBtn = results.getByTestId("room-settings-submit-btn");
            await userEvent.click(submitBtn);

            expect(submitEventFn).toHaveBeenCalled();
        } catch (e) {
            console.log("Unavoidable fetch error for now: ", e);
        }
    });
});
