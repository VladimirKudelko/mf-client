import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Transaction } from '../models';
import { TransactionPeriodEnum } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  public createTransaction(userId: string, data): Observable<{ transaction: Transaction }> {
    return this._httpClient.post<{ transaction: Transaction }>(`/transactions/${userId}`, data);
  }

  public getUserTransactions(userId: string, period: TransactionPeriodEnum): Observable<{ transactions: Transaction[] }> {
    return this._httpClient.get<{ transactions: Transaction[]} >(`/transactions/user/${userId}?period=${period}`);
  }
}
