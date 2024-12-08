<script lang="ts">
    import { type Infer, superForm } from "sveltekit-superforms";

    import type { PageData } from "./$types";
    import type { RoomSettingsSchema, JoinRoomSchema } from "$models/room";

    import Logo from "$assets/icons/logo.svelte";
    import * as Form from "$components/ui/form";
    import * as Dialog from "$components/ui/dialog";
    import { Input } from "$components/ui/input";
    import { Button, buttonVariants } from "$components/ui/button";
    import { RoomSettingsForm } from "$components/game/room";
    import { announce } from "$lib/utils";
    import { Separator } from "$components/ui/separator";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    const createRoomForm = superForm<Infer<typeof RoomSettingsSchema>>(data.createRoomForm, {
        id: "create-room",
        onResult: ({ result }) => {
            announce(result, "Creating room...");
        }
    });
    const joinRoomForm = superForm<Infer<typeof JoinRoomSchema>>(data.joinRoomForm, {
        id: "join-room",
        onResult: ({ result }) => {
            announce(result, "Joining room...");
        }
    });

    const { form: joinRoomFormData, enhance: enhanceJoinRoom } = joinRoomForm;
</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

<div class="mx-auto mt-16 max-w-96 space-y-4 rounded-md border border-secondary p-6">
    <div class="mb-6 flex flex-col items-center">
        <Logo class="h-16 w-16" />
        <h1 class="font-icon text-3xl font-medium">Custom Mode</h1>
    </div>

    <div class="space-y-2">
        <!-- Join room -->
        <form class="flex w-full space-x-2" method="POST" use:enhanceJoinRoom action="?/joinRoom">
            <Form.Field form={joinRoomForm} name="room_code" class="flex-1">
                <Form.Control>
                    {#snippet children({ props })}
                        <Input
                            {...props}
                            placeholder="Enter room code"
                            bind:value={$joinRoomFormData.room_code}
                        />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Button variant="secondary" size="sm" type="submit">Join</Button>
        </form>
    </div>
    <Button class="w-full" variant="accent" href="/custom/lobby">Browse Lobby</Button>
    <Separator text="OR" />
    <!-- Create room -->
    <Dialog.Root>
        <Dialog.Trigger class="w-full {buttonVariants()}">Create New Room</Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
            <Dialog.Header>
                <Dialog.Title>Create a new room</Dialog.Title>
                <Dialog.Description>Please fill out the room settings below.</Dialog.Description>
            </Dialog.Header>
            <RoomSettingsForm form={createRoomForm} action="?/createRoom">
                <Dialog.Footer>
                    <Button type="submit">Create Room</Button>
                </Dialog.Footer>
            </RoomSettingsForm>
        </Dialog.Content>
    </Dialog.Root>
</div>

<style>
</style>
