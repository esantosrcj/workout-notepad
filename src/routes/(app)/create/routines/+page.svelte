<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import TempAdd from '$lib/components/lstorage/TempAddRoutine.svelte';
	import UserAdd from '$lib/components/user/UserAddRoutines.svelte';

	export let form: ActionData;

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
	<title>Add Routines</title>
	<meta name="description" content="Add Routines" />
</svelte:head>

{#if loggedIn}
	<UserAdd
		{userId}
		{routines}
		formName={form?.name}
		formDescription={form?.description}
		formError={form?.error}
	/>
{:else}
	<TempAdd {userId} />
{/if}
