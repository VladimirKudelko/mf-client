import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';

import { SidebarService, AuthService } from 'src/app/shared/services';
import { User, Task } from 'src/app/shared/models';
import { ChangeEmailModalComponent } from 'src/app/shared/components/modals/change-email/change-email.component';
import { ChangeFullNameModalComponent } from 'src/app/shared/components/modals/change-full-name/change-full-name.component';
import { ChangePasswordModalComponent } from 'src/app/shared/components/modals/change-password/change-password.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public user: User;
  public joinedDate: any;

  private _settingsTask: Task;

  constructor(
    private _sidebarService: SidebarService,
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this._sidebarService.show();
    this.getUser();
  }

  public changeFullName() {
    const dialogRef = this.dialog.open(ChangeFullNameModalComponent, {
      data: {
        firstName: this.user.firstName,
        lastName: this.user.lastName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      const { firstName, lastName } = result;

      if (!result || !firstName || !lastName) {
        return;
      }

      this._authService.updateUserSettings(this.user._id, {
        firstName,
        lastName,
        isUpdateTask: !this._settingsTask.isCompleted
      }).subscribe(response => this.getUser());
    });
  }

  public changeEmail() {
    const dialogRef = this.dialog.open(ChangeEmailModalComponent, {
      data: { email: this.user.email },
    });

    dialogRef.afterClosed().subscribe(result => {
      const { email } = result;

      if (!result || !email) {
        return;
      }

      const data = {
        email,
        isUpdateTask: !this._settingsTask.isCompleted
      };

      this._authService.updateUserSettings(this.user._id, data)
        .subscribe(response => this.getUser());
    });
  }

  public changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      const { lastPassword, newPassword } = result;

      if (!result || !lastPassword || !newPassword) {
        return;
      }

      const data = {
        lastPassword,
        newPassword,
        isUpdateTask: !this._settingsTask.isCompleted
      };

      this._authService.updatePassword(this.user._id, data).subscribe();
    });
  }

  public getUser() {
    this._authService.getUserById().subscribe(response => {
      this.user = response.user;
      this._settingsTask = this.user.tasks.find(task => task.key === 'settings');
      this.joinedDate = moment(this.user.createdDate).format('DD MMMM YYYY');
      this._cdr.detectChanges();
    });
  }
}
