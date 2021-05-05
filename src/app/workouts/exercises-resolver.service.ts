import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { WorkoutService } from './workout.service';
import { Exercise } from './models/exercise.model';

@Injectable({ providedIn: 'root' })
export class ExercisesResolverService implements Resolve<Exercise[]> {

    constructor(private dataStorageService: DataStorageService, private workoutService: WorkoutService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Exercise[]> | Promise<Exercise[]> | Exercise[] {
        const exercises = this.workoutService.getExercises();

        if (exercises.length === 0) {
            return this.dataStorageService.fetchExercises();
        } else {
            return exercises;
        }
    }

}