import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-change-full-name',
  templateUrl: './change-full-name.component.html',
  styleUrls: ['./change-full-name.component.scss']
})
export class ChangeFullNameModalComponent {
  public changeFullNameForm: FormGroup = this._fb.group({
    firstName: [ '', Validators.compose([ Validators.required ]) ],
    lastName: [ '', Validators.compose([ Validators.required ]) ]
  });

  constructor(
    public dialogRef: MatDialogRef<ChangeFullNameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { firstName: string, lastName: string },
    @Inject(FormBuilder) private _fb: FormBuilder
  ) { }

  public isFormValid(): boolean {
    return this.changeFullNameForm.valid &&
      this.changeFullNameForm.get('firstName').value &&
      this.changeFullNameForm.get('lastName').value;
  }

  public submit(): void {
    this.dialogRef.close({
      firstName: this.changeFullNameForm.get('firstName').value,
      lastName: this.changeFullNameForm.get('lastName').value,
    });
  }
}
