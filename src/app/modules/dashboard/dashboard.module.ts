import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule, MatFormFieldModule, MatDialogModule } from '@angular/material';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
  declarations: [
    HomeComponent,
    ExpensesComponent,
    IncomesComponent,
    StatisticComponent,
    ReportsComponent,
    SettingsComponent,
    ProfileComponent,
    WalletComponent,
    CategoriesListComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDialogModule,
    FontAwesomeModule
  ]
})
export class DashboardModule { }
