import { Directive, OnDestroy, OnChanges, AfterViewInit, ElementRef, Input } from '@angular/core';

import { Subject } from 'rxjs';

import { TutorialService } from './../services/tutorial.service';

@Directive({
  selector: '[appTooltipTarget]'
})
export class TooltipTargetDirective implements OnChanges, AfterViewInit, OnDestroy {
  @Input() helpTipId: number;
  @Input() expectedHelpTipId: number;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _elementRef: ElementRef,
    private _tutorialService: TutorialService
  ) {}

  ngAfterViewInit(): void {
    this.registerTarget();
  }

  ngOnChanges(): void {
    this.registerTarget();
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  private registerTarget(): void {
    if (!this.helpTipId || !this.expectedHelpTipId || this.expectedHelpTipId !== this.helpTipId) {
      return;
    }

    this._tutorialService.registerTooltipTarget(this._elementRef.nativeElement);
  }
}
