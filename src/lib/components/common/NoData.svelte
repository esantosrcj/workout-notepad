<script lang="ts">
	import Icon from '@iconify/svelte';

	export let type: string;
	export let addRoute: string;
</script>

<div class="flex flex-col items-center py-20 md:p-4">
	<p class="my-4 text-2xl font-bold md:text-3xl">No {type}</p>
	<p class="mb-8 text-xl text-slate-600">
		Add your <span class=" font-bold text-tertiary-500">{type}</span> to get started
	</p>
	<a href={addRoute} class="variant-filled-secondary btn btn-lg md:btn-xl">
		<span><Icon class="text-2xl text-slate-100" icon="mi:add" /></span>
		<span class="uppercase text-slate-100">add {type.slice(0, -1)}</span>
	</a>
</div>
