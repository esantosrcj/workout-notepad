import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { WorkoutService } from './workout.service';
import { CustomExercise } from './models/custom-exercise.model';

@Injectable({ providedIn: 'root' })
export class CustomExercisesResolverService implements Resolve<CustomExercise[]> {

    constructor(private dataStorageService: DataStorageService, private workoutService: WorkoutService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CustomExercise[]> | Promise<CustomExercise[]> | CustomExercise[] {
        const customExercises = this.workoutService.getCustomExercises();

        if (customExercises.length === 0) {
            return this.dataStorageService.fetchCustomExercises();
        } else {
            return customExercises;
        }
    }

}