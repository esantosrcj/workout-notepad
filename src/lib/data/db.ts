import type {
	PBRoutine,
	PBWorkout,
	Routine,
	UserExercise,
	Workout
} from '$lib/types/workout-log';

// Get user routines
export const getRoutinesByUser = async (locals: App.Locals, userId: string) => {
	let routines: Routine[] = [];
	try {
		const result = await locals.pb.collection('routines').getList(1, 50, {
			filter: `user = '${userId}'`
		});
		routines = result.items as unknown as Routine[];
	} catch (err) {
		// Log error
		console.log(err);
	}

	return routines;
};

export const getWorkoutsByRoutine = async (
	locals: App.Locals,
	routineId: string
) => {
	let workouts: Workout[] = [];
	try {
		const result = await locals.pb.collection('workouts').getList(1, 50, {
			filter: `routine = '${routineId}'`
		});
		workouts = result.items as unknown as Workout[];
	} catch (err) {
		// Log error
		console.log(err);
	}

	return workouts;
};

export const getExercisesByWorkout = async (
	locals: App.Locals,
	workoutId: string
) => {
	let exercises: UserExercise[] = [];
	try {
		const result = await locals.pb.collection('user_exercises').getList(1, 50, {
			filter: `workout = '${workoutId}'`
		});
		exercises = result.items as unknown as UserExercise[];
	} catch (err) {
		// Log error
		console.log(err);
	}

	return exercises;
};

// Get one routine
export const getSingleRoutine = async (
	locals: App.Locals,
	routineId: string
) => {
	let routine;
	try {
		const result = await locals.pb.collection('routines').getOne(routineId);
		routine = result as unknown as PBRoutine;
	} catch (err) {
		// Log error
		console.log(err);
	}

	return routine;
};

// Get one workout
export const getSingleWorkout = async (
	locals: App.Locals,
	workoutId: string
) => {
	let workout;
	try {
		const result = await locals.pb.collection('workouts').getOne(workoutId);
		workout = result as unknown as PBWorkout;
	} catch (err) {
		// Log error
		console.log(err);
	}

	return workout;
};

export const createRoutine = async (
	locals: App.Locals,
	userId: string,
	name: string,
	description: string
) => {
	let routine;
	try {
		const data = {
			name,
			description,
			user: userId
		};
		// CREATE routine
		routine = await locals.pb.collection('routines').create(data);
	} catch (err) {
		// Log error
		console.log(err);
	}

	return routine;
};

export const createWorkout = async (
	locals: App.Locals,
	routineId: string,
	name: string,
	day: string
) => {
	let workout;
	try {
		const data = {
			name,
			day,
			routine: routineId
		};
		// CREATE workout
		workout = await locals.pb.collection('workouts').create(data);
	} catch (err) {
		// Log error
		console.log(err);
	}

	return workout;
};

export const createExercise = async (
	locals: App.Locals,
	workoutId: string,
	name: string,
	sets: number,
	reps: string,
	notes: string,
	exerciseId: string
) => {
	let exercise;
	try {
		const data = {
			name,
			sets,
			reps,
			notes,
			workout: workoutId,
			exercise: exerciseId
		};
		// CREATE exercise
		exercise = await locals.pb.collection('user_exercises').create(data);
	} catch (err) {
		// Log error
		console.log(err);
	}

	return exercise;
};

export const transferTempRoutine = async (
	locals: App.Locals,
	tempRoutine: Routine,
	userId: string
) => {
	// Store temp routine
	const routine = await locals.pb.collection('routines').create({
		name: tempRoutine.name,
		description: tempRoutine.description,
		user: userId
	});

	// Store temp workouts
	const tempWorkouts = [...tempRoutine.workouts];
	const workoutPromises = tempWorkouts.map(async (w, index) =>
		locals.pb.collection('workouts').create(
			{
				name: w.name,
				day: w.day,
				routine: routine.id
			},
			{
				requestKey: `workout${index}` // To avaid auto cancellation
			}
		)
	);
	const newWorkouts = await Promise.all(workoutPromises);

	// Store temp exercises
	const storedWorkouts = newWorkouts.map((w) => ({
		workoutId: w.id,
		workoutName: w.name
	}));
	const tempExercises = tempWorkouts
		.map((w) => {
			const exercsises = [...w.exercises];
			return exercsises.map((e) => ({ ...e, workoutName: w.name }));
		})
		.flat();
	const exercisePromises = tempExercises.map(async (e, index) => {
		// Find new workout ID by name
		const workout = storedWorkouts.find((w) => w.workoutName === e.workoutName);
		return locals.pb.collection('user_exercises').create(
			{
				name: e.name,
				sets: e.sets,
				reps: e.reps,
				notes: e.notes,
				workout: workout?.workoutId,
				exercise: e.exercise.id
			},
			{
				requestKey: `exercise${index}` // To avaid auto cancellation
			}
		);
	});
	await Promise.all(exercisePromises);
};
