import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  public activeHelpTipId = new BehaviorSubject<number>(null);
  public activeTooltipTarget = new BehaviorSubject<HTMLElement>(null);
  public tooltipElement: HTMLElement;

  public registerTooltipTarget(tooltipTargetElement: HTMLElement): void {
    if (!tooltipTargetElement) {
      return;
    }

    this.activeTooltipTarget.next(tooltipTargetElement);
  }
}
