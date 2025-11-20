import { createExercise, getExercisesByWorkout } from '$lib/data/db';
import { validateExercise } from '$lib/utils/validation';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, parent, locals }) => {
	const { routineId, workoutId } = params;
	if (!routineId || !workoutId) {
		// No routine ID or workout ID present
		error(404, { message: 'Missing required values' });
	}

	const { loggedIn } = await parent();
	if (!loggedIn) {
		// return { routineId, workouts: [] };
		return {
			workoutId,
			userExercises: []
		};
	}

	const { workouts } = await parent();
	const workout = workouts.find((w) => w.id === workoutId);
	if (!workout) {
		// No workout present
		error(404, { message: 'No workout found' });
	}

	const exercises = await getExercisesByWorkout(locals, workoutId);

	return {
		workout,
		userExercises: exercises ?? []
	};
}) satisfies PageServerLoad;

export const actions = {
	exercise: async ({ request, locals }) => {
		if (!locals.pb.authStore.model) {
			error(404, { message: 'No user found' });
		}

		const data = await request.formData();
		const {
			name,
			sets,
			reps,
			notes,
			workoutid: id,
			exerciseid: exerciseId
		} = Object.fromEntries(data.entries());
		const workoutId = String(id);

		const userExercises = await getExercisesByWorkout(locals, workoutId);
		try {
			validateExercise(userExercises, name, sets, reps, notes);
		} catch (error) {
			let errMsg = 'Exercise fields are invalid';
			if (error instanceof Error) {
				errMsg = error.message;
			}
			return fail(422, { name, sets, reps, notes, error: errMsg });
		}

		const exercise = await createExercise(
			locals,
			workoutId,
			String(name),
			+String(sets),
			String(reps),
			String(notes),
			String(exerciseId)
		);
		if (!exercise) {
			return fail(422, {
				name,
				sets,
				reps,
				notes,
				error: 'Unable to create workout'
			});
		}
	},
	delete: async ({ request, locals }) => {
		if (!locals.pb.authStore.model) {
			error(404, { message: 'No user found' });
		}

		const data = await request.formData();
		const exerciseId = data.get('exerciseid');
		if (!exerciseId) {
			return fail(422, {
				error: 'Unable to find exercise to delete'
			});
		}

		try {
			// DELETE exercise
			await locals.pb.collection('user_exercises').delete(String(exerciseId));
		} catch (error) {
			let errMsg = 'Unable to delete exercise';
			if (error instanceof Error) {
				errMsg = error.message;
			}
			return fail(422, { error: errMsg });
		}
	}
} satisfies Actions;
