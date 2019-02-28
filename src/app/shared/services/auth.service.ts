import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
  ) { }

  public getUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  public saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public isAuthenticated(): boolean {
    const user = this.getUser();

    return !!user;
  }

  public logout(): void {
    localStorage.removeItem('user');
  }

}
