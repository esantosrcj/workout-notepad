import { getWorkoutsByRoutine } from '$lib/data/db';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, parent, locals }) => {
	const { routineId } = params;
	if (!routineId) {
		// No routine ID present
		error(404, { message: 'Missing required values' });
	}

	const { loggedIn } = await parent();
	if (!loggedIn) {
		return { routineId, workouts: [] };
	}

	const { routines } = await parent();
	const routine = routines.find((r) => r.id === routineId);
	if (!routine) {
		// No routine present
		error(404, { message: 'No routine found' });
	}

	const workouts = await getWorkoutsByRoutine(locals, routineId);

	return { routine, workouts: workouts ?? [] };
}) satisfies LayoutServerLoad;
