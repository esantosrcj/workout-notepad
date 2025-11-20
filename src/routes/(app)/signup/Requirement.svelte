<script lang="ts">
	import Icon from '@iconify/svelte';

	export let isValid: boolean;
	export let requiredCriteria: string;
</script>

<div class="flex items-center">
	<Icon
		class={`mr-4 text-xl text-${isValid ? 'green' : 'red'}-500`}
		icon={isValid ? 'mi:check' : 'mi:close'}
	/>
	{requiredCriteria}
</div>
