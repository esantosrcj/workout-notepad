<script lang="ts">
	import { onMount } from 'svelte';
	import { getRoutine } from '$lib/utils/lstorage';
	import type { Routine, Workout } from '$lib/types/workout-log';
	import DisplayList from '../list/DisplayList.svelte';
	import DisplayListItem from '../list/DisplayListItem.svelte';
	import NoData from '../common/NoData.svelte';

	export let userId: string;
	export let routineId: string;

	let routine: Routine | undefined;
	let workouts: Workout[] = [];

	onMount(() => {
		routine = getRoutine(userId);
		if (routine) {
			workouts = [...routine.workouts];
		}
	});
</script>

<div class="flex flex-col items-center py-16 md:px-4 md:py-8">
	<h2 class="mb-8 hidden text-4xl md:h2 md:inline-block">Workouts.</h2>

	{#if workouts?.length}
		<DisplayList>
			{#each workouts as workout (workout.id)}
				<DisplayListItem
					route="/routines/{routineId}/workouts/{workout.id}/exercises"
					iconType="list"
					first={`[${workout.day.slice(0, 3)}] ${workout.name}`}
					second={undefined}
				/>
			{/each}
		</DisplayList>
	{:else}
		<NoData type="Workouts" addRoute="/create/routines/{routineId}/workouts" />
	{/if}
</div>
