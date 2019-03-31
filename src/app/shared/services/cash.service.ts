import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Wallet } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CashService {
  constructor(
    private _httpClient: HttpClient,
  ) { }

  public getUserCash(userId: string): Observable<{ wallet: Wallet }> {
    return this._httpClient.get<{ wallet: Wallet }>(`/cash/${userId}`);
  }
}
