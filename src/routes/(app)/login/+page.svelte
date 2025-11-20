<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let saving = false;
</script>

<svelte:head>
	<title>Log in</title>
	<meta name="description" content="Log in" />
</svelte:head>

<!-- items-center:
 align-items: center; (Aligns individual items [vertically] along the cross-axis) -->
<!-- content-center:
 align-content: center; (Aligns lines of items along the cross-axis [vertically in a row, horizontally in a column] when there are multiple lines) -->
<!-- justify-center:
 justify-content: center; (Aligns items along the main axis [horizontally in a row, vertically in a column]) -->
<!-- h-screen: height: 100vh; -->
<section
	class="flex h-screen items-center md:h-full md:justify-center md:py-16"
>
	<!-- w-full: width: 100%; -->
	<div
		class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
	>
		<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
			<h1
				class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
			>
				Log in to your account
			</h1>
			<form
				class="space-y-4 md:space-y-6"
				method="POST"
				use:enhance={() => {
					saving = true;

					return async ({ update }) => {
						await update();
						saving = false;
					};
				}}
			>
				<div>
					<label
						for="email"
						class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						placeholder="name@email.com"
						value={form?.email ?? ''}
						required
					/>
				</div>
				<div>
					<label
						for="password"
						class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
					>
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="••••••••"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						required
					/>
				</div>
				{#if form?.error}
					<p class="error">{form.error}</p>
				{/if}
				<button
					type="submit"
					class="variant-filled-secondary w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-700 focus:outline-none focus:ring-4 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800"
					disabled={saving}
				>
					<div class="flex w-full items-center justify-center">
						{#if saving}
							<span class="pr-4">
								<Icon icon="svg-spinners:180-ring-with-bg" />
							</span>
						{/if}
						Log in
					</div>
				</button>
				<p class="text-sm font-light text-gray-500 dark:text-gray-400">
					Don’t have an account yet?
					<a
						href="/signup"
						class="font-medium text-secondary-600 hover:underline dark:text-secondary-500"
					>
						Sign up
					</a>
				</p>
			</form>
		</div>
	</div>
</section>

<style>
	.error {
		color: red;
	}
</style>
