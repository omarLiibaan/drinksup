import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {SettingsPageModule} from '../settings/settings.module';
import {RegisterPageModule} from '../register/register.module';
import {BarsPageModule} from '../bars/bars.module';
import {OffersPageModule} from '../offers/offers.module';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'bars',
                children: [
                    { path: '', loadChildren: '../bars/bars.module#BarsPageModule' },
                ]
            },
            {
                path: 'favorite',
                children: [
                    { path: '', loadChildren: '../favorite/favorite.module#FavoritePageModule' },
                ]
            },
            {
                path: 'profile',
                children: [
                    { path: '', loadChildren: '../profile/profile.module#ProfilePageModule' },
                ]
            },
            {
                path: 'bar-user/:id',
                children: [
                    { path: '', loadChildren: '../bar-user/bar-user.module#BarUserPageModule' },
                ]
            },
        ]
    },
    {
        path: '',
        redirectTo: '/tabs',
        pathMatch: 'full'
    }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffersPageModule,
    BarsPageModule,
    SettingsPageModule,
    RegisterPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}

