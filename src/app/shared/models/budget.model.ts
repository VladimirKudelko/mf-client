import { BudgetStatusEnum } from '../enums';

export interface Budget {
  _id: string;
  userId: string;
  limit: number;
  status: BudgetStatusEnum;
  from: string;
  to: string;
  modifiedDate: string;
  currency: string;
}
