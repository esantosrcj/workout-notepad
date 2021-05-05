import { Subject } from 'rxjs';

import { SubmittedExercise } from '../shared/submitted-exercise.model';

export class ActivityService {
    exercisesChanged = new Subject<SubmittedExercise[]>();
    startedEditing = new Subject<number>();
    private pastExercises: SubmittedExercise[] = [
        new SubmittedExercise('Machine Fly', true),
        new SubmittedExercise('Lateral Raise', false)
    ];

    getPastExercises() {
        return this.pastExercises.slice();
    }

    getPastExercise(index: number) {
        return this.pastExercises[index];
    }

    addPastExercise(exercise: SubmittedExercise) {
        this.pastExercises.push(exercise);
        this.exercisesChanged.next(this.pastExercises.slice());
    }

    addPastExercises(exercises: SubmittedExercise[]) {
        this.pastExercises.push(...exercises);
        this.exercisesChanged.next(this.pastExercises.slice());
    }

    updatePastExercise(index: number, updatedPastExercise: SubmittedExercise) {
        this.pastExercises[index] = updatedPastExercise;
        this.exercisesChanged.next(this.pastExercises.slice());
    }

    deletePastExercise(index: number) {
        this.pastExercises.splice(index, 1);
        this.exercisesChanged.next(this.pastExercises.slice());
    }
}