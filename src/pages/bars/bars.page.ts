import { Component, ViewChild } from '@angular/core';
import { IonContent, NavController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { $ } from 'protractor';


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
  Filtereditems : Array<any> = [];
  seshId : number;
  random : number;
  disBub : boolean = true;
  zoomOut : boolean = true;
  activeBarsNo  : number;
  isSearchbarOpened : boolean = false; 
  hideElem : string = "block";
  emptyVal : string;
  zindex : string = "5";

  constructor(private http : HttpClient, private nativePageTransitions: NativePageTransitions, private navCtrl : NavController) { 
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
  addToFave(){
    console.log("Added to Fave");
  }
  // logScrolling(event){
  //   let halfWay = event.detail.scrollTop; 
   
  //   for(let i=0; i<this.activeBarsNo; i++){
  //     if(document.getElementById("offset_"+i).offsetTop < halfWay){
  //       console.log("offset_"+i+" is triggered!");
  //       document.getElementById("offset_"+i).style.transform = "scale(5)";
  //       // this.isActive = false;
  //     }
  //   }
  // }

  moveToBar(id : string){
    let options: NativeTransitionOptions = {
      duration: 250,
     }
    this.nativePageTransitions.fade(options); 
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
        this.items = data;
        this.Filtereditems = this.items;
        this.activeBarsNo = this.items.length;
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

  searchBar(param){
    const val = param.target.value;

    
    if(val.trim()!=""){
      this.Filtereditems = this.items.filter((users) => {
        console.log('valeur de la recherche ' + val);
        console.log(this.Filtereditems.length);
        return (users.ENT_NOM.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      
      this.hideElem = "none";
    }else{
      this.Filtereditems = this.items;
      this.hideElem = "block";
    }
    
  }

  imgLoad(){
    console.log("Loaded !");
    this.disBub = false;
    this.zoomOut = false;
    this.zindex  = "-1";
  }

}
