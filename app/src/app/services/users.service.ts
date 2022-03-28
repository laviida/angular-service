import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ENDPOINTS, USERS_API_URL } from '../constants';
import { ApiResponse } from '../models/ApiResponse';
import { User } from '../models/user';
import { HttpClient } from './httpClient.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  listUsers(page: number, limit: number): Promise<ApiResponse> {
    return this.httpClient.http.get(USERS_API_URL + ENDPOINTS.LIST_USERS, { params: { page, limit } })
  }

  createUser(user: User): Promise<ApiResponse> {
    return this.httpClient.http.post(USERS_API_URL + ENDPOINTS.CREATE_USER, user);
  }

  private notify = new BehaviorSubject<User>({ name: "", email: "", password: "", surname: "" });
  notifyForm = this.notify.asObservable();

  updateUserForm(user: User) {
    this.notify.next(user);
  }

  deleteUsers(ids: Array<number | undefined>) {
    return this.httpClient.http.delete(USERS_API_URL + ENDPOINTS.DELETE_USERS, { data: { ids } });
  }

  updateUser(user: User) {
    user = <User>Object.fromEntries(Object.entries(user).filter(([_, v]) => v !== ''));
    return this.httpClient.http.put(`${USERS_API_URL}${ENDPOINTS.USER}/${user._id}`, { user });
  }
}
