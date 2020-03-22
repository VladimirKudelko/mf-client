import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Wallet } from '../models';
import { IoEventTypesEnum } from './../enums/io-event-types.enum';

const urls = {
  getUserCash: (userId: string) => `/cash/${userId}`
};
@Injectable({
  providedIn: 'root'
})
export class CashService {
  public wallet = this._socket.fromEvent<Wallet>(IoEventTypesEnum.WALLET);

  constructor(
    private _httpClient: HttpClient,
    private _socket: Socket
  ) {}

  public getUserCash(userId: string): Observable<Wallet> {
    return this._httpClient.get<{ wallet: Wallet }>(urls.getUserCash(userId)).pipe(pluck('wallet'));
  }
}
