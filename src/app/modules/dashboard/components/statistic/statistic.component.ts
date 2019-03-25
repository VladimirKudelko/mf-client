import { Component, OnInit } from '@angular/core';

import { IntervalEnum } from 'src/app/shared/enums';
import { TransactionService } from 'src/app/shared/services/transaction.service';
import * as moment from 'moment';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  selectedInterval: string;
  intervals: string[] = [ IntervalEnum.Day, IntervalEnum.Week, IntervalEnum.Month, IntervalEnum.Year ];

  constructor(
    private _transactionService: TransactionService
  ) { }

  ngOnInit() {
  }

  changeInterval(event) {
    console.log(this.selectedInterval);
    const fromTime = new Date();
    const toTime = moment().format('LLLL');

    console.log(fromTime);
    console.log(toTime);
  }

}
