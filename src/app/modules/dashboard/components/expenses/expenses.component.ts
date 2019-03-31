import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import jwtDecode from 'jwt-decode';

import { CashService, AuthService } from 'src/app/shared/services';
import { Wallet, Category, User } from 'src/app/shared/models';
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

  private _user: User;

  constructor(
    private _cashService: CashService,
    private _authService: AuthService,
    private _categoryService: CategoryService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._user = this._authService.getUser();

    this._categoryService.getExpensesCategories(this._user._id).subscribe(response => {
      this.categories = response.categories;
      this._cdr.detectChanges();
    });
    this.updateUserCash();
  }

  public updateUserCash() {
    this._cashService.getUserCash(this._user._id).subscribe(response => {
      this.currentWallet = response.wallet;
      this._cdr.detectChanges();
    });
  }
}
