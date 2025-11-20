<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly, slide } from 'svelte/transition';
	import Icon from '@iconify/svelte';

	export let route: string;
	export let iconType: string;
	export let first: string;
	export let second: string | undefined;
	export let deleteId: string;
	export let hiddenName: string;
	export let deleting: string[];
</script>

<li in:fly|global={{ y: 50 }} out:slide|global>
	<div class="flex items-center">
		{#if !second}
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="group w-full" href={route}>
				<span>
					<Icon class="text-3xl text-primary-500" icon="mi:{iconType}" />
				</span>
				<span class="hover:text-white">{first}</span>
			</a>
		{:else}
			<a class="group w-full" href={route}>
				<span>
					<Icon class="text-3xl text-primary-500" icon="mi:{iconType}" />
				</span>
				<div class="flex flex-col pl-4 md:flex-row">
					<span class="group-hover:text-white">{first}</span>
					<span class="hidden group-hover:text-white md:inline-block">:</span>
					<span class="hidden group-hover:text-white md:ml-4 md:inline-block">
						{second}
					</span>
				</div>
			</a>
		{/if}
		<form
			method="POST"
			action="?/delete"
			use:enhance={() => {
				deleting = [...deleting, deleteId];
				return async ({ update }) => {
					await update();
					deleting = deleting.filter((id) => id !== deleteId);
				};
			}}
		>
			<input type="hidden" name={hiddenName} value={deleteId} />
			<button aria-label="Mark as complete">
				<span class="hidden md:inline-block">
					<Icon class="text-3xl text-red-500" icon="mi:close" />
				</span>
				<span class="inline-block md:hidden">
					<Icon class="text-3xl text-red-500" icon="mi:delete" />
				</span>
			</button>
		</form>
	</div>
</li>
