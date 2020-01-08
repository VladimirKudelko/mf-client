import { BudgetTypeEnum } from '../enums';

export interface Budget {
  _id: string;
  userId: string;
  budgetType: BudgetTypeEnum;
  limit: number;
  isActive: boolean;
  from: string;
  to: string;
  modifiedDate: string;
  currency: string;
}
