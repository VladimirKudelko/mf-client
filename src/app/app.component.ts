import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderState, SidebarState } from './shared/models';
import { SidebarService, LoaderService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  public isShowSidebar = false;
  public isLoading;

  private _loaderSubscription: Subscription;
  // private _sidebarSubscription: Subscription;

  constructor(
    private _loaderService: LoaderService,
    private _cdr: ChangeDetectorRef
    // private _sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this._loaderSubscription = this._loaderService.loaderState$
      .subscribe((state: LoaderState) => {
        this.isLoading = state.show;
        this._cdr.detectChanges();
      });
    // this._sidebarSubscription = this._sidebarService.sidebarState$
    //   .subscribe((state: SidebarState) => this.isShowSidebar = state.show);
  }

  ngOnDestroy() {
    this._loaderSubscription.unsubscribe();
    // this._sidebarSubscription.unsubscribe();
  }
}
