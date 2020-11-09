import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import * as moment from 'moment';

import { IntervalEnum, CategoryTypeEnum, Themes } from 'src/app/shared/enums';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import { Transaction, User } from 'src/app/shared/models';
import { AuthService, SidebarService } from 'src/app/shared/services';
import { TransactionsListModalComponent } from 'src/app/shared/components/modals';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { UserPreferencesService } from 'src/app/shared/services/user-preferences.service';
import { tap, finalize, filter } from 'rxjs/operators';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent implements OnInit, AfterViewChecked {
  public user: User;
  public results: { name: string, series: any[] }[];
  public view: number[] = [600, 400];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28']
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
  public intervals: IntervalEnum[] = [IntervalEnum.Week, IntervalEnum.Month, IntervalEnum.Year];
  public transactions: Transaction[];
  public userActivityTransactions: Transaction[];
  public isUserActivityLoading: boolean;
  public CategoryTypeEnum = CategoryTypeEnum;
  public totalExpenses: number;
  public totalIncomes: number;

  constructor(
    private _authService: AuthService,
    private _transactionService: TransactionService,
    private _sidebarService: SidebarService,
    private _localizationService: LocalizationService,
    private _userPreferencesService: UserPreferencesService,
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._sidebarService.show();
    this.user = this._authService.getUserFromLocalStorage();
    this._transactionService
      .getNewestTransactions(this.user._id)
      .pipe(
        tap(() => this.isUserActivityLoading = true),
        finalize(() => {
          this.isUserActivityLoading = false;

          this._cdr.detectChanges();
        })
      )
      .subscribe(transactions => (this.userActivityTransactions = transactions));

    this.setInitialSelection();
    this.changeColorScheme();
  }

  ngAfterViewChecked(): void {
    this.view = window.innerWidth < 1150
      ? [400, 300]
      : [600, 400];
  }

  public changeInterval(event: MatRadioChange): void {
    this._transactionService.getUserTransactions(this.user._id, event.value).subscribe(response => {
      if (!response.transactions || !response.transactions.length) {
        return;
      }

      this.totalExpenses = response.totalExpenses;
      this.totalIncomes = response.totalIncomes;

      const expensesTransactions = [];
      const incomesTransactions = [];

      this.results = [
        { name: this._localizationService.getTranslation('Incomes'), series: [] },
        { name: this._localizationService.getTranslation('Expenses'), series: [] }
      ];

      response.transactions.forEach(transaction => {
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

  public selectLegend(event: CategoryTypeEnum): void {
    const { _id } = this.user;
    const startDate = moment().add(-1, this.selectedInterval as any);
    const endDate = moment();

    this._transactionService
      .getUserTransactionsByPeriod(_id, +startDate, +endDate, event)
      .pipe(filter(response => !!response && !!response.transactions))
      .subscribe(response => {
        const { transactions } = response;

        this.dialog.open(TransactionsListModalComponent, {
          data: { userId: _id, isShowSelect: false, transactions },
          width: '100vw',
          height: '80vh'
        });
      });
  }

  private setInitialSelection(): void {
    this.selectedInterval = this.intervals[0];
    this.changeInterval({ value: this.selectedInterval } as any);
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

  private changeColorScheme(): void {
    const currentTheme = this._userPreferencesService.currentTheme;

    this.colorScheme = currentTheme === Themes.Light
      ? { domain: ['#5AA454', '#A10A28'] }
      : { domain: ['rgb(60, 192, 153)', 'rgb(168, 56, 93)'] };
  }
}
