import { Component, OnInit } from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {NavController, LoadingController} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    userData: any;
  constructor(private navCtrl: NavController, private fb: Facebook, private nativeStorage: NativeStorage, private loadingController: LoadingController ) { }

  ngOnInit() {
  }
  formRegister() {
    this.navCtrl.navigateForward('register');
  }
  loginWithFB() {
    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
            this.fb.api('me?fields=id,name,email,password,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
            });
        });

    }


}
