
export class Exercise {
    
    constructor(
        public name: string,
        public type: string,
        public group: string,
        public equipment: string,
        public level: string,
        public id?: number
    ) {}
}