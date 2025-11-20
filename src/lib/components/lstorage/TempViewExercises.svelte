<script lang="ts">
	import { onMount } from 'svelte';
	import { getRoutine } from '$lib/utils/lstorage';
	import type { UserExercise, Routine } from '$lib/types/workout-log';
	import NoData from '../common/NoData.svelte';
	import Table from '$lib/components/common/Table.svelte';

	export let userId: string;
	export let workoutId: string;

	let routine: Routine | undefined;
	let userExercises: UserExercise[] = [];

	onMount(() => {
		routine = getRoutine(userId);
		if (routine) {
			const workouts = [...routine.workouts];
			if (workouts?.length) {
				const workout = workouts.find((w) => w.id === workoutId);
				if (workout) {
					userExercises = [...workout.exercises];
				}
			}
		}
	});
</script>

<div class="flex flex-col items-center py-16 md:px-4 md:py-8">
	<h2 class="mb-8 hidden text-4xl md:h2 md:inline-block">Exercises.</h2>

	{#if userExercises?.length}
		<Table exercises={userExercises} />
		<div class="mt-4 flex w-full md:justify-center">
			<a
				class="btn btn-lg bg-secondary-500"
				href="/routines/{routine?.id}/workouts/{workoutId}/active"
			>
				<span class="text-white">Start Workout</span>
			</a>
		</div>
	{:else}
		<NoData
			type="Exercises"
			addRoute="/create/routines/{routine?.id}/workouts/{workoutId}/exercises"
		/>
	{/if}
</div>
