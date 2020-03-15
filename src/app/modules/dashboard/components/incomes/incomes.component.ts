import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { CashService, AuthService, SidebarService, CategoryService } from 'src/app/shared/services';
import { Wallet, Category, User } from 'src/app/shared/models';
import { CategoryTypeEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomesComponent implements OnInit {
  private _user: User;

  public currentWallet: Wallet;
  public categories: Category[];
  public CategoryTypeEnum = CategoryTypeEnum;

  constructor(
    private _cashService: CashService,
    private _authService: AuthService,
    private _categoryService: CategoryService,
    private _sidebarService: SidebarService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._sidebarService.show();
    this._user = this._authService.getUserFromLocalStorage();
    this._categoryService.getIncomesCategories(this._user._id).subscribe(response => {
      this.categories = response.categories;
      this._cdr.detectChanges();
    });
    this.updateUserCash();
  }

  public updateUserCash(): void {
    this._cashService.getUserCash(this._user._id).subscribe(wallet => {
      this.currentWallet = wallet;
      this._cdr.detectChanges();
    });
  }
}
