<script lang="ts">
    import LogoHorizontal from "$assets/images/logo-horizontal.svelte";
    import type { User } from "$lib/models/user";

    import ProfileMenu from "./profile-menu.svelte";
    import { Button } from "$components/ui/button";

    interface Props {
        user?: User;
    }

    const { user }: Props = $props();
</script>

<nav
    class="flex h-nav w-full flex-col items-center justify-center self-stretch overflow-hidden px-8 max-md:max-w-full"
>
    <div
        class="flex min-h-[80px] w-full max-w-[1280px] flex-wrap items-center justify-between gap-10"
    >
        <div class="my-auto flex items-center gap-1.5 self-stretch whitespace-nowrap text-2xl">
            <a href="/">
                <LogoHorizontal />
            </a>
        </div>
        {#if !user}
            <Button
                class="my-auto self-stretch text-sm leading-7 text-secondary"
                variant="link"
                href="/login"
            >
                Sign in
            </Button>
        {:else}
            <ProfileMenu {user} />
        {/if}
    </div>
</nav>
