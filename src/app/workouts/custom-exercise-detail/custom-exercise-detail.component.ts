import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { WorkoutService } from '../workout.service';
import { CustomExercise } from '../models/custom-exercise.model';
import { Exercise } from '../models/exercise.model';

@Component({
  selector: 'app-custom-exercise-detail',
  templateUrl: './custom-exercise-detail.component.html',
  styleUrls: ['./custom-exercise-detail.component.css']
})
export class CustomExerciseDetailComponent implements OnInit {
  customExercise: CustomExercise;
  exercise: Exercise;
  customId: number;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.customId = +params['customId'];
        let customs = this.workoutService.getCustomExercises();
        console.log("CUSTOMS ++++==>");
        console.log(customs);
        this.customExercise = this.workoutService.getCustomExercise(this.customId);
        console.log(this.customId)
        console.log(this.customExercise);
        this.exercise = this.customExercise.exercise;
      }
    );
  }

  onViewActivityHistory() {}

  onEditCustom() {
    this.router.navigate(['edit'], { queryParams: { fromDetail: true }, relativeTo: this.route });
  }

  onDeleteCustom() {
    this.workoutService.deleteCustomExercise(this.customId);
    this.router.navigate(['/workouts']);
  }

}
