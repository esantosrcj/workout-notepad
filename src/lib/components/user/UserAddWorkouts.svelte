<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Routine, Workout } from '$lib/types/workout-log';
	import { weekdays } from '$lib/constants/enum';
	import DisplayList from '../list/DisplayList.svelte';
	import UserListItem from '../list/UserListItem.svelte';
	import Icon from '@iconify/svelte';

	export let routine: Routine | undefined;
	export let workouts: Workout[];

	// Form values
	export let formName: FormDataEntryValue | undefined;
	export let formError: FormDataEntryValue | undefined;

	let deleting: string[] = [];
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
				<UserListItem
					route="/create/routines/{routine?.id}/workouts/{workout.id}/exercises"
					iconType="list"
					first={`[${workout.day.slice(0, 3)}] ${workout.name}`}
					second={undefined}
					deleteId={workout.id}
					hiddenName="workoutid"
					{deleting}
				/>
			{/each}
		</DisplayList>
	{/if}

	<form
		class="card text-token mb-16 w-full space-y-4 p-4 md:mb-0 md:w-2/3"
		method="POST"
		action="?/workout"
		use:enhance
	>
		<label class="label">
			<span class="text-lg text-slate-600">Name</span>
			<input
				class="input"
				name="name"
				type="text"
				value={formName ?? ''}
				autocomplete="off"
				placeholder="e.g., Arm Workout"
				required
			/>
		</label>
		<label class="label pb-4">
			<span class="text-lg text-slate-600">Day</span>
			<select class="select" name="day" value="" required>
				{#each Object.values(weekdays) as day}
					<option value={day}>
						{day}
					</option>
				{/each}
			</select>
		</label>
		<input type="hidden" name="routineid" value={routine?.id} />
		{#if formError}
			<p class="text-lg text-red-500">{formError}</p>
		{/if}
		<button class="variant-filled-secondary btn mt-4">
			<span><Icon class="text-2xl text-slate-200" icon="mi:add" /></span>
			<span>ADD</span>
		</button>
	</form>
</div>
