import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

const urls = {
  getConversionRates: (base: string) => `/currencies/conversion-rates?base=${base}`,
  changeCurrency: () => `/currencies`,
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private _httpClient: HttpClient) {}

  public getConversionRates(base: string): Observable<object> {
    return this._httpClient
      .get<{ isSuccessfully: boolean, conversionRates: object }>(urls.getConversionRates(base))
      .pipe(pluck('conversionRates'));
  }

  public changeCurrency(body: any): Observable<{ isSuccessfully: boolean, isUpdated: boolean }> {
    return this._httpClient.patch<{ isSuccessfully: boolean, isUpdated: boolean }>(urls.changeCurrency(), body);
  }
}
