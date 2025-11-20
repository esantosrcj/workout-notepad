<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import Logo from '$lib/components/header/Logo.svelte';
	import HeaderNav from '$lib/components/header/HeaderNav.svelte';
	import FooterNav from '$lib/components/footer/FooterNav.svelte';
	import type { PageData } from './$types';

	// From load in +layout.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({ email } = data);
</script>

<!-- Use Tailwind’s square bracket notation to generate a class on the fly with any arbitrary value -->
<!-- When an arbitrary value needs to contain a space, use an underscore (_) instead 
 and Tailwind will automatically convert it to a space at build-time -->
<!-- Fr is a fractional unit and 1fr is for 1 part of the available space -->
<div class="grid grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<!-- <div class="hidden md:inline-block w-full max-w-[650px] mx-auto mt-20"> -->
	<header class="hidden md:inline-block">
		<AppBar shadow="shadow-xl" slotTrail="!space-x-2">
			<svelte:fragment slot="lead"><Logo /></svelte:fragment>
			<svelte:fragment slot="trail"><HeaderNav {email} /></svelte:fragment>
		</AppBar>
	</header>

	<!-- Page -->
	<!-- To center a container, use the mx-auto utility -->
	<!-- grid-cols-1: grid-template-columns: repeat(1, minmax(0, 1fr)); -->
	<!-- The minmax() CSS function defines a size range greater than or equal to min and less than or equal to max -->
	<div class="container mx-auto grid grid-cols-1">
		<!-- Main -->
		<!-- col-span-1: grid-column: span 1 / span 1; -->
		<!-- space-y-*:  control the vertical space between element -->
		<!-- p-4: padding: 1rem; /* 16px */ -->
		<main class="col-span-1 space-y-4 p-4">
			<slot />
		</main>
	</div>

	<footer class="relative md:hidden">
		<FooterNav {email} />
	</footer>
</div>
