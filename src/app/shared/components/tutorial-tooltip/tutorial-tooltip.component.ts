import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { TutorialService } from 'src/app/shared/services';
import { helpTips } from '../../constants/tutorial-help-tips';
import { HelpTip } from './../../models/helptip';
import { fadeIn } from '../../animations/fade-in.animations';

@Component({
  selector: 'app-tutorial-tooltip',
  templateUrl: './tutorial-tooltip.component.html',
  styleUrls: ['./tutorial-tooltip.component.scss'],
  animations: [fadeIn]
})
export class TutorialTooltipComponent implements OnInit {
  @Input() helpTipId: number;
  @Input() isShowArrowLeft = true;

  @HostBinding('@fadeIn')

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
