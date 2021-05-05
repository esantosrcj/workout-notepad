import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SubmittedExercise } from '../shared/submitted-exercise.model';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {
  pastExercises: SubmittedExercise[];
  private subscription: Subscription;
  
  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.pastExercises = this.activityService.getPastExercises();
    this.subscription = this.activityService.exercisesChanged.subscribe(
      (exercises: SubmittedExercise[]) => {
        this.pastExercises = exercises;
      }
    );
  }

  onEditItem(index: number) {
    this.activityService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
