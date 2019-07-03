import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatRadioModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatListModule,
  MatExpansionModule,
  MatSortModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class AppMaterialModule { }
