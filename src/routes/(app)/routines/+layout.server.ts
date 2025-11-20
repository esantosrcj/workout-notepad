import { getRoutinesByUser } from '$lib/data/db';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent, locals }) => {
	const { loggedIn, userId } = await parent();
	if (!loggedIn) {
		// User not logged in
		return { routines: [] };
	}

	const routines = await getRoutinesByUser(locals, userId);

	return { routines: routines ?? [] };
}) satisfies LayoutServerLoad;
