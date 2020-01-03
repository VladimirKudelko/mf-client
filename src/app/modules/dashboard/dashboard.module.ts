import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppMaterialModule } from 'src/app/shared/modules/app-material/app-material.module';
import { HomeComponent } from './components/home/home.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryComponent } from './components/category/category.component';
import { BudgetComponent } from './components/budget/budget.component';

@NgModule({
  declarations: [
    HomeComponent,
    ExpensesComponent,
    IncomesComponent,
    StatisticComponent,
    SettingsComponent,
    WalletComponent,
    CategoriesListComponent,
    CategoryComponent,
    BudgetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    AppMaterialModule,
    FontAwesomeModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
