import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController  } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';



@Component({
  selector: 'app-bar',
  templateUrl: './bar.page.html',
  styleUrls: ['./bar.page.scss'],
})
export class BarPage implements OnInit {
  baseURI = 'https://macfi.ch/serveur/aksi.php';
  uplPhotoURI = "https://www.macfi.ch/serveur/barphotos/";
  myBar : any = {};
  barName : string;
  photoNUM : string;
  images : any = {};
  imgLink1 : string;
  imgLink2 : string;
  imgLink3 : string;


  constructor(private http : HttpClient, private storage : Storage, private camera : Camera, private modalCtrl : ModalController, private loadingCtrl : LoadingController) { 
    this.storage.get('SessionIdKey').then((val) => {
      this.loadBar(val);
    });
    this.ionViewWillEnter();

  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter(): void { 
    this.storage.get('SessionIdKey').then((val) => {
      this.loadBar(val);
    }); 
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.storage.get('SessionIdKey').then((val) => {
        this.loadBar(val);
      });
      console.log('Async operation has ended');
      event.target.complete();
    }, 1500);
  }


  loadBar(idUserParam : string) : void{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "fetchBar", "idUser" : idUserParam},
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

  upload1(photoNum : string){
    this.upl(photoNum);
  }

  upload2(photoNum : string){
    this.upl(photoNum);
  }

  upload3(photoNum : string){
    this.upl(photoNum);
  }

  uploadGal1(photoNum : string){
    this.gal(photoNum);
  }

  uploadGal2(photoNum : string){
    this.gal(photoNum);
  }

  uploadGal3(photoNum : string){
    this.gal(photoNum);
  }

  upl(photoNumber : string){
    this.photoNUM = photoNumber;
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      targetHeight: 750,
      targetWidth: 900
    }
    this.camera.getPicture(options).then((imageData) => {

      let barName = "?ImageName="+this.barName+"_"+this.photoNUM;
      let postData = new FormData();
      postData.append("file",imageData);
      let data:Observable<any> = this.http.post(this.uplPhotoURI+"uploadPhoto.php"+barName, postData);
      data.subscribe((res)=>{
      console.log(res);
      console.log("Upload Successful");
      setTimeout(() => {
        this.ionViewWillEnter();
      }, 1000);
      
      });
    }, (err) => {
      console.log(err);
    });
  }

  gal(photoNumber : string){
    this.photoNUM = photoNumber;
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: true,
      targetHeight: 750,
      targetWidth: 900
    }
    this.camera.getPicture(options).then((imageData) => {

      let barName = "?ImageName="+this.barName+"_"+this.photoNUM;
      let postData = new FormData();
      postData.append("file",imageData);
      let data:Observable<any> = this.http.post(this.uplPhotoURI+"uploadPhoto.php"+barName, postData);
      data.subscribe((res)=>{
      console.log(res);
      console.log("Upload Successful");
      setTimeout(() => {
        this.ionViewWillEnter();
      }, 1000);
      
      });
    }, (err) => {
      console.log(err);
    });
  }


  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Hellooo'
    });
    await loading.present();
  }


}
