import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CustomExercise } from '../models/custom-exercise.model';
import { WorkoutService } from '../workout.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-custom-exercise-list',
  templateUrl: './custom-exercise-list.component.html',
  styleUrls: ['./custom-exercise-list.component.css']
})
export class CustomExerciseListComponent implements OnInit, OnDestroy {
  customExercises: CustomExercise[];
  subscription: Subscription;
  
  constructor(
    private workoutService: WorkoutService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.workoutService.customExercisesChanged.subscribe(
      (customExercises: CustomExercise[]) => {
        this.customExercises = customExercises;
      }
    );
    this.customExercises = this.workoutService.getCustomExercises();
  }
  
  onCustomExercise() {
    this.dataStorageService.fetchExercises().subscribe();
    this.router.navigate(['custom-exercise'], { relativeTo: this.route });
  }

  onNewExercise() {
    this.router.navigate(['exercise/new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}