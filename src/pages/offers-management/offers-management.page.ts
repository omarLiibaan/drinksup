import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertController, IonItemSliding, ModalController, ToastController} from '@ionic/angular';
import {OffersAddbarPage} from '../offers-addbar/offers-addbar.page';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {DatePipe, formatDate} from '@angular/common';


@Component({
  selector: 'app-offers-management',
  templateUrl: './offers-management.page.html',
  styleUrls: ['./offers-management.page.scss'],
  providers: [DatePipe]
})
export class OffersManagementPage implements OnInit {
    event = {
        title: '',
        description: '',
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        entreprise: '',
        idOffre: '',
        allDay: false
    };
    minDate = new Date().toISOString();
    eventSource = [];
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }
    viewTitle = '';
    users = [];
    usersFilter = [];
    listeOffres = [];
    public baseURI = 'https://macfi.ch/serveur/';
    offres = {
        title: '',
        description: '',
        startTime: new Date(),
        endTime: new Date(),
        entreprise: '',
        idOffre: '',
        allDay: false
    };
    noEventsLabel = '';
    @ViewChild(CalendarComponent) myCal: CalendarComponent;
    constructor(public dp: DatePipe, public alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string, public http: HttpClient, public toastCtrl: ToastController, public alertController: AlertController) { }
    ngOnInit() {
        // this.ionViewWillEnter();
        this.myCal.loadEvents();
        this.noEventsLabel = 'Pas d\'offre ';
    }

    public ionViewWillEnter(): void {
        this.resetEvents();
        this.eventSource = [];
        this.getOffres();
        this.getProprio();
        this.myCal.loadEvents();
    }

    resetEvents() {
        this.event = {
            title: '',
            description: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            entreprise: '',
            idOffre: '',
            allDay: false
        };
    }

    public getProprio() {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'getProprioValide'},
            url: any      	= this.baseURI + 'aksi.php';
        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
            this.users = data;
            this.usersFilter = this.users;
        });

    }
    public getOffres() {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'getOffres'},
            url: any      	= this.baseURI + 'aksi.php';
        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
            this.listeOffres = data;
            for (let i = 0; i < this.listeOffres.length; i++) {
                this.offres = {
                    title: this.listeOffres[i].title.toString(),
                    description: this.listeOffres[i].description.toString(),
                    startTime: new Date(this.listeOffres[i].startTime),
                    endTime: new Date(this.listeOffres[i].startTime),
                    entreprise: this.listeOffres[i].entreprise,
                    idOffre: this.listeOffres[i].idOffre,
                    allDay: false
                }
                this.eventSource.push(this.offres);
            }

            this.resetEvents();
            this.myCal.loadEvents();
        });
    }

    addEvent() {
        const eventCopy = {
            title: this.event.title,
            description: this.event.description,
            startTime: new Date(this.event.startTime),
            endTime: new Date(this.event.endTime),
            entreprise: this.event.entreprise,
            idOffre: this.event.idOffre,
            allDay: this.event.allDay
        }
        if (eventCopy.allDay) {
           const start = eventCopy.startTime;
           const end = eventCopy.endTime;
           eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
           eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1 ));
        }
        const dateDebut = this.dp.transform(eventCopy.startTime, 'yyyy-MM-dd HH:mm');
        const dateFin = this.dp.transform(eventCopy.endTime, 'yyyy-MM-dd  HH:mm');
        this.addOffer(eventCopy.description, dateDebut, dateFin, eventCopy.title);
        this.eventSource.push(eventCopy);
        this.myCal.loadEvents();
        this.resetEvents();
    }

    addOffer(description: String, dateDebut: String, dateFin: String, idEnt: String) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'insertOffers', 'description': description, 'dateDebut': dateDebut, 'dateFin': dateFin, 'idEnt': idEnt},
            url: any      	= this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
                this.sendNotification('L\'ajout de l\'offre a bien été pris en compte!');
                this.myCal.loadEvents();
            },
            (error: any) => {
                console.log(error);
                this.sendNotification('Erreur!');
            });
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
    async eventSelected(event) {
        const start = formatDate(event.startTime, 'dd/MM/yyyy HH:mm', this.locale);
        const end = formatDate(event.endTime, 'dd/MM/yyyy HH:mm', this.locale);

        const alert = await this.alertCtrl.create({
            header: event.entreprise,
            subHeader: event.description,
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

    async delete(slidingItem: IonItemSliding, id, nom) {
        await slidingItem.close();
        console.log('id de l\'offre ' + id);
        this.presentAlert(id, nom);
    }
    deleteOffre(id: number) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'deleteOffre', 'id': id},
            url: any      	= this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
                this.sendNotification('Votre suppresion a bien été pris en compte !');
                console.log('ouais bien');
            },
            (error: any) => {
                console.log(error);
                this.sendNotification('Erreur!');
            });
    }
    async presentAlert(id, nom) {
        const alert = await this.alertController.create({
            header: 'Êtes vous sûr de supprimer l\'offre de ' + nom,
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
                        this.deleteOffre(id);
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








/*

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
*/

}
