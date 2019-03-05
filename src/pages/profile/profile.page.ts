import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  loggedUser : any = {};
  baseURI = 'https://macfi.ch/serveur/';
  roleUser = 'user';
  roleAdmin = 'admin';
  roleProprio = 'proprio';
  userSessionRole : string;

  constructor(private route: Router, public navCtrl : NavController, public storage: Storage, private http : HttpClient) { 
    this.storage.get('SessionIdKey').then((val) => {
      this.loadData(val);
    });

  }

  ngOnInit() {
    
  }

  loadData(idSession : string){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json'}),
        options 	: any		= {"key" : "getUsersById", "idSession" : idSession},
        url       : any   = this.baseURI + 'aksi.php';

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
      this.loggedUser = data;
      console.log(data);
    },
    (error : any) =>
    {
      console.dir(error);
    });
  }

  

  logout(){
    this.storage.clear();
    this.navCtrl.navigateBack('login');
  }

  async navTabs(msg: string) {
    this.route.navigateByUrl(msg);
  }

}
