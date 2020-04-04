import { Component, OnInit, Input } from '@angular/core';

import { TutorialService } from 'src/app/shared/services';
import { helpTips } from '../../constants/tutorial-help-tips';
import { HelpTip } from './../../models/helptip';

@Component({
  selector: 'app-tutorial-tooltip',
  templateUrl: './tutorial-tooltip.component.html',
  styleUrls: ['./tutorial-tooltip.component.scss']
})
export class TutorialTooltipComponent implements OnInit {
  @Input() helpTipId: number;

  public activeHelpTip: HelpTip;

  constructor(
    private _tutorialService: TutorialService
  ) {}

  ngOnInit() {
    if (!this.helpTipId) {
      return;
    }

    this.activeHelpTip = helpTips.find(helpTip => helpTip.id === this.helpTipId);
  }

  public closeTooltip(): void {
    this._tutorialService.activeHelpTipId.next(null);
  }
}
