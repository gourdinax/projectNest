import { UserInterface } from './../../interfaces/user/user.interface';
import { Injectable } from '@nestjs/common';
import data from './../../data';

@Injectable()
export class UserService {
  private readonly users: UserInterface[] = [];

  constructor() {
    this.getData();
  }

  create(user: UserInterface): void {
    this.users.push(user);
  }

  getData(): void {
    data.map((user: UserInterface) => this.create(user));
  }

  findAll(): UserInterface[] {
    return this.users;
  }

  find(id: number): UserInterface {
    return this.users.find((el) => el.id === id);
  }

  update(id: number, newUser: UserInterface): boolean {
    try {
      const itemToUpdateIndex = this.users.findIndex((el) => el.id === id);
      this.users[itemToUpdateIndex] = newUser;
      return true;
    } catch (e) {
      return false;
    }
  }

  delete(id: number): boolean {
    try {
      const itemToDeleteIndex = this.users.findIndex((el) => el.id === id);
      delete this.users[itemToDeleteIndex];
      return true;
    } catch (e) {
      return false;
    }
  }
}
