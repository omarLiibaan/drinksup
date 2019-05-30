import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as moment from "moment";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  statUser = [];
  stats = [];
  getAllClicks = [];
  maxClick;
  baseURI = 'https://macfi.ch/serveur/';
  msg = '';
  constructor(public storage: Storage, private http : HttpClient) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('SessionIdKey').then(value => {
      this.getStats(value);
      console.log('idPerson ' + value);
    });


  }
  getStats(proprio : string){
      let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json'}),
          options 	: any		= {"key" : "getStats", "proprio" : proprio},
          url       : any   = this.baseURI + 'aksi.php';

      this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
          {
              this.statUser = data;
              for(var i = 0; i<data.length; i++){
                this.getAllClicks.push(parseInt(data[i].nbOffre))
              }

              this.maxClick = Math.max(...this.getAllClicks)

              console.log(this.maxClick);
              this.stats = this.statUser;
              if(this.stats == null){
                this.msg = "Vous n'avez pas de statistiques";
              }
          },
          (error : any) =>
          {
              console.dir(error);
          });
  }

}
