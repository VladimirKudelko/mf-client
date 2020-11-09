import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPlus, faMinus  } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

import { IntervalEnum, CategoryTypeEnum, TransactionPeriodEnum } from 'src/app/shared/enums';
import { TransactionService } from 'src/app/shared/services';
import { Transaction } from 'src/app/shared/models';

@Component({
  selector: 'app-transactions-list-modal',
  templateUrl: './transactions-list-modal.component.html',
  styleUrls: ['./transactions-list-modal.component.scss']
})
export class TransactionsListModalComponent implements OnInit {
  public intervals: string[] = [IntervalEnum.Day, IntervalEnum.Week, IntervalEnum.Month, IntervalEnum.Year];
  public transactions: Transaction[] = [];
  public CategoryTypeEnum = CategoryTypeEnum;
  public faPlus = faPlus;
  public faMinus = faMinus;

  constructor(
    private _transactionService: TransactionService,
    public dialogRef: MatDialogRef<TransactionsListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string, isShowSelect: boolean, transactions: Transaction[] },
  ) { }

  ngOnInit(): void {
    const { transactions } = this.data;

    if (transactions && transactions.length) {
      this.transactions = transactions;
    }
  }

  public changeInterval(event: { value: TransactionPeriodEnum }): void {
    const { value } = event;

    if (!value) {
      return;
    }

    this._transactionService
      .getUserTransactions(this.data.userId, value)
      .pipe(filter(transactions => !!transactions))
      .subscribe(response => (this.transactions = response.transactions));
  }
}
