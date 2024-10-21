<script lang="ts">
  import '../app.postcss';
  import Navbar from '$lib/components/macro/navbar.svelte';
</script>

<svelte:head>
  <title>BeatCode</title>
</svelte:head>

<Navbar />
<main class="min-h-[calc(100dvh-80px)] bg-background">
  <slot />
</main>