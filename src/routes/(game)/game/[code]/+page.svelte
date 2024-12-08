<script lang="ts">
    import { onDestroy } from "svelte";
    import { toast } from "svelte-sonner";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import { createWebSocket } from "$lib/websocket.svelte";
    import type { GameState, ProblemDetails, SubmissionResults } from "$models/game";
    import { Problem, Test, Abilities } from "$components/game/panel";

    import AvatarImg from "$assets/images/avatar.jpg";

    import * as Avatar from "$components/ui/avatar";
    import { Button } from "$components/ui/button";
    import * as Dialog from "$components/ui/dialog";
    import { Progress } from "$components/ui/progress";
    import * as Resizable from "$components/ui/resizable";

    import { Editor, EditorData } from "$components/game/editor";

    import {
        Play,
        FileText,
        SquareCode,
        CheckSquare,
        Loader,
        LogOut,
        Sparkles
    } from "lucide-svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let selected = $state<number>(0);
    let gameState = $state<GameState>();
    let currentProblem = $state<ProblemDetails>();
    let isSubmitting = $state(false);
    let submissionResults = $state<SubmissionResults>();
    let winner = $state<string | null>(null);
    let lightMode = $state<boolean>(false);

    const tabs = [
        { name: "Test Cases", icon: CheckSquare },
        { name: "Abilities", icon: Sparkles }
    ];

    // Editor
    const editorData = new EditorData();
    // Reset code in editor when currentProblem changes if it's a new one
    // $effect.pre(() => {
    //     let prevProblemTitle = currentProblem?.title;
    //     tick().then(() => {
    //         if (currentProblem?.title !== prevProblemTitle) {
    //             editorData.setCode(`${currentProblem?.boilerplate ?? "def Solution():"}\n    `);
    //         }
    //     });
    // });

    $effect(() => {
        editorData.setCode(`${currentProblem?.boilerplate ?? "def Solution():"}\n    `);
    });

    const checkHP = (newState: GameState) => {
        if (!gameState) return;
        if (newState.your_hp < gameState.your_hp) {
            const damage = gameState.your_hp - newState.your_hp;
            toast.error(`${gameState.opponent_display_name} have dealt ${damage} damage`);
        } else if (newState.opponent_hp < gameState.opponent_hp) {
            const damage = gameState.opponent_hp - newState.opponent_hp;
            toast.success(`You have dealt ${damage} damage to ${gameState.opponent_display_name}`);
        }
    };

    const checkAbilityPurchase = (newState: GameState) => {
        if (!gameState) return;
        // Scuffed way to do it but it's 5am
        const oldInventory = new Set(gameState.abilities);
        const newInventory = new Set(newState.abilities);
        const diff = newInventory.difference(oldInventory);
        if (diff.size !== 0) {
            toast.success(`You have purchased ${diff.values().next().value}!`);
        }
    };

    const processAbilityUsage = (user: string, ability: string) => {
        if (user === data.user?.username) return;
        editorData.triggerAbility(ability);
        if (ability === "lightio") {
            lightMode = true;
            console.log(lightMode);
            setTimeout(() => {
                lightMode = false;
            }, 30000);
        }
    };

    // WebSocket connection
    const ws = createWebSocket(data?.token ?? "");
    ws.setUrl(`${data.websocketUrl}/game/play/${data.gameId}`);
    ws.connect();

    $effect(() => {
        if (ws.status === "CLOSED") {
            toast.error(ws.reason ?? "Failed to connect to game");
            goto("/home");
        }
    });

    $effect(() => {
        if (ws.message) {
            let { type, data } = ws.message;
            switch (type) {
                case "ability_used":
                    toast.info(`✨ ${data.player} used ${data.ability}!!`);
                    processAbilityUsage(data.player, data.ability);
                    break;
                case "game_state":
                    checkHP(data);
                    checkAbilityPurchase(data);
                    gameState = data;
                    break;
                case "problem":
                    currentProblem = data;
                    break;
                case "submission_result":
                    submissionResults = data;
                    break;
                case "error":
                    toast.error(data.message);
                    break;
                case "match_end":
                    toast.success("Match ended");
                    break;
                default:
                    break;
            }
        }
    });

    // Actions
    const buyAbility = (ability: string) => {
        console.log(ability);
        ws.send("ability", {
            action: "buy",
            ability_id: ability
        });
    };

    const useAbility = (ability: string) => {
        console.log(ability);
        ws.send("ability", {
            action: "use",
            ability_id: ability
        });
    };

    const submitCode = () => {
        const code = editorData.getCode();
        console.log(code);
        ws.send("submit", { code });
    };

    const forfeit = () => {
        ws.send("forfeit");
        goto("/home");
    };

    onDestroy(() => {
        ws.close();
    });
</script>

<div
    class="absolute left-0 top-0 flex min-h-screen w-screen flex-col overflow-hidden bg-background-dark"
>
    <div class="flex items-center justify-between gap-4 px-4 py-2 text-white">
        <div class="flex w-full">
            <Avatar.Root class="mr-2">
                <Avatar.Image src={AvatarImg} alt="User" />
                <Avatar.Fallback>You</Avatar.Fallback>
            </Avatar.Root>
            <div class="w-full">
                <div class="mb-1 font-semibold">{data.user?.display_name ?? "You"}</div>
                <Progress max={100} value={gameState?.your_hp ?? 0} class="h-2" />
            </div>
        </div>
        <div class="flex space-x-0.5">
            <Button
                variant="secondary"
                size="sm"
                class="rounded-r-none bg-neutral"
                onclick={submitCode}
            >
                {#if isSubmitting}
                    <Loader class="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                {:else}
                    <Play class="mr-2 h-4 w-4" />
                    Submit Code
                {/if}
            </Button>
            <Button
                variant="secondary"
                size="sm"
                class="rounded-l-none bg-neutral px-2.5"
                onclick={forfeit}
            >
                <LogOut />
            </Button>
        </div>
        <div class="flex w-full">
            <div class="w-full">
                <div class="mb-1 text-right font-semibold">
                    {gameState?.opponent_display_name ?? "Opponent"}
                </div>
                <Progress
                    max={100}
                    value={gameState?.opponent_hp ?? 0}
                    isOpposite={true}
                    barClass="bg-rose"
                    class="h-2"
                />
            </div>
            <Avatar.Root class="ml-2">
                <Avatar.Image src={AvatarImg} alt="Opponent" />
                <Avatar.Fallback>Them</Avatar.Fallback>
            </Avatar.Root>
        </div>
    </div>

    <Resizable.PaneGroup direction="horizontal" class="flex-1 px-2 pb-2">
        <Resizable.Pane defaultSize={50}>
            <div
                class="flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-secondary bg-background"
            >
                <div class="flex gap-1 bg-neutral text-neutral-foreground">
                    <div class="flex p-2">
                        <FileText class="mr-1 p-1" />
                        <span class="font-semibold">Problem</span>
                    </div>
                </div>
                <div class="h-full w-full overflow-auto">
                    <Problem
                        title={currentProblem?.title}
                        description={currentProblem?.description}
                    />
                </div>
            </div>
        </Resizable.Pane>
        <Resizable.Handle class="mx-0.5 w-[2px] bg-transparent hover:bg-blue-500" />
        <Resizable.Pane defaultSize={50}>
            <Resizable.PaneGroup direction="vertical">
                <Resizable.Pane defaultSize={75}>
                    <div
                        class="flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-secondary bg-background"
                    >
                        <div class="flex gap-1 bg-neutral text-neutral-foreground">
                            <div class="flex p-2">
                                <SquareCode class="mr-1 p-1" />
                                <span class="font-semibold">Code</span>
                            </div>
                        </div>
                        <div
                            class="h-full w-full overflow-auto px-4 py-2 {lightMode
                                ? 'bg-white'
                                : 'bg-background'}"
                        >
                            <Editor data={editorData} />
                        </div>
                    </div>
                </Resizable.Pane>
                <Resizable.Handle class="my-0.5 !h-[2px] bg-transparent hover:bg-blue-500" />
                <Resizable.Pane defaultSize={25} class="bg-background">
                    <div
                        class="flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-secondary bg-background"
                    >
                        <div
                            class="flex items-center justify-between bg-neutral p-1 text-neutral-foreground"
                        >
                            <div class="flex gap-1">
                                {#each tabs as tab, i}
                                    <button
                                        class="flex cursor-pointer rounded-sm p-1 pr-2 hover:bg-secondary/50 {selected ==
                                        i
                                            ? 'bg-secondary/50'
                                            : 'text-foreground/50'}"
                                        onclick={() => (selected = i)}
                                    >
                                        <tab.icon class="mr-1 p-1" />
                                        <span class="font-semibold">{tab.name}</span>
                                    </button>
                                {/each}
                            </div>
                            <div class="space-x-4 pr-4 font-medium">
                                <span>MP: {gameState?.mana_points ?? 0}</span>
                                <span>SP: {gameState?.skill_points ?? 0}</span>
                            </div>
                        </div>
                        {#if selected === 0}
                            <Test results={submissionResults} />
                        {:else}
                            <Abilities {gameState} {useAbility} {buyAbility} />
                        {/if}
                    </div>
                </Resizable.Pane>
            </Resizable.PaneGroup>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</div>
<Dialog.Root open={winner !== null}>
    <Dialog.Content class="sm:max-w-[425px]" hideCloseButton interactOutsideBehavior="ignore">
        <Dialog.Header>
            <Dialog.Title>{winner} won!</Dialog.Title>
        </Dialog.Header>
        <div class="my-4 flex justify-center">
            <img src="/path/to/avatar.png" alt="Winner Avatar" class="h-24 w-24 rounded-full" />
        </div>
        <Dialog.Footer class="mt-4">
            <Button href="/home">Home</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<style>
</style>
