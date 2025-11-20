<script lang="ts">
	import { onMount } from 'svelte';
	import { getRoutine } from '$lib/utils/lstorage';
	import type { Routine } from '$lib/types/workout-log';
	import NoData from '../common/NoData.svelte';
	import DisplayList from '../list/DisplayList.svelte';
	import DisplayListItem from '../list/DisplayListItem.svelte';

	export let userId: string;

	let routine: Routine | undefined;

	onMount(() => {
		routine = getRoutine(userId);
	});
</script>

<div class="flex flex-col items-center py-8 md:p-4">
	<h2 class="mb-4 text-2xl md:h2 md:mb-8 md:text-4xl">Routine.</h2>

	{#if routine}
		<DisplayList>
			<DisplayListItem
				route="/routines/{routine.id}/workouts"
				iconType="clipboard-list"
				first={routine.name}
				second={routine.description}
			/>
		</DisplayList>
	{:else}
		<NoData type="Routines" addRoute="/create/routines" />
	{/if}
</div>
