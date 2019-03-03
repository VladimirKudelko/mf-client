import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { AuthService } from 'src/app/shared/services/auth.service';

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
    private _authService: AuthService
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
        if (!response.isSuccessfully) {
          alert(response.message);

          return;
        }

        this._authService.saveToLocalStorage('token', response.token);
        this._authService.saveToLocalStorage('user', JSON.stringify(_.omit(response, ['isSuccessfully', 'token'])));
        this._router.navigateByUrl('/dashboard');
      }, (response) => alert(response.error.message));
  }

}
