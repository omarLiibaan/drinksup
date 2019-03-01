import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', loadChildren: '../pages/tabs/tabs.module#TabsPageModule' },
  { path: 'tabsadmin', loadChildren: '../pages/tabsadmin/tabsadmin.module#TabsadminPageModule' },
  { path: 'tabsproprio', loadChildren: '../pages/tabsproprio/tabsproprio.module#TabsproprioPageModule' },
  { path: 'login', loadChildren: '../pages/login/login.module#LoginPageModule' },
  { path: 'tabs/offers', loadChildren: '../pages/offers/offers.module#OffersPageModule' },
  { path: 'tabsadmin/users', loadChildren: '../pages/users/users.module#UsersPageModule' },
  { path: 'tabsproprio/bar', loadChildren: '../pages/bar/bar.module#BarPageModule' },
  { path: 'register', loadChildren: '../pages/register/register.module#RegisterPageModule' },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
