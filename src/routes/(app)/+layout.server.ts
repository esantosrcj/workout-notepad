import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, locals }) => {
	const user = locals.pb.authStore.model;
	if (!user) {
		// Check if temp ID is stored in cookies
		let id = cookies.get('wlog_userid');
		if (!id) {
			id = crypto.randomUUID();
			// Set temp ID in cookies
			// Set Max-Age to 365 days
			// If unspecified, the cookie becomes a session cookie.
			// A session finishes when the client shuts down,
			// after which the session cookie is removed.
			cookies.set('wlog_userid', id, { path: '/', maxAge: 60 * 60 * 24 * 365 });
		}

		// User not logged in
		return { loggedIn: false, userId: id };
	}

	// If redirected from /signup then registered ID was set
	// ID is used to delete/remove temp routine from local storage
	const registeredId = cookies.get('wlog_registeredid');

	return {
		loggedIn: true,
		userId: user.id,
		email: user.email,
		registeredId
	};
}) satisfies LayoutServerLoad;
