import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule} from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Facebook} from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { UsersPageModule } from '../pages/users/users.module';
import { ModalPageModule } from '../pages/modal/modal.module';
import { Camera } from '@ionic-native/camera/ngx';
import { ModalbarAdminPageModule } from '../pages/modalbar-admin/modalbar-admin.module';
import { ModalSchedulePageModule } from '../pages/modal-schedule/modal-schedule.module';
import { LoadingpagePageModule } from '../pages/loadingpage/loadingpage.module';
import {OffersAddbarPageModule} from '../pages/offers-addbar/offers-addbar.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, UsersPageModule, ModalPageModule, ModalbarAdminPageModule, ModalSchedulePageModule, LoadingpagePageModule, OffersAddbarPageModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
