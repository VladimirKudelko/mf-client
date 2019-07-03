import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  public getAll(): Observable<{ isSuccessfully: boolean, users: User[] }> {
    return this._httpClient.get<{ isSuccessfully: boolean, users: User[] }>('/user/all')
      .pipe(
        map(response => {
          response.users.forEach(user =>
            user.createdDate = moment(user.createdDate).format('YYYY-MM-DD')
          );

          return response;
        }),
        catchError(() => of({ isSuccessfully: false, users: [] }))
      );
  }

  public deleteProfile(id: string): Observable<{ isDeleted: boolean }> {
    return this._httpClient.delete<{ isDeleted: boolean }>(`/user/${id}`);
  }
}
