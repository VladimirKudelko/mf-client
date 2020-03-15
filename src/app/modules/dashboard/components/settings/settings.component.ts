import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import { SidebarService, AuthService, CurrencyService } from 'src/app/shared/services';
import { User, Task } from 'src/app/shared/models';
import {
  ChangeEmailModalComponent,
  ChangeFullNameModalComponent,
  ChangePasswordModalComponent,
  NotificationModalComponent,
  ChangeCurrencyModalComponent
} from 'src/app/shared/components/modals';
import { PopupEnum, Themes } from 'src/app/shared/enums';
import { LocalizationService } from 'src/app/shared/services/localization.service';
import { UserPreferencesService } from 'src/app/shared/services/user-preferences.service';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private _settingsTask: Task;
  private _unsubscribe$ = new Subject();

  public user: User;
  public joinedDate: string;
  public initialTheme: string;
  public Themes = Themes;

  constructor(
    private _sidebarService: SidebarService,
    private _authService: AuthService,
    private _localizationService: LocalizationService,
    private _userPreferences: UserPreferencesService,
    private _currencyService: CurrencyService,
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._sidebarService.show();
    this.getUser();

    this.initialTheme = this._userPreferences.currentTheme;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private showNotificationModal(modalType: PopupEnum, message: string): void {
    this.dialog.open(NotificationModalComponent, {
      width: '400px',
      data: { modalType, message }
    });
  }

  public changeFullName(): void {
    const dialogRef = this.dialog.open(ChangeFullNameModalComponent, {
      data: {
        firstName: this.user.firstName,
        lastName: this.user.lastName
      },
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(result => {
        if (!result || !result.firstName || !result.lastName) {
          return;
        }

        const { firstName, lastName } = result;
        const data = {
          firstName,
          lastName,
          isUpdateTask: !this._settingsTask.isCompleted
        };

        this._authService.updateUserSettings(this.user._id, data)
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(
            response => {
              if (response.isUpdated) {
                this.showNotificationModal(
                  PopupEnum.Success,
                  this._localizationService.getTranslation('Full name has been updated')
                );
              }

              this.getUser();
            },
            response => this.showNotificationModal(PopupEnum.Error, response.error.message)
          );
      });
  }

  public changeEmail(): void {
    const dialogRef = this.dialog.open(ChangeEmailModalComponent, {
      data: {
        email: this.user.email
      },
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(result => {
        if (!result || !result.email) {
          return;
        }

        const { email } = result;
        const data = {
          email,
          isUpdateTask: !this._settingsTask.isCompleted
        };

        this._authService.updateUserSettings(this.user._id, data)
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(
            response => {
              if (response.isUpdated) {
                this.showNotificationModal(
                  PopupEnum.Success,
                  this._localizationService.getTranslation('Email has been updated')
                );
              }

              this.getUser();
            },
            response => this.showNotificationModal(PopupEnum.Error, response.error.message)
          );
      });
  }

  public changePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(result => {
        if (!result || !result.lastPassword || !result.newPassword) {
          return;
        }

        const { lastPassword, newPassword } = result;
        const data = {
          lastPassword,
          newPassword,
          isUpdateTask: !this._settingsTask.isCompleted
        };

        this._authService.updatePassword(this.user._id, data)
          .pipe(takeUntil(this._unsubscribe$))
          .subscribe(
            response => {
              if (response.isSuccessfully) {
                this.showNotificationModal(
                  PopupEnum.Success,
                  this._localizationService.getTranslation('Password has been updated')
                );
              }
            },
            response => this.showNotificationModal(PopupEnum.Error, response.error.message || response.error)
          );
      });
  }

  public changeCurrency(): void {
    const dialogRef = this.dialog.open(
      ChangeCurrencyModalComponent,
      {
        data: { from: this.user.currency, userId: this.user._id },
        width: '50vw',
        minHeight: '50vh'
      }
    );

    dialogRef.afterClosed()
      .pipe(
        filter(result => !!result),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(result => {
        this._currencyService.changeCurrency(result).subscribe(response => {
          const popupStatus = response.isUpdated ? PopupEnum.Success : PopupEnum.Error;
          const popupMessage = response.isUpdated
            ? 'Currency has been updated'
            : 'Currency has not been updated';

          this.showNotificationModal(popupStatus, this._localizationService.getTranslation(popupMessage));
        });
      });
  }

  public getUser(): void {
    this._authService.getUserById()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(response => {
        this.user = response.user;
        this._settingsTask = this.user.tasks.find(task => task.key === 'settings');
        this.joinedDate = moment(this.user.createdDate).format('DD MMMM YYYY');
        this._cdr.detectChanges();
      });
  }

  public toggleTheme(value: boolean): void {
    this._userPreferences.currentTheme = value
      ? Themes.Light
      : Themes.Dark;
  }
}
