import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatRadioChange, MatDialog } from '@angular/material';
import * as moment from 'moment';

import { IntervalEnum, CategoryTypeEnum } from 'src/app/shared/enums';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { Transaction, User } from 'src/app/shared/models';
import { AuthService, SidebarService } from 'src/app/shared/services';
import { TransactionsListModalComponent } from 'src/app/shared/components/modals/transactions-list-modal/transactions-list-modal.component';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent implements OnInit {
  private _user: User;
  public results = [
    { name: 'Incomes', series: [ ] },
    { name: 'Expenses', series: [ ] }
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
  public intervals: string[] = [ IntervalEnum.Week, IntervalEnum.Month, IntervalEnum.Year ];
  public transactions: Transaction[];

  constructor(
    private _authService: AuthService,
    private _transactionService: TransactionService,
    private _sidebarService: SidebarService,
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog,
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

      const expensesTransactions = [];
      const incomesTransactions = [];

      this.results = [
        { name: 'Incomes', series: [ ] },
        { name: 'Expenses', series: [ ] }
      ];

      transactions.forEach(transaction => {
        switch (transaction.type) {
          case CategoryTypeEnum.Expenses: expensesTransactions.push(transaction); break;
          case CategoryTypeEnum.Incomes: incomesTransactions.push(transaction); break;
        }
      });

      this.results[0].series = this.groupTransactionsByDate(incomesTransactions);
      this.results[1].series = this.groupTransactionsByDate(expensesTransactions);

      this._cdr.detectChanges();
    });
  }

  public selectLine(event: { name: string, value: number, series: string }) {
    const { _id } = this._user;
    const startDate = moment(event.name);
    const endDate = moment(startDate).add(1, 'day');

    this._transactionService.getUserTransactionsByPeriod(_id, +startDate, +endDate)
      .subscribe(response => {
        const { transactions } = response;

        if (!transactions) {
          return;
        }

        this.dialog.open(TransactionsListModalComponent, {
          data: { userId: _id, isShowSelect: false, transactions },
          width: '100vw',
          height: '80vh'
        });
      });
  }

  private groupTransactionsByDate(transactions): any {
    const groups: any[] = transactions.reduce((accumulator, transaction) => {
      const date = moment(transaction.createdDate).format('L');

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
