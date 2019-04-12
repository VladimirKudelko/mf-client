import { CategoryTypeEnum } from '../enums';

export interface Transaction {
  _id: string;
  userId: string;
  walletId: string;
  categoryId: string;
  amountMoney: number;
  type: CategoryTypeEnum;
  note: string;
  createdDate?: string;
}
