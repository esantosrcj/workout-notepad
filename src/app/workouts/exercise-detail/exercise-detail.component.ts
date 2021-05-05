import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Exercise } from '../models/exercise.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
  exercise: Exercise;
  id: number;

  constructor(private workoutService: WorkoutService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.exercise = this.workoutService.getExercise(this.id);
      } 
    );
  }

  onViewActivityHistory() {
  }

  onEditExercise() {
    // alternate: this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteExercise() {
    this.workoutService.deleteExercise(this.id);
    this.router.navigate(['/workouts']);
  }

}
