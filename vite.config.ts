/// <reference types="vitest" />
import { purgeCss } from "vite-plugin-tailwind-purgecss";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import path from "path";

export default defineConfig({
    plugins: [sveltekit(), svelteTesting(), purgeCss()],
    optimizeDeps: {
        include: ["gsap"]
    },
    ssr: {
        noExternal: ["gsap"]
    },
    resolve: {
        alias: {
            $lib: path.resolve("./src/lib")
        }
    },
    test: {
        environment: "jsdom",
        setupFiles: ["./vitest-setup.js"]
    }
});
