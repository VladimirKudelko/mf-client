import { CurrencyEnum, WalletTypeEnum } from '../enums';

export interface Wallet {
  _id: string;
  userId: string;
  balance: number;
  currency: CurrencyEnum;
  name: string;
  type: WalletTypeEnum;
  createdDate: Date;
  lastUpdate: Date;
}
