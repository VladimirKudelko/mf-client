import { BudgetStatusEnum } from 'src/app/shared/enums';
import { Transaction } from 'src/app/shared/models';

export interface BudgetDTO {
  _id: string;
  userId: string;
  limit: number;
  status: BudgetStatusEnum;
  from: string;
  to: string;
  modifiedDate: string;
  currency: string;
  transactions: Transaction[];
  used: number;
}
