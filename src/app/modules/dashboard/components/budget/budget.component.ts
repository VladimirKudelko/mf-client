import { Component, OnInit } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { SidebarService } from 'src/app/shared/services';
import { MatDialog } from '@angular/material';
import { AddBudgetModalComponent } from 'src/app/shared/components/modals';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  public faInfoCircle = faInfoCircle;

  constructor(
    private _dialog: MatDialog,
    private _sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this._sidebarService.show();
  }

  public addBudget(): void {
    this._dialog
      .open(AddBudgetModalComponent, {
        minWidth: '750px',
        data: { }
      })
      .afterClosed()
      .subscribe(result => {
        console.log('result: ', result);
      });
  }
}
