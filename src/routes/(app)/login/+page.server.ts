import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const { email, password } = Object.fromEntries(data.entries());
		if (
			!email ||
			email === 'undefined' ||
			!password ||
			password === 'undefined'
		) {
			return fail(422, {
				email,
				error: 'Missing username or password'
			});
		}
		try {
			const { token, record } = await locals.pb
				.collection('users')
				.authWithPassword(String(email), String(password));
		} catch (error) {
			let errMsg = 'Unable to create account';
			if (error instanceof Error) {
				errMsg = error.message;
			}
			return fail(422, {
				email,
				error: errMsg
			});
		}
		redirect(303, '/');
	}
} satisfies Actions;
