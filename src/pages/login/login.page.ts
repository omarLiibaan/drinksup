import { Component, OnInit } from '@angular/core';
import {Facebook, FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import {NavController, ToastController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    userData: any;
    loginForm: FormGroup;
    registerEmail: FormGroup;
    baseURI = 'https://macfi.ch/serveur/';
    regURL = 'https://www.futurae-ge.ch/ionic-phpmailer.php';
    userDetails : any;
    users = [];  
    emailExist : boolean = false;
    emailExistReg : boolean = false;
    pushedUserArray : any = [];

    //---------------------------
    roleUser = 'user';
    roleAdmin = 'admin';
    roleProprio = 'proprio';

    //----------------------------
    activeSignUp = "none";
    activeSignIn = "block";

    constructor(private route: Router, private formBuilder: FormBuilder, private navCtrl: NavController, private fb: Facebook, private googlePlus : GooglePlus, private toastCtrl: ToastController, public http: HttpClient, private storage: Storage) {
        this.loginForm = new FormGroup({
            PRO_EMAIL: new FormControl(),
            PRO_PASSWORD: new FormControl(),
        });

        this.registerEmail = new FormGroup({
            REG_EMAIL : new FormControl()
        });

        this.validationForm();
    }

    ngOnInit() {
        this.getUsers();
        this.activeSignUp = "none";
        this.activeSignIn = "block";
        document.getElementById("siId").className = "signin active"
        document.getElementById("suId").className = "signup"
    }
    
    validationForm() {
        this.loginForm = this.formBuilder.group({
            'PRO_EMAIL': ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
            'PRO_PASSWORD': ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });

        this.registerEmail = this.formBuilder.group({
            'REG_EMAIL': ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])]
        });
    }


    formRegister() {
        this.navCtrl.navigateForward('register');
    }

    loginWithFB() {
        this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
            this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                // this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
                console.log(profile);
            });
        });
    }

    getUsers() {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
              options: any		= { 'key' : 'get_all_users'},
              url: any      	= this.baseURI + 'aksi.php';
        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
            this.users = data;   
        });
    }

    loginWithGoogle() {
        this.googlePlus.login({})
        .then(res => {

          //Check if address mail logged from google exist in the database
            for(var i = 0; i < this.users.length; i++) {
                this.pushedUserArray.push(this.users[i].INT_EMAIL);
            }
        
            if(this.pushedUserArray.indexOf(res.email) > -1){
                this.emailExist = true;
                console.log("address mail exist already!");
            }else{
                this.emailExist = false;
                console.log("address mail ready!");
            }
            //If email exists then user is accepted and must be logged in
            if(this.emailExist){
                this.LoginForGoogleUser(res.email);
            }else{
            // else it should be registered
                this.registerFromGoogle(res.email, res.givenName, res.familyName);
                setTimeout(() => {
                    this.LoginForGoogleUser(res.email);
                }, 500);   
            }

          })
        .catch(err => console.error(err));    
    }

    LoginForUsers(PRO_EMAIL: string, PRO_PASSWORD: string) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'seLoguerUser', 'PRO_EMAIL' : PRO_EMAIL, 'PRO_PASSWORD' : PRO_PASSWORD},
            url: any      	= this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) =>
            {
                
                this.userDetails = data;
                this.storage.set('SessionIdKey', this.userDetails.ID);
                this.storage.set('SessionEmailKey', this.userDetails.EMAIL);
                this.storage.set('SessionInKey', 'Yes');
                if (this.userDetails.ROLE === this.roleAdmin) {
                    this.navCtrl.navigateRoot('/tabsadmin/users');
                    this.storage.set('SessionRoleKey', this.roleAdmin);
                    this.sendNotification('Bienvenue !');
                    setTimeout( () => {this.loginForm.reset();}, 1000);  
                } else if (this.userDetails.ROLE === this.roleProprio) {
                    this.navCtrl.navigateRoot('/tabsproprio/qrcode');
                    this.storage.set('SessionRoleKey', this.roleProprio);
                    this.sendNotification('Bienvenue !');
                    setTimeout( () => {this.loginForm.reset();}, 1000);  
                } else if (this.userDetails.ROLE === this.roleUser) {
                    this.navCtrl.navigateRoot('/tabs/bars');
                    this.storage.set('SessionRoleKey', this.roleUser);
                    this.sendNotification('Bienvenue !');
                    setTimeout( () => {this.loginForm.reset();}, 1000);  
                } else {
                    // console.log(JSON.stringify(options));
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

    LoginForGoogleUser(PRO_EMAIL: string) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'seLoguerUserGoogle', 'PRO_EMAIL' : PRO_EMAIL},
            url: any      	= this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) =>
            {
                
                this.userDetails = data;
                console.log(this.userDetails);
                this.storage.set('SessionIdKey', this.userDetails.ID);
                this.storage.set('SessionEmailKey', this.userDetails.EMAIL);
                this.storage.set('SessionInKey', 'Yes');
                if (this.userDetails.ROLE === this.roleAdmin) {
                    this.navCtrl.navigateRoot('/tabsadmin/users');
                    this.storage.set('SessionRoleKey', this.roleAdmin);
                    this.sendNotification('Bienvenue !');
                } else if (this.userDetails.ROLE === this.roleProprio) {
                    this.navCtrl.navigateRoot('/tabsproprio/qrcode');
                    this.storage.set('SessionRoleKey', this.roleProprio);
                    this.sendNotification('Bienvenue !');
                } else if (this.userDetails.ROLE === this.roleUser) {
                    this.navCtrl.navigateRoot('/tabs/bars');
                    this.storage.set('SessionRoleKey', this.roleUser);
                    this.sendNotification('Bienvenue !'); 
                } else {
                    // console.log(JSON.stringify(options));
                    this.sendNotification('Votre adresse Google+ a été déjà utilisé via inscription native de Drinks Up. Si vous ne vous souvenez plus de votre mot de passe. Veuillez cliquer sur "Mot de passe oublié"');
                }
            },
            (error: any) => {
                console.log(error);
                this.sendNotification('Erreur!');
            });
    }

    registerFromGoogle(param_email: string, param_firstname: string, param_name: string) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'registerFromGoogle', 'email' : param_email, 'firstname' : param_firstname, 'name' : param_name},
            url: any      	= this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) =>
            {
                console.log("Registered !");
            },
            (error: any) => {
                console.log(error);
            });
    }

    proceedReg(){
        if(this.emailExistReg){
            this.sendNotification("L'adresse e-mail existe déjà");
        }else{
            this.confirmThenRegister();
            this.sendNotification("Un mail de confirmation vous a été envoyé");
        }
    }

    confirmThenRegister() {
        const email : string = this.registerEmail.controls['REG_EMAIL'].value;
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
              options: any		= { 'email' : email},
              url: any      	= this.regURL;

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) =>
            {
                console.log(data);
            },
            (error: any) => {
                console.log(error);
            });
    }

    ionViewWillEnter(){
        this.activeSignUp = "none";
        this.activeSignIn = "block";
        document.getElementById("siId").className = "signin active"
        document.getElementById("suId").className = "signup"
    }

    checkEmailIfExist(){
        const REG_EMAIL: string = this.registerEmail.controls['REG_EMAIL'].value;
      
        for(var i = 0; i < this.users.length; i++) {
            this.pushedUserArray.push(this.users[i].INT_EMAIL);
        }

        if(this.pushedUserArray.indexOf(REG_EMAIL) > -1){
            this.emailExistReg = true;
            console.log("address mail exist already!");
        }else{
            this.emailExistReg = false;
            console.log("address mail ready!");
        }
    }

    activeSI(){
        this.activeSignUp = "none";
        this.activeSignIn = "block";
        document.getElementById("siId").className = "signin active"
        document.getElementById("suId").className = "signup"
    }

    activeSU(){
        this.activeSignUp = "block";
        this.activeSignIn = "none";
        document.getElementById("suId").className = "signup active"
        document.getElementById("siId").className = "signin"
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
