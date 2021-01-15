export class Message {
  public readonly id: string;
  public readonly userId: string;
  public content: string;
  public date: Date;

  constructor(id: string, userId: string, date: Date, content?: string) {
    this.id = id;
    this.userId = userId;
    this.date = date || new Date();
    this.content = content || "";
  }

  setContent(content: string) {
    this.content = content;
  }

  setDate(date: Date) {
    this.date = date;
  }
}
