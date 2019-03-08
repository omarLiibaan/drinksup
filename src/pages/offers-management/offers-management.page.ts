import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertController, IonItemSliding, ModalController, ToastController} from '@ionic/angular';
import {OffersAddbarPage} from '../offers-addbar/offers-addbar.page';

@Component({
  selector: 'app-offers-management',
  templateUrl: './offers-management.page.html',
  styleUrls: ['./offers-management.page.scss'],
})
export class OffersManagementPage implements OnInit {

  constructor(private http: HttpClient, private modalController: ModalController,  public alertController: AlertController, private toastCtrl: ToastController) { }
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  jours = 'Lundi';
  // public baseURI = 'http://localhost/drinksupProject/serveur/';
  public baseURI = 'https://macfi.ch/serveur/';
  barJour = [];
  haveBarOrNot = '';
  idJour: number;
  ngOnInit() {
    this.days;
      this.barJour = [];
      this.getBarJour('Lundi');
  }
    public ionViewWillEnter(): void {
        this.barJour = [];
        this.getBarJour(this.jours);

    }
  async showList() {
    console.log(this.jours);
    this.getBarJour(this.jours);

  }
  public getBarJour(jour: string) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'getBarJour', 'jour': jour},
            url: any      	= this.baseURI + 'aksi.php';
        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
            this.barJour = data;
            if (this.barJour == null ) {this.haveBarOrNot = 'Aucun Bar ne fait d\'offres le ' + jour; } else {this.haveBarOrNot = ''; }
        });

  }
  async addBar() {
    const modal = await this.modalController.create({
        component: OffersAddbarPage,
        componentProps: {
          jours: this.jours
        },
    });
      modal.onDidDismiss().then(() => {
          this.getBarJour(this.jours);
      })
    modal.present();
  }
    async delete(slidingItem: IonItemSliding, id, nom) {
        await slidingItem.close();
        this.idJour = this.jours === 'Lundi' ? 1 :
        this.idJour = this.jours === 'Mardi' ? 2 :
        this.idJour = this.jours === 'Mercredi' ? 3 :
        this.idJour = this.jours === 'Jeudi' ? 4 :
        this.idJour = this.jours === 'Vendredi' ? 5 :
        this.idJour = this.jours === 'Samedi' ? 6 : 7;
        this.alertDeleteBarOffers(id, nom, this.idJour, this.jours);
        // this.closeModal();
    }
    async alertDeleteBarOffers(id, nom, idJour , jour) {
        const alert = await this.alertController.create({
            header: 'Êtes vous sûr de supprimer l\'entreprise ' + nom + ' pour l\'offre de ' + jour,
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
                        // this.updateRole(id);
                        // this.createEntreprise(id);
                         this.deleteOffer(id, idJour);
                        this.ionViewWillEnter();
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();
    }

    deleteOffer(id: number, idJour: number) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'deleteOffer', 'id': id, 'idJour': idJour},
            url: any      	= this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
                this.sendNotification('La suppression de l\'offre a bien été pris en compte!');

            },
            (error: any) => {
                console.log(error);
                this.sendNotification('Erreur!');
            });
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
