import { CategoryTypeEnum } from '../enums';

export interface Category {
  _id: string;
  userId: string;
  title: string;
  type: CategoryTypeEnum;
  isDefault: boolean;
}
