import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UserPreferencesService } from '../../services/user-preferences.service';
import { Themes } from '../../enums';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements OnInit {
  public toggleControl = new FormControl(true);

  constructor(
    private _userPreferences: UserPreferencesService
  ) {}

  ngOnInit() {
    this.toggleControl.valueChanges.subscribe(newValue => {
      this._userPreferences.currentTheme = newValue ? Themes.Light : Themes.Dark;
    });
  }

}
