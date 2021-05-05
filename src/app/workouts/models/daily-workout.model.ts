import { CustomExercise } from './custom-exercise.model';

export class DailyWorkout {
    
    constructor(
        public day: string,
        public target: string,
        public exercises: CustomExercise[],
        public id?: number,
        public name?: string,
        public duration?: number,
        public routineId?: number
    ) {}
}