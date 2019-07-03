import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './shared/modules/app-material/app-material.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ApiInterceptor } from './shared/interceptors/api.interceptor';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { CreateCategoryModalComponent } from './shared/components/modals/create-category-modal/create-category-modal.component';
import { TrackMoneyModalComponent } from './shared/components/modals/track-money-modal/track-money-modal.component';
import { ChangeFullNameModalComponent } from './shared/components/modals/change-full-name/change-full-name.component';
import { ChangeEmailModalComponent } from './shared/components/modals/change-email/change-email.component';
import { ChangePasswordModalComponent } from './shared/components/modals/change-password/change-password.component';
import { NotificationModalComponent } from './shared/components/modals/notification/notification.component';
import { ConfirmationModalComponent } from './shared/components/modals/confirmation-modal/confirmation-modal.component';
import { TransactionsListModalComponent } from './shared/components/modals/transactions-list-modal/transactions-list-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    SidebarComponent,
    CreateCategoryModalComponent,
    TrackMoneyModalComponent,
    ChangeFullNameModalComponent,
    ChangeEmailModalComponent,
    ChangePasswordModalComponent,
    NotificationModalComponent,
    ConfirmationModalComponent,
    TransactionsListModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
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
    NotificationModalComponent,
    ConfirmationModalComponent,
    TransactionsListModalComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
