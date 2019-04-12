import { Component, ViewChild } from '@angular/core';
import { IonContent, NavController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Storage } from '@ionic/storage';

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
  faveBars : Array<any> = [];
  seshId : number;
  random : number;
  disBub : boolean = true;
  zoomOut : boolean = true;
  activeBarsNo  : number;
  isSearchbarOpened : boolean = false; 
  addedToFave : boolean = false;
  hideElem : string = "block";
  emptyVal : string;
  zindex : string = "5";
  

  constructor(private storage : Storage, private http : HttpClient, private nativePageTransitions: NativePageTransitions, private navCtrl : NavController) { 
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

  ionViewDidLeave(){
    this.isSearchbarOpened = false;
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
    setTimeout(() => {
      this.hideElem = "block";
    }, 500);
  }

  ionViewWillEnter(){
    this.loadBar();
    this.storage.get('SessionEmailKey').then((val) => {
      this.loadFavorite(val);
    });
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

  favorite(id_param : number, email_param : string){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "addFavorite", "id" : id_param, "email" : email_param},
        url       : any      	= this.baseURI;

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
      console.log(data);
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

  deletefavorite(id_param : number, email_param : string){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "deleteFavorite", "id" : id_param, "email" : email_param},
        url       : any      	= this.baseURI;

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
      console.log(data);
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

  loadFavorite(email_param : string){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "loadFavorite", "email" : email_param},
        url       : any      	= this.baseURI;

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
      this.faveBars = data;
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

  addRemoveFave(index, id){

    const imgId_1 = document.getElementById("starIconId1_"+index) as HTMLImageElement;
    const imgId_2 = document.getElementById("starIconId2_"+index) as HTMLImageElement;
    const imgId_3 = document.getElementById("starIconId3_"+index) as HTMLImageElement;

    const file_1 = "../../assets/img" + imgId_1.src.substring(imgId_1.src.lastIndexOf("/"));
    const file_2 = "../../assets/img" + imgId_2.src.substring(imgId_2.src.lastIndexOf("/"));
    const file_3 = "../../assets/img" + imgId_3.src.substring(imgId_3.src.lastIndexOf("/"));
    const liked = "../../assets/img/star-icon-filled.svg";

    if(file_1==liked || file_2==liked || file_3==liked){
      imgId_1.src ="../../assets/img/star-icon-empty.svg";
      imgId_2.src ="../../assets/img/star-icon-empty.svg";
      imgId_3.src ="../../assets/img/star-icon-empty.svg";
      this.storage.get('SessionEmailKey').then((val) => {
        this.deletefavorite(id, val);
      });
    }else{
      imgId_1.src ="../../assets/img/star-icon-filled.svg";
      imgId_2.src ="../../assets/img/star-icon-filled.svg";
      imgId_3.src ="../../assets/img/star-icon-filled.svg";
      this.storage.get('SessionEmailKey').then((val) => {
        this.favorite(id, val);
      });
    }
    
  }


  ifFave(id) : boolean{
    if(this.faveBars!=null){
      for(var i=0; i < this.faveBars.length; i++){
        if(this.faveBars[i].FAV_BAR_ID == id){
          return true;
        }
      }
    }
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
