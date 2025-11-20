<script lang="ts">
	import type { UserExercise } from '$lib/types/workout-log';

	export let exercises: UserExercise[] = [];
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container md:w-2/3">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Name</th>
				<th>Sets</th>
				<th>Reps</th>
			</tr>
		</thead>
		<tbody>
			{#each exercises as exercise (exercise.id)}
				<tr>
					<td>
						<p class="text-wrap">
							{exercise.name}
						</p>
					</td>
					<td>{exercise.sets}</td>
					<td>{exercise.reps}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
