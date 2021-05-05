import { Component, OnInit, Input } from '@angular/core';

import { CustomExercise } from '../../models/custom-exercise.model';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-custom-exercise-item',
  templateUrl: './custom-exercise-item.component.html',
  styleUrls: ['./custom-exercise-item.component.css']
})
export class CustomExerciseItemComponent implements OnInit {
  @Input() customExercise: CustomExercise;
  @Input() exercise: Exercise;

  constructor() {}

  ngOnInit(): void {
  }

  onViewActivityHistory() {}

  onEditCustom() {}

  onDeleteCustom() {}

  onNewCustom() {}

}
