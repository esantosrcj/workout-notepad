import { Component, OnInit, Input } from '@angular/core';

import { WorkoutRoutine } from '../../models/workout-routine.model';

@Component({
  selector: 'app-workout-routine-item',
  templateUrl: './workout-routine-item.component.html',
  styleUrls: ['./workout-routine-item.component.css']
})
export class WorkoutRoutineItemComponent implements OnInit {
  @Input() workoutRoutine: WorkoutRoutine;

  constructor() { }

  ngOnInit(): void {
  }

}
