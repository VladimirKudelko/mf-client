import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private _httpClient: HttpClient
  ) { }

  public createNewCategory(userId: string, data: any): Observable<{ category: Category }> {
    return this._httpClient.post<{ category: Category }>(`/category/${userId}`, data);
  }

  public getExpensesCategories(userId: string): Observable<{ categories: Category[] }> {
    return this._httpClient.get<{ categories: Category[] }>(`/category/expenses/${userId}`);
  }

  public getIncomesCategories(userId: string): Observable<{ categories: Category[] }> {
    return this._httpClient.get<{ categories: Category[] }>(`/category/incomes/${userId}`);
  }
}
