import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminRoutingModule } from './admin-routing.module';
import { AppMaterialModule } from 'src/app/shared/modules/app-material/app-material.module';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { DynamicPipe } from 'src/app/shared/pipes/dynamic.pipe';

@NgModule({
  declarations: [
    ProfilesComponent,
    DynamicPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppMaterialModule,
    FontAwesomeModule
  ]
})
export class AdminModule { }
