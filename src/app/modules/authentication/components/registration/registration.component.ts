import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { NotificationModalComponent } from 'src/app/shared/components/modals/notification/notification.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PopupEnum } from 'src/app/shared/enums';
import { checkPasswords } from '../../validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  public registrationForm: FormGroup;
  public questions1 = [
    'What is your favourite color?',
    'What is the name of your first pet?',
    'What is your mother\'s maiden name?'
  ];
  public questions2 = [
    'What is the name of the town where you were born?',
    'Where are you from?',
    'What is your favourite subject at school?'
  ];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    public dialog: MatDialog
  ) {
    this.registrationForm = this._fb.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
        ])
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ])
      ],
      confirmPassword: [ '' ],
      question1: this._fb.group({
        question: ['', Validators.required],
        answer: ['', Validators.required]
      }),
      question2: this._fb.group({
        question: ['', Validators.required],
        answer: ['', Validators.required]
      }),
    }, { validator: checkPasswords });
  }

  isControlInvalid(controlName: string): boolean {
    return (
      this.registrationForm.controls[controlName].invalid &&
      this.registrationForm.controls[controlName].touched
    );
  }

  submit(): void {
    delete this.registrationForm.value.confirmPassword;

    this._authService.registerUser(this.registrationForm.value)
      .subscribe(
        response => {
          this._authService.saveToLocalStorage('token', response.token);
          this._router.navigateByUrl('/dashboard');
        },
        response => {
          this.dialog.open(NotificationModalComponent, {
            width: '400px',
            data: {
              modalType: PopupEnum.Error,
              message: response.error.message
            }
          });
        }
      );
  }
}
