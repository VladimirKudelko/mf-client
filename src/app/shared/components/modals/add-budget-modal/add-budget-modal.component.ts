import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

import { BudgetLifetimeEnum, BudgetStatusEnum } from 'src/app/shared/enums';
import { CURRENCY_SYMBOLS } from 'src/app/shared/constants/currency-symbols';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
  styleUrls: ['./add-budget-modal.component.scss']
})
export class AddBudgetModalComponent {
  public lifetimes: { title: string, amountOfMonths: number, value: BudgetLifetimeEnum }[] = [
    { title: '1 Month', amountOfMonths: 1, value: BudgetLifetimeEnum.Month },
    { title: '3 Months', amountOfMonths: 3, value: BudgetLifetimeEnum.ThreeMonths },
    { title: '6 Months', amountOfMonths: 6, value: BudgetLifetimeEnum.SixMonths },
    { title: '1 Year', amountOfMonths: 12, value: BudgetLifetimeEnum.Year },
  ];
  public isLinear = false;
  public CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;
  public budgetLifetime: FormGroup = this._fb.group({
    lifetime: [this.lifetimes[0], Validators.required]
  });
  public limitForm: FormGroup = this._fb.group({
    limit: ['', Validators.required]
  });

  public get areFormsValid(): boolean {
    return this.limitForm.valid && this.budgetLifetime.valid;
  }

  constructor(
    public dialogRef: MatDialogRef<AddBudgetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currency: string },
    @Inject(FormBuilder) private _fb: FormBuilder
  ) {}

  public compareBudgetLifetimeWithOption(v1: any, v2: any): boolean {
    return v1 && v2
      ? v1.lifetime === v2.lifetime
      : v1 === v2;
  }

  public submit(): void {
    const { lifetime: { amountOfMonths } } = this.budgetLifetime.value;
    const { limit } = this.limitForm.value;
    const budgets = [];
    let from = moment().format('YYYY-MM-DD');

    for (let i = 0; i < amountOfMonths; i++) {
      const to = moment(from).add(1, 'month').format('YYYY-MM-DD');

      budgets.push({
        limit,
        status: i === 0
          ? BudgetStatusEnum.Active
          : BudgetStatusEnum.Pending,
        from,
        to,
        currency: this.data.currency
      });

      from = to;
    }

    this.dialogRef.close(budgets);
  }
}
