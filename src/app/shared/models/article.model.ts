import { Topic } from "./topic.model";

export class Article {
    constructor(
        public id: number,
        public topic: Topic,
        public title: string,
        public text: string,
        public description: string,
        public image?: string,
    ) { }
}