import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, ToastController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  //public baseURI = 'http://localhost/drinksupProject/serveur/';
  public baseURI = 'https://macfi.ch/serveur/';
  users = [];
  constructor(private navCtrl: NavController, private toastCtrl: ToastController, public http: HttpClient, modalController: ModalController) { }

  ngOnInit() {
      this.users = [];
      this.getUsers();
  }



  getUsers() {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'getUsers'},
          url: any      	= this.baseURI + 'aksi.php';

      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
          console.log('salut');
          this.users = data;
          console.log(this.users);


      });

  }
  async edit(item) {
      this.sendNotification('Vous avez cliqué sur le bouton modifié et id est ' + item);
  }
  delete() {
      this.sendNotification('Vous avez cliqué sur le bouton supprimer');
  }

  async sendNotification(msg: string) {
      const toast = await this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'bottom'
      });
      toast.present();
  }

}
