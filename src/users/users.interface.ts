/* eslint-disable @typescript-eslint/no-empty-interface */
import { Observable } from 'rxjs'

import { Id } from "../common/common.interface";

export interface User{
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
};

export interface UsersQueryResult{
  users: Array<User>;
};
export interface Empty {
  
}

export interface UserDto{
  id?: string
  name?: string
  email?: string
  age?: number
  password?: string;
  createdAt?: string
  updatedAt?: string
}

export interface IUsersService{
  findUserById(input: Id): Observable<User>;
  createUser(user: UserDto): Observable<User>;
  updateUser({ id, data }: { id: string, data: UserDto }): Observable<User>;
  listUsers(empty: Empty): Observable<UsersQueryResult>;
}