import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  baseURI = 'https://macfi.ch/serveur/aksi.php';
  uplPhotoURI = 'https://www.macfi.ch/serveur/barphotos/';
  items : Array<any> = [];


  constructor(private navCtrl : NavController, private nativePageTransitions: NativePageTransitions, private modalCtrl : ModalController, private storage : Storage, private http : HttpClient, private toastCtrl : ToastController) { 

  }

  ngOnInit() {
  }

  ionViewWillEnter(): void { 
    this.storage.get('SessionIdKey').then((val) => {
      this.getPaidUser(val);
    }); 
    this.loadBar();
  }

  getPaidUser(id : string) {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any		= { 'key' : 'getPaidUser', 'idUser': id},
        url: any      	= this.baseURI;
  
    this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
          console.log(data);
        },  
        (error: any) => {
            console.log(error);
        });
  }

  loadBar() : void{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "getAllOffers"},
        url       : any      	= this.baseURI;

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
        this.items = data;
        console.log(data);
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

  moveToBar(id : string){
    let options: NativeTransitionOptions = {
      duration: 0,
     }
    this.nativePageTransitions.fade(options); 
    this.navCtrl.navigateRoot('/tabs/bar-user/'+id);
  }

}
