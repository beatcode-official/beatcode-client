<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
</script>

<svelte:head>
  <title>BeatCode</title>
</svelte:head>

<div class="mx-auto my-auto flex items-center justify-center">
  <div class="p-6 border border-secondary rounded-md space-y-4">
    <Input class="w-full" placeholder="Enter your name" />
    <Button class="w-full">Create Room</Button>
    <div class="flex space-x-2">
      <Input class="flex-1" placeholder="Enter room code" />
      <Button variant="secondary">Join</Button>
    </div>
  </div>
</div>

<style>
</style>