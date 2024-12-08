<script lang="ts">
    import { onDestroy } from "svelte";
    import { toast } from "svelte-sonner";
    import type { PageData } from "./$types";
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { createWebSocket } from "$lib/websocket.svelte";

    import { Button } from "$components/ui/button";
    import * as Dialog from "$components/ui/dialog";
    import { Separator } from "$components/ui/separator";
    import StatusIndicator from "$components/misc/status-indicator.svelte";

    import type { RoomState } from "$models/room";
    import { Copy, LogOut, Link, Settings } from "lucide-svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let roomState = $state<RoomState>();
    let gameLink = $state<string>("");
    let gameLinkBtn: HTMLElement;

    let isHost = $derived(roomState?.host_name === data.user?.username);

    let userReady = $derived(isHost ? roomState?.host_ready : roomState?.guest_ready);
    let userStatus = $derived(userReady ? 1 : 0);

    let opponentName = $derived(
        isHost ? roomState?.guest_display_name : roomState?.host_display_name
    );
    let opponentReady = $derived(isHost ? roomState?.guest_ready : roomState?.host_ready);
    let opponentStatus = $derived(opponentName ? (opponentReady ? 1 : 0) : -1);

    // Room WebSocket
    const ws = createWebSocket(data?.token ?? "");
    if (data.user) {
        ws.setUrl(`${data.websocketUrl}/rooms/${data.roomCode}`);
        ws.connect();
    }

    $effect(() => {
        if (ws.status === "CLOSED") {
            toast.error(ws.reason ?? "Failed to connect to room");
        }
    });

    $effect(() => {
        if (ws.message) {
            let { type, data } = ws.message;
            switch (type) {
                case "game_started":
                    // goto(`/game/${data.game_id}`);
                    // gameLink = `/game/${data.game_id}`;
                    gameLinkBtn.setAttribute("href", `/game/${data.game_id}`);
                    gameLinkBtn.click();
                    break;
                case "room_state":
                    roomState = data;
                    if (isHost && !userReady) {
                        ws.send("toggle_ready");
                    }
                    break;
                case "settings_updated":
                    if (roomState) {
                        roomState.settings = data;
                    }
                    break;
                case "chat":
                    break;
                case "error":
                    console.log(data);
                    toast.error(data.error_msg);
                    break;
                default:
                    break;
            }
        }
    });

    const startGame = (e: Event) => {
        e.preventDefault();
        if (!roomState?.guest_name) {
            toast.error("Can't start game without an opponent");
        } else if (!opponentReady) {
            toast.error("Opponent is not ready");
        } else {
            console.log("game started");
            ws.send("start_game");
        }
    };

    const toggleReady = () => {
        ws.send("toggle_ready");
    };

    const leaveRoom = () => {
        ws.close();
        goto("/custom");
    };

    // Utils
    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    onDestroy(() => {
        ws.close();
    });
</script>

<div class="mx-auto mt-16 flex flex-col items-center">
    <h1 class="mb-2 text-5xl font-bold">
        {roomState?.host_name ? `${roomState?.host_display_name}'s` : "Game"} Room
    </h1>
    <p class="mb-2 text-xl">Code: {data.roomCode}</p>
    <div class="mb-4 flex items-center gap-2">
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8 p-1.5"
            onclick={() => copy(data.roomCode)}
        >
            <Copy />
        </Button>
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8 p-1.5"
            onclick={() => copy(`${data.websiteUrl}/room/${data.roomCode}`)}
        >
            <Link />
        </Button>
        <form use:enhance action="?/changeSettings" method="post">
            <Button variant="outline" size="icon" class="h-8 w-8 p-1.5" type="submit">
                <Settings />
            </Button>
        </form>
        <Button variant="outline" size="icon" class="h-8 w-8 p-1.5" onclick={leaveRoom}>
            <LogOut />
        </Button>
    </div>
    <div class="my-4 flex w-full items-center justify-center gap-12">
        <div
            class="border-1 h-full w-full max-w-[400px] rounded-xl border border-secondary px-6 py-4"
        >
            <div class="flex items-center">
                <h2 class="mr-2 text-2xl font-semibold">{data.user?.display_name ?? "Player"}</h2>
                <StatusIndicator status={userStatus} />
            </div>
            <p class="text-lg">The mightiest coder of all</p>
        </div>
        <Separator orientation="vertical" text="VS" />
        <div
            class="border-1 h-full w-full max-w-[400px] rounded-xl border border-secondary px-6 py-4{opponentName
                ? ''
                : ' animate-pulse'}"
        >
            <div class="flex items-center">
                <h2 class="mr-2 text-2xl font-semibold">
                    {opponentName || "Waiting for opponent..."}
                </h2>
                <StatusIndicator status={opponentStatus} />
            </div>
            {#if opponentName}
                <p class="text-lg">The brave one who dares to challenge you</p>
            {:else}
                <p class="text-lg">Who will it be?</p>
            {/if}
        </div>
    </div>
    {#if isHost}
        <Button size="lg" class="mt-4 text-lg" onclick={startGame}>Start Game</Button>
    {:else if userReady}
        <Button size="lg" class="mt-4 text-lg" variant="ghost" onclick={toggleReady}
            >Cancel Ready</Button
        >
    {:else}
        <Button size="lg" class="mt-4 text-lg" onclick={toggleReady}>Ready</Button>
    {/if}
    <a
        bind:this={gameLinkBtn}
        href={gameLink}
        target="_blank"
        data-sveltekit-reload
        aria-label="Game Link"
    ></a>
</div>

<!-- If not authenticated - prompt user to sign in -->
<Dialog.Root open={!data.user}>
    <Dialog.Content class="sm:max-w-[425px]" hideCloseButton interactOutsideBehavior="ignore">
        <Dialog.Header>
            <Dialog.Title>Umm, akshually you can't join yet ☝️🤓</Dialog.Title>
            <Dialog.Description>Please sign in to join</Dialog.Description>
        </Dialog.Header>
        <form method="POST" use:enhance action="?/joinRoomAsGuest">
            <Button href={`/login?joining=${data.roomCode}`}>Sign in</Button>
            <Button type="submit" variant="ghost">Play as guest</Button>
        </form>
    </Dialog.Content>
</Dialog.Root>

<style>
</style>
