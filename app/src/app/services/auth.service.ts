import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AUTH_API_URL, ENDPOINTS } from '../constants';
import { ApiResponse } from '../models/ApiResponse';
import { HttpClient } from './httpClient.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.jwtHelper = new JwtHelperService();
    this.httpClient = httpClient;
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  setUserLogin(token: string) {
    const jwtPayload = this.extractJwtPayload(token);
    this.httpClient.addAuthToken(token);
    localStorage.setItem("userToken", token);
    localStorage.setItem("user", JSON.stringify({ id: jwtPayload.sub, email: jwtPayload.email, name: jwtPayload.name, surname: jwtPayload.surname }));
  }

  getUser() {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  }

  getUserToken(): string | null {
    return localStorage.getItem("userToken") || null;
  }

  isLogged() {
    const token = this.getUserToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
  }

  extractJwtPayload(token: string) {
    return this.jwtHelper.decodeToken(token);
  }

  login(email: string, password: string): Promise<ApiResponse> {
    return this.httpClient.http.post(AUTH_API_URL + ENDPOINTS.LOGIN, { email, password });
  }

  register(email: string, password: string, name: string, surname: string): Promise<ApiResponse> {
    return this.httpClient.http.post(AUTH_API_URL + ENDPOINTS.REGISTER, { email, password, name, surname });
  }

  reloadToken() {
    this.httpClient.addAuthToken(localStorage.getItem("userToken") || '');
  }

}
