import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as moment from 'moment';

import { SidebarService, BudgetService, TransactionService, AuthService } from 'src/app/shared/services';
import { AddBudgetModalComponent, NotificationModalComponent } from 'src/app/shared/components/modals';
import { User, Budget, Transaction } from 'src/app/shared/models';
import { PopupEnum, BudgetStatusEnum } from 'src/app/shared/enums';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { BudgetDTO } from '../../dtos';
import { isExpiredActiveBudget, isBudgetToBeActive } from '../../conditions/budget.conditions';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetComponent implements OnInit {
  public faInfoCircle = faInfoCircle;
  public user: User;
  public budgets: BudgetDTO[];
  public selectedBudget: BudgetDTO;

  constructor(
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _sidebarService: SidebarService,
    private _budgetService: BudgetService,
    private _transactionService: TransactionService,
    private _authService: AuthService,
    private _localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    this._sidebarService.show();
    this.initialize();
  }

  public openAddingBudgetModal(): void {
    this._dialog
      .open(AddBudgetModalComponent, { data: { currency: this.user.currency }, minWidth: '50vw' })
      .afterClosed()
      .pipe(filter(budgets => budgets && budgets.length))
      .subscribe(budgets => this.addBudgets(budgets));
  }

  public addBudgets(budgets: Budget[]): void {
    this._budgetService
      .addBudgets(budgets)
      .subscribe(() => {
        this.getUser();
        this.showNotificationModal(PopupEnum.Success, 'Budget has been successfully added');
      });
  }

  public selectBudget(budget: BudgetDTO): void {
    if (budget.status !== BudgetStatusEnum.Active) {
      return;
    }

    this.selectedBudget = budget;
  }

  public calculateUsedMoneyBarWidth(limit: number, used: number): string {
    if (!used) {
      return '0%';
    }

    const percentOfUsedMoney = ((used * 100) / limit);

    return percentOfUsedMoney <= 100
      ? `${percentOfUsedMoney.toFixed(2)}%`
      : '100%';
  }

  public getInnerCircleBackground(status: BudgetStatusEnum): string {
    switch (status) {
      case BudgetStatusEnum.Active:
        return '#008000';
      case BudgetStatusEnum.Pending:
        return '#eb1c23';
      case BudgetStatusEnum.Closed:
        return '#808080';
    }
  }

  public getOuterCircleAnimation(status: BudgetStatusEnum): string {
    switch (status) {
      case BudgetStatusEnum.Active:
        return 'active-status-blink 1s linear infinite';
      case BudgetStatusEnum.Pending:
        return 'pending-status-blink 1s linear infinite';
      case BudgetStatusEnum.Closed:
        return 'close-status-blink 1s linear infinite';
    }
  }

  public formatDate(date: string): string {
    return moment(date).format('MMMM DD');
  }

  private initialize(): void {
    this.user = this._route.snapshot.data.user;

    const budgetsToUpdate = this.getBudgetsToUpdate();

    if (budgetsToUpdate && budgetsToUpdate.length) {
      this.updateBudgets(budgetsToUpdate);
    } else {
      this.retrieveTransactionsForBudgets();
    }
  }

  private updateBudgets(budgets: Budget[]): void {
    this._budgetService
      .updateBudgets({ budgets })
      .subscribe(() => this.getUser());
  }

  private getBudgetsToUpdate(): Budget[] {
    const { budgets } = this.user;

    const expiredActiveBudgets = this.getExpiredActiveBudgets(budgets);
    const budgetsToBeActive = this.getBudgetsToBeActive(budgets);

    return [...expiredActiveBudgets, ...budgetsToBeActive];
  }

  private getExpiredActiveBudgets(budgets: Budget[]): Budget[] {
    return budgets
      .filter(budget => isExpiredActiveBudget(budget))
      .map(budget => ({ ...budget, status: BudgetStatusEnum.Closed }));
  }

  private getBudgetsToBeActive(budgets: Budget[]): Budget[] {
    return budgets
      .filter(budget => isBudgetToBeActive(budget))
      .map(budget => ({ ...budget, status: BudgetStatusEnum.Active }));
  }

  private getUser(): void {
    this._authService.getUserById(this.user._id).subscribe(response => {
      this.user = response.user;

      this.retrieveTransactionsForBudgets();
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

  private retrieveTransactionsForBudgets(): void {
    const { budgets } = this.user;

    if (!budgets || !budgets.length) {
      return;
    }

    const transactionRequests = budgets.map(budget => {
      return this._transactionService.getUserExpensesByPeriod(budget.from, budget.to);
    });

    forkJoin(transactionRequests).subscribe(responseList => {
      this.budgets = responseList.map((response, index) => this.transformToBudgetModel(
        budgets[index],
        response.transactions,
        response.used)
      );

      this.selectFirstActiveBudget();

      this._cdr.detectChanges();
    });
  }

  private selectFirstActiveBudget(): void {
    if (!this.budgets || !this.budgets.length) {
      return;
    }

    this.selectedBudget = this.budgets.find(budget => budget.status === BudgetStatusEnum.Active);
  }

  private transformToBudgetModel(budget: Budget, transactions: Transaction[], used: number): BudgetDTO {
    return {
      ...budget,
      transactions,
      used
    };
  }
}
