import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalChangePhotosPage } from './modal-change-photos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalChangePhotosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalChangePhotosPage]
})
export class ModalChangePhotosPageModule {}
