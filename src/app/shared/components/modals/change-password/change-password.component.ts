import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordModalComponent {
  public changePasswordForm: FormGroup = this._fb.group({
    lastPassword: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ])
    ],
    newPassword: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ])
    ]
  });

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(FormBuilder) private _fb: FormBuilder
  ) { }

  public isFormValid(): boolean {
    return this.changePasswordForm.valid &&
      this.changePasswordForm.get('lastPassword').value &&
      this.changePasswordForm.get('newPassword').value;
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public submit(): void {
    this.dialogRef.close({
      lastPassword: this.changePasswordForm.get('lastPassword').value,
      newPassword: this.changePasswordForm.get('newPassword').value,
    });
  }
}
