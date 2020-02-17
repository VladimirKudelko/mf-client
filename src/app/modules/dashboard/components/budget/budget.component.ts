import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { filter, pluck } from 'rxjs/operators';

import * as moment from 'moment';

import { SidebarService, BudgetService, TransactionService, AuthService } from 'src/app/shared/services';
import { AddBudgetModalComponent, NotificationModalComponent } from 'src/app/shared/components/modals';
import { User, Budget } from 'src/app/shared/models';
import { PopupEnum } from 'src/app/shared/enums';
import { LocalizationService } from 'src/app/shared/services/localization.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetComponent implements OnInit {
  public faInfoCircle = faInfoCircle;
  public user: User;
  public allExpenses: Budget;
  public leftMoney: number;

  public get allExpensesPercentage(): number {
    return (this.leftMoney * 100) / this.allExpenses.limit;
  }

  constructor(
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _sidebarService: SidebarService,
    private _budgetService: BudgetService,
    private _transactionService: TransactionService,
    private _authService: AuthService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit(): void {
    this._sidebarService.show();

    this.user = this._route.snapshot.data.user;

    this.updateBudget();
  }

  private getUser(): void {
    this._authService
      .getUserById()
      .pipe(
        filter(response => !!response && !!response.user),
        pluck('user')
      )
      .subscribe((user: User) => {
        this.user = user;

        this.updateBudget();
        this._cdr.detectChanges();
      });
  }

  private updateBudget(): void {
    if (this.user.budget && this.user.budget.allExpenses) {
      this.allExpenses = this.user.budget.allExpenses;
      this.getUserTransactions();
    }
  }

  private getUserTransactions(): void {
    this._transactionService
      .getUserExpensesByPeriod(
        moment(this.allExpenses.from).format('YYYY-MM-DD'),
        moment(this.allExpenses.to).format('YYYY-MM-DD')
      )
      .subscribe(response => {
        this.leftMoney = response.left;
        this._cdr.detectChanges();
      });
  }

  private showNotificationModal(modalType: PopupEnum, message: string): void {
    this._dialog.open(NotificationModalComponent, {
      width: '400px',
      data: {
        modalType,
        message: this._localizationService.getTranslation(message)
      }
    });
  }

  public openAddingBudgetModal(): void {
    this._dialog
      .open(AddBudgetModalComponent, { minWidth: '750px' })
      .afterClosed()
      .pipe(filter(result => result && !!Object.keys(result).length))
      .subscribe(result => this.addBudget(result));
  }

  public addBudget(budget: any): void {
    this._budgetService
      .addBudget({ ...budget, currency: this.user.currency })
      .subscribe(() => {
        this.getUser();
        this.showNotificationModal(PopupEnum.Success, 'Budget has been successfully added');
      });
  }
}
