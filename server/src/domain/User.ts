export class User {
  public readonly id: string;
  public readonly name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static isUser(user: any): user is User {
    return (user as User).id !== undefined && (user as User).name !== undefined;
  }
}
