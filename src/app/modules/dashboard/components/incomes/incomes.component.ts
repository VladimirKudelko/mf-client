import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CashService, AuthService, SidebarService, CategoryService } from 'src/app/shared/services';
import { Wallet, Category, User } from 'src/app/shared/models';
import { CategoryTypeEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IncomesComponent implements OnInit, OnDestroy {
  private _user: User;
  private unsubscribe$ = new Subject();

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

    this.subscribeToBalanceUpdate();
    this.getCategories();
    this.getUserWallet();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToBalanceUpdate(): void {
    this._cashService.wallet.pipe(takeUntil(this.unsubscribe$)).subscribe(newWallet => {
      this.currentWallet = newWallet;
      this._cdr.markForCheck();
    });
  }

  private getCategories(): void {
    this._categoryService.getIncomesCategories(this._user._id).subscribe(categories => {
      this.categories = categories;
      this._cdr.detectChanges();
    });
  }

  private getUserWallet(): void {
    this._cashService.getUserCash(this._user._id).subscribe(wallet => {
      this.currentWallet = wallet;
      this._cdr.detectChanges();
    });
  }
}
