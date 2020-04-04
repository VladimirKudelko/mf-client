import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SidebarService, LoaderService, LocalizationService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  public isShowSidebar: boolean;
  public isLoading: boolean;

  constructor(
    private _loaderService: LoaderService,
    public _sidebarService: SidebarService,
    private _localizationService: LocalizationService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._localizationService.initialize();

    this._loaderService.loaderState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => {
        this.isLoading = state.isShow;
        this._cdr.detectChanges();
      });

    this._sidebarService.sidebarState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => {
        this.isShowSidebar = state.isShow;
        this._cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
