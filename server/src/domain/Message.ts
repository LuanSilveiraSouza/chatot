import { User } from './User';

export class Message {
  public readonly id: string;
  public readonly user: User;
  public content: string;
  public date: Date;

  constructor(id: string, User: User, date: Date, content?: string) {
    this.id = id;
    this.user = User;
    this.date = date || new Date();
    this.content = content || '';
  }

  setContent(content: string) {
    this.content = content;
  }

  setDate(date: Date) {
    this.date = date;
  }

  static isMessage(message: any): message is Message {
    return (
      (message as Message).id !== undefined &&
      (message as Message).user !== undefined
    );
  }
}
