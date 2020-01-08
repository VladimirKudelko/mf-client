import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Transaction } from '../models';
import { TransactionPeriodEnum } from '../enums';

const urls = {
  createTransaction: (userId: string) => `/transactions/${userId}`,
  getUserTransactions: (userId: string, period: TransactionPeriodEnum) => `/transactions/user/${userId}?period=${period}`,
  getUserTransactionsByPeriod: (userId: string, startDate: number, endDate: number) =>
    `/transactions/user/${userId}/date?startDate=${startDate}&endDate=${endDate}`,
  getUserExpensesByPeriod: (from: string, to: string) => `/transactions/expenses-summary?from=${from}&to=${to}`
};
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  public createTransaction(userId: string, data: any): Observable<{ transaction: Transaction }> {
    return this._httpClient.post<{ transaction: Transaction }>(urls.createTransaction(userId), data);
  }

  public getUserTransactions(userId: string, period: TransactionPeriodEnum): Observable<{ transactions: Transaction[] }> {
    return this._httpClient.get<{ transactions: Transaction[]} >(urls.getUserTransactions(userId, period));
  }

  public getUserTransactionsByPeriod(userId: string, startDate: number, endDate: number): Observable<{ transactions: Transaction[] }> {
    return this._httpClient.get<{ transactions: Transaction[]} >(urls.getUserTransactionsByPeriod(userId, startDate, endDate));
  }

  public getUserExpensesByPeriod(from: string, to: string): Observable<any> {
    return this._httpClient.get<any>(urls.getUserExpensesByPeriod(from, to));
  }
}
