import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import * as moment from 'moment';

import { Wallet } from 'src/app/shared/models';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { CURRENCY_SYMBOLS } from 'src/app/shared/constants/currency-symbols';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent {
  public CURRENCY_SYMBOLS = CURRENCY_SYMBOLS;

  @Input() wallet: Wallet;

  constructor(private _localizationService: LocalizationService) {}

  getDateDifferences(startDate, endDate = moment()): string {
    const startDateMoment = moment(startDate);

    const minutes = endDate.diff(startDateMoment, 'minutes');
    const hours = endDate.diff(startDateMoment, 'hours');
    const days = endDate.diff(startDateMoment, 'days');
    const months = endDate.diff(startDateMoment, 'months');

    let dateDifference: string;

    if (minutes < 60) {
      dateDifference = `${minutes} ${this.getTranslation('min')}`;
    } else if (hours < 24) {
      dateDifference = `${hours} ${this.getTranslation('hours')}`;
    } else if (days < 7) {
      dateDifference = `${days} ${this.getTranslation('days')}`;
    } else if (months > 1) {
      dateDifference = `${months} ${this.getTranslation('months')}`;
    }

    return `${dateDifference} ${this.getTranslation('ago')}`;
  }

  private getTranslation(text: string): string {
    return this._localizationService.getTranslation(text);
  }
}
