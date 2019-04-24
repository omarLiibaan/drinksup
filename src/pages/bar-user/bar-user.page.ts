import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { formatDate} from '@angular/common';
import { ModalQrcodePage } from '../modal-qrcode/modal-qrcode.page';
import { ModalRatingsPage } from '../modal-ratings/modal-ratings.page';
import { timer } from 'rxjs';




@Component({
  selector: 'app-bar-user',
  templateUrl: './bar-user.page.html',
  styleUrls: ['./bar-user.page.scss'],
})
export class BarUserPage implements OnInit {
  baseURI = 'https://macfi.ch/serveur/aksi.php';
  uplPhotoURI = 'https://www.macfi.ch/serveur/barphotos/';
  myBar : any = {};
  mySchedule : Array<any> = [];
  myOffers : Array<any> = [];
  scannedOfferId : any = [];
  scannedUserId : any = [];
  scannedOffers : Array<any> = [];
  getRating : Array<any> = [];
  ifUserIdScanned = null;
  ifUserIdNotScanned = null;
  ifOfferIdScanned = null;
  ifOfferIdNotScanned = null;
  barName : string;  
  imgLink1 : string;
  imgLink2 : string;
  imgLink3 : string;
  payed : string;
  dateDebut;
  user_id;
  grade : string = "0";
  gradeTot;
  ifDataScanned : boolean = false;
  showBtns : boolean = false;
  constructor(private modalCtrl : ModalController, @Inject(LOCALE_ID)private locale: string, private storage : Storage,private http : HttpClient, private aRoute : ActivatedRoute, private nativePageTransitions: NativePageTransitions, private navCtrl : NavController) { 
 
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.getScannedCode();     
    this.storage.get('SessionIdKey').then((val) => {
      this.getPaidUser(val);
      setTimeout(() => {
        this.user_id = val;
      }, 100);
    }); 
    this.loadBar(this.aRoute.snapshot.paramMap.get('id'));
    this.loadSchedule(this.aRoute.snapshot.paramMap.get('id'));
    this.loadOffers(this.aRoute.snapshot.paramMap.get('id'));
    this.getRatings(this.aRoute.snapshot.paramMap.get('id'));
  }

  ionViewDidEnter(){
    timer(2000).subscribe(() => (this.showBtns = true));
  }

  ifOfferScanned(offerId){
    if(this.scannedOfferId.indexOf(offerId)>-1){
      this.ifOfferIdScanned = true;
      this.ifOfferIdNotScanned = false;
    }else{
      this.ifOfferIdScanned = false;
      this.ifOfferIdNotScanned = true;
    }
  }

  loadBar(idBarParam : string) : void{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "fetchBarByIdBar", "idBar" : idBarParam},
        url       : any      	= this.baseURI;

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
        var random = Math.floor(Math.random() * 100);

        this.myBar = data;
        this.barName = data.ENT_NOM;
        this.imgLink1 = this.uplPhotoURI+this.barName+"_1?ran="+random;
        this.imgLink2 = this.uplPhotoURI+this.barName+"_2?ran="+random;
        this.imgLink3 = this.uplPhotoURI+this.barName+"_3?ran="+random;
               
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

  loadSchedule(idBarParam : string){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "fetchHoraireByBar", "idBar" : idBarParam},
          url       : any      	= this.baseURI;
  
      this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
      {
        this.mySchedule = data;
      },
      (error : any) =>
      {
        console.log(error);
      });
  }

  loadOffers(idBarParam : string){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 	: any		= { "key" : "getOfferByIdBar", "idBar" : idBarParam},
          url       : any      	= this.baseURI;
  
      this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
      {
        this.myOffers = data;
        console.log(this.myOffers);
      },
      (error : any) =>
      {
        console.log(error);
      });
  }

  getPaidUser(id : string) {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any		= { 'key' : 'getPaidUser', 'idUser': id},
        url: any      	= this.baseURI;
  
    this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
          console.log(data.validity); 
          this.payed = data.validity;
        },  
        (error: any) => {
            console.log(error);
        });
    }

    getScannedCode() {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'getScannedCode'},
          url: any      	= this.baseURI;
    
      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
            this.scannedOffers = data;
            console.log(this.scannedOffers);
          },  
          (error: any) => {
              console.log(error);
          });
    }

    checkIfScanned(offer_id, user_id){
      if(this.scannedOffers!==null){
        for(var i=0; i<this.scannedOffers.length; i++){
          if(this.scannedOffers[i].CODE_OFFRE_ID===offer_id && this.scannedOffers[i].CODE_INTERNAUTE_ID===user_id){
            return true;        
          }
        } 
      }else{
        return false;
      }
    }

    getRatings(id_bar) {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'getRating', 'idBar' : id_bar},
          url: any      	= this.baseURI;
    
      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
        
            if(data.totalGrade!==null){
              this.gradeTot = (Math.round(data.totalGrade * 2) / 2).toFixed(1);
              this.grade = this.gradeTot.replace(/\./g,'-')
            }else{
              this.gradeTot = 0;
            }
            console.log(this.gradeTot)
          },  
          (error: any) => {
              console.log(error);
          });
    }
 
    //modal
    async activerOffre(desc, start, end, off_id, ent_id, user_id) {
        const modal = await this.modalCtrl.create({
            component: ModalQrcodePage,
            componentProps: {
              description : desc,
              debut : start,
              fin : end,
              idOff : off_id,
              idEnt : ent_id,
              idUser : user_id
            },
        });
        modal.onDidDismiss().then(() => {
          
        });
        modal.present();
    }

    //modal
    async rate(ent_id, user_id) {
      const modal = await this.modalCtrl.create({
          component: ModalRatingsPage,
          cssClass: "ratings-modal",
          componentProps: {
            idEnt : ent_id,
            idUser : user_id
          },
      });
      modal.onDidDismiss().then(() => {
        
      });
      modal.present();
  }

    jemabonne(){
      alert("Abonnez-vous dès maintenant pour profiter l'offre !")
    }

  goBack(){
    let options: NativeTransitionOptions = {
      duration: 250,
     }
    this.nativePageTransitions.fade(options); 
    this.navCtrl.back();
      
  }
 

}
