import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import * as moment from 'moment';

import { Wallet } from 'src/app/shared/models';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent {
  @Input() wallet: Wallet;

  getDateDifferences(startDate, endDate = moment()): string {
    const startDateMoment = moment(startDate);

    const minutes = endDate.diff(startDateMoment, 'minutes');
    const hours = endDate.diff(startDateMoment, 'hours');
    const days = endDate.diff(startDateMoment, 'days');
    const months = endDate.diff(startDateMoment, 'months');

    if (minutes < 60) {
      return `${minutes} min`;
    } else if (hours < 24) {
      return `${hours} hours`;
    } else if (days < 7) {
      return `${days} days`;
    } else if (months > 1) {
      return `${months} months`;
    }
  }
}
