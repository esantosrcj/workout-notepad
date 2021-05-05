import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { WorkoutService } from './workout.service';
import { DailyWorkout } from './models/daily-workout.model';

@Injectable({ providedIn: 'root' })
export class DailyWorkoutsResolverService implements Resolve<DailyWorkout[]> {

    constructor(private dataStorageService: DataStorageService, private workoutService: WorkoutService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DailyWorkout[]> | Promise<DailyWorkout[]> | DailyWorkout[] {
        const dailyWorkouts = this.workoutService.getDailyWorkouts();

        if (dailyWorkouts.length === 0) {
            return this.dataStorageService.fetchDailyWorkouts();
        } else {
            return dailyWorkouts;
        }
    }

}