import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ActivityComponent } from './activity/activity.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { ExerciseListComponent } from './workouts/exercise-list/exercise-list.component';
import { ExerciseDetailComponent } from './workouts/exercise-detail/exercise-detail.component';
import { ExerciseItemComponent } from './workouts/exercise-list/exercise-item/exercise-item.component';
import { HistoryDetailComponent } from './activity/history-detail/history-detail.component';
import { ActivityService } from './activity/activity.service';
import { AppRoutingModule } from './app-routing.module';
import { WorkoutRoutineStartComponent } from './workouts/workout-routine-start/workout-routine-start.component';
import { ExerciseEditComponent } from './workouts/exercise-edit/exercise-edit.component';
import { WorkoutService } from './workouts/workout.service';
import { CustomExerciseListComponent } from './workouts/custom-exercise-list/custom-exercise-list.component';
import { CustomExerciseItemComponent } from './workouts/custom-exercise-list/custom-exercise-item/custom-exercise-item.component';
import { CustomExerciseDetailComponent } from './workouts/custom-exercise-detail/custom-exercise-detail.component';
import { CustomExerciseEditComponent } from './workouts/custom-exercise-edit/custom-exercise-edit.component';
import { DailyWorkoutDetailComponent } from './workouts/daily-workout-detail/daily-workout-detail.component';
import { DailyWorkoutEditComponent } from './workouts/daily-workout-edit/daily-workout-edit.component';
import { DailyWorkoutListComponent } from './workouts/daily-workout-list/daily-workout-list.component';
import { DailyWorkoutItemComponent } from './workouts/daily-workout-list/daily-workout-item/daily-workout-item.component';
import { WorkoutRoutineDetailComponent } from './workouts/workout-routine-detail/workout-routine-detail.component';
import { WorkoutRoutineEditComponent } from './workouts/workout-routine-edit/workout-routine-edit.component';
import { WorkoutRoutineListComponent } from './workouts/workout-routine-list/workout-routine-list.component';
import { WorkoutRoutineItemComponent } from './workouts/workout-routine-list/workout-routine-item/workout-routine-item.component';
import { FooterComponent } from './footer/footer.component';
import { AccordionDirective } from './shared/accordion.directive';
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    ExerciseListComponent,
    ExerciseItemComponent,
    ExerciseDetailComponent,
    ExerciseEditComponent,
    HeaderComponent,
    HistoryDetailComponent,
    WorkoutsComponent,
    WorkoutRoutineStartComponent,
    CustomExerciseListComponent,
    CustomExerciseItemComponent,
    CustomExerciseDetailComponent,
    CustomExerciseEditComponent,
    DailyWorkoutDetailComponent,
    DailyWorkoutEditComponent,
    DailyWorkoutListComponent,
    DailyWorkoutItemComponent,
    WorkoutRoutineDetailComponent,
    WorkoutRoutineEditComponent,
    WorkoutRoutineListComponent,
    WorkoutRoutineItemComponent,
    FooterComponent,
    AccordionDirective,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ActivityService, WorkoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
