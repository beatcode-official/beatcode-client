<script lang="ts">
    import type { SubmissionResults } from "$lib/models/game";
    import { cn } from "$lib/utils";

    interface Props {
        sampleTestCases?: string[];
        results?: SubmissionResults;
    }

    let { sampleTestCases, results }: Props = $props();
    let selected = $state<number>(results?.test_results?.findIndex((test) => !test.passed) ?? 0);
</script>

<div class="w-full overflow-y-auto bg-background p-4">
    {#if results}
        {#if results.success}
            <div class="space-y-4">
                <span class="text-xl font-medium text-destructive">Wrong Answer</span>
                <div class="flex flex-wrap gap-x-2 gap-y-4">
                    {#each results.test_results as details, i}
                        <button
                            class={cn(
                                "flex cursor-pointer items-center rounded-lg px-4 py-1 font-medium text-foreground/50 hover:bg-accent/10 hover:text-foreground",
                                selected === i ? "bg-accent/10 text-foreground" : ""
                            )}
                            onclick={() => (selected = i)}
                        >
                            <div
                                class={cn(
                                    "mr-2 h-1 w-1 rounded-full",
                                    details.passed ? "bg-green-400" : "bg-red-500"
                                )}
                            ></div>
                            <div>Case {i + 1}</div>
                        </button>
                    {/each}
                </div>
                <div class="space-y-4">
                    <!-- Input -->
                    {#if sampleTestCases && selected < sampleTestCases.length}
                        <div>
                            <h4 class="mb-2 text-xs font-medium text-muted/75">Input</h4>
                            <div class="rounded-sm bg-neutral p-3 font-mono">
                                {sampleTestCases[selected]}
                            </div>
                        </div>
                    {/if}
                    <!-- Output -->
                    <div>
                        <h4 class="mb-2 text-xs font-medium text-muted/75">Output</h4>
                        {#if results?.test_results?.[selected]?.output}
                            <div class="rounded-sm bg-neutral p-3 font-mono">
                                {results?.test_results?.[selected]?.output}
                            </div>
                        {:else}
                            <div
                                class="rounded-sm bg-destructive/10 p-3 font-mono text-destructive"
                            >
                                {results?.test_results?.[selected]?.error}
                            </div>
                        {/if}
                    </div>

                    <!-- Expected -->
                    <div>
                        <h4 class="mb-2 text-xs font-medium text-muted/75">Expected</h4>
                        <div class="rounded-sm bg-neutral p-3 font-mono">
                            {results?.test_results?.[selected]?.expected}
                        </div>
                    </div>
                </div>
            </div>
        {:else}
            <div class="space-y-4">
                <span class="text-xl font-medium text-destructive">Runtime Error</span>
                <div class="rounded-lg bg-destructive/10 p-3 font-mono text-destructive">
                    <span>{results?.message ?? "No output"}</span>
                </div>
            </div>
        {/if}
    {:else}
        <div class="h-full w-full">
            <p>Test cases are not available, please run your code first.</p>
        </div>
    {/if}
</div>

<style>
</style>
