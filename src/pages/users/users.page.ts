import { Component, OnInit } from '@angular/core';
import {
    AlertController,
    IonItemSliding,
    ModalController,
    NavController,
    ToastController
} from '@ionic/angular';
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
  haveUserOrNot = '';
  constructor(private navCtrl: NavController, private toastCtrl: ToastController, public http: HttpClient, public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {
      this.ionViewWillEnter();
  }

    public ionViewWillEnter(): void {
        this.users = [];
        this.getUsers();
        console.log(this.users.length.valueOf());
    }
  public getUsers() {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'getUsers'},
          url: any      	= this.baseURI + 'aksi.php';
      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
          this.users = data;
          if (this.users == null ) {this.haveUserOrNot = 'Aucun Internaute ayant le role USERS'; } else {this.haveUserOrNot = ''; }
      });

  }

  async edit(slidingItem: IonItemSliding, id, prenom, nom, email, role) {
      await slidingItem.close();
      const modal = await this.modalController.create( {
          component: ModalPage,
          componentProps: {
              id: id,
              prenom: prenom,
              nom: nom,
              email: email,
              role: role
          },
      });
      modal.onDidDismiss().then(() => {
          this.getUsers();
      })
      modal.present();
      this.ionViewWillEnter();
  }
  async delete(slidingItem: IonItemSliding, id, nom) {
      await slidingItem.close();
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
                        this.ionViewWillEnter();
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
