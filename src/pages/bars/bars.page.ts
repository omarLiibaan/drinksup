import { Component, ViewChild } from '@angular/core';
import { IonContent, NavController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import {Router} from '@angular/router';


@Component({
  selector: 'app-bars',
  templateUrl: './bars.page.html',
  styleUrls: ['./bars.page.scss'],
})
export class BarsPage{
  @ViewChild(IonContent) content: IonContent;
  baseURI = 'https://macfi.ch/serveur/aksi.php';
  uplPhotoURI = "https://www.macfi.ch/serveur/barphotos/";
  items : Array<any> = [];
  random : number;

  constructor(private http : HttpClient, private nativePageTransitions: NativePageTransitions, private navCtrl : NavController, private router : Router) { 
    this.loadBar();
    this.random = Math.floor(Math.random() * 100);
    this.ionViewWillEnter();
  }
  scrollToTop() {
    this.content.scrollToTop(0);
  }
  ionViewDidEnter(){
    this.scrollToTop();
  }

  moveToBar(id : string){
    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 250,
      slowdownfactor: -1,
      iosdelay: 50,
      androiddelay: 50
     }
    this.nativePageTransitions.slide(options); 
    this.navCtrl.navigateRoot('/tabs/bar-user/'+id);
  }

  ionViewWillEnter(){
    this.loadBar();
  }

  loadBar() : void{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "fetchActiveBar"},
        url       : any      	= this.baseURI;

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
        console.log(data);
        this.items = data;
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

  async navTabs(msg: string) {
    this.router.navigateByUrl(msg);
  }

}
