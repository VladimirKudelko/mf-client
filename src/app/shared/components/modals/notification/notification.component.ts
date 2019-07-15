import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PopupEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modalType: PopupEnum, message: string }
  ) { }

  get modalClasses() {
    return {
      'modal--error': this.data.modalType === PopupEnum.Error,
      'modal--warning': this.data.modalType === PopupEnum.Warning,
      'modal--success': this.data.modalType === PopupEnum.Success
    };
  }

  public closeModal(): void {
    this.dialogRef.close();
  }
}
