import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

import { RoleEnum } from '../enums';

@Pipe({
  name: 'dynamic'
})
export class DynamicPipe implements PipeTransform {
  transform(value: string | number) {
    if (!value) {
      return this.getEmptyString(value);
    }

    return value === RoleEnum.User
      ? this.decorateRedColor(value)
      : this.decorateGreenColor(value);
  }

  decorateGreenColor(value: string | number) {
    return `<span class="role-cell role-cell--green">${value}</span>`;
  }

  decorateRedColor(value: string | number) {
    return `<span class="role-cell role-cell--red">${value}</span>`;
  }

  getEmptyString(value: string | number) {
    if (typeof value === 'string' && value.trim().length === 0) {
      return '---';
    }

    return value;
  }
}
