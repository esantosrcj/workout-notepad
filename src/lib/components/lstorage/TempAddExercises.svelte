<script lang="ts">
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import debounce from 'lodash/debounce';
	import { getRoutine, validateExercise } from '$lib/utils/lstorage';
	import type {
		Exercise,
		Routine,
		Workout,
		UserExercise
	} from '$lib/types/workout-log';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import PlaceholderExercises from '../placeholder/ExerciseList.svelte';
	import DisplayList from '../list/DisplayList.svelte';
	import TempListItem from '../list/TempListItem.svelte';
	import TempSpecialListItem from '../list/TempSpecialListItem.svelte';
	import { POCKETBASE_URL } from '$lib/constants/config';
	import PocketBase from 'pocketbase';

	const pb = new PocketBase(POCKETBASE_URL);

	export let userId: string;
	export let workoutId: string | undefined;

	let routine: Routine | undefined;
	let workouts: Workout[] = [];
	let workout: Workout;
	let userExercises: UserExercise[] = [];
	let exercises: Exercise[] = [];
	let exerciseOptions: AutocompleteOption<string>[] = [];
	let selectedExercise: Exercise | undefined;
	let sets = '';
	let reps = '';
	let notes = '';
	let searchTerm = '';
	let error = '';
	let isSearching = false;

	onMount(() => {
		routine = getRoutine(userId);
		if (routine) {
			workouts = [...routine.workouts];
			if (workouts?.length) {
				workout = workouts.find((w) => w.id === workoutId) as Workout;
				userExercises = [...workout.exercises];
			}
		}
	});

	const handleDebounce = debounce((event: Event) => {
		// Minimum two characters before search
		if (searchTerm?.length > 2) {
			// Get exercises
			pb.collection('exercises')
				.getList(1, 15, {
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

	function handleSubmit(event: Event) {
		if (routine) {
			if (!selectedExercise) {
				error = 'Exercise not selected';
				return;
			}

			const {
				id: exerciseId,
				name,
				type,
				equipment,
				target
			} = selectedExercise;
			const result = validateExercise(userExercises, name, sets, reps, notes);
			if (!result.isValid) {
				error = result.message;
				searchTerm = '';
				return;
			}

			const id = crypto.randomUUID();
			userExercises = [
				...userExercises,
				{
					id,
					name,
					sets: +sets,
					reps,
					notes,
					exercise: { id: exerciseId, name, type, equipment, target }
				}
			];

			// Replace the existing workout
			workouts = workouts.map((w) =>
				w.id === workoutId ? { ...w, exercises: userExercises } : w
			);

			// Update routine and store
			routine = { ...routine, workouts: workouts };
			localStorage.setItem(userId, JSON.stringify(routine));

			// Reset values
			sets = '';
			reps = '';
			notes = '';
			searchTerm = '';
			error = '';
			selectedExercise = undefined;
		}
	}

	function handleDelete(event: Event) {
		const form = new FormData(event.target as HTMLFormElement);
		const formData = Object.fromEntries(form.entries());
		// name="exerciseid"
		const currId = formData.exerciseid;
		userExercises = userExercises.filter((e) => e.id !== currId);

		// Replace the existing workout
		workouts = workouts.map((w) =>
			w.id === workoutId ? { ...w, exercises: userExercises } : w
		);
		if (routine) {
			routine = { ...routine, workouts: workouts };
		}
		localStorage.setItem(userId, JSON.stringify(routine));
	}

	function onExerciseSelection(
		event: CustomEvent<AutocompleteOption<string>>
	): void {
		selectedExercise = exercises.find(
			(e) => e.id === (event.detail.meta as Exercise).id
		);
		exercises = [];
		exerciseOptions = [];
		searchTerm = '';
		error = '';
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
			{#each userExercises as userExercise (userExercise.id)}
				{#if $navigating}
					<TempListItem
						route="#"
						iconType="caret-right"
						first={userExercise.name}
						second={undefined}
						hiddenName="exerciseid"
						hiddenValue={userExercise.id}
						{handleDelete}
					/>
				{:else}
					<TempSpecialListItem
						route="#"
						iconType="caret-right"
						first={userExercise.name}
						second={undefined}
						hiddenName="exerciseid"
						hiddenValue={userExercise.id}
						{handleDelete}
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
		on:submit|preventDefault={handleSubmit}
	>
		{#if selectedExercise}
			<label class="label">
				<span class="text-lg text-slate-600">Exercise</span>
				<input
					value={selectedExercise.name}
					class="input"
					type="text"
					disabled
				/>
			</label>
		{/if}
		<label class="label">
			<span class="text-lg text-slate-600">Sets</span>
			<input
				bind:value={sets}
				class="input"
				type="text"
				placeholder="e.g., 4"
			/>
		</label>
		<label class="label">
			<span class="text-lg text-slate-600">Reps</span>
			<input
				bind:value={reps}
				class="input"
				type="text"
				placeholder="e.g., 8-12 or 6"
			/>
		</label>
		<label class="label pb-4">
			<span class="text-lg text-slate-600">Notes</span>
			<input
				bind:value={notes}
				class="input"
				type="text"
				placeholder="(Optional Notes)"
			/>
		</label>
		{#if error}
			<p class="text-lg text-red-500">{error}</p>
		{/if}
		{#if userExercises?.length < 7}
			<button class="variant-filled-secondary btn mt-4">
				<span><Icon class="text-2xl text-slate-200" icon="mi:add" /></span>
				<span>ADD</span>
			</button>
		{/if}
	</form>
</div>
