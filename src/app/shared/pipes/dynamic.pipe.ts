import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnum } from '../enums';
import * as _ from 'lodash';

@Pipe({
  name: 'dynamic'
})
export class DynamicPipe implements PipeTransform {
  transform(value: string | number) {
    if (!value) {
      return this.empty(value);
    }

    return value === RoleEnum.User
      ? this.red(value)
      : this.green(value);
  }

  green(value: string | number) {
    return `<span class="role-cell role-cell--green">${value}</span>`;
  }

  red(value: string | number) {
    return `<span class="role-cell role-cell--red">${value}</span>`;
  }

  empty(value: string | number) {
    if (typeof value === 'string' && value.trim().length === 0) {
      return '---';
    }

    return value;
  }
}
