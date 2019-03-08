import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OffersAddbarPage } from './offers-addbar.page';

const routes: Routes = [
  {
    path: '',
    component: OffersAddbarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OffersAddbarPage]
})
export class OffersAddbarPageModule {}
