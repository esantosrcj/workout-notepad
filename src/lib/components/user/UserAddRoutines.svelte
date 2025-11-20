<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Routine } from '$lib/types/workout-log';
	import DisplayList from '../list/DisplayList.svelte';
	import UserListItem from '../list/UserListItem.svelte';
	import Icon from '@iconify/svelte';

	export let userId: string;
	export let routines: Routine[];

	// Form values
	export let formName: FormDataEntryValue | undefined;
	export let formDescription: FormDataEntryValue | undefined;
	export let formError: FormDataEntryValue | undefined;

	let deleting: string[] = [];
</script>

<div class="flex flex-col items-center py-8 md:px-4 md:py-8">
	<h3 class="mb-4 text-2xl md:h3">Routines</h3>

	{#if routines?.length}
		<DisplayList>
			{#each routines.filter((r) => !deleting.includes(r.id)) as routine (routine.id)}
				<UserListItem
					route="/create/routines/{routine.id}/workouts"
					iconType="clipboard-list"
					first={routine.name}
					second={routine.description}
					deleteId={routine.id}
					hiddenName="routineid"
					{deleting}
				/>
			{/each}
		</DisplayList>
	{/if}

	<form
		class="card text-token mb-16 w-full space-y-4 p-4 md:mb-0 md:w-2/3"
		method="POST"
		action="?/routine"
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
				placeholder="e.g., M-F Workout"
				required
			/>
		</label>
		<label class="label pb-4">
			<span class="text-lg text-slate-600">Description</span>
			<input
				class="input"
				name="description"
				type="text"
				value={formDescription ?? ''}
				autocomplete="off"
				placeholder="e.g., A routine workout to build muscle"
				required
			/>
		</label>
		<input type="hidden" name="userid" value={userId} />
		{#if formError}
			<p class="text-lg text-red-500">{formError}</p>
		{/if}
		<button class="variant-filled-secondary btn mt-4">
			<span><Icon class="text-2xl text-slate-200" icon="mi:add" /></span>
			<span>ADD</span>
		</button>
	</form>
</div>
