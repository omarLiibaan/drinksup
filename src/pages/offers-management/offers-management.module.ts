import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OffersManagementPage } from './offers-management.page';

const routes: Routes = [
  {
    path: '',
    component: OffersManagementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OffersManagementPage]
})
export class OffersManagementPageModule {}
