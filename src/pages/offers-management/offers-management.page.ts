import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertController, IonItemSliding, ModalController, ToastController} from '@ionic/angular';
import {OffersAddbarPage} from '../offers-addbar/offers-addbar.page';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-offers-management',
  templateUrl: './offers-management.page.html',
  styleUrls: ['./offers-management.page.scss'],
})
export class OffersManagementPage implements OnInit {
    event = {
        title: '',
        desc: '',
        startTime: '',
        endTime: '',
        allDay: false
    };
    minDate = new Date().toISOString();
    eventSource = [];
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }
    viewTitle = '';
    @ViewChild(CalendarComponent) myCal: CalendarComponent;
    constructor(public alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string) { }
    ngOnInit() {
        this.resetEvents();
    }

    resetEvents() {
        this.event = {
            title: '',
            desc: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            allDay: false
        };
    }

    addEvent() {
        const eventCopy = {
            title: this.event.title,
            desc: this.event.desc,
            startTime: new Date(this.event.startTime),
            endTime: new Date(this.event.endTime),
            allDay: this.event.allDay
        }
        if (eventCopy.allDay) {
           const start = eventCopy.startTime;
           const end = eventCopy.endTime;
           eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
           eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1 ));
        }

        this.eventSource.push(eventCopy);
        this.myCal.loadEvents();
        this.resetEvents();
    }
    changeMode(mode) {
        this.calendar.mode = mode;
    }

    back() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    }

    next() {
        const swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    }
    today() {
        this.calendar.currentDate = new Date();
    }


    async onEventSelected(event) {
        const start = formatDate(event.startTime, 'medium', this.locale);
        const end = formatDate(event.endTime, 'medium', this.locale);
        const alert = await this.alertCtrl.create({
            header: event.title,
            subHeader: event.desc,
            message: 'De : ' + start + '<br><br> à ' + end,
            buttons: ['OK']
        });
        alert.present();
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onTimeSelected(ev) {
        const selected = new Date(ev.selectedTime);
        this.event.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.event.endTime = (selected.toISOString());

    }









// /*

//   constructor(private http: HttpClient, private modalController: ModalController,  public alertController: AlertController, private toastCtrl: ToastController) { }
//   days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
//   jours = 'Lundi';
//   // public baseURI = 'http://localhost/drinksupProject/serveur/';
//   public baseURI = 'https://macfi.ch/serveur/';
//   barJour = [];
//   haveBarOrNot = '';
//   idJour: number;
//   ngOnInit() {
//     this.days;
//       this.barJour = [];
//       this.getBarJour('Lundi');
//   }
//     public ionViewWillEnter(): void {
//         this.barJour = [];
//         this.getBarJour(this.jours);

//     }
//   async showList() {
//     console.log(this.jours);
//     this.getBarJour(this.jours);

//   }
//   public getBarJour(jour: string) {
//         const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
//             options: any		= { 'key' : 'getBarJour', 'jour': jour},
//             url: any      	= this.baseURI + 'aksi.php';
//         this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
//             this.barJour = data;
//             if (this.barJour == null ) {this.haveBarOrNot = 'Aucun Bar ne fait d\'offres le ' + jour; } else {this.haveBarOrNot = ''; }
//         });

//   }
//   async addBar() {
//     const modal = await this.modalController.create({
//         component: OffersAddbarPage,
//         componentProps: {
//           jours: this.jours
//         },
//     });
//       modal.onDidDismiss().then(() => {
//           this.getBarJour(this.jours);
//       })
//     modal.present();
//   }
//     async delete(slidingItem: IonItemSliding, id, nom) {
//         await slidingItem.close();
//         this.idJour = this.jours === 'Lundi' ? 1 :
//         this.idJour = this.jours === 'Mardi' ? 2 :
//         this.idJour = this.jours === 'Mercredi' ? 3 :
//         this.idJour = this.jours === 'Jeudi' ? 4 :
//         this.idJour = this.jours === 'Vendredi' ? 5 :
//         this.idJour = this.jours === 'Samedi' ? 6 : 7;
//         this.alertDeleteBarOffers(id, nom, this.idJour, this.jours);
//         // this.closeModal();
//     }
//     async alertDeleteBarOffers(id, nom, idJour , jour) {
//         const alert = await this.alertController.create({
//             header: 'Êtes vous sûr de supprimer l\'entreprise ' + nom + ' pour l\'offre de ' + jour,
//             buttons: [
//                 {
//                     text: 'Non',
//                     role: 'cancel',
//                     cssClass: 'secondary',
//                     handler: (blah) => {
//                         console.log('Confirm Cancel: blah');
//                     }
//                 }, {
//                     text: 'Oui',
//                     handler: () => {
//                         // this.updateRole(id);
//                         // this.createEntreprise(id);
//                          this.deleteOffer(id, idJour);
//                         this.ionViewWillEnter();
//                         console.log('Confirm Okay');
//                     }
//                 }
//             ]
//         });

//         await alert.present();
//     }

//     deleteOffer(id: number, idJour: number) {
//         const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
//             options: any		= { 'key' : 'deleteOffer', 'id': id, 'idJour': idJour},
//             url: any      	= this.baseURI + 'aksi.php';

//         this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
//                 this.sendNotification('La suppression de l\'offre a bien été pris en compte!');

//             },
//             (error: any) => {
//                 console.log(error);
//                 this.sendNotification('Erreur!');
//             });
//     }

//     async sendNotification(msg: string) {
//         const toast = await this.toastCtrl.create({
//             message: msg,
//             duration: 3000,
//             position: 'bottom'
//         });
//         toast.present();
//     }
// */

}
