<script lang="ts">
    import type { Snippet } from "svelte";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
    import * as Tooltip from "$components/ui/tooltip";
    import * as Select from "$components/ui/select";
    import type { Infer, SuperForm } from "sveltekit-superforms";
    import { RoomSettingsSchema } from "$models/room";
    import { Info } from "lucide-svelte";

    interface Props {
        form: SuperForm<Infer<typeof RoomSettingsSchema>>;
        action: string;
        children: Snippet;
    }

    let { form, action, children: childrenElem }: Props = $props();
    const { form: formData, enhance } = form;
</script>

<Tooltip.Provider delayDuration={150}>
    <form method="POST" use:enhance {action}>
        <div class="space-y-4">
            <div class="w-full space-y-2">
                <h3 class="font-semibold capitalize">Starting stats</h3>
                <div class="flex gap-2">
                    <!-- Starting HP -->
                    <Form.Field {form} name="starting_hp" class="flex-1">
                        <Form.Control>
                            {#snippet children({ props })}
                                <div class="flex items-center gap-2">
                                    <Form.Label>HP</Form.Label>
                                    <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                                        <Tooltip.Trigger>
                                            <Info class="h-4 w-4 text-muted" />
                                        </Tooltip.Trigger>
                                        <Tooltip.Content
                                            class="border border-secondary bg-background-dark text-sm text-foreground"
                                            >Health Points</Tooltip.Content
                                        >
                                    </Tooltip.Root>
                                </div>
                                <Input
                                    type="number"
                                    {...props}
                                    bind:value={$formData.starting_hp}
                                />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                    <!-- Starting SP -->
                    <Form.Field {form} name="starting_sp" class="flex-1">
                        <Form.Control>
                            {#snippet children({ props })}
                                <div class="flex items-center gap-2">
                                    <Form.Label>SP</Form.Label>
                                    <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                                        <Tooltip.Trigger>
                                            <Info class="h-4 w-4 text-muted" />
                                        </Tooltip.Trigger>
                                        <Tooltip.Content
                                            class="border border-secondary bg-background-dark text-sm text-foreground"
                                            >Skill Points - for buying new abilities</Tooltip.Content
                                        >
                                    </Tooltip.Root>
                                </div>
                                <Input
                                    type="number"
                                    {...props}
                                    bind:value={$formData.starting_sp}
                                />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                    <!-- Starting MP -->
                    <Form.Field {form} name="starting_mp" class="flex-1">
                        <Form.Control>
                            {#snippet children({ props })}
                                <div class="flex items-center gap-2">
                                    <Form.Label>MP</Form.Label>
                                    <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                                        <Tooltip.Trigger>
                                            <Info class="h-4 w-4 text-muted" />
                                        </Tooltip.Trigger>
                                        <Tooltip.Content
                                            class="border border-secondary bg-background-dark text-sm text-foreground"
                                            >Mana Points - for using abilities</Tooltip.Content
                                        >
                                    </Tooltip.Root>
                                </div>
                                <Input
                                    type="number"
                                    min="1"
                                    max="1000"
                                    {...props}
                                    bind:value={$formData.starting_mp}
                                />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                </div>
                <!-- Problem Count -->
                <Form.Field {form} name="problem_count">
                    <Form.Control>
                        {#snippet children({ props })}
                            <div class="flex items-center gap-2">
                                <Form.Label>Problem Count</Form.Label>
                                <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                                    <Tooltip.Trigger>
                                        <Info class="h-4 w-4 text-muted" />
                                    </Tooltip.Trigger>
                                    <Tooltip.Content
                                        class="border border-secondary bg-background-dark text-sm text-foreground"
                                        >Number of problems to solve per match</Tooltip.Content
                                    >
                                </Tooltip.Root>
                            </div>
                            <Input type="number" {...props} bind:value={$formData.problem_count} />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <!-- Mana Recharge -->
                <Form.Field {form} name="mana_recharge">
                    <Form.Control>
                        {#snippet children({ props })}
                            <div class="flex items-center gap-2">
                                <Form.Label>MP Recharge</Form.Label>
                                <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                                    <Tooltip.Trigger>
                                        <Info class="h-4 w-4 text-muted" />
                                    </Tooltip.Trigger>
                                    <Tooltip.Content
                                        class="border border-secondary bg-background-dark text-sm text-foreground"
                                        >How much MP is recharged for each problem solved</Tooltip.Content
                                    >
                                </Tooltip.Root>
                            </div>
                            <Input type="number" {...props} bind:value={$formData.mana_recharge} />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
            <!-- Damage Multiplier -->
            <div class="w-full space-y-2">
                <h3 class="font-semibold capitalize">Damage Multiplier per difficulty</h3>
                <!-- Base HP Deduction -->
                <Form.Field {form} name="base_hp_deduction">
                    <Form.Control>
                        {#snippet children({ props })}
                            <div class="flex gap-2">
                                <Form.Label>Base Damage</Form.Label>
                                <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                                    <Tooltip.Trigger>
                                        <Info class="h-4 w-4 text-muted" />
                                    </Tooltip.Trigger>
                                    <Tooltip.Content
                                        class="border border-secondary bg-background-dark text-sm text-foreground"
                                        >How much HP you lose when your opponent pass a test case</Tooltip.Content
                                    >
                                </Tooltip.Root>
                            </div>
                            <Input
                                type="number"
                                {...props}
                                bind:value={$formData.base_hp_deduction}
                            />
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <div class="flex w-full gap-2">
                    <Form.Field {form} name="hp_multiplier_easy" class="flex-1">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Easy</Form.Label>
                                <Input
                                    type="number"
                                    step="any"
                                    {...props}
                                    bind:value={$formData.hp_multiplier_easy}
                                />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                    <Form.Field {form} name="hp_multiplier_medium" class="flex-1">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Medium</Form.Label>
                                <Input
                                    type="number"
                                    step="any"
                                    {...props}
                                    bind:value={$formData.hp_multiplier_medium}
                                />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                    <Form.Field {form} name="hp_multiplier_hard" class="flex-1">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Hard</Form.Label>
                                <Input
                                    type="number"
                                    step="any"
                                    {...props}
                                    bind:value={$formData.hp_multiplier_hard}
                                />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                </div>
            </div>
            <!-- Distribution Mode -->
            <div class="w-full space-y-2">
                <h3 class="font-semibold capitalize">
                    Problem difficulties distribution (out of 1)
                </h3>
                <Form.Field {form} name="distribution_mode">
                    <Form.Control>
                        {#snippet children({ props })}
                            <div class="flex items-center gap-2">
                                <Form.Label>Distribution Mode</Form.Label>
                                <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                                    <Tooltip.Trigger>
                                        <Info class="h-4 w-4 text-muted" />
                                    </Tooltip.Trigger>
                                    <Tooltip.Content
                                        class="border border-secondary bg-background-dark text-sm text-foreground"
                                    >
                                        <p>
                                            <b>auto</b> - problems are randomly distributed following
                                            the distribution
                                        </p>
                                        <p>
                                            <b>fixed</b> - easy and medium follow distribution, remaining
                                            go to hard
                                        </p>
                                    </Tooltip.Content>
                                </Tooltip.Root>
                            </div>
                            <Select.Root
                                type="single"
                                bind:value={$formData.distribution_mode}
                                name={props.name}
                            >
                                <Select.Trigger {...props}
                                    >{$formData.distribution_mode ?? "Select"}</Select.Trigger
                                >
                                <Select.Content>
                                    <Select.Item value="auto">auto</Select.Item>
                                    <Select.Item value="fixed">fixed</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        {/snippet}
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <!-- Probability -->
                <div class="flex w-full gap-2">
                    <Form.Field {form} name="prob_easy" class="flex-1">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Easy</Form.Label>

                                <Input
                                    type="number"
                                    step="any"
                                    {...props}
                                    bind:value={$formData.prob_easy}
                                />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                    <Form.Field {form} name="prob_medium" class="flex-1">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Medium</Form.Label>
                                <Input
                                    type="number"
                                    step="any"
                                    {...props}
                                    bind:value={$formData.prob_medium}
                                />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                    <Form.Field {form} name="prob_hard" class="flex-1">
                        <Form.Control>
                            {#snippet children({ props })}
                                <Form.Label>Hard</Form.Label>
                                <Input
                                    type="number"
                                    step="any"
                                    {...props}
                                    bind:value={$formData.prob_hard}
                                />
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                </div>
            </div>
            {@render childrenElem?.()}
        </div>
    </form>
</Tooltip.Provider>

<style>
</style>
