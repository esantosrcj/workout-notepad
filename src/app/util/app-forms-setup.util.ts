import { FormGroup, FormControl, Validators, ValidationErrors, FormArray } from '@angular/forms';

import { Exercise } from '../workouts/models/exercise.model';
import { CustomExercise } from '../workouts/models/custom-exercise.model';
import { DailyWorkout } from '../workouts/models/daily-workout.model';
import { WorkoutRoutine } from '../workouts/models/workout-routine.model';

export class AppFormsSetupUtil {
  
  static initExerciseFormGroup(): FormGroup {
    return new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(null, Validators.required),
      'type': new FormControl(null, Validators.required),
      'group': new FormControl(null, Validators.required),
      'equipment': new FormControl(null, Validators.required),
      'level': new FormControl(null, Validators.required)
    });
  }
  
  static initCustomExerciseFormGroup(exercise: FormGroup): FormGroup {
    return new FormGroup({
      'id': new FormControl(),
      'workoutId': new FormControl(),
      'order': new FormControl(),
      'sets': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'reps': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*(,[1-9][0-9]*)*$/)]),
      'active': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'rest': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'exercise': exercise
    }, { validators: AppFormsSetupUtil.validateSetsRepsMatch });
  }
  
  static initDailyWorkoutFormGroup(customExercises: FormArray): FormGroup {
    return new FormGroup({
      'id': new FormControl(),
      'day': new FormControl(null, Validators.required),
      'target': new FormControl(null, Validators.required),
      'exercises': customExercises
    }, { validators: this.validateUniqueOrder });
  }

  static initWorkoutRoutineFormGroup(dailyWorkouts: FormArray): FormGroup {
    return new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(null, Validators.required),
      'goal': new FormControl(null, Validators.required),
      'level': new FormControl(null, Validators.required),
      'notes': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
      'workouts': dailyWorkouts
    });
  }
  
  static setupExerciseFormGroup(exercise: Exercise): FormGroup {
    return new FormGroup({
      'id': new FormControl(exercise.id),
      'name': new FormControl(exercise.name, Validators.required),
      'type': new FormControl(exercise.type, Validators.required),
      'group': new FormControl(exercise.group, Validators.required),
      'equipment': new FormControl(exercise.equipment, Validators.required),
      'level': new FormControl(exercise.level, Validators.required)
    });
  }

  static setupCustomExerciseFormGroup(customExercise: CustomExercise, exercise: FormGroup): FormGroup {
    return new FormGroup({
      'id': new FormControl(customExercise.id),
      'workoutId': new FormControl(customExercise.workoutId),
      'sets': new FormControl(customExercise.sets, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'reps': new FormControl(customExercise.reps, [Validators.required, Validators.pattern(/^[1-9][0-9]*(,[1-9][0-9]*)*$/)]),
      'active': new FormControl(customExercise.active, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'rest': new FormControl(customExercise.rest, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'order': new FormControl(customExercise.order, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'exercise': exercise
    }, { validators: this.validateSetsRepsMatch });
  }

  static setupDailyWorkoutFormGroup(dailyWorkout: DailyWorkout, customExercises: FormArray): FormGroup {
    return new FormGroup({
      'id': new FormControl(dailyWorkout.id),
      'day': new FormControl(dailyWorkout.day, Validators.required),
      'target': new FormControl(dailyWorkout.target, Validators.required),
      'exercises': customExercises
    }, { validators: this.validateUniqueOrder });
  }

  static setupWorkoutRoutineFormGroup(workoutRoutine: WorkoutRoutine, dailyWorkouts: FormArray): FormGroup {
    return new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(workoutRoutine.name, Validators.required),
      'goal': new FormControl(workoutRoutine.goal, Validators.required),
      'level': new FormControl(workoutRoutine.level, Validators.required),
      'notes': new FormControl(workoutRoutine.notes, Validators.required),
      'startDate': new FormControl(workoutRoutine.startDate, Validators.required),
      'endDate': new FormControl(workoutRoutine.endDate, Validators.required),
      'workouts': dailyWorkouts
    });
  }

  static validateSetsRepsMatch(control: FormGroup): ValidationErrors | null {
    let numSets = 0;
    const sets = control.get('sets');
    if (sets.value) {
      numSets = sets.value;
    }

    let repsSize = 0;
    const reps = control.get('reps');
    if (reps.value) {
      repsSize = (reps.value as string).split(',').length;
    }

    return numSets !== repsSize ? { 'setsRepsMismatch': true } : null;
  }

  static validateUniqueOrder(control: FormGroup): ValidationErrors | null {
    let orders: number[] = [];
    const exercises: CustomExercise[] = control.get('exercises').value;
    for (let c of exercises) {
      orders.push(c.order);
    }

    let isSameOrder: boolean = false;
    let currOrder: number = 0;
    const sortedOrders: number[] = orders.sort();
    for (let n of sortedOrders) {
      if (currOrder === n) {
        isSameOrder = true;
        break;
      }
      currOrder = n;
    }

    return isSameOrder ? { 'sameOrderNumber': true } : null;
  }
}