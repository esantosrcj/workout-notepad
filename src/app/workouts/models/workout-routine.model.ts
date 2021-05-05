import { DailyWorkout } from './daily-workout.model';

export class WorkoutRoutine {

    constructor(
        public name: string,
        public goal: string,
        public level: string,
        public notes: string,
        public workouts: DailyWorkout[],
        public startDate: string,
        public endDate: string,
        public id?: number,
        public days?: number,
        public email?: string
    ) {}
}