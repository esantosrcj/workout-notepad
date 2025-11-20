<script lang="ts">
	import type { PageData } from './$types';
	import TempViewExercises from '$lib/components/lstorage/TempViewExercises.svelte';
	import Table from '$lib/components/common/Table.svelte';
	import MobileToolbar from '$lib/components/header/MobileToolbar.svelte';
	import NoData from '$lib/components/common/NoData.svelte';
	import Icon from '@iconify/svelte';

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({
		loggedIn, // Data from parent
		userId, // Data from parent
		routineId, // Data from parent
		workoutId,
		exercises
	} = data);
</script>

<svelte:head>
	<title>Exercises</title>
	<meta name="description" content="Exercises" />
</svelte:head>

<div class="hidden md:block">
	<ol class="breadcrumb">
		<li class="crumb">
			<a class="btn hover:variant-soft-primary" href="/routines">Routines</a>
		</li>
		<li class="crumb-separator" aria-hidden>
			<span><Icon class="text-2xl" icon="mi:chevron-right" /></span>
		</li>
		<li class="crumb">
			<a
				class="btn hover:variant-soft-primary"
				href="/routines/{routineId}/workouts"
			>
				Workouts
			</a>
		</li>
		<li class="crumb-separator" aria-hidden>
			<span><Icon class="text-2xl" icon="mi:chevron-right" /></span>
		</li>
		<li>Exercises</li>
	</ol>
</div>

<MobileToolbar name="Exercises" backRoute="/routines/{routineId}/workouts" />

<div>
	{#if loggedIn}
		<div class="flex flex-col items-center py-16 md:px-4 md:py-8">
			<h2 class="mb-8 hidden text-4xl md:h2 md:inline-block">Exercises.</h2>

			{#if exercises?.length}
				<Table {exercises} />
				<div class="mt-4 flex w-full md:justify-center">
					<a
						class="btn btn-lg bg-secondary-500"
						href="/routines/{routineId}/workouts/{workoutId}/active"
					>
						<span class="text-white">Start Workout</span>
					</a>
				</div>
			{:else}
				<NoData
					type="Exercises"
					addRoute="/create/routines/{routineId}/workouts/{workoutId}/exercises"
				/>
			{/if}
		</div>
	{:else}
		<TempViewExercises {userId} {workoutId} />
	{/if}
</div>
