<script lang="ts">
	import HeroImg from "$lib/assets/images/hero.png";
	import { Button } from "$lib/components/ui/button";

	let count = 0;
</script>

<section class="flex overflow-hidden flex-col items-center">
	<div class="flex flex-col items-center mt-24 mb-4 text-5xl leading-none max-md:mt-10 max-md:max-w-full max-md:text-4xl">
		<h1 class="font-semibold text-center text-neutral-100 max-md:max-w-full max-md:text-4xl">
			Head-to-head live codingff battle
		</h1>
		<div class="flex gap-4 justify-center items-center mt-3 whitespace-nowrap max-md:text-4xl">
			<span class="gap-2.5 self-stretch pb-2 my-auto font-semibold text-neutral-100 max-md:text-4xl">
				with
			</span>
			<span class="gap-2.5 self-stretch px-2 py-0.5 my-auto font-mono bg-rose text-rose-foreground max-md:text-4xl">
				magic
			</span>
		</div>
	</div>
	<a href="/custom">
		<Button class="font-medium text-lg">Start now</Button>
	</a>
	<img loading="lazy" src={HeroImg} alt="Hero" class="object-contain w-[50%] max-md:w-[80%]" />
</section>
