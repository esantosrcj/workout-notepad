<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getRoutine, validateRoutine } from '$lib/utils/lstorage';
	import type { Routine } from '$lib/types/workout-log';
	import TempListItem from '../list/TempListItem.svelte';
	import DisplayList from '../list/DisplayList.svelte';
	import Icon from '@iconify/svelte';

	export let userId: string;

	let routine: Routine | undefined;
	let name = '';
	let description = '';
	let error = '';

	onMount(() => {
		routine = getRoutine(userId);
	});

	function handleSubmit(event: Event) {
		const result = validateRoutine(name, description);
		if (!result.isValid) {
			error = result.message;
			return;
		}

		const id = crypto.randomUUID();
		routine = { id, name, description, workouts: [] };
		localStorage.setItem(userId, JSON.stringify(routine));
		name = '';
		description = '';
		error = '';

		// Redirect to add workouts
		goto(`/create/routines/${id}/workouts`);
	}

	function handleDelete(event: Event) {
		routine = undefined;
		localStorage.setItem(userId, JSON.stringify({}));
	}
</script>

<div class="flex flex-col items-center py-8 md:px-4 md:py-8">
	<h3 class="mb-4 text-2xl md:h3">Routines</h3>

	{#if routine}
		<DisplayList>
			<TempListItem
				route="/create/routines/{routine.id}/workouts"
				iconType="clipboard-list"
				first={routine.name}
				second={routine.description}
				hiddenName="routineid"
				hiddenValue={routine.id}
				{handleDelete}
			/>
		</DisplayList>
	{:else}
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
					placeholder="e.g., M-F Workout"
					required
				/>
			</label>
			<label class="label pb-4">
				<span class="text-lg text-slate-600">Description</span>
				<input
					bind:value={description}
					class="input"
					type="text"
					placeholder="e.g., A routine workout to build muscle"
					required
				/>
			</label>
			{#if error}
				<p class="text-lg text-red-500">{error}</p>
			{/if}
			<button class="variant-filled-secondary btn mt-4">
				<span><Icon class="text-2xl text-slate-200" icon="mi:add" /></span>
				<span>ADD</span>
			</button>
		</form>
	{/if}
</div>
