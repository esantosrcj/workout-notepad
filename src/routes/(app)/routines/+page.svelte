<script lang="ts">
	import type { PageData } from './$types';
	import TempViewRoutine from '$lib/components/lstorage/TempViewRoutine.svelte';
	import NoData from '$lib/components/common/NoData.svelte';
	import DisplayList from '$lib/components/list/DisplayList.svelte';
	import DisplayListItem from '$lib/components/list/DisplayListItem.svelte';

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({
		loggedIn, // Data from parent
		userId, // Data from parent
		routines
	} = data);
</script>

<svelte:head>
	<title>Routines</title>
	<meta name="description" content="Routines" />
</svelte:head>

<div>
	{#if loggedIn}
		<div class="flex flex-col items-center py-8 md:p-4">
			<h2 class="mb-4 text-2xl md:h2 md:mb-8 md:text-4xl">Routines.</h2>

			{#if routines?.length}
				<DisplayList>
					{#each routines as { id, name, description } (id)}
						<DisplayListItem
							route="/routines/{id}/workouts"
							iconType="clipboard-list"
							first={name}
							second={description}
						/>
					{/each}
				</DisplayList>
			{:else}
				<NoData type="Routines" addRoute="/create/routines" />
			{/if}
		</div>
	{:else}
		<TempViewRoutine {userId} />
	{/if}
</div>
