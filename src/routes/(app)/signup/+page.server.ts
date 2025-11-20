import { transferTempRoutine } from '$lib/data/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ cookies, locals }) => {
	const user = locals.pb.authStore.model;
	if (!user) {
		// Check if temp ID is stored in cookies
		let id = cookies.get('wlog_userid');

		// Set cookies temp user ID to transfer temp routine to database
		return { tempUserId: id };
	}

	return {
		tempUserId: ''
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const { email, password, passwordConfirm, temproutine } =
			Object.fromEntries(data.entries());
		if (
			!email ||
			email === 'undefined' ||
			!password ||
			password === 'undefined' ||
			!passwordConfirm ||
			passwordConfirm === 'undefined'
		) {
			return fail(422, {
				email,
				error: 'Missing username or password'
			});
		}
		try {
			const username = String(email).split('@')[0];
			const createdUser = await locals.pb.collection('users').create({
				email,
				username,
				password,
				passwordConfirm,
				name: username
			});

			// Log in to transfer data
			const { token, record } = await locals.pb
				.collection('users')
				.authWithPassword(String(email), String(password));

			// Transfer temporary routine to database
			if (temproutine && temproutine !== 'undefined') {
				const temp = JSON.parse(String(temproutine));
				await transferTempRoutine(locals, temp, createdUser.id);
			}
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

		// Check if temp user ID is stored in cookies
		let id = cookies.get('wlog_userid');
		if (id) {
			// Set old temp user ID to delete local storage
			// Set short Max-Age so that the cookie deletes shortly
			cookies.set('wlog_registeredid', id, { path: '/', maxAge: 30 });
			// Delete temp user ID
			cookies.delete('wlog_userid', { path: '/' });
		}

		redirect(303, '/');
	}
} satisfies Actions;
