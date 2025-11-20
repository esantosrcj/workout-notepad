<script lang="ts">
	import { onMount } from 'svelte';
	import { getRoutine } from '$lib/utils/lstorage';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import Icon from '@iconify/svelte';
	import Requirement from './Requirement.svelte';
	import type { PageData } from './$types';

	// From load in +page.server.ts
	export let data: PageData;
	export let form: ActionData;

	// `$:` means 're-run whenever these values change'
	$: ({ tempUserId } = data);

	let password: string = '';
	let strength = 0;
	let validations: boolean[] = [];
	let isConfirmMatch = false;
	let creating = false;
	let tempRoutine = '';

	onMount(() => {
		if (tempUserId) {
			const routine = getRoutine(tempUserId);
			if (routine) {
				// Temp routine to store in database
				tempRoutine = JSON.stringify(routine);
			}
		}
	});

	function validatePassword(event: Event) {
		const form = event.target as HTMLFormElement;
		password = form.value;

		validations = [
			password.length > 7,
			password.search(/[A-Z]/) > -1,
			password.search(/[0-9]/) > -1,
			password.search(/[!$&+,:;=?@#]/) > -1
		];

		strength = validations.reduce((acc, cur) => acc + (cur ? 1 : 0), 0);
	}

	function validateConfirm(event: Event) {
		const form = event.target as HTMLFormElement;
		const confirm = form.value;
		if (confirm?.length) {
			isConfirmMatch = password === confirm;
		} else {
			isConfirmMatch = false;
		}
	}
</script>

<svelte:head>
	<title>Sign Up</title>
	<meta name="description" content="Sign Up" />
</svelte:head>

<section
	class="flex h-screen items-center pb-8 md:h-full md:justify-center md:py-16"
>
	<div
		class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"
	>
		<div class="space-y-4 p-6 sm:p-8 md:space-y-6">
			<h1
				class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
			>
				Create your account
			</h1>
			<form
				class="space-y-4 md:space-y-6"
				method="POST"
				use:enhance={() => {
					creating = true;

					return async ({ update }) => {
						await update();
						creating = false;
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
						on:input={validatePassword}
					/>
				</div>
				<div>
					<label
						for="passwordConfirm"
						class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
					>
						Confirm Password
					</label>
					<input
						type="password"
						name="passwordConfirm"
						id="passwordConfirm"
						placeholder="••••••••"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
						required
						on:input={validateConfirm}
					/>
				</div>
				<input type="hidden" name="temproutine" value={tempRoutine} />
				{#if form?.error}
					<p class="error">{form.error}</p>
				{/if}
				<div class="strength">
					<span class="bar bar-1" class:bar-show={strength > 0} />
					<span class="bar bar-2" class:bar-show={strength > 1} />
					<span class="bar bar-3" class:bar-show={strength > 2} />
					<span class="bar bar-4" class:bar-show={strength > 3} />
				</div>
				<ul>
					<li>
						<Requirement
							isValid={validations[0]}
							requiredCriteria="must be at least 8 characters"
						/>
					</li>
					<li>
						<Requirement
							isValid={validations[1]}
							requiredCriteria="must contain a capital letter"
						/>
					</li>
					<li>
						<Requirement
							isValid={validations[2]}
							requiredCriteria="must contain a number"
						/>
					</li>
					<li>
						<Requirement
							isValid={validations[3]}
							requiredCriteria="must contain one of !$&+,:;=?@#"
						/>
					</li>
					<li>
						<Requirement
							isValid={isConfirmMatch}
							requiredCriteria="must match confirm password"
						/>
					</li>
				</ul>
				<button
					type="submit"
					class="variant-filled-secondary w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-secondary-300 enabled:hover:bg-secondary-700 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800"
					disabled={strength < 4 || !isConfirmMatch || creating}
				>
					<div class="flex w-full items-center justify-center">
						{#if creating}
							<span class="pr-4">
								<Icon icon="svg-spinners:180-ring-with-bg" />
							</span>
						{/if}
						Sign up
					</div>
				</button>
			</form>
		</div>
	</div>
</section>

<style>
	.strength {
		display: flex;
		height: 0.5rem;
		width: 100%;
	}

	.bar {
		margin-right: 5px;
		height: 100%;
		width: 25%;
		transition: box-shadow 500ms;
		box-shadow: inset 0px 20px lightgray;
	}

	.bar-show {
		box-shadow: none;
	}

	.bar-1 {
		background: linear-gradient(to right, red, orangered);
	}

	.bar-2 {
		background: linear-gradient(to right, orangered, gold);
	}

	.bar-3 {
		background: linear-gradient(to right, gold, yellowgreen);
	}

	.bar-4 {
		background: linear-gradient(to right, yellowgreen, green);
	}

	.bar:last-child {
		margin-right: 0;
	}

	ul {
		list-style: none;
		margin: 10px 0;
		padding: 0;
		font-size: 1rem;
		text-align: left;
	}

	.error {
		color: red;
	}
</style>
