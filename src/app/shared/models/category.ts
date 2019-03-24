import { CategoryTypeEnum } from '../enums';

export interface Category {
  userId: string;
  title: string;
  type: CategoryTypeEnum;
  isDefault: boolean;
}
