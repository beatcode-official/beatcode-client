<script lang="ts">
    import { browser } from "$app/environment";
    import { EditorView } from "@codemirror/view";
    import { EditorData } from "./editor-data.svelte";

    interface Props {
        data: EditorData;
    }

    let { data }: Props = $props();
    let editor = $state<HTMLDivElement>();
    let editorView: EditorView;

    $effect(() => {
        editorView = new EditorView({
            parent: editor
        });

        data.link(editorView);

        return () => {
            editorView.destroy();
        };
    });
</script>

{#if browser}
    <div bind:this={editor} class="h-full w-full"></div>
{:else}
    <!-- fallback -->
    <div class="flex h-full w-full items-center justify-center">
        <p>Editor is not available outside the browser environment.</p>
    </div>
{/if}

<style>
</style>
