import { RegisterPage } from './../pages/register/register.page';
import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { matches } from '@ionic/core/dist/types/components/nav/view-controller';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  userSessionRole : string;
  roleUser = 'user';
  roleAdmin = 'admin';
  roleProprio = 'proprio';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private navCtrl : NavController,
    private deepLinks: Deeplinks
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      this.deepLinks.routeWithNavController(this.navCtrl,{
        '/register': RegisterPage
      }).subscribe((match) =>{
        const email = JSON.stringify(match.$args.email);
        this.navCtrl.navigateForward('register/'+email);
        

        },(nomatch)=>{

      });
      
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1800);

      this.storage.get('SessionInKey').then((val) => {
        this.storage.get('SessionRoleKey').then((valRole) => {
            this.userSessionRole = valRole;

            if(val=='Yes' && this.userSessionRole == this.roleAdmin){
                this.navCtrl.navigateRoot('/tabsadmin/users');
                // this.router.navigateByUrl('/tabsadmin/users');
            }else if(val=='Yes' && this.userSessionRole == this.roleProprio){
                this.navCtrl.navigateRoot('/tabsproprio/bar');
                // this.router.navigateByUrl('/tabsproprio/bar');
            }else if(val=='Yes' && this.userSessionRole == this.roleUser){
                this.navCtrl.navigateRoot('/tabs/offers');
                // this.router.navigateByUrl('/tabs/offers');
            }else if(val == undefined || val == null || val == "" || this.userSessionRole == "" || this.userSessionRole == null || this.userSessionRole == undefined){
              this.navCtrl.navigateRoot('/login');
            }else{
              this.navCtrl.navigateRoot('/login');
            }
        });
      });


    });

  }
}
