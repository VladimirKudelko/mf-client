import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Subscription } from 'rxjs';

import { SidebarService, LoaderService, LocalizationService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private _loaderSubscription: Subscription;
  private _sidebarSubscription: Subscription;

  public isShowSidebar: boolean;
  public isLoading: boolean;

  constructor(
    private _loaderService: LoaderService,
    private _sidebarService: SidebarService,
    private _localizationService: LocalizationService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._localizationService.initialize();

    // TODO: takeUntil
    // TODO: | async
    this._loaderSubscription = this._loaderService.loaderState$
      .subscribe(state => {
        this.isLoading = state.isShow;
        this._cdr.detectChanges();
      });
    this._sidebarSubscription = this._sidebarService.sidebarState$
      .subscribe(state => {
        this.isShowSidebar = state.isShow;
        this._cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this._loaderSubscription.unsubscribe();
    this._sidebarSubscription.unsubscribe();
  }
}
