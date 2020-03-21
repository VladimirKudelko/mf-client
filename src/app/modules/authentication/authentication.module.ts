import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { AppMaterialModule } from 'src/app/shared/modules/app-material/app-material.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    EmailVerificationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    AppMaterialModule
  ]
})
export class AuthenticationModule { }
