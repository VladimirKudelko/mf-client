import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProgressBarModule } from 'angular-progress-bar';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppMaterialModule } from 'src/app/shared/modules/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { SettingsComponent } from './components/settings/settings.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryComponent } from './components/category/category.component';
import { BudgetComponent } from './components/budget/budget.component';
import { ToggleSwitchComponent } from 'src/app/shared/components/toggle-switch/toggle-switch.component';
import { BudgetChartComponent } from './components/budget-chart/budget-chart.component';

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
    ToggleSwitchComponent,
    BudgetChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    AppMaterialModule,
    FontAwesomeModule,
    NgxChartsModule,
    ProgressBarModule,
    TranslateModule,
    SharedModule
  ]
})
export class DashboardModule { }
