<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import TempAdd from '$lib/components/lstorage/TempAddWorkouts.svelte';
	import UserAdd from '$lib/components/user/UserAddWorkouts.svelte';
	import MobileToolbar from '$lib/components/header/MobileToolbar.svelte';
	import Icon from '@iconify/svelte';

	export let form: ActionData;

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({
		loggedIn, // Data from parent
		userId, // Data from parent
		routineId,
		routine,
		workouts
	} = data);
</script>

<svelte:head>
	<title>Add Workouts</title>
	<meta name="description" content="Add Workouts" />
</svelte:head>

<div class="hidden md:block">
	<ol class="breadcrumb">
		<li class="crumb">
			<a class="btn hover:variant-soft-primary" href="/create/routines">
				Routines
			</a>
		</li>
		<li class="crumb-separator" aria-hidden>
			<span><Icon class="text-2xl" icon="mi:chevron-right" /></span>
		</li>
		<li>Workouts</li>
	</ol>
</div>

<MobileToolbar name="Workouts" backRoute="/create/routines" />

{#if loggedIn}
	<UserAdd {routine} {workouts} formName={form?.name} formError={form?.error} />
{:else}
	<TempAdd {userId} {routineId} />
{/if}
