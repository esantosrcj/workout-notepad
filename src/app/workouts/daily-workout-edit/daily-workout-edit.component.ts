import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppFormsSetupUtil } from 'src/app/util/app-forms-setup.util';
import { WorkoutService } from '../workout.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Weekday } from '../enums/weekday.model';
import { BodyTarget } from '../enums/body-target.model';
import { CustomExercise } from '../models/custom-exercise.model';

@Component({
  selector: 'app-daily-workout-edit',
  templateUrl: './daily-workout-edit.component.html',
  styleUrls: ['./daily-workout-edit.component.css']
})
export class DailyWorkoutEditComponent implements OnInit {
  subscription: Subscription;
  workoutFormGroup: FormGroup;
  editMode: boolean = false;
  newWorkout: boolean = false;
  hideNameDuration: boolean = false;
  isFromDetail: boolean = false;
  routineId: number;
  workoutId: number;
  workoutDuration: string;
  workoutName: string;
  weekday = Weekday;
  bodyTarget = BodyTarget
  dayKeys: string[];
  targetKeys: string[];
  // TODO: Refactor
  exerciseNames: string[];
  
  constructor(
    private workoutService: WorkoutService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dayKeys = Object.keys(this.weekday);
    this.targetKeys = Object.keys(this.bodyTarget);
    this.route.queryParams.subscribe(
      (queryParams) => {
        this.isFromDetail = queryParams['fromDetail'] != null ? queryParams['fromDetail'] : false;
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['workoutId'] != null;
        //this.newWorkout = params['workoutId'] != null;
        this.workoutId = +params['workoutId'];
        this.routineId = +params['routineId'];
        this.initForm();
      }
    );

    this.workoutService.customExercisesChanged.subscribe(
      (customExercises: CustomExercise[]) => {
        this.initForm();
      }
    );
  }

  private initForm() {
    this.exerciseNames = [];
    this.workoutName = '';
    this.workoutDuration = '';
    const customExerciseFormArray = new FormArray([]);
    if (this.editMode) {
      const dailyWorkout = this.workoutService.getDailyWorkout(this.workoutId);
      this.workoutName = dailyWorkout.name;
      this.workoutDuration = dailyWorkout.duration + ' min';
      if (dailyWorkout['exercises']) {
        for (let customExercise of dailyWorkout.exercises) {
          const exercise = customExercise.exercise;
          this.exerciseNames.push(exercise.name);
          const exerciseFormGroup = AppFormsSetupUtil.setupExerciseFormGroup(exercise);
          const customExerciseFormGroup = AppFormsSetupUtil.setupCustomExerciseFormGroup(customExercise, exerciseFormGroup);
          customExerciseFormArray.push(customExerciseFormGroup);
        }
      }

      this.workoutFormGroup = AppFormsSetupUtil.setupDailyWorkoutFormGroup(dailyWorkout, customExerciseFormArray);
    } else {
      this.hideNameDuration = true;
      this.workoutFormGroup = AppFormsSetupUtil.initDailyWorkoutFormGroup(customExerciseFormArray);
    }
  }

  get controls() {
    const customExercisesFormArray = (this.workoutFormGroup.get('exercises') as FormArray);
    return customExercisesFormArray.controls;
  }

  /*

    onAddExercise() {
    const customExercise = this.customExerciseFormGroup.value;
    customExercise.workoutId = this.workoutId;
    
    const dailyWorkout = this.workoutService.getDailyWorkout(this.workoutId);
    const customExercises = dailyWorkout.exercises;
    const lastIndex = customExercises.length - 1;
    const lastExercise = customExercises[lastIndex];
    customExercise.order = lastExercise.order + 1;
    customExercises.push(customExercise);
    dailyWorkout.exercises = customExercises;
    this.workoutService.updateDailyWorkout(dailyWorkout);
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }
  */
  onAddWorkout() {
    const dailyWorkout = this.workoutFormGroup.value;
    dailyWorkout.routinedId = this.routineId

    const workoutRoutine = this.workoutService.getWorkoutRoutine(this.routineId);
    const dailyWorkouts = workoutRoutine.workouts;
    dailyWorkouts.push(dailyWorkout);
    workoutRoutine.workouts = dailyWorkouts;
    this.workoutService.updateWorkoutRoutine(workoutRoutine);
    this.router.navigate(['../../edit'], { relativeTo: this.route });
  }

  onAddCustom() {
    this.router.navigate(['custom-exercises'], { relativeTo: this.route });
  }

  onEditCustom(index: number) {
    const customExercisesFormArray = (this.workoutFormGroup.get('exercises') as FormArray);
    const customExercise: CustomExercise = customExercisesFormArray.value[index];
    if (customExercise.id) {
      if (this.isFromDetail) {
        this.router.navigate(['../custom-exercise', customExercise.id, 'edit'], { queryParams: { fromDetail: true }, relativeTo: this.route });
      } else {
        this.router.navigate(['../custom-exercise', customExercise.id, 'edit'], { relativeTo: this.route });
      }
    } else {
      this.router.navigate(['custom-exercise/new/', customExercise.exercise.id], {
        queryParams: { 'order': customExercise.order },
        relativeTo: this.route
      });
    }
  }

  onDeleteCustom(index: number) {
    const customExercisesFormArray = (this.workoutFormGroup.get('exercises') as FormArray);
    customExercisesFormArray.removeAt(index);
  }

  onSubmit() {
    const dailyWorkout = this.workoutFormGroup.value;
    if (this.editMode) {
      dailyWorkout.id = this.workoutId;
      this.dataStorageService.updateDailyWorkout(dailyWorkout);
    } else {
      dailyWorkout.id = 0;
      this.dataStorageService.storeDailyWorkout(dailyWorkout);
    }
    this.router.navigate(['workouts']);
  }

  onCancel() {
    if (this.editMode) {
      const dailyWorkout = this.workoutService.getDailyWorkout(this.workoutId);
      const customExercises = dailyWorkout.exercises.filter(w => w.id !== null);
      dailyWorkout.exercises = customExercises;
      this.workoutService.updateDailyWorkout(dailyWorkout);
      if (this.isFromDetail) {
        this.router.navigate(['../'], { relativeTo: this.route });
      } else {
        this.router.navigate(['../../../edit'], { relativeTo: this.route });
      }
    } else {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

}
