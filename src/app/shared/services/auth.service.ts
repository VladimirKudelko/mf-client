import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
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

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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

  public registerUser(formData): Observable<any> {
    return this._httpClient.post<any>('/auth/signup', formData);
  }

  public loginUser(formData): Observable<any> {
    return this._httpClient.post<any>('/auth/login', formData);
  }

  public updateUserSettings(userId: string, data): Observable<{ updatedUser: User, isUpdated: boolean }> {
    return this._httpClient.patch<{ updatedUser: User, isUpdated: boolean }>(`/profile/settings/${userId}`, data);
  }

  public updatePassword(userId: string, data): Observable<any> {
    return this._httpClient.patch<any>(`/profile/settings/change-password/${userId}`, data);
  }

  public getUserById(userId: string = this.getUserFromLocalStorage()._id): Observable<{ user: User }> {
    return this._httpClient.get<{ user: User }>(`/profile/${userId}`);
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

    }
  }

  public getUserFromLocalStorage(): User {
    return jwtDecode(this.getFromLocalStorage('token'));
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

}
