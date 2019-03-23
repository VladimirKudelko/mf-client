import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  getExpensesCategories(userId: string): Observable<any> {
    return this._httpClient.get<any>(`/category/expenses/${userId}`);
  }

  getIncomesCategories(userId: string): Observable<any> {
    return this._httpClient.get<any>(`/category/incomes/${userId}`);
  }
}
