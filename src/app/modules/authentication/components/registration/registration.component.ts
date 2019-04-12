import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registrationForm = this._fb.group({
      'firstName': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
        ])
      ],
      'lastName': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
        ])
      ],
      'email': [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ],
      'password': [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ])
      ],
      'confirmPassword': [ '' ]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls['password'].value;
    const confirmPassword = group.controls['confirmPassword'].value;

    return password === confirmPassword
      ? null
      : { notSame: true };
  }

  onSubmit() {
    delete this.registrationForm.value.confirmPassword;

    this._authService.registerUser(this.registrationForm.value)
      .subscribe(
        response => {
          this._authService.saveToLocalStorage('token', response.token);
          this._router.navigateByUrl('/dashboard');
        },
        (response) => alert(response.error.message)
      );
  }
}
