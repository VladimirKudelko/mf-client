import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import jwtDecode from 'jwt-decode';

import { CashService, AuthService } from 'src/app/shared/services';
import { Wallet, Category } from 'src/app/shared/models';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryTypeEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomesComponent implements OnInit {
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
    const user = this._authService.getUser();

    this._categoryService.getIncomesCategories(user._id).subscribe(response => {
      this.categories = response.categories;
      this._cdr.detectChanges();
    });
    this._cashService.getUserCash(user._id).subscribe(wallet => {
      this.currentWallet = wallet;
      this._cdr.detectChanges();
    });
  }
}
