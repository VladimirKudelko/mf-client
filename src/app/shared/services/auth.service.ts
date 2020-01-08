import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import jwtDecode from 'jwt-decode';
import * as _ from 'lodash';

import { RoleEnum } from '../enums';
import { User } from '../models';

const urls = {
  signup: () => `/auth/signup`,
  login: () => `/auth/login`,
  updateSettings: (userId: string) => `/profile/settings/${userId}`,
  changePassword: (userId: string) => `/profile/settings/change-password/${userId}`,
  getUserById: (userId: string) => `/profile/${userId}`,
  verifyEmail: () => `/auth/email-verification`
};
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) { }

  private saveUser() {
    return tap((response: any) => this.saveToLocalStorage('user', JSON.stringify(response.user)));
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const { data: { role } } = next;

    if (!this.isAuthenticated()) {
      this._router.navigate(['/auth/login']);

      return false;
    } else if (this.getRole() !== role) {
      this._router.navigate(['/auth/login']);

      return false;
    }

    return true;
  }

  public getUserFromToken(): User {
    try {
      const token = this.getFromLocalStorage('token');

      return jwtDecode(token);
    } catch (error) {
      console.log(error);
    }
  }

  public registerUser(formData: any): Observable<{ isSuccessfully: boolean, token: string, user: User }> {
    return this._httpClient
      .post<{ isSuccessfully: boolean, token: string, user: User }>(urls.signup(), formData)
      .pipe(this.saveUser());
  }

  public loginUser(formData: any): Observable<{ isSuccessfully: boolean, token: string, user: User }> {
    return this._httpClient
      .post<{ isSuccessfully: boolean, token: string, user: User }>(urls.login(), formData)
      .pipe(this.saveUser());
  }

  public updateUserSettings(userId: string, data: any): Observable<{ updatedUser: User, isUpdated: boolean }> {
    return this._httpClient.patch<{ updatedUser: User, isUpdated: boolean }>(urls.updateSettings(userId), data);
  }

  public updatePassword(userId: string, data: any): Observable<{ isSuccessfully: boolean, updatedUser: User }> {
    return this._httpClient.patch<{ isSuccessfully: boolean, updatedUser: User }>(urls.changePassword(userId), data);
  }

  public getUserById(userId: string = this.getUserFromToken()._id): Observable<{ user: User }> {
    return this._httpClient
      .get<{ user: User }>(urls.getUserById(userId))
      .pipe(this.saveUser());
  }

  public verifyEmail(email: string, hash: string): Observable<{ isVerified: boolean }> {
    return this._httpClient.post<{ isVerified: boolean }>(urls.verifyEmail(), { email, hash });
  }

  public saveToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getFromLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  public isAuthenticated(): boolean {
    const token = this.getFromLocalStorage('token');

    return !_.isEmpty(token);
  }

  public getRole(): RoleEnum {
    try {
      const token = this.getFromLocalStorage('token');
      const user = jwtDecode(token);

      return user.role;
    } catch (error) {
      console.log(error);
    }
  }

  public getUserFromLocalStorage(): User {
    return JSON.parse(this.getFromLocalStorage('user'));
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigateByUrl('/auth/login');
  }
}
