import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ModalController, NavController, ToastController} from '@ionic/angular';
import {ModalbarAdminPage} from '../modalbar-admin/modalbar-admin.page';

@Component({
  selector: 'app-bar-admin',
  templateUrl: './bar-admin.page.html',
  styleUrls: ['./bar-admin.page.scss'],
})
export class BarAdminPage implements OnInit {
  users = [];
  proprio = 0;
  bar: any = {};
  haveBarOrNot = '';
  user = null;
  usersFilter = [];
  // public baseURI = 'http://localhost/drinksupProject/serveur/';
  public baseURI = 'https://macfi.ch/serveur/';
  constructor(private navCtrl: NavController, private toastCtrl: ToastController, public http: HttpClient, public modalController: ModalController) { }

  ngOnInit() {
      this.ionViewWillEnter();
  }
    public ionViewWillEnter(): void {
        this.getProprio();

    }
  public getProprio() {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
            options: any		= { 'key' : 'getProprio'},
            url: any      	= this.baseURI + 'aksi.php';
        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
            this.users = data;
            this.usersFilter = this.users;
           // if (this.users == null ) {this.haveUserOrNot = 'Aucun Internaute ayant le role USERS'; } else {this.haveUserOrNot = ''; }
        });

  }

    async validated(idUser, idEnt) {
        console.log('idUser : ' + idUser + ' idEnt : ' + idEnt);
        const modal = await this.modalController.create( {
            component: ModalbarAdminPage,
            componentProps: {
                idUser: idUser,
                idEnt: idEnt,
            },
        });
        modal.onDidDismiss().then(() => {
            this.getProprio();
        })
        modal.present();
        this.ionViewWillEnter();

    }
    async search(ev: any) {
        const val = ev.target.value;
        if (val && val.trim() !== '') {
            this.usersFilter = this.users.filter((users) => {
                return (users.INT_NOM.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        } else {
          this.getProprio();
        }
    }
}
