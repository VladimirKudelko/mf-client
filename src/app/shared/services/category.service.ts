import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Category } from '../models';

const urls = {
  createNewCategory: (userId: string) => `/category/${userId}`,
  getExpensesCategories: (userId: string) => `/category/expenses/${userId}`,
  getIncomesCategories: (userId: string) => `/category/incomes/${userId}`
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _httpClient: HttpClient) {}

  public createNewCategory(userId: string, data: any): Observable<{ category: Category }> {
    return this._httpClient.post<{ category: Category }>(urls.createNewCategory(userId), data);
  }

  public getExpensesCategories(userId: string): Observable<Category[]> {
    return this._httpClient
      .get<{ categories: Category[] }>(urls.getExpensesCategories(userId))
      .pipe(pluck('categories'));
  }

  public getIncomesCategories(userId: string): Observable<Category[]> {
    return this._httpClient
      .get<{ categories: Category[] }>(urls.getIncomesCategories(userId))
      .pipe(pluck('categories'));
  }
}
