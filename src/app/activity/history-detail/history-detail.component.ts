import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SubmittedExercise } from 'src/app/shared/submitted-exercise.model';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) historyForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: SubmittedExercise;

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.subscription = this.activityService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.activityService.getPastExercise(index);
        this.historyForm.setValue({
          name: this.editedItem.name,
          complete: this.editedItem.complete
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const pastExercise = new SubmittedExercise(value.name, value.complete);
    if (this.editMode) {
      this.activityService.updatePastExercise(this.editedItemIndex, pastExercise);
    } else {
      this.activityService.addPastExercise(pastExercise);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.activityService.deletePastExercise(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.historyForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
