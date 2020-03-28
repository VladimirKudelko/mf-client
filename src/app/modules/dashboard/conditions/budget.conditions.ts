import * as moment from 'moment';

import { Budget } from 'src/app/shared/models';
import { BudgetStatusEnum } from 'src/app/shared/enums';

export const isExpiredActiveBudget = (budget: Budget) => {
  const now = moment();

  return (
    budget.status === BudgetStatusEnum.Active &&
    now.isSameOrAfter(budget.to)
  );
};

export const isBudgetToBeActive = (budget: Budget) => {
  const now = moment();

  return (
    budget.status === BudgetStatusEnum.Pending &&
    now.isSameOrAfter(budget.from) &&
    now.isSameOrBefore(budget.to)
  );
};
