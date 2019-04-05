import { RoleEnum } from '../enums';
import { Task } from '.';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdDate: string;
  tasks: Task[];
  role: RoleEnum;
}
