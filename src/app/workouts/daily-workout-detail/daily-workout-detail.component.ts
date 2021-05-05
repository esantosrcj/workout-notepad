import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { WorkoutService } from '../workout.service';
import { DailyWorkout } from '../models/daily-workout.model';
import { CustomExercise } from '../models/custom-exercise.model';

@Component({
  selector: 'app-daily-workout-detail',
  templateUrl: './daily-workout-detail.component.html',
  styleUrls: ['./daily-workout-detail.component.css']
})
export class DailyWorkoutDetailComponent implements OnInit {
  dailyWorkout: DailyWorkout;
  customExercises: CustomExercise[];
  id: number;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['workoutId'];
        this.dailyWorkout = this.workoutService.getDailyWorkout(this.id);
        this.customExercises = this.dailyWorkout.exercises;
      }
    );
  }

  onViewActivityHistory() {}

  onEditWorkout() {
    this.router.navigate(['edit'], { queryParams: { fromDetail: true }, relativeTo: this.route });
  }

  onDeleteWorkout() {
    this.workoutService.deleteDailyWorkout(this.id);
    this.router.navigate(['/workouts']);
  }

}
