import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';

import {
  AddBudgetModalComponent,
  ChangeEmailModalComponent,
  ChangeFullNameModalComponent,
  ChangePasswordModalComponent,
  ChangeCurrencyModalComponent,
  ConfirmationModalComponent,
  CreateCategoryModalComponent,
  RecoveryPasswordModalComponent,
  NotificationModalComponent,
  TrackMoneyModalComponent,
  TransactionsListModalComponent
} from '../../components/modals';
import { AppMaterialModule } from '../app-material/app-material.module';

const MATERIAL_MODALS = [
  AddBudgetModalComponent,
  ChangeEmailModalComponent,
  ChangeFullNameModalComponent,
  ChangePasswordModalComponent,
  ChangeCurrencyModalComponent,
  ConfirmationModalComponent,
  CreateCategoryModalComponent,
  RecoveryPasswordModalComponent,
  NotificationModalComponent,
  TrackMoneyModalComponent,
  TransactionsListModalComponent
];

@NgModule({
  declarations: MATERIAL_MODALS,
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatStepperModule,
    TranslateModule
  ],
  exports: [],
  entryComponents: MATERIAL_MODALS
})
export class MaterialModalsModule {}
