import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import * as moment from 'moment';

import { BudgetDTO } from '../../dtos';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetChartComponent implements OnInit {
  @Input() budget: BudgetDTO;

  public results: { name: string, value: number }[];
  public view: number[] = [600, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = true;
  public showLegend = false;
  public showXAxisLabel = false;
  public showYAxisLabel = false;
  public colorScheme = { domain: ['#5AA454'] };

  constructor() { }

  ngOnInit(): void {
    this.initializeChartData();
  }

  private initializeChartData(): void {
    const datesRange = this.getDatesRange(this.budget.from, this.budget.to);

    this.results = datesRange.map(date => ({
      name: moment(date).format('MMMM DD'),
      value: this.getSumTransactions(date)
    }));
  }

  private getSumTransactions(date: string): number {
    return this.budget.transactions.reduce((accumulator, currentTransaction) => {
      return moment(currentTransaction.createdDate).format('YYYY-MM-DD') === date
        ? accumulator + currentTransaction.amountMoney
        : accumulator;
    }, 0);
  }

  private getDatesRange(startDate: string, stopDate: string): string[] {
    const dates: string[] = [];
    const endDate = moment(stopDate);
    let currentDate = moment(startDate);

    while (currentDate <= endDate) {
      dates.push(moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }

    return dates;
  }
}
