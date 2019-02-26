import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavController, PopoverController, ToastController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ModalPage} from '../modal/modal.page';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  // public baseURI = 'http://localhost/drinksupProject/serveur/';
  public baseURI = 'https://macfi.ch/serveur/';
  users = [];
  value = 0;
  constructor(private navCtrl: NavController, private toastCtrl: ToastController, public http: HttpClient, public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {
      this.users = [];
      this.getUsers();

  }


  public getUsers() {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'getUsers'},
          url: any      	= this.baseURI + 'aksi.php';

      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
          this.users = data;
      });

  }
    doRefresh(event) {
        console.log('Begin async operation');
        this.ngOnInit();
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }
  async edit(id, prenom, nom, email, role) {
      const modal = await this.modalController.create( {
          component: ModalPage,
          componentProps: {
              id: id,
              prenom: prenom,
              nom: nom,
              email: email,
              role: role
          }
      });
      modal.present();
  }
  async delete(id, nom) {
      this.presentAlert(id, nom);
      this.sendNotification('Vous avez cliqué sur le bouton supprimer');
  }
    async presentAlert(id, nom) {
        const alert = await this.alertController.create({
            header: 'Êtes vous sûr de supprimer cet utilisateur! ' + nom,
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Oui',
                    handler: () => {
                        this.deleteUser(id);
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();
    }
  async sendNotification(msg: string) {
      const toast = await this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'bottom'
      });
      toast.present();
  }

  deleteUser(id: number) {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'deleteUser', 'id': id},
          url: any      	= this.baseURI + 'aksi.php';

      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
              this.sendNotification('Votre suppresion a bien été pris en compte !');

          },
          (error: any) => {
              console.log(error);
              this.sendNotification('Erreur!');
          });
  }

}
