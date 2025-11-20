<script lang="ts">
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.css';
	import { storePopup, initializeStores, Modal } from '@skeletonlabs/skeleton';
	import {
		computePosition,
		autoUpdate,
		offset,
		shift,
		flip,
		arrow
	} from '@floating-ui/dom';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
</script>

<div>
	<Modal buttonNeutral="variant-soft-surface" />
	<slot />
</div>
