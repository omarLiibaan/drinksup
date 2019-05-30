import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as moment from 'moment';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalChangeUserphotoPage } from '../modal-change-userphoto/modal-change-userphoto.page'
import { LoadingpagePage } from '../loadingpage/loadingpage.page'


@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    loggedUser : any = {};
    baseURI = 'https://macfi.ch/serveur/';
    userPhotoURI = 'https://www.macfi.ch/serveur/userphotos/';

    roleUser = 'user';
    roleAdmin = 'admin';
    roleProprio = 'proprio';
    profilePic : string;
    defaultPic : string = "../../assets/img/user-icon.svg";
    userSessionRole : string;
    paidUser : string;
    data: any;
    dateInscription = '';
    loadHeight : string = "100%";
    loadSlide : string = "translateX(0px)";
    idInternaute: number;
    constructor(private modalCtrl : ModalController,private emailComposer: EmailComposer, private googlePlus : GooglePlus, private route: Router, public navCtrl : NavController, public storage: Storage, private http : HttpClient, private platform : Platform) {
        // setTimeout(() => {
        //     this.loadSlide = "translateX(160px)";
        // }, 1000);
        setTimeout(() => {
            this.loadHeight = "0%";
        }, 1000);
    }
    ngOnInit() {}

    ionViewWillEnter(){
        moment.locale('fr');

        this.storage.get('SessionIdKey').then((val) => {
            this.loadData(val);
            this.getPaidUser(val);
        });        
    }

    loadData(idSession : string){
        let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json'}),
            options 	: any		= {"key" : "getUsersById", "idSession" : idSession},
            url       : any   = this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
            {
                this.loggedUser = data;
                this.dateInscription = moment(this.loggedUser.INT_DATEINSCRIPTION, "YYYYMMDD").fromNow();
                this.idInternaute = this.loggedUser.INT_ID;

                //User Picture
                var random = Math.floor(Math.random() * 10000);
                this.profilePic = this.userPhotoURI+this.loggedUser.INT_EMAIL+"_photo.jpg?random="+random;
            },
            (error : any) =>
            {
                console.dir(error);
            });
    }

    getPaidUser(id : string) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'getPaidUser', 'idUser': id},
            url: any      	= this.baseURI + 'aksi.php';
      
        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
              console.log(data);
              this.paidUser = data.validity;
            },  
            (error: any) => {
                console.log(error);
            });
      }

    logoutFromApp(){
        this.storage.remove("SessionInKey");
        this.storage.remove("SessionRoleKey");
        this.storage.remove("SessionEmailKey");
        this.storage.remove("SessionIdKey");
        this.googlePlus.logout().then(res => {console.log(res);}).catch(err => console.error(err));
        this.navCtrl.navigateRoot('login');
    }

    async changerPhoto(useremail : string){
        const modal = await this.modalCtrl.create( {
            component: ModalChangeUserphotoPage,
            cssClass: "edit-profilepic-modal",
            showBackdrop : true,
            componentProps: {
                email : useremail
            },
        });
        modal.onDidDismiss().then((data) => {
            if(data.data.uploaded == "Yes"){
                this.loadingModal();//open loading modal
            }else{
                console.log("Just an oridnary cancellation");
            }
        })
        modal.present();
    }

    async loadingModal() {
        const modal = await this.modalCtrl.create( {
            component: LoadingpagePage,
            cssClass: "loading-modal",
            showBackdrop : true,
            componentProps: {},
        });
        modal.present();
        setTimeout(() => {
          modal.dismiss();
        }, 6000);
        modal.onDidDismiss().then(() => {
            this.ionViewWillEnter();
        });
      }

    async navTabs(msg: string) {
        this.route.navigateByUrl(msg);
    }

    goSetting(){
        console.log('salut ' + this.idInternaute);
        this.navTabs('/settings');
    }


    goFaq(){
        console.log('salut');
        this.navTabs('/faq');
    }
    goAbonnement(){
        this.navTabs('/abonnement');
    }
    sendEmail(){

        const email = {
            to: 'admin@drinksup.ch',
            subject: 'Drinks up contact',
            body: '',
            isHtml: true
        };

// Send a text message using default options
        this.emailComposer.open(email);
    }

}
