import { Component, OnInit } from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {NavController, ToastController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    userData: any;
    public loginForm: FormGroup;
    public baseURI = 'http://localhost/drinksupProject/serveur/';
    roleUser = 'user';
    roleAdmin = 'admin';
    roleProprio = 'proprio';

    constructor(private route: Router, private formBuilder: FormBuilder, private navCtrl: NavController, private fb: Facebook, private toastCtrl: ToastController, public http: HttpClient) {
        this.loginForm = new FormGroup({
            PRO_EMAIL: new FormControl(),
            PRO_PASSWORD: new FormControl(),
        });
        this.validationForm();
    }
    validationForm() {
        this.loginForm = this.formBuilder.group({
            'PRO_EMAIL': ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
            'PRO_PASSWORD': ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    ngOnInit() {
    }
    formRegister() {
        this.navCtrl.navigateForward('register');
    }

    loginWithFB() {
        this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
            this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
            });
        });
    }

    LoginForUsers(PRO_EMAIL: string, PRO_PASSWORD: string) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'seLoguerUser', 'PRO_EMAIL' : PRO_EMAIL, 'PRO_PASSWORD' : PRO_PASSWORD},
            url: any      	= this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) =>
            {
                console.log(data);
                if (data === this.roleAdmin) {
                    this.navTabs('/tabsadmin/users');
                    this.sendNotification('Bienvenue !');
                } else if (data === this.roleProprio) {
                    this.navTabs('/tabsproprio/bar');
                    this.sendNotification('Bienvenue !');
                } else if (data === this.roleUser) {
                    this.navTabs('/tabs/offers');
                    this.sendNotification('Bienvenue !');
                } else {
                    console.log(JSON.stringify(options));
                    this.sendNotification('Email ou mot de passe erroné');
                }
            },
            (error: any) => {
                console.log(error);
                this.sendNotification('Erreur!');
            });
    }

    loginUsers() {
        const PRO_EMAIL: string = this.loginForm.controls['PRO_EMAIL'].value,
            PRO_PASSWORD: string = this.loginForm.controls['PRO_PASSWORD'].value;
        this.LoginForUsers(PRO_EMAIL, PRO_PASSWORD);
    }
    async sendNotification(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    async navTabs(msg: string) {
        this.route.navigateByUrl(msg);
    }


}
