<script lang="ts">
	import Icon from '@iconify/svelte';

	export let name: string;
	export let backRoute: string;
</script>

<div class="relative md:hidden">
	<div class="fixed left-0 right-0 top-0">
		<div class="bg-surface-100-800-token w-full shadow-lg">
			<div class="grid grid-cols-3 gap-4 px-2 py-4">
				<div>
					<a class="btn" href={backRoute}>
						<span>
							<Icon class="text-3xl text-slate-600" icon="mi:arrow-left" />
						</span>
					</a>
				</div>
				<div class="grid items-center justify-center">
					<p class="text-lg font-bold text-slate-600">{name}</p>
				</div>
			</div>
		</div>
	</div>
</div>
