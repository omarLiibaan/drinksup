import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalChangeUserphotoPage } from './modal-change-userphoto.page';

const routes: Routes = [
  {
    path: '',
    component: ModalChangeUserphotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalChangeUserphotoPage]
})
export class ModalChangeUserphotoPageModule {}
