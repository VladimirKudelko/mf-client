import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-budget-modal',
  templateUrl: './add-budget-modal.component.html',
  styleUrls: ['./add-budget-modal.component.scss']
})
export class AddBudgetModalComponent {
  public budgetTypes: string[] = ['All expenses', 'For specific category']; // should be objects
  public isLinear = false;
  public budgetTypeForm: FormGroup = this._fb.group({
    budgetType: ['All expenses', Validators.required],
  });
  public amountOfMoneyForm = this._fb.group({
    amountOfMoney: ['', Validators.required]
  });

  public get areFormsValid(): boolean {
    return this.budgetTypeForm.valid && this.amountOfMoneyForm.valid;
  }

  constructor(
    public dialogRef: MatDialogRef<AddBudgetModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { },
    @Inject(FormBuilder) private _fb: FormBuilder
  ) { }

  public submit(): void {
    this.dialogRef.close({
      ...this.budgetTypeForm.value,
      ...this.amountOfMoneyForm.value
    });
  }
}
