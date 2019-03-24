import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Category } from 'src/app/shared/models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent {
  @Input() category: Category;
}
