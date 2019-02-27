import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NavController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-bar-admin',
  templateUrl: './bar-admin.page.html',
  styleUrls: ['./bar-admin.page.scss'],
})
export class BarAdminPage implements OnInit {
  users = [];
  proprio = 0;
  bar: any = {};
  haveBarOrNot = '';
  // public baseURI = 'http://localhost/drinksupProject/serveur/';
  public baseURI = 'https://macfi.ch/serveur/';
  constructor(private navCtrl: NavController, private toastCtrl: ToastController, public http: HttpClient) { }

  ngOnInit() {
      this.users = [];
      this.getProprio();
  }
  public getProprio() {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'getProprio'},
            url: any      	= this.baseURI + 'aksi.php';
        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
            this.users = data;
           // if (this.users == null ) {this.haveUserOrNot = 'Aucun Internaute ayant le role USERS'; } else {this.haveUserOrNot = ''; }
        });

  }
    async showList() {
        console.log(this.proprio);
        this.getBarByProprio(this.proprio);
    }
  // getBarByProprio
    getBarByProprio(proprio: number) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json'}),
            options: any		= {'key' : 'getBarByProprio', 'proprio' : proprio},
            url: any   = this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
                this.bar = data;
                if (this.bar == false ) {this.haveBarOrNot = 'Pas de bar pour ce propriétaire'; } else {this.haveBarOrNot = ''; }
            },
            (error: any) => {
                console.dir(error);
            });
    }
}
