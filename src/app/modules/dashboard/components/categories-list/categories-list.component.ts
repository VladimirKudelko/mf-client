import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { CreateCategoryModalComponent } from 'src/app/shared/components/modals/create-category-modal/create-category-modal.component';
import { Category } from 'src/app/shared/models';
import { CategoryTypeEnum } from 'src/app/shared/enums';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('hideShow', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),
      transition('hide => show', [ animate('1s') ]),
      transition('show => hide', [ animate('0.5s') ])
    ]),
  ]
})
export class CategoriesListComponent {
  @Input() title: string;
  @Input() categoriesType: CategoryTypeEnum;
  @Input() categories: Category[];
  @Output() isUpdatedCategories = new EventEmitter<boolean>();

  public faPlus = faPlus;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _categoryService: CategoryService,
    private _authService: AuthService,
    public dialog: MatDialog
  ) { }

  someClick(eve) {
    console.log(eve);
  }

  createNewCategory() {
    const dialogRef = this.dialog.open(CreateCategoryModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.categoryTitle || !this.categoriesType) {
        return;
      }

      const user = this._authService.getUser();
      const data = { type: this.categoriesType, title: result.categoryTitle };

      this._categoryService.createNewCategory(user._id, data).subscribe(category => {
        this.categories.push(category);
        this._cdr.detectChanges();
      });
    });
  }
}
