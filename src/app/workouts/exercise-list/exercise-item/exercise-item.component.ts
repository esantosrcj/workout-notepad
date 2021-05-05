import { Component, OnInit, Input } from '@angular/core';

import { Exercise } from '../../models/exercise.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.css']
})
export class ExerciseItemComponent implements OnInit {
  @Input() exercise: Exercise;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
  }

  onNewCustom() {
    this.router.navigate(['../custom-exercise/new', this.exercise.id], { relativeTo: this.route });
  }
}
