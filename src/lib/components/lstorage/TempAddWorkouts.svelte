<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getRoutine, validateWorkout } from '$lib/utils/lstorage';
	import type { Routine, Workout } from '$lib/types/workout-log';
	import { navigating } from '$app/stores';
	import Icon from '@iconify/svelte';
	import DisplayList from '../list/DisplayList.svelte';
	import TempListItem from '../list/TempListItem.svelte';
	import TempSpecialListItem from '../list/TempSpecialListItem.svelte';
	import { weekdays } from '$lib/constants/enum';

	export let userId: string;
	export let routineId: string | undefined;

	let routine: Routine | undefined;
	let workouts: Workout[] = [];
	let name = '';
	let day = '';
	let error = '';

	onMount(() => {
		routine = getRoutine(userId);
		if (routine) {
			workouts = [...routine.workouts];
		}
	});

	function handleSubmit(event: Event) {
		if (routine) {
			const result = validateWorkout(workouts, name);
			if (!result.isValid) {
				error = result.message;
				return;
			}

			const id = crypto.randomUUID();
			workouts = [...workouts, { id, name, day, exercises: [] }];
			routine = { ...routine, workouts: workouts };
			localStorage.setItem(userId, JSON.stringify(routine));
			name = '';
			day = '';
			error = '';

			// Redirect to add exercises
			goto(`/create/routines/${routineId}/workouts/${id}/exercises`);
		}
	}

	function handleDelete(event: Event) {
		// const form = event.currentTarget as HTMLFormElement;
		const form = new FormData(event.target as HTMLFormElement);
		const formData = Object.fromEntries(form.entries());
		// name="workoutid"
		const currId = formData.workoutid;
		workouts = workouts.filter((w) => w.id !== currId);
		if (routine) {
			routine = { ...routine, workouts: workouts };
		}
		localStorage.setItem(userId, JSON.stringify(routine));
	}
</script>

<div class="flex flex-col items-center py-16 md:px-4 md:py-8">
	<div class="card text-token mb-8 w-full space-y-4 p-4 md:w-2/3">
		<h3 class="h3">Routine</h3>
		<p class="text-slate-600">Name: {routine?.name}</p>
		<p class="text-slate-600">
			Description: {routine?.description}
		</p>
	</div>

	<h3 class="mb-4 hidden text-2xl md:h3 md:inline-block">Workouts</h3>

	{#if workouts?.length}
		<DisplayList>
			{#each workouts as workout (workout.id)}
				{#if $navigating}
					<TempListItem
						route="/create/routines/{routine?.id}/workouts/{workout.id}/exercises"
						iconType="list"
						first={`[${workout.day.slice(0, 3)}] ${workout.name}`}
						second={undefined}
						hiddenName="workoutid"
						hiddenValue={workout.id}
						{handleDelete}
					/>
				{:else}
					<TempSpecialListItem
						route="/create/routines/{routine?.id}/workouts/{workout.id}/exercises"
						iconType="list"
						first={`[${workout.day.slice(0, 3)}] ${workout.name}`}
						second={undefined}
						hiddenName="workoutid"
						hiddenValue={workout.id}
						{handleDelete}
					/>
				{/if}
			{/each}
		</DisplayList>
	{/if}

	<form
		class="card text-token mb-16 w-full space-y-4 p-4 md:mb-0 md:w-2/3"
		method="POST"
		on:submit|preventDefault={handleSubmit}
	>
		<label class="label">
			<span class="text-lg text-slate-600">Name</span>
			<input
				bind:value={name}
				class="input"
				type="text"
				placeholder="e.g., Arm Workout"
				required
			/>
		</label>
		<label class="label pb-4">
			<span class="text-lg text-slate-600">Day</span>
			<select class="select" name="day" bind:value={day} required>
				{#each Object.values(weekdays) as day}
					<option value={day}>
						{day}
					</option>
				{/each}
			</select>
		</label>
		{#if error}
			<p class="text-lg text-red-500">{error}</p>
		{/if}
		{#if workouts?.length < 7}
			<button class="variant-filled-secondary btn mt-4">
				<span><Icon class="text-2xl text-slate-200" icon="mi:add" /></span>
				<span>ADD</span>
			</button>
		{/if}
	</form>
</div>
