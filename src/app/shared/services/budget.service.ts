import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Budget } from '../models';

const urls = {
  addBudget: () => `/budgets`
};
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  public addBudget(budget: any): Observable<{ budget: Budget }> {
    return this._httpClient.post<{ budget: Budget }>(urls.addBudget(), budget);
  }
}
