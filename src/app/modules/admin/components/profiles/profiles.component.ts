import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moment from 'moment';

import { ProfileService } from 'src/app/shared/services';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';
import { TransactionsListModalComponent } from 'src/app/shared/components/modals/transactions-list-modal/transactions-list-modal.component';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilesComponent implements OnInit {
  public displayedColumns: string[] = ['Full Name', 'email', 'createdDate', 'role', 'transactions', '_id'];
  public dataSource: MatTableDataSource<User>;
  public faTrashAlt = faTrashAlt;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _profileService: ProfileService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  public fetchUsers(): void {
    this._profileService.getAll()
      .pipe(
        map(response => {
          return response.users.map((user: { createdDate: moment.MomentInput; }) => {
            user.createdDate = moment(user.createdDate).format('YYYY-MM-DD');

            return user;
          });
        }),
        catchError(() => of([]))
      )
      .subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this._cdr.detectChanges();
      });
  }

  public deleteProfile(id: string): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this._profileService.deleteProfile(id).subscribe(response => {
        if (response.isDeleted) {
          this.fetchUsers();
        }
      });
    });
  }

  public showTransactions(userId: string): void {
    this.dialog.open(TransactionsListModalComponent,
      {
        data: { userId },
        width: '100vw',
        height: '80vh'
      }
    );
  }
}
