<script lang="ts">
	import Icon from '@iconify/svelte';

	export let route: string;
	export let iconType: string;
	export let first: string;
	export let second: string | undefined;
	export let hiddenName: string;
	export let hiddenValue: string;

	// Handle delete function
	export let handleDelete: (event: Event) => void;
</script>

<li>
	<div class="flex items-center">
		{#if !second}
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
		<form method="POST" on:submit|preventDefault={handleDelete}>
			<input type="hidden" name={hiddenName} value={hiddenValue} />
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
