import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { CreateCategoryModalComponent } from 'src/app/shared/components/modals/create-category-modal/create-category-modal.component';
import { TrackMoneyModalComponent } from 'src/app/shared/components/modals/track-money-modal/track-money-modal.component';
import { Category, User, Wallet, Task } from 'src/app/shared/models';
import { CategoryTypeEnum } from 'src/app/shared/enums';
import { CategoryService, AuthService, TransactionService } from 'src/app/shared/services';

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
  private _categoryTask: Task;
  private _moneyTask: Task;

  public faPlus = faPlus;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _categoryService: CategoryService,
    private _transactionService: TransactionService,
    private _authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._user = this._authService.getUserFromLocalStorage();
    this._categoryTask = this._user.tasks.find(task => task.key === 'category');
    this._moneyTask = this._user.tasks.find(task => task.key === 'money');
  }

  get getShowCategories(): string {
    return this.categories
      ? 'show'
      : 'hide';
  }

  public createNewCategory(): void {
    const dialogRef = this.dialog.open(CreateCategoryModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.categoryTitle || !this.categoriesType) {
        return;
      }

      const data = {
        type: this.categoriesType,
        title: result.categoryTitle,
        isUpdateTask: !this._categoryTask.isCompleted
      };

      this._categoryService.createNewCategory(this._user._id, data).subscribe(response => {
        this.categories.push(response.category);
        this._cdr.detectChanges();
      });
    });
  }

  public trackMoney(category: Category): void {
    const dialogRef = this.dialog.open(TrackMoneyModalComponent, {
      data: { category },
    });

    dialogRef.afterClosed().subscribe(result => {
      const { amountMoney, note } = result;

      if (!result || !amountMoney || !category || !this.wallet) {
        return;
      }

      const data: any = {
        walletId: this.wallet._id,
        categoryId: category._id,
        type: this.categoriesType,
        createdDate: new Date().toISOString(),
        isUpdateTask: !this._moneyTask.isCompleted,
        amountMoney
      };

      if (note) {
        data.note = note;
      }

      this._transactionService.createTransaction(this._user._id, data)
        .subscribe(response => this.updatedCash.emit());
    });
  }
}
