import { Component, OnInit, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';

import { filter } from 'rxjs/operators';

import { TutorialService } from 'src/app/shared/services';

@Component({
  selector: 'app-tutorial-container',
  templateUrl: './tutorial-container.component.html',
  styleUrls: ['./tutorial-container.component.scss']
})
export class TutorialContainerComponent implements OnInit, AfterContentChecked {
  @ViewChild('tutorialTooltip') tutorialTooltip: ElementRef;

  private _tooltipTarget: HTMLElement;
  private _horizontalOffset = 15;

  public isThereActiveTooltip: boolean;
  public activeHelpTipId: number;

  constructor(
    private _tutorialService: TutorialService,
    private _hostElement: ElementRef
  ) {}

  ngOnInit() {
    this._tutorialService.activeHelpTipId.subscribe(helpTipId => {
      this.activeHelpTipId = helpTipId;
      this.isThereActiveTooltip = !!helpTipId;
    });

    this._tutorialService.activeTooltipTarget
      .pipe(filter(tooltipTarget => !!tooltipTarget))
      .subscribe(tooltipTarget => (this._tooltipTarget = tooltipTarget));
  }

  ngAfterContentChecked(): void {
    if (!this._tooltipTarget || !this.getOpenedTooltip()) {
      return;
    }

    this.setTooltipPosition();
  }

  private getOpenedTooltip(): any {
    return this._hostElement.nativeElement.querySelector('app-tutorial-tooltip');
  }

  private setTooltipPosition(): void {
    const tooltipElement = this.getOpenedTooltip();

    const documentClientRect = document.documentElement.getBoundingClientRect();
    const tooltipTargetClientRect = this._tooltipTarget.getBoundingClientRect();
    const tooltipClientRect = tooltipElement.getBoundingClientRect();

    const isThereHorizontalOverflow = (
      tooltipClientRect.width +
      tooltipTargetClientRect.left +
      tooltipTargetClientRect.width
    ) > documentClientRect.width;

    this._tooltipTarget.style.zIndex = '101';

    tooltipElement.style.top = `${tooltipTargetClientRect.top}px`;
    tooltipElement.style.left = isThereHorizontalOverflow
      ? `${tooltipTargetClientRect.left - tooltipClientRect.width - this._horizontalOffset}px`
      : `${tooltipTargetClientRect.left - this._horizontalOffset}px`;
  }
}
