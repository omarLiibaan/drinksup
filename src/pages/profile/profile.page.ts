import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';


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
  data: any;

  constructor(private route: Router, public navCtrl : NavController, public storage: Storage, private http : HttpClient, private platform : Platform) { 
    
  
  }
  
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.storage.get('SessionIdKey').then((val) => {
      this.loadData(val);
    });
  }

  loadData(idSession : string){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json'}),
        options 	: any		= {"key" : "getUsersById", "idSession" : idSession},
        url       : any   = this.baseURI + 'aksi.php';

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
      this.loggedUser = data;
    },
    (error : any) =>
    {
      console.dir(error);
    });
  }

  logoutFromApp(){
    this.storage.clear();
    this.navCtrl.navigateForward('login');
  }

  async navTabs(msg: string) {
    this.route.navigateByUrl(msg);
  }

}
