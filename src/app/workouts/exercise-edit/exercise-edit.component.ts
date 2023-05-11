import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { WorkoutService } from '../workout.service';
import { ExerciseType } from '../enums/exercise-type.model';
import { MuscleGroup } from '../enums/muscle-group.model';
import { ExerciseEquipment } from '../enums/exercise-equipment.model';
import { TrainingLevel } from '../enums/training-level.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {
  id: number;
  editMode = false;
  exerciseFormGroup: FormGroup;
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
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let name = '';
    let type = '';
    let group = '';
    let equipment = '';
    let level = '';

    if (this.editMode) {
      const exercise = this.workoutService.getExercise(this.id);
      name = exercise.name;
      type = exercise.type;
      group = exercise.group;
      equipment = exercise.equipment;
      level = exercise.level;
    }

    this.exerciseFormGroup = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'type': new FormControl(type, Validators.required),
      'group': new FormControl(group, Validators.required),
      'equipment': new FormControl(equipment, Validators.required),
      'level': new FormControl(level, Validators.required),
    });
  }

  onSubmit() {
    const exercise = this.exerciseFormGroup.value;
    if (this.editMode) {
      exercise.id = this.id;
      this.workoutService.updateExercise(exercise);
    } else {
      this.dataStorageService.storeExercise(exercise);
    }
    this.onCancel();
  }

  onAddPastExercise() {
    (this.exerciseFormGroup.get('pastExercises') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'complete': new FormControl()
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get controls() {
    return (this.exerciseFormGroup.get('pastExercises') as FormArray).controls;
  }

  onDeletePastExercise(index: number) {
    (this.exerciseFormGroup.get('pastExercises') as FormArray).removeAt(index);
  }

}
