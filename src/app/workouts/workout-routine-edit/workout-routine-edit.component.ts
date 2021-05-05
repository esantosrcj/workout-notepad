import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

import { WorkoutService } from '../workout.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { DailyWorkout } from '../models/daily-workout.model';
import { FitnessGoal } from '../enums/fitness-goal.model';
import { TrainingLevel } from '../enums/training-level.model';
import { AppFormsSetupUtil } from 'src/app/util/app-forms-setup.util';

@Component({
  selector: 'app-workout-routine-edit',
  templateUrl: './workout-routine-edit.component.html',
  styleUrls: ['./workout-routine-edit.component.css']
})
export class WorkoutRoutineEditComponent implements OnInit {
  subscription: Subscription;
  routineFormGroup: FormGroup;
  dailyWorkouts: DailyWorkout[];
  editMode: boolean = false;
  routineId: number;
  fitnessGoal = FitnessGoal;
  trainingLevel = TrainingLevel;
  goalKeys: string[];
  levelKeys: string[];
  workoutNames: string[];

  addMoreExercises: boolean = false;

  constructor(
    private workoutService: WorkoutService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.goalKeys = Object.keys(this.fitnessGoal);
    this.levelKeys = Object.keys(this.trainingLevel);
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['routineId'] != null;
        this.routineId = +params['routineId'];
        this.initForm();
      }
    );

    this.subscription = this.workoutService.dailyWorkoutsChanged.subscribe(
      (dailyWorkouts: DailyWorkout[]) => {
        this.dailyWorkouts = dailyWorkouts;
      }
    );
  }

  private initForm() {
    this.workoutNames = [];
    const dailyWorkoutsFormArray = new FormArray([]);
    if (this.editMode) {
      const workoutRoutine = this.workoutService.getWorkoutRoutine(this.routineId);
      if (workoutRoutine['workouts']) {
        for (let dailyWorkout of workoutRoutine.workouts) {
          const dailyWorkoutFormGroup = AppFormsSetupUtil.setupDailyWorkoutFormGroup(dailyWorkout, new FormArray([]));
          dailyWorkoutsFormArray.push(dailyWorkoutFormGroup);
        }
      }

      this.routineFormGroup = AppFormsSetupUtil.setupWorkoutRoutineFormGroup(workoutRoutine, dailyWorkoutsFormArray);
    } else {
      this.routineFormGroup = AppFormsSetupUtil.initWorkoutRoutineFormGroup(dailyWorkoutsFormArray);
    }
  }

  onCancel() {
    if (this.editMode) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

  onAddWorkout() {
    this.router.navigate(['../daily-workout/new'], { relativeTo: this.route });
  }

  onDeleteWorkout(index: number) {
  }

  onEditWorkout(index: number) {
    const dailyWorkoutsFormArray = (this.routineFormGroup.get('workouts') as FormArray);
    const dailyWorkout: DailyWorkout = dailyWorkoutsFormArray.value[index];
    this.router.navigate(['../daily-workout', dailyWorkout.id, 'edit'], { relativeTo: this.route });
  }

  get workouts(): DailyWorkout[] {
    const dailyWorkoutsFormArray = (this.routineFormGroup.get('workouts') as FormArray);
    return dailyWorkoutsFormArray.value;
  }

  onSubmit() {
    const workoutRoutine = this.routineFormGroup.value;
    if (this.editMode) {
      workoutRoutine.id = this.routineId;
      this.dataStorageService.updateWorkoutRoutine(workoutRoutine);
    } else {
      workoutRoutine.id = 0;
      this.dataStorageService.storeWorkoutRoutine(workoutRoutine);
    }
    this.router.navigate(['workouts']);
  }

}
