import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Exercise } from '../models/exercise.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  subscription: Subscription;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.subscription = this.workoutService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      }
    );
    this.exercises = this.workoutService.getExercises();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
