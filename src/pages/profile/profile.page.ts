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

    document.addEventListener("backbutton", () => { 
      this.storage.get('SessionInKey').then((val) => {
        this.storage.get('SessionRoleKey').then((valRole) => {
            this.userSessionRole = valRole;

            if(val=='Yes' && this.userSessionRole == this.roleAdmin){
                this.navCtrl.navigateBack('tabsadmin/users');
                // this.navTabs('');
            }else if(val=='Yes' && this.userSessionRole == this.roleProprio){
                this.navTabs('/tabsproprio/bar');
            }else if(val=='Yes' && this.userSessionRole == this.roleUser){
                this.navTabs('/tabs/offers');
            }else{
                return null;
            }
        });
    });
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
    this.storage.remove('SessionIdKey');
    this.storage.remove('SessionInKey');
    this.storage.remove('SessionRoleKey');
    this.navCtrl.navigateBack('login');
  }

  async navTabs(msg: string) {
    this.route.navigateByUrl(msg);
  }

}
