import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { WorkoutService } from '../workout.service';
import { WorkoutRoutine } from '../models/workout-routine.model';
import { DailyWorkout } from '../models/daily-workout.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-workout-routine-detail',
  templateUrl: './workout-routine-detail.component.html',
  styleUrls: ['./workout-routine-detail.component.css']
})
export class WorkoutRoutineDetailComponent implements OnInit {
  workoutRoutine: WorkoutRoutine;
  dailyWorkouts: DailyWorkout[];
  id: number;

  constructor(
    private workoutService: WorkoutService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['routineId'];
        this.workoutRoutine = this.workoutService.getWorkoutRoutine(this.id);
        this.dailyWorkouts = this.workoutRoutine.workouts;
      }
    );
  }

  onViewActivityHistory() {}

  onEditWorkout() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteWorkout() {}

}
