import { Injectable } from '@angular/core';
import { ENDPOINTS, USERS_API_URL } from '../constants';
import { ApiResponse } from '../models/ApiResponse';
import { AuthService } from './auth.service';
import { HttpClient } from './httpClient.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient: HttpClient;

  constructor(httpClient: HttpClient, private auth: AuthService) {
    this.httpClient = httpClient;
  }

  listUsers(page: number, limit: number): Promise<ApiResponse> {
    return this.httpClient.http.get(USERS_API_URL + ENDPOINTS.LIST_USERS, { params: { page, limit } })
  }

}
