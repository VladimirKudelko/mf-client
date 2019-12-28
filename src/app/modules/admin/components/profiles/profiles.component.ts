import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { faTrashAlt, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

import { ProfileService, AuthService } from 'src/app/shared/services';
import { ConfirmationModalComponent, TransactionsListModalComponent } from 'src/app/shared/components/modals';
import { User } from 'src/app/shared/models';
import { DISPLAYED_COLUMNS } from '../../constants';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilesComponent implements OnInit {
  public displayedColumns = DISPLAYED_COLUMNS;
  public dataSource: MatTableDataSource<User>;
  public pageSizeOptions: number[] = [5, 10, 25, 100];
  public pageSize = 5;
  public faTrashAlt = faTrashAlt;
  public faDoorOpen = faDoorOpen;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _profileService: ProfileService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  public fetchUsers(): void {
    this._profileService.getAll()
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.users);
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
        data: { userId, isShowSelect: true },
        width: '100vw',
        height: '80vh'
      }
    );
  }

  public logout(): void {
    this._authService.logout();
  }
}
