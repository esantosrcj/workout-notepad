<script lang="ts">
	import { page } from '$app/stores';
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	export let email: string | undefined;
</script>

<!-- Sticky footer -->
<div class="fixed bottom-0 left-0 right-0 clear-both inline-block w-full">
	<TabGroup
		justify="justify-center"
		active="variant-filled-secondary"
		hover="hover:variant-soft-primary"
		flex="flex-1"
		rounded=""
		border=""
		class="bg-surface-100-800-token w-full"
	>
		<TabAnchor
			href="/routines"
			selected={$page.url.pathname.startsWith('/routines')}
		>
			<svelte:fragment slot="lead">
				<div class="flex flex-col items-center">
					<Icon class="text-3xl" icon="mi:clipboard-list" />
					Routines
				</div>
			</svelte:fragment>
		</TabAnchor>
		<TabAnchor
			href="/create/routines"
			selected={$page.url.pathname.startsWith('/create/routines')}
		>
			<svelte:fragment slot="lead">
				<div class="flex flex-col items-center">
					<Icon class="text-3xl" icon="mi:add" />
					Create
				</div>
			</svelte:fragment>
		</TabAnchor>
		{#if email}
			<TabAnchor href="/account" selected={$page.url.pathname === '/account'}>
				<svelte:fragment slot="lead">
					<div class="flex flex-col items-center">
						<Icon class="text-3xl" icon="mi:user" />
						Account
					</div>
				</svelte:fragment>
			</TabAnchor>
		{:else}
			<TabAnchor
				href="/login"
				selected={['/login', '/signup'].includes($page.url.pathname)}
			>
				<svelte:fragment slot="lead">
					<div class="flex flex-col items-center">
						<Icon class="text-3xl" icon="mi:log-in" />
						Log in
					</div>
				</svelte:fragment>
			</TabAnchor>
		{/if}
	</TabGroup>
</div>
