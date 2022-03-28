import { Injectable } from "@angular/core";
import axios, { AxiosInstance } from 'axios';

@Injectable({ providedIn: 'root' })
export class HttpClient {

  http: AxiosInstance;

  constructor() {
    this.http = axios.create({ timeout: 5000 });
    this.interceptors();
  }

  addAuthToken(token: string | null) {
    token && (this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`);
  }

  removeAuthToken() {
    delete this.http.defaults.headers.common['Authorization'];
  }

  interceptors() {
    this.http.interceptors.response.use(
      response => { return response; },
      error => { return error.response; }
    );
  }


}
