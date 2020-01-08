import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as moment from 'moment';

import { User } from '../models';

const urls = {
  getAll: () => `/user/all`,
  deleteProfile: (userId: string) => `/user/${userId}`,
};
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  private mapUsers(users: User[]): User[] {
    if (!users || !users.length) {
      return [];
    }

    return users.map(user => ({
      ...user,
      createdDate: moment(user.createdDate).format('YYYY-MM-DD')
    }));
  }

  public getAll(): Observable<User[]> {
    return this._httpClient
      .get<{ isSuccessfully: boolean, users: User[] }>(urls.getAll())
      .pipe(
        map(response => this.mapUsers(response.users)),
        catchError(() => of([]))
      );
  }

  public deleteProfile(userId: string): Observable<{ isDeleted: boolean }> {
    return this._httpClient.delete<{ isDeleted: boolean }>(urls.deleteProfile(userId));
  }
}
