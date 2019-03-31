import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private _sidebarService: SidebarService,
  ) {}

  ngOnInit() {
    this._sidebarService.show();
  }

}
