import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import * as moment from 'moment';

import { IntervalEnum, CategoryTypeEnum } from 'src/app/shared/enums';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { Transaction, User } from 'src/app/shared/models';
import { AuthService, SidebarService } from 'src/app/shared/services';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent implements OnInit {
  public results = [
    { name: 'Expenses', series: [ ] },
    { name: 'Incomes', series: [ ] }
  ];
  public view: number[] = [ 700, 375 ];
  public colorScheme = {
    domain: [ '#5AA454', '#A10A28' ]
  };
  public xAxisLabel = 'Date';
  public yAxisLabel = 'Spent money';
  public legendPosition = 'below';
  public maxYAxisTickLength = 16;
  public isShowLegend = true;
  public isAutoScale = true;
  public isShowXAxis = true;
  public isShowYAxis = true;
  public isShowXAxisLabel = true;
  public isShowYAxisLabel = true;
  public selectedInterval: IntervalEnum;
  public intervals: string[] = [ IntervalEnum.Day, IntervalEnum.Week, IntervalEnum.Month, IntervalEnum.Year ];
  public transactions: Transaction[];

  private _user: User;

  constructor(
    private _authService: AuthService,
    private _transactionService: TransactionService,
    private _sidebarService: SidebarService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._sidebarService.show();
    this._user = this._authService.getUserFromLocalStorage();
  }

  public changeInterval(event: MatRadioChange) {
    this._transactionService.getUserTransactions(this._user._id, event.value).subscribe(response => {
      const { transactions } = response;

      if (!transactions && !transactions.length) {
        return;
      }

      this.results = [
        { name: 'Expenses', series: [ ] },
        { name: 'Incomes', series: [ ] }
      ];

      const expensesTransactions = transactions.filter(transaction => transaction.type === CategoryTypeEnum.Expenses);
      const incomesTransactions = transactions.filter(transaction => transaction.type === CategoryTypeEnum.Incomes);

      this.results[0].series = this.groupTransactionsByDate(expensesTransactions);
      this.results[1].series = this.groupTransactionsByDate(incomesTransactions);

      this._cdr.detectChanges();
    });
  }

  public selectLine(event) {
    console.log(event);
  }

  private formatDateByInterval(date: string, interval: IntervalEnum): string {
    const formattedDate = moment(date);

    switch (interval) {
      case IntervalEnum.Day:
        return formattedDate.format('h:mm');
      case IntervalEnum.Week:
        return formattedDate.format('dddd');
      case IntervalEnum.Month:
        return formattedDate.format('L');
      case IntervalEnum.Year:
        return formattedDate.format('L');
      default: return formattedDate.format('L');
    }
  }

  private groupTransactionsByDate(transactions): any {
    const groups: any[] = transactions.reduce((accumulator, transaction) => {
      const date = this.formatDateByInterval(transaction.createdDate, this.selectedInterval);

      if (!accumulator[date]) {
        accumulator[date] = [];
      }

      accumulator[date].push(transaction);

      return accumulator;
    }, {});

    return Object.keys(groups).map((createdDate) => {
      const total = groups[createdDate].reduce((accumulator, transaction) => accumulator + transaction.amountMoney, 0);

      return {
        name: createdDate,
        value: total
      };
    });
  }

}
