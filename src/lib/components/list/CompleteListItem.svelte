<script lang="ts">
	import { onMount } from 'svelte';
	import { AccordionItem } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import type { InProgressSet, UserExercise } from '$lib/types/workout-log';

	export let exercise: UserExercise;

	let sets: InProgressSet[] = [];

	onMount(() => {
		if (exercise) {
			// Store exercise state to local storage
			const storedData = localStorage.getItem(exercise.id);
			if (storedData && storedData !== '{}') {
				sets = JSON.parse(storedData);
			} else {
				const temp = new Array(exercise.sets).fill(1);
				sets = temp.map((t, index) => ({
					id: index + 1,
					reps: exercise.reps,
					complete: false
				}));
				// Init sets store
				localStorage.setItem(exercise.id, JSON.stringify(sets));
			}
		}
	});

	function toggle(toggled: InProgressSet) {
		sets = sets.map((s) =>
			s.id === toggled.id
				? {
						id: s.id,
						reps: s.reps,
						complete: !s.complete
					}
				: s
		);
		// Update sets
		localStorage.setItem(exercise.id, JSON.stringify(sets));
	}

	$: exerciseComplete = sets.every((s) => s.complete);
</script>

<AccordionItem>
	<svelte:fragment slot="lead">
		{#if exerciseComplete}
			<Icon class="text-2xl text-green-600" icon="mi:check" />
		{:else}
			<Icon class="text-2xl" icon="mi:clock" />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="summary">
		<span class="font-bold {exerciseComplete ? 'line-through' : ''}">
			&nbsp;{exercise.name}&nbsp;
		</span>
	</svelte:fragment>
	<svelte:fragment slot="content">
		{#if exercise?.notes}
			<p><span class="font-bold">NOTES:</span> {exercise.notes}</p>
		{/if}
		<ul>
			{#each sets as eset (eset.id)}
				<li class="py-4">
					<label>
						<div class="flex items-center">
							<input
								type="checkbox"
								checked={eset.complete}
								on:change={() => toggle(eset)}
							/>
							<div class="pl-4">
								<span
									class={`${eset.complete ? 'text-slate-400 line-through' : ''}`}
								>
									{exercise.name}&nbsp;&nbsp;&nbsp;&nbsp;{eset.reps}
								</span>
							</div>
						</div>
					</label>
				</li>
			{/each}
		</ul>
	</svelte:fragment>
</AccordionItem>
