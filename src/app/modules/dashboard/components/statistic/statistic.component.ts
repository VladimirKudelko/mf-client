import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
    private _sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this._sidebarService.show();
    this._user = this._authService.getUserFromLocalStorage();
  }

  public changeInterval(event: MatRadioChange) {
    this._transactionService.getUserTransactions(this._user._id, event.value).subscribe(response => {
      if (!response.transactions && !response.transactions.length) {
        return;
      }

      this.results = [
        { name: 'Expenses', series: [ ] },
        { name: 'Incomes', series: [ ] }
      ];

      response.transactions.forEach(transaction => {
        const formattedDate = this.formatDateByInterval(transaction.createdDate, this.selectedInterval);

        if (transaction.type === CategoryTypeEnum.Expenses) {
          this.results[0].series.push(
            { 'value': transaction.amountMoney, 'name': formattedDate }
          );
        } else {
          this.results[1].series.push(
            { 'value': transaction.amountMoney, 'name': formattedDate }
          );
        }
      });
    });
  }

  public selectLine(event) {
    console.log(event);
  }

  private formatDateByInterval(date: Date, interval: IntervalEnum): string {
    const formattedDate = moment(date);

    switch (interval) {
      case IntervalEnum.Day:
        return formattedDate.format('h:mm:ss');
      case IntervalEnum.Week:
        return formattedDate.format('dddd');
      case IntervalEnum.Month:
        return formattedDate.format('L');
      case IntervalEnum.Year:
        return formattedDate.format('L');
      default: return formattedDate.format('L');
    }
  }

}
