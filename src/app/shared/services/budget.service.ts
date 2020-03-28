import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Budget } from '../models';

const urls = {
  addBudgets: () => `/budgets`,
  updateBudgets: () => `/budgets`,
};
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(
    private _httpClient: HttpClient
  ) {}

  public addBudgets(budgets: Budget[]): Observable<{ budgets: Budget[] }> {
    return this._httpClient.post<{ budgets: Budget[] }>(urls.addBudgets(), { budgets });
  }

  public updateBudgets(body: { budgets: Budget[] }): Observable<{ budgets: Budget[] }> {
    return this._httpClient.patch<{ budgets: Budget[] }>(urls.updateBudgets(), body);
  }
}
