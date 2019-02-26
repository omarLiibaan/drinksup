import { Component, ViewChild } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage} from '@ionic/storage';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  @ViewChild('content') nav: NavController;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      
      setTimeout(() => {
        this.splashScreen.hide();
      }, 2500);
    });

    // this.storage.get('session_storage').then((res) => {
    //   if (res == null) {
    //     this.router.navigate(['login']);
    //   } else {
    //     this.router.navigate(['home']);
    //   }
    // });
  }
}
