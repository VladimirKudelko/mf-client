import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule, MatFormFieldModule, MatDialogModule, MatRadioModule } from '@angular/material';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    ExpensesComponent,
    IncomesComponent,
    StatisticComponent,
    ReportsComponent,
    SettingsComponent,
    WalletComponent,
    CategoriesListComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDialogModule,
    MatRadioModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
