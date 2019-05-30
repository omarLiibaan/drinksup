import { Component, OnInit, ViewChild } from '@angular/core';
import {
    AlertController,
    IonItemSliding,
    ModalController,
    NavController,
    ToastController,
    IonContent
} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ModalPage} from '../modal/modal.page';
import * as moment from 'moment';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  // public baseURI = 'http://localhost/drinksupProject/serveur/';
  @ViewChild(IonContent) content: IonContent;
  public baseURI = 'https://macfi.ch/serveur/';
  users = [];
  value = 0;
  haveUserOrNot = '';
  usersFilter = [];
  user = null;
  today;
  clicked : boolean = false;
  tabPosition : string = "translateX(0)";
  leftPosition : string = "0%";
  activeColor1 : string = "#fff";
  activeColor2 : string = "rgb(82, 82, 82)";
  activeColor3 : string = "rgb(82, 82, 82)";
  hideHeader : string = "0";
  tousClicked : boolean = false;
  abonneClicked : boolean = false;
  termineClicked : boolean = false;
  constructor(private emailComposer: EmailComposer, private navCtrl: NavController, private toastCtrl: ToastController, public http: HttpClient, public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {
      this.ionViewWillEnter();
  }

public ionViewWillEnter(): void {
    this.getUsers();
    this.today = new Date().toISOString();
    console.log(this.today)
}
  public getUsers() {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'getUsers'},
          url: any      	= this.baseURI + 'aksi.php';
      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {

            for(var i in data){
                var newStart = new Date(data[i].ABO_DATEDEBUT).toISOString();
                var newEnd = new Date(data[i].ABO_DATEFIN).toISOString();
                if(data[i].ABO_DATEDEBUT !== null && data[i].ABO_DATEFIN !== null){
                    data[i].ABO_DATEDEBUT = newStart;
                    data[i].ABO_DATEFIN= newEnd;
                }
            }
            this.users = data;
            this.usersFilter = this.users;
            console.log(this.usersFilter);
            if (this.users == null ) {this.haveUserOrNot = 'Aucun Internaute ayant le role USERS'; } else {this.haveUserOrNot = ''; }
      });

  }

  ionViewDidLeave(){
      this.tous();
  }

  expand(index){
      if(!this.clicked){
        document.getElementById("sub_content_"+index).style.height = "130px";
        document.getElementById("sub_content_"+index).style.marginTop = "15px";

        this.clicked = true;
      }else{
        document.getElementById("sub_content_"+index).style.height = "0px";
        document.getElementById("sub_content_"+index).style.marginTop = "0px";
        this.clicked = false;
      }
  }

  async edit(slidingItem: IonItemSliding, id, prenom, nom, email) {
      await slidingItem.close();
      const modal = await this.modalController.create( {
          component: ModalPage,
          componentProps: {
              id: id,
              prenom: prenom,
              email: email
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
  }
  async editRole(slidingItem: IonItemSliding, id, nom) {
      await slidingItem.close();
      this.alertRoles(id, nom);
    }

  async alertRoles(id, nom) {
        const alert = await this.alertController.create({
            header: 'Assigner '+nom+' en tant que partenaire (propriétaire de bar) ?',
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
                        this.updateRole(id);
                        this.createEntreprise(id);
                        // this.createHoraire(id);
                        this.ionViewWillEnter();
                        console.log('Confirm Okay');
                    }
                }
            ]
        });

        await alert.present();
  }

    async presentAlert(id, nom) {
        const alert = await this.alertController.create({
            header: 'Êtes vous sûr de vouloir supprimer ' + nom + ' ?',
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

  updateRole(id: number) {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'updateRole', 'id': id},
          url: any      	= this.baseURI + 'aksi.php';

      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
              this.sendNotification('Le changement de rôle a bien été pris en compte !');

          },
          (error: any) => {
              console.log(error);
              this.sendNotification('Erreur!');
          });
  }

  createEntreprise (id: number) {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'insertEntreprise', 'id': id},
          url: any      	= this.baseURI + 'aksi.php';

      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
          },
          (error: any) => {
              console.log(error);
              this.sendNotification('Erreur!');
          });
  }

    async search(ev: any) {
        const val = ev.target.value;
        console.log(val);
        if (val && val.trim() !== '') {
            this.usersFilter = this.users.filter((users) => {
                return (users.INT_PRENOM.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        } else {
            this.getUsers();
        }
    }

    sendEmail(userEmail){

        const email = {
            to: userEmail,
            subject: '',
            body: '',
            isHtml: true
        };

        this.emailComposer.open(email);
    }

    scrollEvent(event){
        var position = 0;
        console.log(event)
    
        if(position <= event.detail.deltaY){
          this.hideHeader = "-50px";
          position = event.detail.deltaY;
          if(event.detail.scrollTop==0){
            this.content.scrollToTop(0);
          }  
        }else{
          this.hideHeader = "0px";
          position = event.detail.deltaY;
        }
      }

    tous(){
        this.usersFilter = this.users;
    
        this.tabPosition = "translateX(0%)";
        this.leftPosition = "0%";
        this.activeColor1 = "#fff";
        this.activeColor2 = "rgb(82, 82, 82)";
        this.activeColor3 = "rgb(82, 82, 82)";
    
        this.tousClicked = true;
        this.abonneClicked = false;
        this.termineClicked = false;
      }
    
      abonne(){
        this.tabPosition = "translateX(-50%)";
        this.leftPosition = "50%";
        this.activeColor2 = "#fff";
        this.activeColor1 = "rgb(82, 82, 82)";
        this.activeColor3 = "rgb(82, 82, 82)";
    
        this.usersFilter = this.users.filter(function(data : any){
            var ojd = new Date().toISOString();
            return (data.ABO_DATEDEBUT !== null || data.ABO_DATEFIN !== null) && ojd < data.ABO_DATEFIN; 
        });
    
        this.tousClicked = false;
        this.abonneClicked = true;
        this.termineClicked = false;
      }
    
      termine(){
        this.tabPosition = "translateX(-100%)";
        this.leftPosition = "100%";
        this.activeColor3 = "#fff";
        this.activeColor2 = "rgb(82, 82, 82)";
        this.activeColor1 = "rgb(82, 82, 82)";
    
        this.usersFilter = this.users.filter(function(data : any){
            var ojd = new Date().toISOString();
            return (data.ABO_DATEDEBUT !== null || data.ABO_DATEFIN !== null) && ojd > data.ABO_DATEFIN; 
        });   
    
        this.tousClicked = false;
        this.abonneClicked = false;
        this.termineClicked = true;
      }

}
