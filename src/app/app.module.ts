import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatRadioModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ApiInterceptor } from './shared/interceptors/api.interceptor';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { CreateCategoryModalComponent } from './shared/components/modals/create-category-modal/create-category-modal.component';
import { TrackMoneyModalComponent } from './shared/components/modals/track-money-modal/track-money-modal.component';
import { ChangeFullNameModalComponent } from './shared/components/modals/change-full-name/change-full-name.component';
import { ChangeEmailModalComponent } from './shared/components/modals/change-email/change-email.component';
import { ChangePasswordModalComponent } from './shared/components/modals/change-password/change-password.component';
import { NotificationComponent } from './shared/components/modals/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoaderComponent,
    SidebarComponent,
    CreateCategoryModalComponent,
    TrackMoneyModalComponent,
    ChangeFullNameModalComponent,
    ChangeEmailModalComponent,
    ChangePasswordModalComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    CreateCategoryModalComponent,
    TrackMoneyModalComponent,
    ChangeEmailModalComponent,
    ChangeFullNameModalComponent,
    ChangePasswordModalComponent,
    NotificationComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
