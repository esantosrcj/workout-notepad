import { browser } from '$app/environment';
import type { Routine, UserExercise, Workout } from '$lib/types/workout-log';

export const getRoutine = (userId: string) => {
	let routine: Routine | undefined;
	if (browser) {
		const storedData = localStorage.getItem(userId);
		if (storedData && storedData !== '{}') {
			routine = JSON.parse(storedData);
		}
	}

	return routine;
};

export const validateRoutine = (name: string, description: string) => {
	if (browser) {
		if (name.length > 50) {
			return {
				isValid: false,
				message: 'Name is too long'
			};
		}

		if (description.length > 200) {
			return {
				isValid: false,
				message: 'Description is too long'
			};
		}

		return { isValid: true, message: '' };
	}

	return { isValid: false, message: 'Unexpected eror' };
};

export const validateWorkout = (workouts: Workout[], name: string) => {
	if (browser) {
		if (name.length > 50) {
			return {
				isValid: false,
				message: 'Name is too long'
			};
		}

		if (
			workouts?.length &&
			workouts.find(
				(w) => w.name.toLocaleLowerCase() === String(name).toLocaleLowerCase()
			)
		) {
			return {
				isValid: false,
				message: 'Name must be unique'
			};
		}

		return { isValid: true, message: '' };
	}

	return { isValid: false, message: 'Unexpected eror' };
};

export const validateExercise = (
	exercises: UserExercise[],
	name: string,
	sets: string,
	reps: string,
	notes: string
) => {
	if (browser) {
		if (
			exercises?.length &&
			exercises.find(
				(e) => e.name.toLocaleLowerCase() === String(name).toLocaleLowerCase()
			)
		) {
			return {
				isValid: false,
				message: 'Name must be unique'
			};
		}

		const setsRegEx = /^\d+$/;
		if (!setsRegEx.test(String(sets))) {
			return {
				isValid: false,
				message: 'Sets is not a number'
			};
		}

		const repsRegEx = /^\d+(\s*-\s*\d+)?$/;
		if (!repsRegEx.test(String(reps))) {
			return {
				isValid: false,
				message: 'Reps is not a valid value (e.g., 6 or 8 - 12)'
			};
		}

		if (notes.length > 200) {
			return {
				isValid: false,
				message: 'Notes is too long'
			};
		}

		return { isValid: true, message: '' };
	}

	return { isValid: false, message: 'Unexpected eror' };
};
