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
  public isShowSidebar;
  public isLoading;

  private _loaderSubscription: Subscription;
  private _sidebarSubscription: Subscription;

  constructor(
    private _loaderService: LoaderService,
    private _sidebarService: SidebarService,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._loaderSubscription = this._loaderService.loaderState$
      .subscribe((state: LoaderState) => {
        this.isLoading = state.show;
        this._cdr.detectChanges();
      });
    this._sidebarSubscription = this._sidebarService.sidebarState$
      .subscribe((state: SidebarState) => {
        this.isShowSidebar = state.show;
        this._cdr.detectChanges();
      });
  }

  get getSidebarClasses() {
    return {
      'content--without-sidebar': !this.isShowSidebar
    };
  }

  ngOnDestroy() {
    this._loaderSubscription.unsubscribe();
    this._sidebarSubscription.unsubscribe();
  }
}
