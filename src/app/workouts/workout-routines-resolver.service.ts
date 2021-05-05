import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { WorkoutService } from './workout.service';
import { WorkoutRoutine } from './models/workout-routine.model';

@Injectable({ providedIn: 'root' })
export class WorkoutRoutinesResolverService implements Resolve<WorkoutRoutine[]> {
    
    constructor(private dataStorageService: DataStorageService, private workoutService: WorkoutService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkoutRoutine[]> | Promise<WorkoutRoutine[]> | WorkoutRoutine[] {
        const workoutRoutines = this.workoutService.getWorkoutRoutines();
        
        if (workoutRoutines.length === 0) {
            return this.dataStorageService.fetchWorkoutRoutines();
        } else {
            return workoutRoutines;
        }
    }
}