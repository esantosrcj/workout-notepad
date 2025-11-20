<script lang="ts">
	import type { PageData } from './$types';
	import TempViewWorkouts from '$lib/components/lstorage/TempViewWorkouts.svelte';
	import MobileToolbar from '$lib/components/header/MobileToolbar.svelte';
	import DisplayList from '$lib/components/list/DisplayList.svelte';
	import DisplayListItem from '$lib/components/list/DisplayListItem.svelte';
	import NoData from '$lib/components/common/NoData.svelte';
	import Icon from '@iconify/svelte';

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({
		loggedIn, // Data from parent
		userId, // Data from parent
		routineId,
		workouts
	} = data);
</script>

<svelte:head>
	<title>Workouts</title>
	<meta name="description" content="Workouts" />
</svelte:head>

<div class="hidden md:block">
	<ol class="breadcrumb">
		<li class="crumb">
			<a class="btn hover:variant-soft-primary" href="/routines">Routines</a>
		</li>
		<li class="crumb-separator" aria-hidden>
			<span><Icon class="text-2xl" icon="mi:chevron-right" /></span>
		</li>
		<li>Workouts</li>
	</ol>
</div>

<MobileToolbar name="Workouts" backRoute="/routines" />

<div>
	{#if loggedIn}
		<div class="flex flex-col items-center py-16 md:px-4 md:py-8">
			<h2 class="mb-8 hidden text-4xl md:h2 md:inline-block">Workouts.</h2>

			{#if workouts?.length}
				<DisplayList>
					{#each workouts as { id, name, day } (id)}
						<DisplayListItem
							route="/routines/{routineId}/workouts/{id}/exercises"
							iconType="list"
							first={`[${day.slice(0, 3)}] ${name}`}
							second={undefined}
						/>
					{/each}
				</DisplayList>
			{:else}
				<NoData
					type="Workouts"
					addRoute="/create/routines/{routineId}/workouts"
				/>
			{/if}
		</div>
	{:else}
		<TempViewWorkouts {userId} {routineId} />
	{/if}
</div>
