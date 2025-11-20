import { createWorkout, getWorkoutsByRoutine } from '$lib/data/db';
import { validateWorkout } from '$lib/utils/validation';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	workout: async ({ request, locals }) => {
		if (!locals.pb.authStore.model) {
			error(404, { message: 'No user found' });
		}

		const data = await request.formData();
		const { name, day, routineid: id } = Object.fromEntries(data.entries());
		const routineId = String(id);

		const workouts = await getWorkoutsByRoutine(locals, routineId);
		try {
			validateWorkout(workouts, name, day);
		} catch (error) {
			let errMsg = 'Workout fields are invalid';
			if (error instanceof Error) {
				errMsg = error.message;
			}
			return fail(422, { name, day, error: errMsg });
		}

		const workout = await createWorkout(
			locals,
			routineId,
			String(name),
			String(day)
		);
		if (!workout) {
			return fail(422, {
				name,
				day,
				error: 'Unable to create workout'
			});
		}
		redirect(
			303,
			`/create/routines/${routineId}/workouts/${workout.id}/exercises`
		);
	},
	delete: async ({ request, locals }) => {
		if (!locals.pb.authStore.model) {
			error(404, { message: 'No user found' });
		}

		const data = await request.formData();
		const workoutId = data.get('workoutid');
		if (!workoutId) {
			return fail(422, {
				error: 'Unable to find workout to delete'
			});
		}

		try {
			// DELETE workout
			await locals.pb.collection('workouts').delete(String(workoutId));
		} catch (error) {
			let errMsg = 'Unable to delete workout';
			if (error instanceof Error) {
				errMsg = error.message;
			}
			return fail(422, { error: errMsg });
		}
	}
} satisfies Actions;
