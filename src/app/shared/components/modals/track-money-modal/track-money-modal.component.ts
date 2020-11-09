import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Category } from 'src/app/shared/models';
import { CURRENCY_SYMBOLS } from 'src/app/shared/constants/currency-symbols';

@Component({
  selector: 'app-track-money-modal',
  templateUrl: './track-money-modal.component.html',
  styleUrls: ['./track-money-modal.component.scss']
})
export class TrackMoneyModalComponent implements OnInit {
  public newTrackMoneyForm: FormGroup = this.fb.group({
    amountMoney: [
      '',
      Validators.compose([
        Validators.required,
        Validators.max(1000000),
        Validators.minLength(1)
      ])
    ],
    note: ['']
  });
  public currencySymbol: string;

  constructor(
    public dialogRef: MatDialogRef<TrackMoneyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category, currency: string },
    @Inject(FormBuilder) private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.currencySymbol = CURRENCY_SYMBOLS[this.data.currency];
  }

  public isFormValid(): boolean {
    return (
      this.newTrackMoneyForm.valid &&
      this.newTrackMoneyForm.get('amountMoney').value
    );
  }

  public submit(): void {
    const data = {
      amountMoney: this.newTrackMoneyForm.get('amountMoney').value,
      note: this.newTrackMoneyForm.get('note').value
    };

    this.dialogRef.close(data);
  }
}
