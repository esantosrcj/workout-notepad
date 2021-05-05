import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from './models/exercise.model';
import { SubmittedExercise } from '../shared/submitted-exercise.model';
import { ActivityService } from '../activity/activity.service';
import { CustomExercise } from './models/custom-exercise.model';
import { DailyWorkout } from './models/daily-workout.model';
import { WorkoutRoutine } from './models/workout-routine.model';

@Injectable()
export class WorkoutService {
    exercisesChanged = new Subject<Exercise[]>();
    customExercisesChanged = new Subject<CustomExercise[]>();
    dailyWorkoutsChanged = new Subject<DailyWorkout[]>();
    workoutRoutinesChanged = new Subject<WorkoutRoutine[]>();
    private exercises: Exercise[] = [];
    private customExerises: CustomExercise[] = [];
    private dailyWorkouts: DailyWorkout[] = [];
    private workoutRoutines: WorkoutRoutine[] = [];

    constructor(private activityService: ActivityService) {}

    viewPastExercisesInActivity(pastExercises: SubmittedExercise[]) {
        this.activityService.addPastExercises(pastExercises);
    }

    /*
    * Exercise model
    */
    setExercises(exercises: Exercise[]) {
        this.exercises = exercises;
        this.exercisesChanged.next(this.exercises.slice());
    }

    getExercises() {
        // slice() - return a new array; exact copy
        return this.exercises.slice();
    }

    getExercise(id: number) {
        return this.exercises.find(e => e.id === id);
    }

    addExercise(exercise: Exercise) {
        this.exercises.push(exercise);
        this.exercisesChanged.next(this.exercises.slice());
    }

    updateExercise(exercise: Exercise) {
        const index = this.exercises.findIndex(e => e.id === exercise.id);
        this.exercises[index] = exercise;
        this.exercisesChanged.next(this.exercises.slice());
    }

    deleteExercise(id: number) {
        const index = this.exercises.findIndex(e => e.id === id);
        this.exercises.splice(index, 1);
        this.exercisesChanged.next(this.exercises.slice());
    }

    /*
    * CustomExercise model
    */
    setCustomExercises(customExercises: CustomExercise[]) {
        this.customExerises = customExercises;
        this.customExercisesChanged.next(this.customExerises.slice());
    }

    getCustomExercises() {
        return this.customExerises.slice();
    }

    getCustomExercise(id: number) {
        return this.customExerises.find(c => c.id === id);
    }

    getCustomExerciseByOrder(order: number) {
        return this.customExerises.find(c => c.order === order);
    }

    addCustomExercise(customExercise: CustomExercise) {
        this.customExerises.push(customExercise);
        this.customExercisesChanged.next(this.customExerises.slice());
    }

    updateCustomExercise(customExercise: CustomExercise) {
        // TODO: Find an alternative
        if (customExercise.workoutId) {
            const workoutId = customExercise.workoutId;
            const dailyWorkout = this.getDailyWorkout(workoutId);
            const exercises = dailyWorkout.exercises;
            const index = exercises.findIndex(c => c.id === customExercise.id);
            exercises[index] = customExercise;
            dailyWorkout.exercises = exercises;
            this.updateDailyWorkout(dailyWorkout);
        } else {
            const index = this.customExerises.findIndex(c => c.id === customExercise.id);
            this.customExerises[index] = customExercise;
            this.customExercisesChanged.next(this.customExerises.slice());
        }
    }

    updateCustomExercises(customExercises: CustomExercise[]) {
        console.log("TRYING TO UPDATE CUSTOMS")
        let customs = this.getCustomExercises();
        console.log(customs);
        this.customExerises = customExercises;
        this.customExercisesChanged.next(this.customExerises.slice());
    }

    deleteCustomExercise(id: number) {
        const index = this.customExerises.findIndex(c => c.id === id);
        this.customExerises.splice(index, 1);
        this.customExercisesChanged.next(this.customExerises.slice());
    }

    /*
    * DailyWorkout model
    */
    setDailyWorkouts(dailyWorkouts: DailyWorkout[]) {
        this.dailyWorkouts = dailyWorkouts;
        this.dailyWorkoutsChanged.next(this.dailyWorkouts.slice());
    }

    getDailyWorkouts() {
        return this.dailyWorkouts.slice();
    }

    getDailyWorkout(id: number) {
        return this.dailyWorkouts.find(d => d.id === id);
    }

    addDailyWorkout(dailyWorkout: DailyWorkout) {
        this.dailyWorkouts.push(dailyWorkout);
        this.dailyWorkoutsChanged.next(this.dailyWorkouts.slice());
    }

    updateDailyWorkout(dailyWorkout: DailyWorkout) {
        const index = this.dailyWorkouts.findIndex(d => d.id === dailyWorkout.id);
        this.dailyWorkouts[index] = dailyWorkout;
        this.dailyWorkoutsChanged.next(this.dailyWorkouts.slice());
        this.updateCustomExercises(dailyWorkout.exercises);
    }

    /*
    updateDailyWorkouts(dailyWorkouts: DailyWorkout[]) {
        this.dailyWorkouts = dailyWorkouts;
        this.dailyWorkoutsChanged.next(this.dailyWorkouts.slice());
    }
    */

    deleteDailyWorkout(id: number) {
        const index = this.dailyWorkouts.findIndex(d => d.id === id);
        this.dailyWorkouts.splice(index, 1);
        this.dailyWorkoutsChanged.next(this.dailyWorkouts.slice());
    }

    /*
    * WorkoutRoutine model
    */
   setWorkoutRoutines(workoutRoutines: WorkoutRoutine[]) {
    this.workoutRoutines = workoutRoutines;
    this.workoutRoutinesChanged.next(this.workoutRoutines.slice());
    }

    getWorkoutRoutines() {
        return this.workoutRoutines.slice();
    }

    getWorkoutRoutine(id: number) {
        return this.workoutRoutines.find(d => d.id === id);
    }

    addWorkoutRoutine(workoutRoutine: WorkoutRoutine) {
        this.workoutRoutines.push(workoutRoutine);
        this.workoutRoutinesChanged.next(this.workoutRoutines.slice());
    }

    updateWorkoutRoutine(workoutRoutine: WorkoutRoutine) {
        const index = this.workoutRoutines.findIndex(d => d.id === workoutRoutine.id);
        this.workoutRoutines[index] = workoutRoutine;
        this.workoutRoutinesChanged.next(this.workoutRoutines.slice());
        //this.updateDailyWorkouts(workoutRoutine.workouts);
    }

    deleteWorkoutRoutine(id: number) {
        const index = this.workoutRoutines.findIndex(d => d.id === id);
        this.workoutRoutines.splice(index, 1);
        this.workoutRoutinesChanged.next(this.workoutRoutines.slice());
    }

}