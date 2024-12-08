<script lang="ts">
    interface Props {
        title?: string;
        description?: string;
    }

    let { title, description }: Props = $props();
    const titleFallback = "Problem Title";
    const descriptionFallback = `
        <p>
            Code Minecraft in O(1) bro (Just kidding. Please wait for problem to load :D)
        </p>
    `;
</script>

<div class="h-full bg-background px-4 py-5">
    <h2 class="mb-4 text-2xl font-bold">{title ?? titleFallback}</h2>
    <div>
        <!-- eslint-disable svelte/no-at-html-tags -->
        {@html description ?? descriptionFallback}
    </div>
</div>
