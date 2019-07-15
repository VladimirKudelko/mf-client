import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as modalComponents from '../../components/modals';
import { AppMaterialModule } from '../app-material/app-material.module';

@NgModule({
  declarations: [ Object.values(modalComponents) ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [ Object.values(modalComponents) ],
  entryComponents: [ Object.values(modalComponents) ]
})
export class MaterialModalsModule { }
