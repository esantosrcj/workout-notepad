export interface Exercise {
	id: string;
	name: string;
	type: string;
	equipment: string;
	target: string;
}

export interface UserExercise {
	id: string;
	name: string;
	sets: number;
	reps: string;
	notes: string;
	exercise: Exercise;
}

export interface Workout {
	id: string;
	name: string;
	day: string;
	exercises: UserExercise[];
}

export interface Routine {
	id: string;
	name: string;
	description: string;
	workouts: Workout[];
}

export interface PBWorkout {
	id: string;
	name: string;
	day: string;
	exercises: string[];
	expand: {
		exercises: Exercise[];
	};
}

export interface PBRoutine {
	id: string;
	name: string;
	description: string;
	workouts: string[];
	expand: {
		workouts: PBWorkout[];
	};
}

export interface InProgressSet {
	id: number;
	reps: string;
	complete: boolean;
}
