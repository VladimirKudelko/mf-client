import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Category } from 'src/app/shared/models';

@Component({
  selector: 'app-track-money-modal',
  templateUrl: './track-money-modal.component.html',
  styleUrls: ['./track-money-modal.component.scss']
})
export class TrackMoneyModalComponent {
  public newTrackMoneyForm: FormGroup = this.fb.group({
    amountMoney: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ])
    ],
    note: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<TrackMoneyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: Category },
    @Inject(FormBuilder) private fb: FormBuilder
  ) { }

  public formIsInvalid(): boolean {
    return !(
      this.newTrackMoneyForm.valid &&
      this.newTrackMoneyForm.get('amountMoney').value
    );
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    const data = {
      amountMoney: this.newTrackMoneyForm.get('amountMoney').value,
      note: this.newTrackMoneyForm.get('note').value
    };

    this.dialogRef.close(data);
  }
}
