<script lang="ts">
    import type { PageData } from "./$types";
    import { type Infer, superForm } from "sveltekit-superforms";

    import * as Card from "$components/ui/card";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
    import { Button } from "$components/ui/button";

    import { announce } from "$lib/utils";
    import type { RegisterSchema } from "$models/auth";

    import { Loader2 } from "lucide-svelte";
    import LogoVertical from "$assets/images/logo-vertical.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const form = superForm<Infer<typeof RegisterSchema>>(data.form, {
        onResult: async ({ result }) => {
            announce(result, "Account created successfully");
        },
        resetForm: false
    });

    const { form: formData, submitting, enhance } = form;
</script>

<div class="flex h-navscreen justify-center bg-background">
    <Card.Root class="mt-12 h-fit w-[350px]">
        <Card.Header>
            <div class="my-3 flex w-full justify-center">
                <LogoVertical />
            </div>
        </Card.Header>
        <form method="POST" use:enhance>
            <Card.Content>
                <!-- {#if error}
                    <div class="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                        {error}
                    </div>
                {/if} -->
                <div class="grid w-full items-center space-y-2">
                    <div class="flex flex-col">
                        <Form.Field {form} name="username">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.username}
                                        type="text"
                                        placeholder="Username"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                    <div class="flex flex-col">
                        <Form.Field {form} name="display_name">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.display_name}
                                        type="text"
                                        placeholder="Display Name"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                    <div class="flex flex-col">
                        <Form.Field {form} name="email">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.email}
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                    <div class="flex flex-col">
                        <Form.Field {form} name="password">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.password}
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                    <div class="flex flex-col">
                        <Form.Field {form} name="confirm_password">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.confirm_password}
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                </div>
            </Card.Content>
            <Card.Footer class="flex flex-col gap-2">
                <Button class="w-full" type="submit" disabled={$submitting}>
                    {#if $submitting}
                        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Create Account
                </Button>
                <p class="mt-2 text-center text-sm text-muted-foreground">
                    Already have an account?
                    <a href="/login" class="text-primary hover:underline">Sign in</a>
                </p>
            </Card.Footer>
        </form>
    </Card.Root>
</div>
