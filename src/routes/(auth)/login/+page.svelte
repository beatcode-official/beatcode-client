<script lang="ts">
    import type { PageData } from "./$types";
    import { type Infer, superForm } from "sveltekit-superforms";
    import { goto } from "$app/navigation";

    import * as Card from "$components/ui/card";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
    import { Button } from "$components/ui/button";

    import { announce } from "$lib/utils";
    import type { LoginSchema } from "$models/auth";

    import { Loader2 } from "lucide-svelte";
    import LogoVertical from "$assets/images/logo-vertical.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let loading = $state(false);

    const form = superForm<Infer<typeof LoginSchema>>(data.form, {
        onResult: async ({ result }) => {
            loading = false;
            console.log(result);
            if (result.type === "redirect") {
                goto("/home");
            }
            announce(result, "Logged in successfully");
        }
    });

    const { form: formData, enhance } = form;
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
                <!-- {#if authError || form?.error}
                    <div class="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                        {#if form?.error === "Email not verified"}
                            Please verify your email before logging in. Check your inbox for the
                            verification link.
                        {:else if authError}
                            {authError}
                        {:else}
                            {form?.error}
                        {/if}
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
                                        placeholder="Username or Email"
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
                                    <a
                                        href="/forgot-password"
                                        class="text-right text-sm text-secondary hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                </div>
            </Card.Content>
            <Card.Footer class="flex flex-col gap-2">
                <Button class="w-full" type="submit" disabled={loading}>
                    {#if loading}
                        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Sign In
                </Button>
                <p class="mt-2 text-center text-sm text-muted-foreground">
                    Don't have an account yet? <a
                        href="/register"
                        class="text-primary hover:underline">Sign up</a
                    >
                </p>
            </Card.Footer>
        </form>
    </Card.Root>
</div>
