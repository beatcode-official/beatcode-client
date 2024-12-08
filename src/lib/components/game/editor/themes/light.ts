import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";

const editorThemeColors = {
    foreground: "#000000",
    background: "#FFFFFF",
    darkBackground: "#F5F5F5",
    highlightBackground: "#ADD6FF26",
    cursor: "#000000",
    selection: "#ADD6FF",
    gutter: "#6E7681",
    tooltipBackground: "#F6F8FA",
    invalid: "#FF0000",
    keyword: "#D73A49",
    controlFlowAndModuleKeywords: "#D73A49",
    functions: "#6F42C1",
    typesAndClasses: "#6F42C1",
    tagNames: "#22863A",
    operators: "#000000",
    regexes: "#032F62",
    strings: "#032F62",
    names: "#24292E",
    punctuationAndSeparators: "#24292E",
    angleBrackets: "#24292E",
    templateStringBraces: "#D73A49",
    propertyNames: "#005CC5",
    booleansAndAtoms: "#005CC5",
    numbersAndUnits: "#005CC5",
    metaAndComments: "#6A737D"
};

const Theme = EditorView.theme(
    {
        "&": {
            color: editorThemeColors.foreground,
            backgroundColor: editorThemeColors.background
        },
        ".cm-content": {
            caretColor: editorThemeColors.cursor
        },
        ".cm-cursor, .cm-dropCursor": {
            borderLeftColor: editorThemeColors.cursor
        },
        ".cm-selectionBackground, .cm-content ::selection": {
            backgroundColor: editorThemeColors.selection
        },
        ".cm-panels": {
            backgroundColor: editorThemeColors.darkBackground,
            color: editorThemeColors.foreground
        },
        ".cm-activeLine": {
            backgroundColor: editorThemeColors.highlightBackground
        },
        ".cm-gutters": {
            backgroundColor: editorThemeColors.background,
            color: editorThemeColors.gutter,
            border: "none"
        },
        ".cm-tooltip": {
            backgroundColor: editorThemeColors.tooltipBackground
        },
        ".cm-activeLineGutter": {
            backgroundColor: editorThemeColors.highlightBackground
        }
    },
    { dark: true }
);

const Highlight = HighlightStyle.define([
    { tag: t.keyword, color: editorThemeColors.keyword },
    {
        tag: [t.controlKeyword, t.moduleKeyword],
        color: editorThemeColors.controlFlowAndModuleKeywords
    },
    { tag: [t.function(t.variableName)], color: editorThemeColors.functions },
    { tag: [t.typeName, t.className], color: editorThemeColors.typesAndClasses },
    { tag: t.tagName, color: editorThemeColors.tagNames },
    { tag: t.operator, color: editorThemeColors.operators },
    { tag: t.regexp, color: editorThemeColors.regexes },
    { tag: t.string, color: editorThemeColors.strings },
    { tag: [t.number], color: editorThemeColors.numbersAndUnits },
    { tag: t.comment, color: editorThemeColors.metaAndComments },
    { tag: t.invalid, color: editorThemeColors.invalid },
    { tag: t.propertyName, color: editorThemeColors.propertyNames }
]);

export const LightTheme = [Theme, syntaxHighlighting(Highlight)];
