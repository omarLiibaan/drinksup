import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { ActivatedRoute } from '@angular/router';
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
  mySchedule : Array<any> = [];
  barName : string;
  imgLink1 : string;
  imgLink2 : string;
  imgLink3 : string;

  constructor(private http : HttpClient, private aRoute : ActivatedRoute, private nativePageTransitions: NativePageTransitions, private navCtrl : NavController) { 

  }

  ngOnInit() {
    this.loadBar(this.aRoute.snapshot.paramMap.get('id'));
    this.loadSchedule(this.aRoute.snapshot.paramMap.get('id'));
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

  goBack(){
    let options: NativeTransitionOptions = {
      duration: 250,
     }
    this.nativePageTransitions.fade(options); 
    this.navCtrl.back();
      
  }

}
