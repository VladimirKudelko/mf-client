import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

import { AuthService } from 'src/app/shared/services';
import { PopupEnum } from 'src/app/shared/enums';
import { NotificationModalComponent } from '..';

@Component({
  selector: 'app-recovery-password-modal',
  templateUrl: './recovery-password-modal.component.html',
  styleUrls: ['./recovery-password-modal.component.scss']
})
export class RecoveryPasswordModalComponent {
  public email = new FormControl(
    '',
    { validators: [Validators.required, Validators.email] }
  );
  public questionnairesForm: FormGroup = this._fb.group({
    question1: ['', Validators.required],
    question2: ['', Validators.required]
  });
  public recoveryPasswordForm: FormGroup = this._fb.group({
    newPassword: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25)
      ])
    ]
  });
  public userId: string;
  public questions: object;
  public isShowNewPasswordForm = false;

  constructor(
    public _authService: AuthService,
    public dialogRef: MatDialogRef<RecoveryPasswordModalComponent>,
    private _dialog: MatDialog,
    @Inject(FormBuilder) private _fb: FormBuilder
  ) {}

  public isFormValid(): boolean {
    return this.questionnairesForm.valid;
  }

  public getUserQuestions(event): void {
    event.preventDefault();

    this._authService.getUserQuestions(this.email.value).subscribe(response => {
      if (!response || !response.userId) {
        this.showNotification(PopupEnum.Error, 'There is no such user with this email');
      }

      const { questions, userId } = response;

      this.userId = userId;
      this.questions = questions;
    });
  }

  public sendAnswers(): void {
    this._authService
      .verifyUserQuestions({ userId: this.userId, ...this.questionnairesForm.value })
      .subscribe(isSuccessfully => {
        if (!isSuccessfully) {
          this.showNotification(PopupEnum.Error, 'The answers are not correct');

          return;
        }

        this.isShowNewPasswordForm = true;
      });
  }

  public submit(): void {
    this.dialogRef.close({
      userId: this.userId,
      ...this.recoveryPasswordForm.value
    });
  }

  private showNotification(modalType: PopupEnum, message: string): void {
    this._dialog.open(NotificationModalComponent, {
      width: '400px',
      data: { modalType, message }
    });
  }
}
