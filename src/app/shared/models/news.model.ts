import { INews } from "../interfaces/news.interface";

export class News implements INews {
    constructor(
        public title: string,
        public image: string,
        public description: string,
        public text: string,
        public shortText: string,
        public data: string,
        public category: string,
        public author: string,
        public id?: number,
    ){}
}