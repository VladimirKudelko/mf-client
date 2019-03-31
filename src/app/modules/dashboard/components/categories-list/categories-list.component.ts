import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { CreateCategoryModalComponent } from 'src/app/shared/components/modals/create-category-modal/create-category-modal.component';
import { TrackMoneyModalComponent } from 'src/app/shared/components/modals/track-money-modal/track-money-modal.component';
import { Category, User, Wallet } from 'src/app/shared/models';
import { CategoryTypeEnum } from 'src/app/shared/enums';
import { CategoryService } from 'src/app/shared/services/category.service';
import { AuthService } from 'src/app/shared/services';
import { TransactionService } from 'src/app/shared/services/transaction.service';

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
export class CategoriesListComponent implements OnInit {
  @Input() title: string;
  @Input() wallet: Wallet;
  @Input() categoriesType: CategoryTypeEnum;
  @Input() categories: Category[];
  @Output() updatedCash = new EventEmitter();

  private _user: User;
  public faPlus = faPlus;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _categoryService: CategoryService,
    private _transactionService: TransactionService,
    private _authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._user = this._authService.getUser();
  }

  public createNewCategory() {
    const dialogRef = this.dialog.open(CreateCategoryModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.categoryTitle || !this.categoriesType) {
        return;
      }

      const data = { type: this.categoriesType, title: result.categoryTitle };

      this._categoryService.createNewCategory(this._user._id, data).subscribe(response => {
        this.categories.push(response.category);
        this._cdr.detectChanges();
      });
    });
  }

  public trackMoney(category: Category) {
    const dialogRef = this.dialog.open(TrackMoneyModalComponent, {
      data: { category },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.amount || !category || !this.wallet) {
        return;
      }

      const data = {
        walletId: this.wallet._id,
        categoryId: category._id,
        amountMoney: result.amount,
        note: result.note || null,
        type: this.categoriesType,
        createdDate: new Date().toISOString()
      };

      this._transactionService.createTransaction(this._user._id, data)
        .subscribe(response => this.updatedCash.emit());
    });
  }
}
