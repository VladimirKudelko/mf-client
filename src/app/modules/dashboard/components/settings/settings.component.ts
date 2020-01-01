import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';

import { SidebarService, AuthService } from 'src/app/shared/services';
import { User, Task } from 'src/app/shared/models';
import {
  ChangeEmailModalComponent,
  ChangeFullNameModalComponent,
  ChangePasswordModalComponent,
  NotificationModalComponent
} from 'src/app/shared/components/modals';
import { PopupEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private _settingsTask: Task;

  public user: User;
  public joinedDate: string;

  constructor(
    private _sidebarService: SidebarService,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._sidebarService.show();
    this.getUser();
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

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.firstName || !result.lastName) {
        return;
      }

      const { firstName, lastName } = result;
      const data = {
        firstName,
        lastName,
        isUpdateTask: !this._settingsTask.isCompleted
      };

      this._authService.updateUserSettings(this.user._id, data).subscribe(
        response => {
          if (response.isUpdated) {
            this.showNotificationModal(PopupEnum.Success, 'Full name is updated');
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

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.email) {
        return;
      }

      const { email } = result;
      const data = {
        email,
        isUpdateTask: !this._settingsTask.isCompleted
      };

      this._authService.updateUserSettings(this.user._id, data).subscribe(
        response => {
          if (response.isUpdated) {
            this.showNotificationModal(PopupEnum.Success, 'Email is updated');
          }

          this.getUser();
        },
        response => this.showNotificationModal(PopupEnum.Error, response.error.message)
      );
    });
  }

  public changePassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.lastPassword || !result.newPassword) {
        return;
      }

      const { lastPassword, newPassword } = result;
      const data = {
        lastPassword,
        newPassword,
        isUpdateTask: !this._settingsTask.isCompleted
      };

      this._authService.updatePassword(this.user._id, data).subscribe(
        response => {
          if (response.isSuccessfully) {
            this.showNotificationModal(PopupEnum.Success, 'Password has been updated');
          }
        },
        response => this.showNotificationModal(PopupEnum.Error, response.error.message || response.error)
      );
    });
  }

  public getUser(): void {
    this._authService.getUserById().subscribe(response => {
      this.user = response.user;
      this._settingsTask = this.user.tasks.find(task => task.key === 'settings');
      this.joinedDate = moment(this.user.createdDate).format('DD MMMM YYYY');
      this._cdr.detectChanges();
    });
  }
}
