import { cleanup, render, screen } from "@testing-library/svelte";
import userEvent, { PointerEventsCheckLevel } from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import { goto } from "$app/navigation";
import { Navbar, ProfileMenu } from "$components/main/navbar";
import type { User } from "$lib/models/user";

describe("Testing Navbar", () => {
    it("should render correctly (unauthorized)", () => {
        const results = render(Navbar);

        const signInBtn = results.getByText("Sign in");
        expect(signInBtn).toBeInTheDocument();
    });

    const user: User = {
        username: "testuser",
        email: "testuser@example.com",
        display_name: "Test User",
        rating: 5,
        is_verified: true,
        is_guest: false,
        created_at: Date.now(),
        updated_at: Date.now()
    };

    it("should render correctly (authorized)", () => {
        const results = render(Navbar, { user });

        expect(() => results.getByText(user.display_name)).not.toThrow();
        expect(() => results.getByText("O(log(n))")).not.toThrow();
    });

    it("dropdown should show when profile menu is clicked", async () => {
        const results = render(Navbar, { user });

        const profileMenuBtn = results.getByRole("button");
        expect(profileMenuBtn, "profile menu isn't a dropdown menu").toHaveAttribute(
            "data-dropdown-menu-trigger"
        );

        await userEvent.click(profileMenuBtn);
        expect(() => screen.getByText("Sign out")).not.toThrow();
    });
});
