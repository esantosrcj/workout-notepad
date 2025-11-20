<script lang="ts">
	import { enhance } from '$app/forms';
	import { navigating } from '$app/stores';
	import debounce from 'lodash/debounce';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import type { Exercise, UserExercise, Workout } from '$lib/types/workout-log';
	import PlaceholderExercises from '$lib/components/placeholder/ExerciseList.svelte';
	import DisplayList from '../list/DisplayList.svelte';
	import UserListItem from '../list/UserListItem.svelte';
	import UserSpecialListItem from '../list/UserSpecialListItem.svelte';
	import Icon from '@iconify/svelte';
	import { POCKETBASE_URL } from '$lib/constants/config';
	import PocketBase from 'pocketbase';

	const pb = new PocketBase(POCKETBASE_URL);

	export let workout: Workout | undefined;
	export let userExercises: UserExercise[];

	// Form values
	export let formSets: FormDataEntryValue | undefined;
	export let formReps: FormDataEntryValue | undefined;
	export let formNotes: FormDataEntryValue | undefined;
	export let formError: FormDataEntryValue | undefined;

	let exercises: Exercise[] = [];
	let exerciseOptions: AutocompleteOption<string>[] = [];
	let selectedExercise: Exercise | undefined;
	let searchTerm = '';
	let deleting: string[] = [];
	let saving = false;
	let isSearching = false;

	const handleDebounce = debounce((event: Event) => {
		// Minimum two characters before search
		if (searchTerm?.length > 2) {
			// Get exercises
			pb.collection('exercises')
				.getList(1, 10, {
					filter: pb.filter('name ~ {:exerciseName}', {
						exerciseName: searchTerm
					})
				})
				.then((result) => {
					isSearching = false;
					exercises = result.items as unknown as Exercise[];
					exerciseOptions = exercises.map((e) => ({
						label: e.name,
						value: e.name,
						meta: { id: e.id }
					}));
				})
				.catch((error) => {
					isSearching = false;
					console.log('Error:', error);
				});
		} else if (searchTerm?.length === 0) {
			isSearching = false;
			exercises = [];
			exerciseOptions = [];
		} else {
			// The case where the search term is 1 or 2 characters in length
			isSearching = false;
		}
	}, 1000);

	const handleInput = (event: Event) => {
		isSearching = true;
		handleDebounce(event);
	};

	function onExerciseSelection(
		event: CustomEvent<AutocompleteOption<string>>
	): void {
		selectedExercise = exercises.find(
			(e) => e.id === (event.detail.meta as Exercise).id
		);
		exercises = [];
		exerciseOptions = [];
		searchTerm = '';
	}
</script>

<div class="flex flex-col items-center py-16 md:px-4 md:py-8">
	<div class="card text-token mb-8 w-full space-y-4 p-4 md:w-2/3">
		<h3 class="h3">Workout</h3>
		<p class="text-slate-600">Name: {workout?.name}</p>
		<p class="text-slate-600">
			Day: {workout?.day}
		</p>
	</div>

	<h3 class="mb-4 hidden text-2xl md:h3 md:inline-block">Exercises</h3>

	{#if userExercises?.length}
		<DisplayList>
			{#each userExercises.filter((e) => !deleting.includes(e.id)) as exercise (exercise.id)}
				{#if $navigating}
					<UserListItem
						route="#"
						iconType="caret-right"
						first={exercise.name}
						second={undefined}
						deleteId={exercise.id}
						hiddenName="exerciseid"
						{deleting}
					/>
				{:else}
					<UserSpecialListItem
						route="#"
						iconType="caret-right"
						first={exercise.name}
						second={undefined}
						deleteId={exercise.id}
						hiddenName="exerciseid"
						{deleting}
					/>
				{/if}
			{/each}
		</DisplayList>
	{/if}

	<!-- Search section-->
	<section class="mb-12 flex w-full flex-col items-center">
		<div class="w-full max-w-lg">
			<div class="input-group input-group-divider grid-cols-[auto_1fr]">
				<div class="input-group-shim"><Icon icon="mi:search" /></div>
				<input
					bind:value={searchTerm}
					type="text"
					placeholder="Search..."
					on:input={handleInput}
				/>
			</div>
		</div>

		{#if searchTerm?.length}
			{#if isSearching}
				<PlaceholderExercises />
			{:else}
				<div
					class="card max-h-48 w-full max-w-lg overflow-y-auto p-4"
					tabindex="-1"
				>
					<Autocomplete
						options={exerciseOptions}
						on:selection={onExerciseSelection}
					/>
				</div>
			{/if}
		{/if}
	</section>

	<form
		class="card text-token mb-16 w-full space-y-4 p-4 md:mb-0 md:w-2/3"
		method="POST"
		action="?/exercise"
		use:enhance={() => {
			saving = true;

			return async ({ update }) => {
				await update();
				saving = false;
				searchTerm = '';
				selectedExercise = undefined;
			};
		}}
	>
		{#if selectedExercise}
			<input type="hidden" name="exerciseid" value={selectedExercise.id} />
			<label class="label">
				<span class="text-lg text-slate-600">Exercise</span>
				<input
					class="input"
					name="name"
					type="text"
					value={selectedExercise.name}
					readonly
				/>
			</label>
		{/if}
		<label class="label">
			<span class="text-lg text-slate-600">Sets</span>
			<input
				class="input"
				name="sets"
				type="text"
				value={formSets ?? ''}
				autocomplete="off"
				placeholder="e.g., 4"
			/>
		</label>
		<label class="label">
			<span class="text-lg text-slate-600">Reps</span>
			<input
				class="input"
				name="reps"
				type="text"
				value={formReps ?? ''}
				autocomplete="off"
				placeholder="e.g., 8-12 or 6"
			/>
		</label>
		<label class="label pb-4">
			<span class="text-lg text-slate-600">Notes</span>
			<input
				class="input"
				name="notes"
				type="text"
				value={formNotes ?? ''}
				autocomplete="off"
				placeholder="(Optional Notes)"
			/>
		</label>
		<input type="hidden" name="workoutid" value={workout?.id} />
		{#if formError}
			<p class="text-lg text-red-500">{formError}</p>
		{/if}
		<button class="variant-filled-secondary btn mt-4" disabled={saving}>
			<span>
				{#if saving}
					<Icon icon="svg-spinners:180-ring-with-bg" />
				{:else}
					<Icon class="text-2xl text-slate-200" icon="mi:add" />
				{/if}
			</span>
			<span>ADD</span>
		</button>
	</form>
</div>
