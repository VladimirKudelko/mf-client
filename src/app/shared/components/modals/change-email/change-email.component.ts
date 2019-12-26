import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailModalComponent {
  public changeEmailForm: FormGroup = this._fb.group({
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email
      ])
    ],
  });

  constructor(
    public dialogRef: MatDialogRef<ChangeEmailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    @Inject(FormBuilder) private _fb: FormBuilder
  ) { }

  public isFormValid(): boolean {
    return this.changeEmailForm.valid && this.changeEmailForm.get('email').value;
  }

  public submit(): void {
    this.dialogRef.close({
      email: this.changeEmailForm.get('email').value,
    });
  }
}
