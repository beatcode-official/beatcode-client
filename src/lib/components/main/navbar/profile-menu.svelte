<script lang="ts">
    import type { User } from "$models/user";
    import { ChevronDown } from "lucide-svelte";
    import AvatarImg from "$assets/images/avatar.jpg";
    import { Ratings } from "$assets/config/game";
    import * as Avatar from "$components/ui/avatar";
    import * as DropdownMenu from "$components/ui/dropdown-menu";
    import { cn } from "$lib/utils";
    import { goto } from "$app/navigation";

    interface Props {
        user: User;
    }

    let { user }: Props = $props();
    const { name: rating, class: ratingClass } = Ratings[user.rating];
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        <div
            class="flex cursor-pointer items-center gap-8 rounded-md px-2 py-1 transition-all duration-150 hover:bg-secondary/25"
        >
            <div class="flex">
                <Avatar.Root class="mr-4 size-12">
                    <Avatar.Image src={AvatarImg} />
                    <Avatar.Fallback>CN</Avatar.Fallback>
                </Avatar.Root>
                <div class="flex flex-col">
                    <p class="mb-1 text-left font-medium">{user.display_name}</p>
                    <div
                        class={cn(
                            "w-fit rounded-sm px-4 pb-px pt-[2px] font-icon text-xs font-bold italic tracking-wider",
                            ratingClass
                        )}
                    >
                        {rating}
                    </div>
                </div>
            </div>
            <ChevronDown class="ml-2 h-4 w-4" />
        </div>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
        <DropdownMenu.Item class="cursor-pointer" onclick={() => goto("/settings")}
            >Settings</DropdownMenu.Item
        >
        <DropdownMenu.Item class="cursor-pointer" onclick={() => goto("/sign-out")}
            >Sign out</DropdownMenu.Item
        >
    </DropdownMenu.Content>
</DropdownMenu.Root>
