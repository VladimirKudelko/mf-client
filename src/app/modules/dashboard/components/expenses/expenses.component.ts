import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

import { CashService, AuthService } from 'src/app/shared/services';
import { Wallet } from 'src/app/shared/models';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpensesComponent implements OnInit {
  public currentWallet: Wallet;
  public categories: any[];

  constructor(
    private _cashService: CashService,
    private _authService: AuthService,
    private _categoryService: CategoryService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const token = this._authService.getFromLocalStorage('token');
    const userId = jwtDecode(token)._id;

    this._categoryService.getExpensesCategories(userId)
      .subscribe(res => {
        this.categories = res.categories;
        this._cdr.detectChanges();
      });
    this._cashService.getUserCash(userId)
      .subscribe(wallet => {
        this.currentWallet = wallet;
        this._cdr.detectChanges();
      });
  }

  getDateDifferences(startDate, endDate = moment()): string {
    const startDateMoment = moment(startDate);

    const minutes = endDate.diff(startDateMoment, 'minutes');
    const hours = endDate.diff(startDateMoment, 'hours');
    const days = endDate.diff(startDateMoment, 'days');
    const months = endDate.diff(startDateMoment, 'months');

    if (minutes < 60) {
      return `${minutes} min`;
    } else if (hours < 24) {
      return `${hours} hours`;
    } else if (days < 7) {
      return `${days} days`;
    } else if (months > 1) {
      return `${months} months`;
    }
  }

}
