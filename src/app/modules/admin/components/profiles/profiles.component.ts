import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrashAlt, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

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

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _profileService: ProfileService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  private deleteProfile(userId: string): void {
    this._profileService
      .deleteProfile(userId)
      .pipe(filter(response => response.isDeleted))
      .subscribe(() => this.fetchUsers());
  }

  public fetchUsers(): void {
    this._profileService.getAll()
      .subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this._cdr.detectChanges();
      });
  }

  public openDeleteProfileDialog(id: string): void {
    this.dialog
      .open(ConfirmationModalComponent)
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => this.deleteProfile(id));
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
