import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from "@ionic/angular";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.page.html',
  styleUrls: ['./bars.page.scss'],
})
export class BarsPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  baseURI = 'https://macfi.ch/serveur/aksi.php';
  uplPhotoURI = "https://www.macfi.ch/serveur/barphotos/";
  items : Array<any> = [];
  random : number;

  constructor(private http : HttpClient, private storage : Storage) { 
    this.loadBar();
    this.random = Math.floor(Math.random() * 100);
  }
  scrollToTop() {
    this.content.scrollToTop(0);
  }
  ionViewDidEnter(){
    this.scrollToTop();
  }


  ngOnInit() {
  }

  loadBar() : void{
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "fetchActiveBar"},
        url       : any      	= this.baseURI;

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
        console.log(data);
        this.items = data;
        // for(let i=0; i<this.items.length;i++){
        //    this.barNOMS.push(this.items[i].ENT_NOM);
        // }   
    },
    (error : any) =>
    {
      console.log(error);
    });
  }

}
