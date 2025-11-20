import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	// "logout" the last authenticated model
	locals.pb.authStore.clear();
	redirect(303, '/');
}) satisfies PageServerLoad;
