<script lang="ts">
	import { popup, Avatar } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	export let email: string | undefined;

	const popupActions: PopupSettings = {
		event: 'click',
		target: 'userActions',
		placement: 'bottom'
	};
</script>

<div class="mr-4">
	<a class="btn hover:variant-soft-primary" href="/">
		<span>Home</span>
	</a>

	<a class="btn hover:variant-soft-primary" href="/create/routines">
		<span>Create</span>
	</a>

	<a class="btn hover:variant-soft-primary" href="/routines">
		<span>Routines</span>
	</a>

	{#if !email}
		<a class="btn hover:variant-soft-primary" href="/login">
			<span>Log in</span>
		</a>
	{/if}
</div>

{#if email}
	<div>
		<button use:popup={popupActions}>
			<Avatar
				background="bg-slate-600"
				border="border-4 border-surface-300-600-token hover:!border-blue-400"
			>
				<span class="text-xl">{email.charAt(0).toLocaleUpperCase()}</span>
			</Avatar>
		</button>
		<!-- Popup -->
		<div class="card w-48 p-4 shadow-xl" data-popup="userActions">
			<nav class="list-nav">
				<ul>
					<li>
						<button on:click={() => (window.location.href = '/logout')}>
							<span>
								<Icon class="text-2xl text-primary-500" icon="mi:log-out" />
							</span>
							<span>Log out</span>
						</button>
					</li>
				</ul>
			</nav>
		</div>
	</div>
{/if}
