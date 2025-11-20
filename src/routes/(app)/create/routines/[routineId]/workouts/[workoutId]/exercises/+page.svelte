<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import UserAdd from '$lib/components/user/UserAddExercises.svelte';
	import TempAdd from '$lib/components/lstorage/TempAddExercises.svelte';
	import MobileToolbar from '$lib/components/header/MobileToolbar.svelte';
	import Icon from '@iconify/svelte';

	export let form: ActionData;

	// From load in +page.server.ts
	export let data: PageData;

	// `$:` means 're-run whenever these values change'
	$: ({
		loggedIn, // Data from parent
		userId, // Data from parent
		routineId, // Data from parent
		routine, // Data from parent
		workoutId,
		workout,
		userExercises
	} = data);
</script>

<svelte:head>
	<title>Add Exercises</title>
	<meta name="description" content="Add Exercises" />
</svelte:head>

<div class="hidden md:block">
	<ol class="breadcrumb">
		<li class="crumb">
			<a class="btn hover:variant-soft-primary" href="/create/routines">
				Routines
			</a>
		</li>
		<li class="crumb-separator" aria-hidden>
			<span><Icon class="text-2xl" icon="mi:chevron-right" /></span>
		</li>
		<li class="crumb">
			<a
				class="btn hover:variant-soft-primary"
				href="/create/routines/{routine?.id ?? routineId}/workouts"
			>
				Workouts
			</a>
		</li>
		<li class="crumb-separator" aria-hidden>
			<span><Icon class="text-2xl" icon="mi:chevron-right" /></span>
		</li>
		<li>Exercises</li>
	</ol>
</div>

<MobileToolbar
	name="Exercises"
	backRoute="/create/routines/{routine?.id ?? routineId}/workouts"
/>

{#if loggedIn}
	<UserAdd
		{workout}
		{userExercises}
		formSets={form?.sets}
		formReps={form?.reps}
		formNotes={form?.notes}
		formError={form?.error}
	/>
{:else}
	<TempAdd {userId} {workoutId} />
{/if}
