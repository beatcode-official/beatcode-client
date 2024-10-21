<script lang="ts">
  import LogoWithText from "$images/logo-with-text.svelte";
</script>

<nav class="flex overflow-hidden flex-col justify-center items-center self-stretch w-full max-md:max-w-full">
  <div class="flex flex-wrap gap-10 justify-between items-center w-full min-h-[80px] max-w-[1280px]">
    <div class="flex gap-1.5 items-center self-stretch my-auto text-2xl whitespace-nowrap">
      <a href="/">
        <LogoWithText class="h-8 w-auto" />
      </a>
    </div>
    <button class="self-stretch my-auto text-sm leading-7 text-white">Sign in</button>
  </div>
</nav>

<style>
</style>