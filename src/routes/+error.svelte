<script>
	import { page } from '$app/stores';
</script>

<div class="flex h-screen flex-col items-center justify-center space-y-4">
	<h1 class="h1">Status: {$page.status}</h1>
	<p class="text-xl">Message: {$page?.error?.message}</p>
	<a class="btn bg-secondary-500" href="/">
		<span class="text-xl text-white">Home</span>
	</a>
</div>
