import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.page.html',
  styleUrls: ['./bars.page.scss'],
})
export class BarsPage implements OnInit {
  baseURI = 'https://macfi.ch/serveur/aksi.php';
  uplPhotoURI = "https://www.macfi.ch/serveur/barphotos/";
  items : Array<any> = [];
  // barNOMS :Array<any> = [];
  // imgUrl : Array<any> = [];

  constructor(private http : HttpClient, private storage : Storage) { 
    this.loadBar();
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
