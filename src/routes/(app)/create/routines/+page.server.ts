import { createRoutine, getRoutinesByUser } from '$lib/data/db';
import { validateRoutine } from '$lib/utils/validation';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	routine: async ({ request, locals }) => {
		if (!locals.pb.authStore.model) {
			error(404, { message: 'No user found' });
		}

		const data = await request.formData();
		const {
			name,
			description,
			userid: userId
		} = Object.fromEntries(data.entries());

		// GET user routines
		const routines = await getRoutinesByUser(locals, String(userId));

		try {
			validateRoutine(routines, name, description);
		} catch (error) {
			let errMsg = 'Routine fields are invalid';
			if (error instanceof Error) {
				errMsg = error.message;
			}
			return fail(422, { name, description, error: errMsg });
		}

		const routine = await createRoutine(
			locals,
			String(userId),
			String(name),
			String(description)
		);
		if (!routine) {
			return fail(422, {
				name,
				description,
				error: 'Unable to create routine'
			});
		}
		redirect(303, `/create/routines/${routine.id}/workouts`);
	},
	delete: async ({ request, locals }) => {
		if (!locals.pb.authStore.model) {
			error(404, { message: 'No user found' });
		}

		const data = await request.formData();
		const routineId = data.get('routineid');
		if (!routineId) {
			return fail(422, {
				error: 'Unable to find routine to delete'
			});
		}

		try {
			// DELETE routine
			await locals.pb.collection('routines').delete(String(routineId));
		} catch (error) {
			let errMsg = 'Unable to delete routine';
			if (error instanceof Error) {
				errMsg = error.message;
			}
			return fail(422, { error: errMsg });
		}
	}
} satisfies Actions;
