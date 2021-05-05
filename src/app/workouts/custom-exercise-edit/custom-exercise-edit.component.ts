import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

import { AppFormsSetupUtil } from 'src/app/util/app-forms-setup.util';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { WorkoutService } from '../workout.service';
import { ExerciseEquipment } from '../enums/exercise-equipment.model';
import { TrainingLevel } from '../enums/training-level.model';
import { ExerciseType } from '../enums/exercise-type.model';
import { MuscleGroup } from '../enums/muscle-group.model';
import { CustomExercise } from '../models/custom-exercise.model';
import { DailyWorkout } from '../models/daily-workout.model';
import { WorkoutRoutine } from '../models/workout-routine.model';

@Component({
  selector: 'app-custom-exercise-edit',
  templateUrl: './custom-exercise-edit.component.html',
  styleUrls: ['./custom-exercise-edit.component.css']
})
export class CustomExerciseEditComponent implements OnInit {
  routineId: number;
  workoutId: number;
  customId: number;
  exerciseId: number;
  exerciseOrder: number;
  editMode: boolean = false;
  newExercise: boolean = false;
  orderQueryParamExists: boolean = false;
  isFromDetail: boolean = false;
  customExerciseFormGroup: FormGroup;
  exerciseType = ExerciseType;
  muscleGroup = MuscleGroup;
  exerciseEquipment = ExerciseEquipment;
  trainingLevel = TrainingLevel;
  typeKeys: string[];
  groupKeys: string[];
  equipmentKeys: string[];
  levelKeys: string[];

  constructor(
    private workoutService: WorkoutService,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.typeKeys = Object.keys(this.exerciseType);
    this.groupKeys = Object.keys(this.muscleGroup);
    this.equipmentKeys = Object.keys(this.exerciseEquipment);
    this.levelKeys = Object.keys(this.trainingLevel);
    this.route.queryParams.subscribe(
      (queryParams) => {
        this.orderQueryParamExists = queryParams['order'] != null;
        this.exerciseOrder = +queryParams['order'];
        this.isFromDetail = queryParams['fromDetail'] != null ? queryParams['fromDetail'] : false;
      }
    );

    this.route.params.subscribe(
      (params: Params) => {
        this.newExercise = params['exerciseId'] != null;
        this.exerciseId = +params['exerciseId'];
        this.editMode = params['customId'] != null;
        this.customId = +params['customId'];
        this.workoutId = +params['workoutId'];
        this.routineId = +params['routineId'];
        this.initForm();
      }
    );
  }

  private initForm() {
    let exerciseFormGroup = AppFormsSetupUtil.initExerciseFormGroup();
    if (this.editMode || this.orderQueryParamExists) {
      let customExercise: CustomExercise;
      if (this.orderQueryParamExists) {
        customExercise = this.workoutService.getCustomExerciseByOrder(this.exerciseOrder);
      } else {
        customExercise = this.workoutService.getCustomExercise(this.customId);
      }

      if (customExercise['exercise']) {
        const exercise = customExercise.exercise;
        exerciseFormGroup = AppFormsSetupUtil.setupExerciseFormGroup(exercise);
      }

      this.customExerciseFormGroup = AppFormsSetupUtil.setupCustomExerciseFormGroup(customExercise, exerciseFormGroup);
    } else {
      const selectedExercise = this.workoutService.getExercise(this.exerciseId);
      if (selectedExercise) {
        exerciseFormGroup = AppFormsSetupUtil.setupExerciseFormGroup(selectedExercise);
      }

      this.customExerciseFormGroup = AppFormsSetupUtil.initCustomExerciseFormGroup(exerciseFormGroup);
    }
  }

  onAddExercise() {
    const customExercise = this.customExerciseFormGroup.value;
    customExercise.workoutId = this.workoutId;
    
    // Get workoutRoutine
    let workoutRoutine: WorkoutRoutine = this.workoutService.getWorkoutRoutine(this.routineId);
    //console.log("WORKOUT ROUTINE");
    //console.log(workoutRoutine);
    
    // Get dailyWorkout
    let workouts: DailyWorkout[] = workoutRoutine.workouts;
    //console.log("WORKOUTS");
    //console.log(workouts);
    //         return this.dailyWorkouts.find(d => d.id === id);
    let dWorkout: DailyWorkout = workouts.find(d => d.id === this.workoutId);
    console.log("DAILY WORKOUT 1");
    console.log(dWorkout);
    const dailyWorkout = this.workoutService.getDailyWorkout(this.workoutId);
    console.log("DAILY WORKOUT 2");
    console.log(dailyWorkout);
    
    // Get customExercise
    const customExercises = dailyWorkout.exercises;
    //console.log("EXERCISES");
    //console.log(customExercises);

    // Get exercise
    if (customExercises.length > 0) {
      const lastIndex = customExercises.length - 1;
      const lastExercise = customExercises[lastIndex];
      customExercise.order = lastExercise.order + 1;
    } else {
      customExercise.order = 1;
    }
    customExercises.push(customExercise);
    //console.log("UPDATED EXERCISES");
    //console.log(customExercises);
    dailyWorkout.exercises = customExercises;
    // UPDATE WORKOUT ROUTINE???
    this.workoutService.updateDailyWorkout(dailyWorkout);
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }

  onSubmit() {
    const customExercise = this.customExerciseFormGroup.value;
    if (this.editMode) {
      customExercise.id = this.customId;
      this.dataStorageService.updateCustomExercise(customExercise);
    } else {
      this.dataStorageService.storeCustomExercise(customExercise);
    }
    this.onCancel();
  }

  onCancel() {
    if (this.editMode) {
      if (this.isFromDetail) {
        this.router.navigate(['../'], { relativeTo: this.route });
      } else {
        this.router.navigate(['../../../edit'], { relativeTo: this.route });
      }
    } else {
      this.router.navigate(['../../../'], { relativeTo: this.route });
    }
  }

}
