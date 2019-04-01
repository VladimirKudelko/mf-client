import { RoleEnum } from '../enums';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdDate: string;
  role: RoleEnum;
}
