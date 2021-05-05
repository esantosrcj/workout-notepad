import { Exercise } from './exercise.model';

export class CustomExercise {
    
    constructor(
        public order: number,
        public sets: number,
        public reps: string,
        public active: number,
        public rest: number,
        public exercise: Exercise,
        public id?: number,
        public workoutId?: number
    ) {}
}