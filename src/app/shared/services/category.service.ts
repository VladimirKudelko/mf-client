import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  createNewCategory(userId: string, data: any): Observable<{ category: Category }> {
    return this._httpClient.post<{ category: Category }>(`/category/${userId}`, data);
  }

  getExpensesCategories(userId: string): Observable<{ categories: Category[] }> {
    return this._httpClient.get<{ categories: Category[] }>(`/category/expenses/${userId}`);
  }

  getIncomesCategories(userId: string): Observable<{ categories: Category[] }> {
    return this._httpClient.get<{ categories: Category[] }>(`/category/incomes/${userId}`);
  }
}
