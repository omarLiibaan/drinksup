import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  sessionId : any;
  loggedUser : any = {};
  baseURI = 'https://macfi.ch/serveur/';

  constructor(public navCtrl : NavController, private storage: Storage, private http : HttpClient, private loadingCtrl : LoadingController) { 
    this.storage.get('SessionIdKey').then((val) => {
      this.sessionId = val;
    });

    this.loadData();
  }

  ngOnInit() {}

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  loadData(){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options 	: any		= { "key" : "getUsers"},
        url       : any   = this.baseURI + 'aksi.php';

    this.http.post(url, JSON.stringify(options), headers).subscribe((data : any) =>
    {
      this.loggedUser = data.filter(userData => userData.INT_ID == this.sessionId);
      console.log(this.loggedUser);
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

}
