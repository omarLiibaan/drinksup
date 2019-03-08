import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from "@ionic/angular";


@Component({
  selector: 'app-bar-user',
  templateUrl: './bar-user.page.html',
  styleUrls: ['./bar-user.page.scss'],
})
export class BarUserPage implements OnInit {
  baseURI = 'https://macfi.ch/serveur/aksi.php';
  uplPhotoURI = 'https://www.macfi.ch/serveur/barphotos/';
  myBar : any = {};
  barName : string;
  imgLink1 : string;
  imgLink2 : string;
  imgLink3 : string;

  constructor(private http : HttpClient, private platform : Platform, private aRoute : ActivatedRoute, private nativePageTransitions: NativePageTransitions, private route : Router, private navCtrl : NavController) { 
    // this.backButtonEvent();
    // this.platform.backButton.subscribe(() => {
    //   alert("hello");
    // });
  }

  ngOnInit() {
    this.loadBar(this.aRoute.snapshot.paramMap.get('id'))
  }

  loadBar(idBarParam : string) : void{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "fetchBarByIdBar", "idBar" : idBarParam},
        url       : any      	= this.baseURI;

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
        var random = Math.floor(Math.random() * 100);
        console.log(data);
        this.myBar = data;
        this.barName = data.ENT_NOM;
        this.imgLink1 = this.uplPhotoURI+this.barName+"_1?ran="+random,
        this.imgLink2 = this.uplPhotoURI+this.barName+"_2?ran="+random,
        this.imgLink3 = this.uplPhotoURI+this.barName+"_3?ran="+random
               
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

  backButtonEvent(){
      document.addEventListener("backbutton", () => { 
        // code that is executed when the user pressed the back button
        this.nativePageTransitions.fade(null);  
      // this.navTabs('/tabs/bars');
      // this.navCtrl.navigateRoot('/tabs/bars');
      alert("hello");
      });
  }

  async navTabs(msg: string) {
    this.route.navigateByUrl(msg);
  }


}
