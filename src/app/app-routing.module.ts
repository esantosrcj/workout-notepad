import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityComponent } from './activity/activity.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutRoutineStartComponent } from './workouts/workout-routine-start/workout-routine-start.component';
import { ExerciseEditComponent } from './workouts/exercise-edit/exercise-edit.component';
import { ExerciseListComponent } from './workouts/exercise-list/exercise-list.component';
import { CustomExerciseDetailComponent } from './workouts/custom-exercise-detail/custom-exercise-detail.component';
import { CustomExerciseEditComponent } from './workouts/custom-exercise-edit/custom-exercise-edit.component';
import { DailyWorkoutDetailComponent } from './workouts/daily-workout-detail/daily-workout-detail.component';
import { DailyWorkoutEditComponent } from './workouts/daily-workout-edit/daily-workout-edit.component';
import { WorkoutRoutineDetailComponent } from './workouts/workout-routine-detail/workout-routine-detail.component';
import { ExercisesResolverService } from './workouts/exercises-resolver.service';
import { CustomExercisesResolverService } from './workouts/custom-exercises-resolver.service';
import { DailyWorkoutsResolverService } from './workouts/daily-workouts-resolver.service';
import { WorkoutRoutinesResolverService } from './workouts/workout-routines-resolver.service';
import { WorkoutRoutineEditComponent } from './workouts/workout-routine-edit/workout-routine-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/workouts', pathMatch: 'full' },
    { path: 'workouts', component: WorkoutsComponent, children: [
        { path: '', component: WorkoutRoutineStartComponent },
        { path: 'exercise', redirectTo: '/workouts', pathMatch: 'full' },
        { path: 'exercise/new', component: ExerciseEditComponent },
        { path: 'custom-exercise', component: ExerciseListComponent },
        { path: 'custom-exercise/new/:exerciseId', component: CustomExerciseEditComponent, resolve: [ExercisesResolverService] },
        { path: 'custom-exercise/:customId', component: CustomExerciseDetailComponent, resolve: [CustomExercisesResolverService] },
        { path: 'custom-exercise/:customId/edit', component: CustomExerciseEditComponent, resolve: [CustomExercisesResolverService] },
        { path: 'daily-workout', redirectTo: '/workouts', pathMatch: 'full' },
        { path: 'daily-workout/new', component: DailyWorkoutEditComponent },
        { path: 'daily-workout/:workoutId', component: DailyWorkoutDetailComponent, resolve: [DailyWorkoutsResolverService] },
        { path: 'daily-workout/:workoutId/edit', component: DailyWorkoutEditComponent, resolve: [DailyWorkoutsResolverService] },
        { path: 'workout-routine', redirectTo: '/workouts', pathMatch: 'full' },
        { path: 'workout-routine/new', component: WorkoutRoutineEditComponent },
        { path: 'workout-routine/:routineId', component: WorkoutRoutineDetailComponent, resolve: [WorkoutRoutinesResolverService] },
        { path: 'workout-routine/:routineId/edit', component: WorkoutRoutineEditComponent, resolve: [WorkoutRoutinesResolverService] },
        { path: 'workout-routine/:routineId/daily-workout/new', component: DailyWorkoutEditComponent },
        { path: 'workout-routine/:routineId/daily-workout/:workoutId', component: DailyWorkoutDetailComponent, resolve: [DailyWorkoutsResolverService] },
        { path: 'workout-routine/:routineId/daily-workout/:workoutId/edit', component: DailyWorkoutEditComponent, resolve: [DailyWorkoutsResolverService] },
        { path: 'workout-routine/:routineId/daily-workout/:workoutId/edit/custom-exercises', component: ExerciseListComponent, resolve: [ExercisesResolverService] },
        { path: 'workout-routine/:routineId/daily-workout/:workoutId/edit/custom-exercise/new/:exerciseId', component: CustomExerciseEditComponent, resolve: [DailyWorkoutsResolverService, ExercisesResolverService] },
        { path: 'workout-routine/:routineId/daily-workout/:workoutId/custom-exercise/:customId', component: CustomExerciseDetailComponent, resolve: [CustomExercisesResolverService] },
        { path: 'workout-routine/:routineId/daily-workout/:workoutId/custom-exercise/:customId/edit', component: CustomExerciseEditComponent, resolve: [CustomExercisesResolverService] }
    ] },
    { path: 'activity', component: ActivityComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}