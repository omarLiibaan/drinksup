import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' },
    { path: 'register/:email', loadChildren: '../pages/register/register.module#RegisterPageModule' },
    { path: 'settings', loadChildren: '../pages/settings/settings.module#SettingsPageModule' },
    { path: 'tabs', loadChildren: '../pages/tabs/tabs.module#TabsPageModule' },
    { path: 'tabsadmin', loadChildren: '../pages/tabsadmin/tabsadmin.module#TabsadminPageModule' },
    { path: 'tabsproprio', loadChildren: '../pages/tabsproprio/tabsproprio.module#TabsproprioPageModule' },
    { path: 'faq', loadChildren: '../pages/faq/faq.module#FaqPageModule' },
    { path: 'abonnement', loadChildren: '../pages/abonnement/abonnement.module#AbonnementPageModule' }




    // { path: 'tabs/offers', loadChildren: '../pages/offers/offers.module#OffersPageModule' },
    // { path: 'tabsadmin/users', loadChildren: '../pages/users/users.module#UsersPageModule' },
    // { path: 'tabsproprio/bar', loadChildren: '../pages/bar/bar.module#BarPageModule' },
    // { path: 'bar-user/:id', loadChildren: '../pages/bar-user/bar-user.module#BarUserPageModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
