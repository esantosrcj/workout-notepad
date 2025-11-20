import { getExercisesByWorkout } from '$lib/data/db';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, parent, locals }) => {
	const { routineId, workoutId } = params;
	if (!routineId || !workoutId) {
		// No routine ID or workout ID present
		error(404, { message: 'Missing required values' });
	}

	const { loggedIn } = await parent();
	if (!loggedIn) {
		return { workoutId, exercises: [] };
	}

	const { workouts } = await parent();
	const workout = workouts.find((w) => w.id === workoutId);
	if (!workout) {
		// No workout present
		error(404, { message: 'No workout found' });
	}

	const exercises = await getExercisesByWorkout(locals, workoutId);

	return {
		workoutId: workout.id,
		exercises: exercises ?? []
	};
}) satisfies LayoutServerLoad;
