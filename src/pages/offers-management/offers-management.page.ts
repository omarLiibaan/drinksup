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
        actif: '',
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
        actif: '',
        allDay: false
    };
    invalidColor : string = "#DC143C";
    validColor : string = "#1bdc45"
    @ViewChild(CalendarComponent) myCal: CalendarComponent;
    constructor(public dp: DatePipe, public alertCtrl: AlertController, @Inject(LOCALE_ID)private locale: string, public http: HttpClient, public toastCtrl: ToastController, public alertController: AlertController) { }
    ngOnInit() {

    }

    public ionViewWillEnter(): void {
        this.resetEvents();
        this.eventSource = [];
        this.getOffres();
        this.getProprio();
    }

    resetEvents() {
        this.event = {
            title: '',
            description: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            entreprise: '',
            idOffre: '',
            actif: '',
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
                    endTime: new Date(this.listeOffres[i].endTime),
                    entreprise: this.listeOffres[i].entreprise,
                    idOffre: this.listeOffres[i].idOffre,
                    actif: this.listeOffres[i].actif,
                    allDay: false
                }
                this.eventSource.push(this.offres);
            }
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
            actif: 'Non',
            allDay: this.event.allDay
        }
        const dateDebut = this.dp.transform(eventCopy.startTime, 'yyyy-MM-dd HH:mm', 'GMT+0000');
        const dateFin = this.dp.transform(eventCopy.endTime, 'yyyy-MM-dd  HH:mm', 'GMT+0000');
        this.addOffer(eventCopy.description, dateDebut, dateFin,eventCopy.actif, eventCopy.title);
        this.eventSource.push(eventCopy);
        this.ionViewWillEnter();

    }

    addOffer(description: String, dateDebut: String, dateFin: String, actif: String, idEnt: String) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'insertOffers', 'description': description, 'dateDebut': dateDebut, 'dateFin': dateFin, 'actif': actif, 'idEnt': idEnt},
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

    async edit(slidingItem: IonItemSliding, id, actif, nom, description){
        await slidingItem.close();
        const nactif = '';
        if(actif === 'Oui'){
            const inactif = 'Non';
            const header = 'Voulez-vous désactiver l\'offre de ' + nom + ' description de l\'offre : ' + description;
            console.log(header + '----> ' + inactif);
            this.presentAlertActif(id, inactif, header);
        }else {
            const activer = 'Oui';
            const header = 'Voulez-vous activer l\'offre de ' + nom + ' description de l\'offre : ' + description;
            console.log(header + '----> ' + activer);
            this.presentAlertActif(id, activer, header);
        }

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

    editOffre(id: number, actif: string) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'editOffre', 'id': id, 'actif': actif},
            url: any      	= this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
                this.sendNotification('Votre Modification a bien été pris en compte !');
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

    async presentAlertActif(id, actif, header) {
        const alert = await this.alertController.create({
            header: header,
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
                        this.editOffre(id, actif);
                        this.ionViewWillEnter();
                        console.log('Confirm Okay ' + actif + ' ' + id);
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
}
