import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
  ) { }

  public registerUser(formData): Observable<any> {
    return this._httpClient.post<any>('http://localhost:8080/api/auth/signup', formData);
  }

  public loginUser(formData): Observable<any> {
    return this._httpClient.post<any>('http://localhost:8080/api/auth/login', formData);
  }

  public saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  public isAuthenticated(): boolean {
    const user = this.getFromLocalStorage('user');

    return !!JSON.parse(user);
  }

  public logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

}
