import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from 'src/app/shared/modules/app-material/app-material.module';
import { LoaderComponent } from '../../components/loader/loader.component';
import { TutorialTooltipComponent } from '../../components/tutorial-tooltip/tutorial-tooltip.component';
import { TooltipTargetDirective } from '../../directives/tooltip-target.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    TutorialTooltipComponent,
    TooltipTargetDirective
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    LoaderComponent,
    TutorialTooltipComponent,
    TooltipTargetDirective
  ]
})
export class SharedModule {}
