import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WorkoutService } from '../workout.service';
import { WorkoutRoutine } from '../models/workout-routine.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workout-routine-list',
  templateUrl: './workout-routine-list.component.html',
  styleUrls: ['./workout-routine-list.component.css']
})
export class WorkoutRoutineListComponent implements OnInit {
  workoutRoutines: WorkoutRoutine[];
  subscription: Subscription;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // On init subscribe to Subject<WorkoutRoutine>();
    // every time workout routines change set it to this workoutRoutines
    this.workoutService.workoutRoutinesChanged.subscribe(
      (workoutRoutines: WorkoutRoutine[]) => {
        this.workoutRoutines = workoutRoutines;
      }
    );
    // Sets this workoutRoutines list after refreshing browser
    this.workoutRoutines = this.workoutService.getWorkoutRoutines();
  }

  onNewWorkout() {
    this.router.navigate(['workout-routine/new'], { relativeTo: this.route });
  }

  onNewExercise() {
    this.router.navigate(['exercise/new'], { relativeTo: this.route });
  }

}
