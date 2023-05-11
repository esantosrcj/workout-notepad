import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { WorkoutService } from '../workouts/workout.service';
import { Exercise } from '../workouts/models/exercise.model';
import { CustomExercise } from '../workouts/models/custom-exercise.model';
import { DailyWorkout } from '../workouts/models/daily-workout.model';
import { WorkoutRoutine } from '../workouts/models/workout-routine.model';

const apiUrl = process.env.WORKOUT_API;

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient, private workoutService: WorkoutService) { }

    /*
    * Exercises API
    */
    storeExercise(newExercise: Exercise) {
        this.http
            .post<Exercise>(`${apiUrl}/exercises`, newExercise)
            .subscribe(exercise => {
                this.workoutService.addExercise(exercise);
            });
    }

    fetchExercises() {
        return this.http
            .get<Exercise[]>(`${apiUrl}/exercises`)
            .pipe(map(exercises => {
                return exercises.map(exercise => {
                    return { ...exercise };
                });
            }), tap(exercises => {
                this.workoutService.setExercises(exercises);
            }));
    }

    /*
    * CustomeExercises API
    */
    storeCustomExercise(newCustomExercise: CustomExercise) {
        this.http
            .post<CustomExercise>(`${apiUrl}/custom-exercises`, newCustomExercise)
            .subscribe(customExercise => {
                this.workoutService.addCustomExercise(customExercise);
            });
    }

    updateCustomExercise(currCustomExercise: CustomExercise) {
        this.http
            .put<CustomExercise>(`${apiUrl}/custom-exercises`, currCustomExercise)
            .subscribe(customExercise => {
                this.workoutService.updateCustomExercise(customExercise);
            });
    }

    fetchCustomExercises() {
        return this.http
            .get<CustomExercise[]>(`${apiUrl}/custom-exercises`)
            .pipe(map(customExercises => {
                return customExercises.map(customExercise => {
                    return { ...customExercise };
                });
            }), tap(customExercises => {
                this.workoutService.setCustomExercises(customExercises);
            }));
    }

    /*
    * Workouts API
    */
    storeDailyWorkout(newDailyWorkout: DailyWorkout) {
        this.http
            .post<DailyWorkout>(`${apiUrl}/workouts`, newDailyWorkout)
            .subscribe(dailyWorkout => {
                const updatedOrder = this.updateCustomExerciseOrder(dailyWorkout.exercises);
                dailyWorkout.exercises = updatedOrder;
                this.workoutService.addDailyWorkout(dailyWorkout);
            });
    }

    updateDailyWorkout(currDailyWorkout: DailyWorkout) {
        this.http
            .put<DailyWorkout>(`${apiUrl}/workouts`, currDailyWorkout)
            .subscribe(dailyWorkout => {
                const updatedOrder = this.updateCustomExerciseOrder(dailyWorkout.exercises);
                dailyWorkout.exercises = updatedOrder;
                this.workoutService.updateDailyWorkout(dailyWorkout);
            });
    }

    fetchDailyWorkouts() {
        return this.http
            .get<DailyWorkout[]>(`${apiUrl}/workouts`)
            .pipe(map(dailyWorkouts => {
                return dailyWorkouts.map(dailyWorkout => {
                    return { ...dailyWorkout };
                });
            }), tap(dailyWorkouts => {
                this.workoutService.setDailyWorkouts(dailyWorkouts);
            }));
    }

    /*
    * Routines API
    */
    storeWorkoutRoutine(newWorkoutRoutine: WorkoutRoutine) {
        this.http
            .post<WorkoutRoutine>(`${apiUrl}/routines`, newWorkoutRoutine)
            .subscribe(workoutRoutine => {
                this.workoutService.addWorkoutRoutine(workoutRoutine);
            });
    }

    updateWorkoutRoutine(currWorkoutRoutine: WorkoutRoutine) {
        this.http
            .put<WorkoutRoutine>(`${apiUrl}/routines`, currWorkoutRoutine)
            .subscribe(workoutRoutine => {
                const updatedOrder = this.updateDailyWorkoutOrder(workoutRoutine.workouts);
                workoutRoutine.workouts = updatedOrder;
                this.workoutService.updateWorkoutRoutine(workoutRoutine);
            });
    }

    fetchWorkoutRoutines() {
        return this.http
            .get<WorkoutRoutine[]>(`${apiUrl}/routines`)
            .pipe(map(workoutRoutines => {
                return workoutRoutines.map(workoutRoutine => {
                    return { ...workoutRoutine };
                });
            }), tap(workoutRoutines => {
                console.log("WORKOUT ROUTINES");
                console.log(workoutRoutines);
                this.workoutService.setWorkoutRoutines(workoutRoutines);
            }));
    }

    updateCustomExerciseOrder(exercises: CustomExercise[]): CustomExercise[] {
        let orders: number[] = [];
        for (let c of exercises) {
            orders.push(c.order);
        }

        // Add function for numeric sorts
        let sortedOrders: number[] = orders.sort((a, b) => a - b);
        let updatedOrder: CustomExercise[] = [];
        for (let o of sortedOrders) {
            let exercise = exercises.find(c => c.order === o);
            updatedOrder.push(exercise);
        }

        return updatedOrder;
    }

    updateDailyWorkoutOrder(workouts: DailyWorkout[]): DailyWorkout[] {
        let names: string[] = [];
        for (let w of workouts) {
            names.push(w.name);
        }

        let sortedNames: string[] = names.sort();
        let updatedOrder: DailyWorkout[] = [];
        for (let s of sortedNames) {
            let workout = workouts.find(w => w.name === s);
            updatedOrder.push(workout);
        }

        return updatedOrder;
    }
}