<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	import heroLarge from '$lib/images/gym-studio-large.jpg';
	import heroSmall from '$lib/images/gym-studio-small.jpg';
	import Icon from '@iconify/svelte';

	// From load in +layout.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({ registeredId } = data);

	onMount(() => {
		if (browser) {
			if (registeredId) {
				// DELETE temp routine from local storage
				localStorage.removeItem(registeredId);
			}
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home" />
</svelte:head>

<section>
	<div
		class="grid grid-cols-1 items-center md:gap-10 xl:h-screen xl:grid-cols-2 xl:content-center"
	>
		<div
			class="flex flex-col items-center space-y-8 p-4 md:p-8 xl:items-center xl:text-left"
		>
			<div class="text-center xl:text-left">
				<h1 class="h1 max-w-[600px] !text-3xl md:!text-6xl">
					Every Rep Counts: Track Your Workouts
				</h1>
			</div>
			<p class="max-w-[600px] !text-lg md:!text-xl">
				Start logging today and see the difference consistency makes. Every
				workout logged brings you one step closer to your goals, turning small,
				daily efforts into significant long-term results.
			</p>
			<a href="/create/routines" class="variant-filled-primary btn">
				<span>Get Started</span>
				<span>
					<Icon class="text-xl" icon="mi:arrow-right" />
				</span>
			</a>
		</div>

		<div class="pt-8">
			<img
				src={heroLarge}
				srcset={`${heroSmall} 480w, ${heroLarge} 1080w`}
				alt="Weight bags in a gym studio"
			/>
		</div>
	</div>
	<footer class="relative">
		<div class="fixed bottom-0 left-0 right-0 clear-both inline-block w-full">
			<div class="flex justify-center">
				<p>Designed by Eddie Santos | Powered by King Hippo</p>
			</div>
		</div>
	</footer>
</section>
