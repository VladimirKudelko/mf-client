import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  public createTransaction(userId: string, data): Observable<any> {
    return this._httpClient.post<any>(`/transactions/${userId}`, data);
  }
}
