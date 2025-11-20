<script lang="ts">
	import Icon from '@iconify/svelte';

	export let route: string;
	export let iconType: string;
	export let first: string;
	export let second: string | undefined;
</script>

<li>
	<a class="group" href={route}>
		<span>
			<Icon class="text-3xl text-primary-500" icon="mi:{iconType}" />
		</span>
		<div class="flex flex-col pl-4 md:flex-row">
			<span class="group-hover:text-white">{first}</span>
			{#if second}
				<span class="hidden group-hover:text-white md:inline-block">:</span>
				<span class="hidden group-hover:text-white md:ml-4 md:inline-block">
					{second}
				</span>
			{/if}
		</div>
	</a>
</li>
