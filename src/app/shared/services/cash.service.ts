import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Wallet } from '../models';
import { pluck } from 'rxjs/operators';

const urls = {
  getUserCash: (userId: string) => `/cash/${userId}`
};
@Injectable({
  providedIn: 'root'
})
export class CashService {
  constructor(private _httpClient: HttpClient) {}

  public getUserCash(userId: string): Observable<Wallet> {
    return this._httpClient.get<{ wallet: Wallet }>(urls.getUserCash(userId)).pipe(pluck('wallet'));
  }
}
