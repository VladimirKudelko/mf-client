import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import jwtDecode from 'jwt-decode';

import { CashService, AuthService } from 'src/app/shared/services';
import { Wallet, Category } from 'src/app/shared/models';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryTypeEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent implements OnInit {
  public currentWallet: Wallet;
  public categories: Category[];
  public CategoryTypeEnum = CategoryTypeEnum;

  constructor(
    private _cashService: CashService,
    private _authService: AuthService,
    private _categoryService: CategoryService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const token = this._authService.getFromLocalStorage('token');
    const userId = jwtDecode(token)._id;

    this._categoryService.getExpensesCategories(userId).subscribe(response => {
      this.categories = response.categories;
      this._cdr.detectChanges();
    });
    this._cashService.getUserCash(userId).subscribe(wallet => {
      this.currentWallet = wallet;
      this._cdr.detectChanges();
    });
  }
}
