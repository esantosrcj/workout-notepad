<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import MobileToolbar from '$lib/components/header/MobileToolbar.svelte';
	import InProgress from '$lib/components/list/InProgressExercises.svelte';
	import type { UserExercise } from '$lib/types/workout-log';
	import { getRoutine } from '$lib/utils/lstorage';

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({
		loggedIn, // Data from parent
		userId, // Data from parent
		routineId, // Data from parent
		workoutId, // Data from parent
		exercises
	} = data);

	let tempExercises: UserExercise[] = [];

	onMount(() => {
		const routine = getRoutine(userId);
		if (routine) {
			const workouts = [...routine.workouts];
			if (workouts?.length) {
				const workout = workouts.find((w) => w.id === workoutId);
				if (workout) {
					tempExercises = [...workout.exercises];
				}
			}
		}
	});
</script>

<svelte:head>
	<title>Workout In Progress</title>
	<meta name="description" content="Workout In Progress" />
</svelte:head>

<MobileToolbar
	name="In Progress"
	backRoute="/routines/{routineId}/workouts/{workoutId}/exercises"
/>

<div>
	{#if loggedIn}
		<InProgress {exercises} {routineId} {workoutId} />
	{:else}
		<InProgress exercises={tempExercises} {routineId} {workoutId} />
	{/if}
</div>
