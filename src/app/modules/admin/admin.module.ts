import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminRoutingModule } from './admin-routing.module';
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class AdminModule { }
