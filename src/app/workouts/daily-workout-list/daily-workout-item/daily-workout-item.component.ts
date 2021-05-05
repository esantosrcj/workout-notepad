import { Component, OnInit, Input } from '@angular/core';

import { DailyWorkout } from '../../models/daily-workout.model';

@Component({
  selector: 'app-daily-workout-item',
  templateUrl: './daily-workout-item.component.html',
  styleUrls: ['./daily-workout-item.component.css']
})
export class DailyWorkoutItemComponent implements OnInit {
  @Input() dailyWorkout: DailyWorkout;

  constructor() {}

  ngOnInit() {}

}
