import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import * as _ from 'lodash';

import { RoleEnum } from '../enums';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) { }

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

  private saveUser() {
    return tap((response: any) => this.saveToLocalStorage('user', JSON.stringify(response.user)));
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
    return this._httpClient.post<{ isSuccessfully: boolean, token: string, user: User }>('/auth/signup', formData)
      .pipe(this.saveUser());
  }

  public loginUser(formData: any): Observable<{ isSuccessfully: boolean, token: string, user: User }> {
    return this._httpClient.post<{ isSuccessfully: boolean, token: string, user: User }>('/auth/login', formData)
      .pipe(this.saveUser());
  }

  public updateUserSettings(userId: string, data: any): Observable<{ updatedUser: User, isUpdated: boolean }> {
    return this._httpClient.patch<{ updatedUser: User, isUpdated: boolean }>(`/profile/settings/${userId}`, data);
  }

  public updatePassword(userId: string, data: any): Observable<{ isSuccessfully: boolean, updatedUser: User }> {
    return this._httpClient.patch<{ isSuccessfully: boolean, updatedUser: User }>(`/profile/settings/change-password/${userId}`, data);
  }

  public getUserById(userId: string = this.getUserFromToken()._id): Observable<{ user: User }> {
    return this._httpClient.get<{ user: User }>(`/profile/${userId}`)
      .pipe(this.saveUser());
  }

  public verifyEmail(email: string, hash: string): Observable<{ isVerified: boolean }> {
    return this._httpClient.post<{ isVerified: boolean }>('/auth/email-verification', { email, hash });
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
