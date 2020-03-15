import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { TrackMoneyModalComponent, CreateCategoryModalComponent, NotificationModalComponent } from 'src/app/shared/components/modals';
import { Category, User, Wallet, Task } from 'src/app/shared/models';
import { CategoryTypeEnum, PopupEnum } from 'src/app/shared/enums';
import { CategoryService, AuthService, TransactionService } from 'src/app/shared/services';
import { TaskKeysEnum } from '../../enums';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { hideShow } from '../../animations';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [hideShow]
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
    public dialog: MatDialog,
    private _categoryService: CategoryService,
    private _transactionService: TransactionService,
    private _authService: AuthService,
    private _localizationService: LocalizationService
  ) { }

  ngOnInit(): void {
    this._user = this._authService.getUserFromLocalStorage();
    this._user.tasks.forEach(task => {
      switch (task.key) {
        case TaskKeysEnum.Category: this._categoryTask = task; break;
        case TaskKeysEnum.Money: this._moneyTask = task; break;
      }
    });
  }

  private showNotificationModal(modalType: PopupEnum, message: string): void {
    this.dialog.open(NotificationModalComponent, {
      width: '400px',
      data: {
        modalType,
        message: this._localizationService.getTranslation(message)
      }
    });
  }

  get isShowCategories(): string {
    return this.categories
      ? 'show'
      : 'hide';
  }

  public createNewCategory(): void {
    const dialogRef = this.dialog.open(CreateCategoryModalComponent, { width: '25vw' });

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
        this.showNotificationModal(PopupEnum.Success, 'Category is added');
        this._cdr.detectChanges();
      });
    });
  }

  public trackMoney(category: Category): void {
    const dialogRef = this.dialog.open(
      TrackMoneyModalComponent,
      {
        data: { category, currency: this.wallet.currency },
        minWidth: '300px',
        minHeight: '40vh'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.amountMoney || !category || !this.wallet) {
        return;
      }

      const data = {
        walletId: this.wallet._id,
        categoryId: category._id,
        type: this.categoriesType,
        createdDate: new Date().toISOString(),
        isUpdateTask: !this._moneyTask.isCompleted,
        currency: this.wallet.currency,
        amountMoney: result.amountMoney,
        note: result.note || ''
      };

      this._transactionService.createTransaction(this._user._id, data)
        .subscribe(() => this.updatedCash.emit());
    });
  }
}
