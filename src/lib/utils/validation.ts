import type { Routine, UserExercise, Workout } from '$lib/types/workout-log';

export const validateRoutine = (
	routines: Routine[],
	name: FormDataEntryValue | undefined,
	description: FormDataEntryValue | undefined
) => {
	if (
		!name ||
		name === 'undefined' ||
		!description ||
		description === 'undefined'
	) {
		throw new Error('Routine must have required values');
	}

	if (String(name).length > 50) {
		throw new Error('Name is too long');
	}

	if (String(description).length > 200) {
		throw new Error('Description is too long');
	}

	if (
		routines?.length &&
		routines.find(
			(r) => r.name.toLocaleLowerCase() === String(name).toLocaleLowerCase()
		)
	) {
		throw new Error('Name must be unique');
	}
};

export const validateWorkout = (
	workouts: Workout[],
	name: FormDataEntryValue | undefined,
	day: FormDataEntryValue | undefined
) => {
	if (!name || name === 'undefined' || !day || day === 'undefined') {
		throw new Error('Workout must have required values');
	}

	if (String(name).length > 50) {
		throw new Error('Name is too long');
	}

	if (
		workouts?.length &&
		workouts.find(
			(w) => w.name.toLocaleLowerCase() === String(name).toLocaleLowerCase()
		)
	) {
		throw new Error('Name must be unique');
	}
};

export const validateExercise = (
	exercises: UserExercise[],
	name: FormDataEntryValue | undefined,
	sets: FormDataEntryValue | undefined,
	reps: FormDataEntryValue | undefined,
	notes: FormDataEntryValue | undefined
) => {
	if (!name || name === 'undefined') {
		throw new Error('Exercise not selected');
	}

	const setsRegEx = /^\d+$/;
	if (!setsRegEx.test(String(sets))) {
		throw new Error('Sets is not a number');
	}

	const repsRegEx = /^\d+(\s*-\s*\d+)?$/;
	if (!repsRegEx.test(String(reps))) {
		throw new Error('Reps is not a valid value (e.g., 6 or 8 - 12)');
	}

	if (
		exercises?.length &&
		exercises.find(
			(e) => e.name.toLocaleLowerCase() === String(name).toLocaleLowerCase()
		)
	) {
		throw new Error('Name must be unique');
	}

	if (String(notes).length > 200) {
		throw new Error('Notes is too long');
	}
};
