import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, map } from 'rxjs/operators';

import { CurrencyService, CashService } from 'src/app/shared/services';
import { ConversionRate, Wallet } from '../../../models';

@Component({
  selector: 'app-change-currency-modal',
  templateUrl: './change-currency-modal.component.html',
  styleUrls: ['./change-currency-modal.component.scss']
})
export class ChangeCurrencyModalComponent implements OnInit {
  public changeCurrencyForm: FormGroup = this._fb.group({
    from: [{ value: this.data.from, disabled: true }, Validators.required],
    to: ['', Validators.required]
  });
  public wallet: Wallet;
  public conversionRates: ConversionRate[];
  public conversionResult: number;
  public formattedConversionResult: string;

  constructor(
    private _currencyService: CurrencyService,
    private _cashService: CashService,
    public dialogRef: MatDialogRef<ChangeCurrencyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { from: string, userId: string },
    @Inject(FormBuilder) private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this._cashService
      .getUserCash(this.data.userId)
      .subscribe(wallet => (this.wallet = wallet));

    this._currencyService
      .getConversionRates(this.data.from)
      .pipe(
        filter(conversionRates => !!conversionRates && !!Object.values(conversionRates)),
        map(conversionRates => this.mapConversionRatesToModel(conversionRates))
      )
      .subscribe(conversionRates => (this.conversionRates = conversionRates.splice(1)));

    this.registerFormControlEvents();
  }

  public submit(): void {
    this.dialogRef.close({
      conversionResult: this.conversionResult,
      conversionCurrency: this.changeCurrencyForm.controls['to'].value.currency
    });
  }

  private mapConversionRatesToModel(conversionRates: object): ConversionRate[] {
    return Object
      .entries(conversionRates)
      .map(conversionRate => ({
        currency: conversionRate[0],
        conversionRate: conversionRate[1]
      }));
  }

  private registerFormControlEvents(): void {
    this.changeCurrencyForm.controls['to'].valueChanges.subscribe(value => {
      this.conversionResult = this.calculateAmountByRate(value.conversionRate);
      this.formattedConversionResult = `\
        ${this.wallet.balance} ${this.data.from} = \
        ${this.conversionResult} ${value.currency}\
      `;
    });
  }

  private calculateAmountByRate(rate: number): number {
    return +(this.wallet.balance * rate).toFixed(2);
  }
}
