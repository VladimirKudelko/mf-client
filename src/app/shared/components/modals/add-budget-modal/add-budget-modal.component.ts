import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';

import { BudgetTypeEnum, BudgetLifetimeEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
  styleUrls: ['./add-budget-modal.component.scss']
})
export class AddBudgetModalComponent {
  public budgets: { title: string, type: BudgetTypeEnum }[] = [
    { title: 'All expenses', type: BudgetTypeEnum.AllExpenses },
    { title: 'For specific category', type: BudgetTypeEnum.SpecificCategory }
  ];
  public lifetimes: { title: string, lifetime: BudgetLifetimeEnum }[] = [
    { title: '1 Month', lifetime: BudgetLifetimeEnum.Month },
    { title: '3 Months', lifetime: BudgetLifetimeEnum.ThreeMonths },
    { title: '6 Months', lifetime: BudgetLifetimeEnum.SixMonths },
    { title: '1 Year', lifetime: BudgetLifetimeEnum.Year },
  ];
  public isLinear = false;
  public budgetTypeForm: FormGroup = this._fb.group({
    budgetType: [this.budgets[0], Validators.required],
  });
  public budgetLifetime: FormGroup = this._fb.group({
    lifetime: [this.lifetimes[0], Validators.required]
  });
  public limitForm: FormGroup = this._fb.group({
    limit: ['', Validators.required]
  });

  public get areFormsValid(): boolean {
    return this.budgetTypeForm.valid && this.limitForm.valid && this.budgetLifetime.valid;
  }

  constructor(
    public dialogRef: MatDialogRef<AddBudgetModalComponent>,
    @Inject(FormBuilder) private _fb: FormBuilder
  ) { }

  private calculateLastExpiryDate(lifetime: BudgetLifetimeEnum) {
    let amountOfMonths;

    switch (lifetime) {
      case BudgetLifetimeEnum.Month:
        amountOfMonths = 1;

        break;
      case BudgetLifetimeEnum.ThreeMonths:
        amountOfMonths = 3;

        break;
      case BudgetLifetimeEnum.SixMonths:
        amountOfMonths = 6;

        break;
      case BudgetLifetimeEnum.Year:
        amountOfMonths = 12;

        break;
    }

    return moment().add(amountOfMonths, 'month').format('YYYY-MM-DD');
  }

  public compareBudgetTypeWithOption(v1: any, v2: any): boolean {
    return v1 && v2
      ? v1.type === v2.type
      : v1 === v2;
  }

  public compareBudgetLifetimeWithOption(v1: any, v2: any): boolean {
    return v1 && v2
      ? v1.lifetime === v2.lifetime
      : v1 === v2;
  }

  public submit(): void {
    this.dialogRef.close({
      budgetType: this.budgetTypeForm.value.budgetType.type,
      to: this.calculateLastExpiryDate(this.budgetLifetime.value.lifetime.lifetime),
      ...this.limitForm.value
    });
  }
}
