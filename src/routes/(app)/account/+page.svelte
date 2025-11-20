<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({
		loggedIn, // Data from parent
		email // Data from parent
	} = data);
</script>

<svelte:head>
	<title>Account</title>
	<meta name="description" content="Account" />
</svelte:head>

<div class="flex flex-col items-center py-24 md:px-4 md:py-8">
	<h3 class="mb-4 text-2xl md:h3">Account</h3>

	{#if loggedIn}
		<p class="text-slate-600">Email: {email}</p>
		<button
			class="variant-filled-secondary btn mt-4"
			on:click={() => (window.location.href = '/logout')}
		>
			<span><Icon class="text-2xl text-slate-200" icon="mi:log-out" /></span>
			<span>LOG OUT</span>
		</button>
	{:else}
		<p class="text-slate-600">You are not logged in. Please log in.</p>
		<button
			class="variant-filled-secondary btn mt-4"
			on:click={() => goto('/login')}
		>
			<span><Icon class="text-2xl text-slate-200" icon="mi:log-out" /></span>
			<span>LOG IN</span>
		</button>
	{/if}
</div>
