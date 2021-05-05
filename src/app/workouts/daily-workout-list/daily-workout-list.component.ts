import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { WorkoutService } from '../workout.service';
import { DailyWorkout } from '../models/daily-workout.model';

@Component({
  selector: 'app-daily-workout-list',
  templateUrl: './daily-workout-list.component.html',
  styleUrls: ['./daily-workout-list.component.css']
})
export class DailyWorkoutListComponent implements OnInit, OnDestroy {
  dailyWorkouts: DailyWorkout[];
  subscripton: Subscription;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscripton = this.workoutService.dailyWorkoutsChanged.subscribe(
      (dailyWorkouts: DailyWorkout[]) => {
        this.dailyWorkouts = dailyWorkouts;
      }
    );
    this.dailyWorkouts = this.workoutService.getDailyWorkouts();
  }

  onNewWorkout() {
    this.router.navigate(['daily-workout/new'], { relativeTo: this.route });
  }

  onNewExercise() {
    this.router.navigate(['exercise/new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscripton.unsubscribe();
  }

}
