import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { IncomesComponent } from './components/incomes/incomes.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BudgetComponent } from './components/budget/budget.component';
import { UserResolverService } from 'src/app/shared/services';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'incomes', component: IncomesComponent },
  {
    path: 'budgets',
    component: BudgetComponent,
    resolve: {
      user: UserResolverService
    }
  },
  { path: 'statistic', component: StatisticComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
