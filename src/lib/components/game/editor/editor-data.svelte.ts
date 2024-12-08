import { basicSetup, EditorView } from "codemirror";
import { EditorState, StateEffect, StateField } from "@codemirror/state";
import { acceptCompletion } from "@codemirror/autocomplete";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit, type LanguageSupport } from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import { Decoration, keymap } from "@codemirror/view";

import { DefaultTheme, LightTheme } from "./themes";
import { AbilitiesHighlighters } from "$assets/config/game";

// Ability
const addLineHighlight = StateEffect.define();

const lineHighlightField = StateField.define({
    create() {
        return Decoration.none;
    },
    update(lines, tr) {
        lines = lines.map(tr.changes);
        for (const e of tr.effects) {
            if (e.is(addLineHighlight)) {
                lines = Decoration.none;
                //   lines = lines.update({add: [lineHighlightMark.range(e.value)]});
            }
        }
        return lines;
    },
    provide: (f) => EditorView.decorations.from(f)
});
// const lineHighlightMark = Decoration.line({
//     attributes: { style: "background-color: #d2ffff" }
// });

export class EditorData {
    #view: EditorView | null = null;
    #lang: LanguageSupport = python();
    #tabSize: number = 4;
    #exts = [
        basicSetup,
        DefaultTheme,
        this.#lang,
        indentUnit.of(" ".repeat(this.#tabSize)),
        keymap.of([{ key: "Tab", run: acceptCompletion }, indentWithTab]),
        lineHighlightField,
        ...AbilitiesHighlighters
    ];
    #state: EditorState = EditorState.create({ extensions: this.#exts });

    #setup() {
        if (!this.#view) throw new Error("Editor view not linked");
        this.#view.setState(this.#state);
    }

    link(view: EditorView) {
        this.#view = view;
        this.#setup();
    }

    getCode() {
        if (!this.#view) throw new Error("Editor view not linked");
        return this.#view.state.doc.toString();
    }

    setCode(code: string) {
        if (!this.#view) throw new Error("Editor view not linked");
        this.#state = EditorState.create({
            doc: code,
            extensions: this.#exts
        });
        this.#view.setState(this.#state);
    }

    triggerAbility(ability: string) {
        if (!this.#view) throw new Error("Editor view not linked");
        if (ability === "deletio") {
            // Delete a random line of my code
            const doc = this.#view.state.doc;
            const lineCount = doc.lines;

            if (lineCount === 0) return;

            const randomLine = Math.floor(Math.random() * lineCount) + 1;
            const linePos = doc.line(randomLine);
            this.#view.dispatch({
                changes: { from: linePos.from, to: linePos.to }
            });
        } else if (ability === "syntaxio") {
            // Turn off syntax highlighting for 30 seconds
            const originalExts = this.#exts;
            this.#exts = this.#exts.filter((ext) => ext !== this.#lang);
            this.#view.dispatch({
                effects: StateEffect.reconfigure.of(this.#exts)
            });
            setTimeout(() => {
                this.#exts = originalExts;
                this.#view?.dispatch({
                    effects: StateEffect.reconfigure.of(this.#exts)
                });
            }, 30000);
        } else if (ability === "lightio") {
            // Turn editor to light mode for 30 seconds
            const originalExts = this.#exts;
            this.#exts = this.#exts.filter((ext) => ext !== DefaultTheme);
            this.#exts.push(LightTheme);
            this.#view.dispatch({
                effects: StateEffect.reconfigure.of(this.#exts)
            });
            setTimeout(() => {
                this.#exts = originalExts;
                this.#view?.dispatch({
                    effects: StateEffect.reconfigure.of(this.#exts)
                });
            }, 30000);
        }
    }
}
