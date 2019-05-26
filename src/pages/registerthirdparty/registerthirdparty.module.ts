import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterthirdpartyPage } from './registerthirdparty.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterthirdpartyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterthirdpartyPage]
})
export class RegisterthirdpartyPageModule {}
