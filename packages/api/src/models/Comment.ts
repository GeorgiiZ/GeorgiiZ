export default class Comment {
  date: Date;
  text: string;
  userId: number;
  monumentId: number;

  constructor(text: string, userId: number, monumentId: number) {
    this.text = text;
    this.userId = userId;
    this.monumentId = monumentId;
    this.date = new Date();
  }
}
