<script lang="ts">
	import { goto } from '$app/navigation';
	import DisplayList from './DisplayList.svelte';
	import CompleteListItem from './CompleteListItem.svelte';
	import { Accordion } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import type { UserExercise } from '$lib/types/workout-log';
	import type { ModalSettings } from '@skeletonlabs/skeleton';

	export let exercises: UserExercise[];
	export let routineId: string;
	export let workoutId: string;

	function removeAndRedirect(response: boolean) {
		if (response) {
			const ids = exercises.map((e) => e.id);
			// Remove exercise sets
			ids.forEach((id) => localStorage.removeItem(id));
			// Redirect to exercises
			goto(`/routines/${routineId}/workouts/${workoutId}/exercises`);
		}
	}

	// Skeleton Modal
	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Please Confirm',
		body: 'Are you sure you wish to proceed?',
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: removeAndRedirect
	};

	function handleClick() {
		modalStore.trigger(modal);
	}
</script>

<div class="flex flex-col items-center py-16 md:px-4 md:py-8">
	{#if exercises?.length}
		<DisplayList>
			<Accordion autocollapse>
				{#each exercises as exercise (exercise.id)}
					<CompleteListItem {exercise} />
				{/each}
			</Accordion>
		</DisplayList>
	{/if}
	<div class="flex w-full pb-8 md:justify-center">
		<button class="btn-lg bg-secondary-500" on:click={handleClick}>
			<div class="flex w-full items-center justify-center">
				<span class="pr-4">
					<Icon class="text-3xl text-white" icon="mi:clipboard-check" />
				</span>
				<span class="text-white">Complete Workout</span>
			</div>
		</button>
	</div>
</div>
