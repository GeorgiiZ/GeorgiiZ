export default class Comment{
    date: Date;
    userId: number;
    monumentId: number;

    constructor(userId: number, monumentId: number){
        this.userId = userId;
        this.monumentId = monumentId;
        this.date = new Date();
    }
}
