import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { faPlus, faMinus  } from '@fortawesome/free-solid-svg-icons';

import { IntervalEnum, CategoryTypeEnum } from 'src/app/shared/enums';
import { TransactionService } from 'src/app/shared/services';
import { Transaction } from 'src/app/shared/models';

@Component({
  selector: 'app-transactions-list-modal',
  templateUrl: './transactions-list-modal.component.html',
  styleUrls: ['./transactions-list-modal.component.scss']
})
export class TransactionsListModalComponent {
  public intervals: string[] = [ IntervalEnum.Day, IntervalEnum.Week, IntervalEnum.Month, IntervalEnum.Year ];
  public transactions: Transaction[] = [];
  public CategoryTypeEnum = CategoryTypeEnum;
  public faPlus = faPlus;
  public faMinus = faMinus;

  constructor(
    private _transactionService: TransactionService,
    public dialogRef: MatDialogRef<TransactionsListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
  ) { }

  public someMethod(event): void {
    const { value } = event;

    if (!value) {
      return;
    }

    this._transactionService.getUserTransactions(this.data.userId, value).subscribe(response => {
      const { transactions } = response;

      if (!transactions) {
        return;
      }

      this.transactions = transactions;
    });
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
