import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  public getAll(): Observable<{ isSuccessfully: boolean, users: User[] }> {
    return this._httpClient.get<{ isSuccessfully: boolean, users: User[] }>('/user/all');
  }

  public deleteProfile(id: string): Observable<{ isDeleted: boolean }> {
    return this._httpClient.delete<{ isDeleted: boolean }>(`/user/${id}`);
  }
}
