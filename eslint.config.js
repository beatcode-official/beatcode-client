import js from "@eslint/js";
import * as svelteParser from "svelte-eslint-parser";
import * as typescriptParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginSvelte from "eslint-plugin-svelte";
import globals from "globals";
import tsEslint from "typescript-eslint";
import vitest from "eslint-plugin-vitest";
import playwright from "eslint-plugin-playwright";

export default [
    js.configs.recommended,
    ...eslintPluginSvelte.configs["flat/recommended"],
    ...tsEslint.configs.recommended,
    eslintConfigPrettier,
    {
        ...playwright.configs["flat/playwright"],
        files: ["tests/**"]
    },
    vitest.configs.recommended,
    ...eslintPluginSvelte.configs["flat/prettier"],
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: { ...globals.node, ...globals.browser },
            parserOptions: {
                extraFileExtensions: [".svelte"]
            }
        }
    },
    {
        files: ["**/*.svelte"],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: typescriptParser,
                project: "./tsconfig.json",
                extraFileExtensions: [".svelte"]
            }
        }
    },
    {
        ignores: [".svelte-kit", "node_modules", "playwright.config.js", "src/lib/components/ui/**"]
    },
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "warn"
        }
    }
];
