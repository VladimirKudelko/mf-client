import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleEnum, PopupEnum } from 'src/app/shared/enums';
import { NotificationModalComponent } from 'src/app/shared/components/modals/notification/notification.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this._fb.group({
      'email': [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      'password': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ])
      ]
    });
  }

  onSubmit() {
    this._authService.loginUser(this.loginForm.value)
      .subscribe(response => {
        this._authService.saveToLocalStorage('token', response.token);

        if (this._authService.getRole() === RoleEnum.Admin) {
          this._router.navigateByUrl('/admin');
        } else {
          this._router.navigateByUrl('/dashboard');
        }
      }, (response) => {
        this._dialog.open(NotificationModalComponent, {
          width: '400px',
          data: {
            modalType: PopupEnum.Error,
            message: response.error.message
          }
        });
      });
  }

}
