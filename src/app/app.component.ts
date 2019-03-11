import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoaderService } from './shared/services/loader.service';
import { Subscription } from 'rxjs';
import { LoaderState } from './shared/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isShowSidebar = false;
  public isLoading = false;

  private _subscription: Subscription;

  constructor(
    private _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this._subscription = this._loaderService.loaderState
      .subscribe((state: LoaderState) => this.isLoading = state.show);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
